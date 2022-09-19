// 导入数据库操作模块
const db = require('../db/index');
// 导入处理密码的模块
const bcrypt = require('bcryptjs');
// 获取用户基本信息的接口处理函数
exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql_userinfo = `select uid, username, nickname, email, user_pic from ev_users where uid=?`;
    // 调用db.query执行sql语句
    db.query(sql_userinfo, req.user.uid, (err, results) => {
        // 查询失败
        if (err) return res.cc(err);
        // 查询成功，但结果为空
        if (results.length != 1) return res.cc('获取用户信息失败');
        // 查询成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        });
    });
};
// 更新用户信息的接口处理函数
exports.updateUserInfo = (req, res) => {
    // 定义sql语句
    const sql_update = 'update ev_users set ? where uid=?';
    db.query(sql_update, [req.body, req.user.uid], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows != 1) return res.cc('修改用户基本信息失败！');
        res.cc('修改用户基本信息成功!', 0);
    });
};
// 修改用户密码的接口处理函数
exports.updatePassword = (req, res) => {
    const sql_updatepwd = 'select * from ev_users where uid=?';
    // console.log(req.user);
    db.query(sql_updatepwd, req.user.uid, (err, results) => {
        if (err) return res.cc(err);
        if (results.length != 1) return res.cc('用户不存在！');
        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('旧密码错误！');
        // 修改用户密码
        const sql_setPwd = 'update ev_users set password=? where uid=?';
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        db.query(sql_setPwd, [newPwd, req.user.uid], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows != 1) return res.cc('修改密码失败！');
            res.cc('修改密码成功！', 0);
        });
    });
};

// 修改用户头像的接口处理函数
exports.updateAvatar = (req, res) => {
    const sql_avatar = 'update ev_users set user_pic=? where uid=?';
    db.query(sql_avatar, [req.body.avatar, req.user.uid], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows != 1) return res.cc('更换头像失败！');
        res.cc('更换头像成功', 0);
    });
}