// 导入验证规则模块
const joi = require('joi');

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

// 定义id, nickname, email 的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

// 定义avatar的验证规则
const avatar = joi.string().dataUri().required();

// 验证规则对象 - 表单数据
exports.userSchema = {
  body: {
    username,
    password
  }
}

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email,
  }
}

// 验证规则对象 - 重置密码
exports.reset_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  }
}

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar
  }
}
