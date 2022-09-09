// 调用请求函数时  会先调用这个函数
// 该函数可以拿到我们配置的请求函数内容
$.ajaxPrefilter(function(option) {
    option.url = 'http://127.0.0.1:3007' + option.url;
});