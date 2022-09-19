$(function() {
    var $image = $('#image');
    var option = {
        // 纵横比
        aspectRatio: 1,
        // 指定裁剪区域
        preview: '.img-preview'
    };
    // 创建裁剪区域
    $image.cropper(option);
    // 上传按钮的点击事件
    $('#btnChooseImg').on('click', function() {
        $('#file').click();
    });
    // 选择文件的change事件
    $('#file').on('change', function(e) {
        var filelist = e.target.files;
        if (filelist.length === 0) {
            return layer.msg('请选择图片！');
        };
        console.log(filelist);
        // 将选择的图片替换到裁剪区域
        // 1.拿到用户选择的文件
        var file = e.target.files[0];
        // 2.将文件转换为路径
        var imgURL = URL.createObjectURL(file);
        console.log(imgURL);
        // 3.重新初始化裁剪区域
        $image.cropper('destroy') //销毁旧图片
            .attr('src', imgURL) //重新设置图片路径
            .cropper(option) //重新初始化裁剪区域
    });
    // 确定按钮的点击事件
    $('#btnUpload').on('click', function() {
        // 1拿到裁剪后的图片
        var dataImg = $image.cropper('getCroppedCanvas', {
            // 创建画布
            width: 100,
            height: 100
        }).toDataURL('image/png'); //将画布上的内容转化为base64 格式的字符串
        // 2请求接口，上传头像
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataImg
            },
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg('更换头像失败！');
                };
                window.parent.getUserinfo();
                layer.msg('更换头像成功！');
            }
        });
    });
})