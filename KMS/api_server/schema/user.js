// 导入定义验证规则的包
const joi = require('joi');

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().required().pattern(/^[A-Za-z0-9_]{6,12}$/);
// 定义id、nickname、email的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
};
// 定义验证id、头像、邮箱表单数据的规则对象
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}