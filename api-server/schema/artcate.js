// 导入验证规则模块
const joi = require('joi');

// 定义name,alias的验证规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();

// 定义id 的验证规则
const id = joi.number().integer().min(1).required();

// 对外共享
// 验证规则对象 - 新增文章分类
exports.add_cate_schema = {
  body: {
    name,
    alias,
  }
}

// 验证规则对象 - 删除文章分类
exports.del_cate_schema = {
  params: {
    id
  }
}

// 验证规则对象 - 根据id获取文章分类
exports.get_cate_schema = {
  params: {
    id
  }
}

// 验证规则对象 - 根据id更新文章分类
exports.update_cate_schema = {
  body: {
    id,
    name,
    alias,
  }
}