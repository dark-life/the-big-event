const mysql = require('mysql');

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'api_db'
});

// 对外共享
module.exports = db;