const express = require('express');
// 路由实例对象
const router = express.Router();

// 导入用户路由处理函数模块
const user_handler = require('../router_handler/user');

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入验证规则对象
const { reg_login_schema } = require('../schema/user');


// 挂载路由
router.post('/register', expressJoi(reg_login_schema), user_handler.register);
router.post('/login', expressJoi(reg_login_schema), user_handler.login);

module.exports = router;