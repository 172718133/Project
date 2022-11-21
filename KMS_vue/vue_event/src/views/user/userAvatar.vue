<template>
  <div class="avatar_container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改头像</span>
      </div>
      <div class="choose">
        <img src="@/assets/images/avatar.jpg" alt="" v-if="!this.avatar">
        <img :src="this.avatar" alt="" v-else>
        <div class="choose_box">
          <input type="file" style="display: none;" accept="image/*" ref="file" @change="fileChange">
          <el-button slot="trigger" size="small" icon="el-icon-plus" type="primary" @click="chooseImg">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" icon="el-icon-upload" type="success" @click="submitUpload">上传到服务器</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { updateUserAvatarAPI } from '@/api'
// import store from '@/store'
export default {
  name: 'my-Avatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 点击选择图片按钮触发文件输入框的点击事件
    chooseImg () {
      this.$refs.file.click()
    },
    // 图片选中后触发的函数
    fileChange (e) {
      const file = e.target.files
      const fileName = file[0].name.split('')
      const str = ['/', '@', '$', '%', '&', '#']
      if (file.length === 0) {
        this.avatar = ''
      } else {
        fileName.some((item, index) => {
          if (str.indexOf(item) !== -1) {
            this.$message.error('文件名不能包含/、@、$、%、&、#等特殊字符!')
          } else {
            // 1、创建 FileReader 对象
            const fr = new FileReader()
            // 2、调用 readAsDataURL 函数，读取文件内容
            fr.readAsDataURL(file[0])
            // 3、定义监听 FileReader 对象的 onload 事件
            fr.onload = e => {
              // 4 判断是否为base64 格式的文件
              if (e.target.result.indexOf('data:image') !== -1 && e.target.result.indexOf('base64') !== -1) {
                // 字符串中存在以上俩个内容，所以判定为是base64格式的字符串
                this.avatar = e.target.result
              } else {
                this.$message.error('请选择图片格式的文件！')
              }
            }
          }
          return true
        })
      }
    },
    // 上次用户头像的函数
    async submitUpload () {
      const { data: res } = await updateUserAvatarAPI(this.avatar)
      // 响应的状态码不为0，提示错误信息
      if (res.code !== 0) return this.$message.error(res.message)
      // 否则提示用户更换头像成功
      this.$message.success(res.message)
      // 调用vuex中的action方法，重新请求并更新用户信息
      this.$store.dispatch('getUserinfoActions')
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.clearfix span {
  font-size: 16px;
  font-weight: bold;
}
.choose img{
  height: 350px;
  width: 350px;
}
.el-card__body {
  padding-bottom: 60px !important;
}

.choose_box {
  margin-top: 20px;
}
</style>
