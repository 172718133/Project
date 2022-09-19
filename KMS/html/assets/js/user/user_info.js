$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称最多为6个字符！';
            }
        }
    });
    initUserinfo();
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserinfo();
    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        updateUserinfo();
    });
})

function initUserinfo() {
    var form = layui.form;
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: (res) => {
            if (res.status != 0) {
                return layer.msg('获取用户信息失败！');
            };
            form.val("form-user", res.data);
        }
    })
};

function updateUserinfo() {
    var form = layui.form;
    var userinfo = form.val("form-user");
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: userinfo,
        success: (res) => {
            if (res.status != 0) {
                return layer.msg('修改用户信息失败！');
            }
            layer.msg('修改用户信息成功！');
            // 当前iframe页面调用父页面的getUserinfo方法，重新渲染用户信息
            window.parent.getUserinfo();
        }
    })
}