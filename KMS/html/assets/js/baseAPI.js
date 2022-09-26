// 调用请求函数时  会先调用这个函数
// 该函数可以拿到我们配置的请求函数内容
$.ajaxPrefilter(function(option) {
    // 发起请求之前统一拼接请求根路径
    option.url = 'http://127.0.0.1:3007' + option.url;
    // 统一为需要权限的接口，设置 headers 请求头
    if (option.url.indexOf('/my/') != -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };
    // 统一配置 complete 回调函数
    option.complete = (res) => {
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
            // -未登录-  清空localStorage
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = '/html/login.html';
        }
    }
});