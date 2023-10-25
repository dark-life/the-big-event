// 导入express
const express = require('express');
// 导入路由处理函数模块
const artcate_handler = require('../router_handler/artcate');
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const { add_cate_schema, del_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate');
// 创建路由
const router = express.Router();

// 挂载路由
// 获取文章分类列表
router.get('/cates', artcate_handler.getArticleCate);
// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCate);
// 根据id删除文章分类
router.get('/deletecate/:id', expressJoi(del_cate_schema), artcate_handler.deleteArticleCate);
// 根据id获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArticleCateById)
// 更新文章分类
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateArticleCate);

// 对外共享
module.exports = router;
