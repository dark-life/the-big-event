// 导入处理路径的模块
const path = require('path');
// 导入数据库操作模块
const db = require('../db/index');

// 发布文章的处理函数
exports.addArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数');

  // 定义sql语句
  const sql = 'insert into ev_articles set ?';

  // 文章信息对象
  const articleInfo = {
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的id
    author_id: req.user.id,
  };

  // 执行sql
  db.query(sql, [articleInfo], (err, results) => {
    // 判断sql执行是否成功
    if (err) return res.cc(err);
    // 判断影响行数是否为1 
    if (results.affectedRows !== 1) return res.cc('发布文章失败');
    // 发布文章成功
    res.cc('发布文章成功', 0);
  });
};

// 获取文章列表的处理函数
exports.listArticle = (req, res) => {
  // 定义sql语句
  const sql = `
    select a.id, a.title, a.pub_date, a.state, b.name as cate_name
    from ev_articles as a,ev_article_cate as b 
    where a.cate_id = b.id and a.cate_id = ifnull(?, a.cate_id)  and a.state = ifnull(?, a.state) and a.is_delete = 0  limit ?,?
  `;
  const info = [req.query.cate_id || null, req.query.state || null, (req.query.pagenum - 1) * req.query.pagesize, req.query.pagesize];
  // 执行sql语句
  db.query(sql, info, (err, results) => {
    // 判断sql执行是否成功
    if (err) return res.cc(err);

    // 获取文章数量
    const sql = `
      select count(*) as num 
      from ev_articles 
      where is_delete = 0 and state = ifnull(?,state) and cate_id = ifnull(?,cate_id)
    `;
    const info = [req.query.state || null, req.query.cate_id || null];
    db.query(sql, info, (err, result) => {
      // 判断sql执行是否成功
      if (err) return res.cc(err);
      // 判断查询结果是否为1
      if (result.length !== 1) return res.cc('获取文章数量失败');
      // 发送数据到客户端
      res.send({
        status: 0,
        message: '获取文章列表成功',
        data: results,
        total: result[0].num,
      });
    });
  });
};

// 根据id删除文章的处理函数
exports.delArticle = (req, res) => {
  // 定义sql语句
  const sql = 'update ev_articles set is_delete=1 where id=?';
  // 执行sql
  db.query(sql, req.params.id, (err, results) => {
    // 判断sql执行是否成功
    if (err) return res.cc(err);
    // 判断影响行数是否为1
    if (results.affectedRows !== 1) return res.cc('删除文章失败');
    // 删除文章成功
    res.cc('删除文章成功', 0);
  });
};

// 根据id获取文章详情的处理函数
exports.queryArticle = (req, res) => {
  // 定义sql语句
  const sql = 'select * from ev_articles where id=?';
  // 执行sql
  db.query(sql, req.params.id, (err, results) => {
    // 判断sql执行是否成功
    if (err) return res.cc(err);
    // 判断查询结果是否为1
    if (results.length !== 1) return res.cc('获取文章详情失败');
    // 获取文章详情成功
    res.send({
      status: 0,
      message: '获取文章详情成功',
      data: results[0],
    });
  });
};

// 根据id更新文章信息的处理函数
exports.editArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数');

  // 定义sql语句
  const sql = 'update ev_articles set ? where id=?';

  // 文章信息对象
  const articleInfo = {
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
  }

  // 执行sql
  db.query(sql, [articleInfo, req.body.id], (err, results) => {
    // 判断sql执行是否成功
    if (err) return res.cc(err);
    // 判断影响行数是否为1
    if (results.affectedRows !== 1) return res.cc('更新文章失败');
    // 更新文章成功
    res.cc('更新文章成功', 0);
  })
};