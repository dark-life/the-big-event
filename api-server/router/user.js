// 导入express
const express = require('express');
// 导入路由处理函数模块
const user_handler = require('../router_handler/user');
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const { userSchema } = require('../schema/user');

// 创建路由 
const router = express.Router();

// 挂载路由
// 注册
router.post('/reguser', expressJoi(userSchema), user_handler.reguser);
// 登录
router.post('/login', expressJoi(userSchema), user_handler.login);

// 共享路由
module.exports = router;