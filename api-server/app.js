// 导入express模块
const express = require('express');
// 导入验证规则模块
const joi = require('joi');
// 导入cors中间件
const cors = require('cors');
// 导入express-jwt
const expressJWT = require('express-jwt');
// 导入全局配置文件
const config = require('./config');
// 导入用户路由模块
const userRouter = require('./router/user');
// 导入用户信息路由模块
const userinfoRouter = require('./router/userinfo');
// 导入文章分类路由模块
const artCateRouter = require('./router/artcate');
// 导入文章路由模块
const articleRouter = require('./router/article');

// 创建实例
const app = express();

// 注册cors中间件
app.use(cors());

// 注册解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'));

// res.cc()函数
app.use((req, res, next) => {
  res.cc = (error, status = 1) => {
    res.send({
      status,
      message: error instanceof Error ? error.message : error
    });
  }
  next();
});

// 注册解析token的中间件
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }));

// 注册用户路由
app.use('/api', userRouter);

// 注册用户信息路由
app.use('/my', userinfoRouter);

// 注册文章分类路由
app.use('/my/artcate', artCateRouter);

// 注册文章路由
app.use('/my/article', articleRouter);

// 定义错误级别的中间件
app.use((error, req, res, next) => {
  // 验证失败导致的错误
  if (error instanceof joi.ValidationError) return res.cc(error);
  // 身份认证失败错误
  if (error.name = 'UnauthorizedError') return res.cc('身份认证失败');
  // 未知的错误
  res.cc(error);
})

// 启动服务器
app.listen(3007, () => {
  console.log('express server is running at http://127.0.0.1:3007');
});