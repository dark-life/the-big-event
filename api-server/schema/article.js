// 导入验证规则模块
const joi = require('joi');

// 定义title, cate_id, content, state 的验证规则
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow('');
const state = joi.string().valid('已发布', '草稿').required();

// 定义pagenum, pagesize, cate_id_optional, state_optional 的验证规则
const pagenum = joi.number().integer().min(0).required();
const pagesize = joi.number().integer().min(1).required();
const cate_id_optional = joi.number().integer().min(1).optional();
const state_optional = joi.string().valid('已发布', '草稿').optional();

// 定义id的验证规则
const id = joi.number().integer().min(1).required();

// 对外共享
// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  }
}

// 验证规则对象 - 获取文章列表
exports.list_article_schema = {
  query: {
    pagenum,
    pagesize,
    cate_id: cate_id_optional,
    state: state_optional,
  }
}

// 验证规则对象 - 根据id删除文章
exports.del_article_schema = {
  params: {
    id
  }
}

// 验证规则对象 - 根据id更新文章
exports.edit_article_schema = {
  body: {
    id,
    title,
    cate_id,
    content,
    state,
  }
}