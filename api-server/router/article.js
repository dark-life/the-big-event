// 导入express
const express = require('express');
// 导入路由处理函数模块
const article_handler = require('../router_handler/article');
// 导入解析form-data数据格式的包
const multer = require('multer');
// 导入处理路径的模块
const path = require('path');
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const { add_article_schema, list_article_schema, del_article_schema, edit_article_schema } = require('../schema/article');

// 创建路由
const router = express.Router();

// 创建multer的对象实例
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// 挂载路由
// 发布文章
// 注：使用multer 解析表单数据， 使用expressJoi对表单数据进行验证
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle);
// 获取文章列表
router.get('/list', expressJoi(list_article_schema), article_handler.listArticle);
// 根据id删除文章
router.get('/delete/:id', expressJoi(del_article_schema), article_handler.delArticle);
// 根据id获取文章详情
router.get('/:id', expressJoi(del_article_schema), article_handler.queryArticle);
// 根据id更新文章信息
router.post('/edit', upload.single('cover_img'), expressJoi(edit_article_schema), article_handler.editArticle);


// 对外共享
module.exports = router;