$(function() {
    // 去注册
    $('#toReg').on('click', function() {
        $('.login_box').hide();
        $('.reg_box').show();
    });
    // 去登录
    $('#toLogin').on('click', function() {
        $('.reg_box').hide();
        $('.login_box').show();
    });
    // 表单验证规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 验证两次密码是否一致
        repwd: function(value) {
            // 通过形参 value 拿到确认密码的值
            // 通过jquery的val()拿到密码的值
            var pwd = $('.reg_box [name=password]').val();
            // 比较，两者不一致则返回提示
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    });
    // 监听注册表单的提交时间
    $('#form_reg').on('submit', function(e) {
        // 获取表单的值
        var username = $('#form_reg [name=username]').val();
        var password = $('#form_reg [name=password]').val();
        // 阻止默认提交行为
        e.preventDefault();
        // 发起请求
        $.post('/api/register', { username, password }, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            };
            layer.msg(res.message);
            $('#toLogin').click();
        });
    });
    // 监听登录表单的提交时间
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message);
                };
                layer.msg(res.message);
                // 缓存token
                localStorage.setItem('token', res.token);
                // 跳转到主页
                // location.href = '/html/index.html';
                setTimeout(function() {
                    location.href = '/html/index.html';
                }, 1500)
            }
        });
    });
})