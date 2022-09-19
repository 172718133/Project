$(function() {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newpwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！';
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码必须一致！';
            }
        }
    });
    $('.layui-form').on('submit', function(e) {
        console.log('ok');
        // var pwd = form.val("repwd");
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg('修改密码失败！');
                }
                console.log(res);
                layer.msg('修改密码成功，请重新登陆！');
                // jquery元素[0]转换为原生DOM元素，reset()重置表单数据
                $('.layui-form')[0].reset();
                setInterval(function() {
                    localStorage.removeItem('token');
                    parent.location.href = '/html/login.html';
                }, 1500);
            }
        });
    });
})