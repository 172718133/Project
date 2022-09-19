$(function() {
    // 调用请求用户信息的函数
    getUserinfo();
    // 退出登录功能
    $('#btnLogin').on('click', function() {
        // 弹出询问框
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            layer.msg('退出成功！');
            setInterval(function() {
                // 按下确定的回调函数
                // 1.清空 localStorage 缓存
                localStorage.removeItem('token');
                // 2.返回登录页面
                location.href = '/html/login.html';
                // 官方的关闭弹出层的方法
                layer.close(index);
            }, 1500);
        });
    });
});
// 获取用户信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            if (res.status != 0) {
                return layer.msg('获取用户信息失败')
            };
            renderUserinfo(res.data);
        },
        // complete: (res) => {
        //     console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
        //         // -未登录-  清空localStorage
        //         localStorage.removeItem('token');
        //         // 跳转到登录页面
        //         location.href = '/html/login.html';
        //     }
        // }
    });
};
// 渲染用户信息
function renderUserinfo(user) {
    // 1判断用户是否有设置昵称
    var name = user.nickname || user.username;
    // 2渲染昵称
    $('.welcome').html('欢迎&nbsp&nbsp' + name);
    // 3判断用户是否有设置头像
    if (user.user_pic != null) {
        // 3.1渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text_avatar').hide();
    } else {
        // 3.2渲染文字头像
        var name = name[0].toUpperCase();
        $('.text_avatar').html(name).show();
        $('.layui-nav-img').hide();
    }
}