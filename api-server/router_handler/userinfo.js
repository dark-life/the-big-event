// 导入数据库操作模块
const db = require('../db/index');
const bcrypt = require('bcryptjs');

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  // 定义sql语句
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?';
  // 执行sql
  db.query(sql, [req.user.id], (err, results) => {
    // 判断sql执行是否成功
    if (err) return res.cc(err);
    // 判断查询结果是否存在
    if (results.length !== 1) return res.cc('获取用户信息失败');
    // 用户信息获取成功
    res.send({
      status: 0,
      message: '用户信息获取成功',
      data: results[0],
    });
  })
}

// 更新用户基本信息的处理函数
// 注：req.user 是 token, req.body 是 客户端数据
exports.updateUserInfo = (req, res) => {
  // 定义sql语句
  const sql = 'update ev_users set ? where id=?';
  // 执行sql
  db.query(sql, [req.body, req.body.id], (err, results) => {
    // 判断sql执行是否成功
    if (err) return res.cc(err);
    // 判断影响行数是否为1
    if (results.affectedRows !== 1) return res.cc('修改用户信息失败');
    // 修改用户信息成功
    res.cc('修改用户信息成功', 0);
  });
}

// 重置用户密码的处理函数
// 注：results[0] 是 查询的数据库数据
exports.resetPassword = (req, res) => {
  // 查询用户
  const sql = 'select * from ev_users where id=?';
  db.query(sql, [req.user.id], (err, results) => {
    // 判断sql执行是否成功
    if (err) return res.cc(err);
    // 判断查询结果是否存在
    if (results.length !== 1) return res.cc('用户不存在');

    // 判断原密码是否正确
    const cmp_result = bcrypt.compareSync(req.body.oldPwd, results[0].password);
    if (!cmp_result) return res.cc('原密码错误');

    // 更新数据库中用户的密码
    const sql = 'update ev_users set password=? where id=?';
    // 对新密码进行加密处理
    newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    // 执行sql
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      // 判断sql执行是否成功
      if (err) return res.cc(err);
      // 判断影响行数是否为1
      if (results.affectedRows !== 1) return res.cc('重置密码失败');
      // 重置密码成功
      res.cc('重置密码成功', 0);
    });
  });
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  // 定义sql
  const sql = 'update ev_users set user_pic=? where id=?';
  // 执行sql
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    // 判断sql执行是否成功
    if (err) return res.cc(err);
    // 判断影响行数是否为1
    if (results.affectedRows !== 1) return res.cc('更新用户头像失败');
    // 更新用户头像成功
    res.cc('更新用户头像成功', 0);
  });
}