// 导入数据库操作模块
const db = require('../db/index');
// 导入加密模块
const bcrypt = require('bcryptjs');
// 导入生成token的包
const jwt = require('jsonwebtoken');
// 导入token加密文件
const config = require('../config');
const { expiresIn } = require('../config');
// 注册接口的处理函数
exports.register = (req, res) => {
    // 获取客户端提交到客户端的用户信息
    const userinfo = req.body;
    // console.log(userinfo);
    // 对表单中的数据进行合法性判断
    // if (!userinfo.username) {
    //     // 响应数据，状态为1时，表示处理失败
    //     // return res.send({
    //     //     status: 1,
    //     //     message: '请输入用户名'
    //     // });
    //     return res.cc('请输入用户名');
    // };
    // if (!userinfo.password) {
    //     // return res.send({
    //     //     status: 1,
    //     //     message: '请输入密码'
    //     // });
    //     return res.cc('请输入密码');
    // };
    // 定义 sql 语句，查询用户名是否被占用
    const sql_select = `select * from ev_users where username=?`;
    // 使用 db.query 执行sql语句
    db.query(sql_select, userinfo.username, (err, results) => {
        if (err) {
            // return res.send({
            //     status: 1,
            //     message: err.message
            // });
            return res.cc(err);
        };
        if (results.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名被占用'
            // });
            return res.cc('用户名被占用');
        };
        // 调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        // 定义插入用户信息的 sql 语句
        const sql_insert = `insert into ev_users set ?`;

        db.query(sql_insert, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                // return res.send({
                //     status: 1,
                //     message: err.message
                // });
                return res.cc(err);
            };
            if (results.affectedRows !== 1) {
                // return res.send({
                //     status: 1,
                //     message: '注册失败，请稍后再试！'
                // });
                return res.cc('注册失败，请稍后再试！');
            };
            // res.send({
            //     status: 0,
            //     message: '注册成功！'
            // });
            return res.cc('注册成功！', 0);
        });
    });
    // res.send('ok');
};

// 登录接口的处理函数
exports.login = (req, res) => {
    // 接收表单数据
    var userinfo = req.body;
    // 定义SQL语句
    var sql_login = `select * from ev_users where username=?`;
    // 执行SQL语句，根据用户名和密码查询用户信息
    db.query(sql_login, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err);
        };
        if (results.length != 1) {
            return res.cc('登陆失败');
        };
        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        if (!compareResult) return res.cc('登陆失败');
        // 生成token  使用展开运算符，覆盖空白内容
        var user = {...userinfo, password: '', user_pic: '' };
        // 对用户的信息进行加密，生成token字符串(需要加密的信息、加密秘钥、token有效期)
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });
        // 将数据响应给客户端
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenStr
        });
    });
};