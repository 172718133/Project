// 导入express
const express = require('express');

// const joi = require('joi');
const joi = require('joi');

// 创建服务器的实例对象
const app = express();

// 导入并配置cors中间件
const cors = require('cors');
app.use(cors());

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));
// 声明处理失败提示的全局中间件 ！！！一定要在路由之前
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status: status,
            message: err instanceof Error ? err.message : err
        });
    };
    next();
});

// 一定要在路由之前配置解析token的中间件
const expressJWT = require('express-jwt');
const config = require('./config');
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }));
// P82 18.11分

// 导入并使用用户路由模块
const routerUser = require('./router/user');
app.use('/api', routerUser);
// 导入并使用用户信息路由模块
const routerUserinfo = require('./router/userinfo');
app.use('/my', routerUserinfo);

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err);
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');
    return res.cc(err);
});

// 启动服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
});