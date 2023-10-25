// 导入数据库操作模块
const db = require('../db/index');
// 导入bcryptjs模块
const bcrypt = require('bcryptjs');
// 导入生成token模块
const jwt = require('jsonwebtoken');
// 导入全局配置文件
const config = require('../config')

// 注册处理函数
exports.reguser = (req, res) => {
  // 获取表单数据
  const userinfo = req.body;
  // 数据合法性校验
  // if (!userinfo.username || !userinfo.password) {
  //   // return res.send({ status: 1, message: '用户名或密码不合法' });
  //   return res.cc('用户名或密码不合法');
  // }

  const sql = 'select * from ev_users where username=?';
  db.query(sql, [userinfo.username], (error, results) => {
    // 判断sql执行是否成功
    if (error) {
      // return res.send({ status: 1, message: error.message });
      return res.cc(error);
    }
    // 判断用户名是否被占用
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' });
      return res.cc('用户名被占用，请更换其他用户名');
    }
    // 加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);

    // 插入新用户
    // 定义sql语句
    const sql = 'insert into ev_users set ?';
    // 执行sql语句
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (error, results) => {
      // 判断sql执行是否成功
      if (error) {
        // return res.send({ status: 1, message: error.message });
        return res.cc(error.message);
      }
      // 判断影响行数是否为1
      if (results.affectedRows !== 1) {
        // return res.send({ status: 1, message: '注册用户失败' });
        return res.cc('注册用户失败');
      }
      // 注册用户成功
      // res.send({ status: 0, message: '注册成功' });
      res.cc('注册成功', 0);
    });
  });
}

// 登录处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userinfo = req.body;
  // 定义sql语句
  const sql = 'select * from ev_users where username=?';
  // 执行sql
  db.query(sql, [userinfo.username], (error, results) => {
    // 判断sql执行是否成功
    if (error) return res.cc(error.message);

    // 判断数据条数是否为1
    if (results.length !== 1) return res.cc('登录失败');

    // 密码校验
    const cmp_result = bcrypt.compareSync(userinfo.password, results[0].password);
    if (!cmp_result) return res.cc('登陆失败!');

    // 在服务器端生成token
    const user = { ...results[0], password: '', user_pic: '' };
    // 对用户信息进行加密,生成token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });
    // 将token响应给客户端
    res.send({
      status: 0,
      message: '登陆成功',
      token: 'Bearer ' + tokenStr,
    });
  });
}