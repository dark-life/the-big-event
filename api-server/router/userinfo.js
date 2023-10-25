// 导入express模块
const express = require('express');
// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo');
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const { update_userinfo_schema, reset_password_schema, update_avatar_schema } = require('../schema/user');

// 创建路由
const router = express.Router();

// 挂载路由
// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo);
// 更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo);
// 重置用户密码的路由
router.post('/updatepwd', expressJoi(reset_password_schema), userinfo_handler.resetPassword);
// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar);


// 对外共享
module.exports = router;