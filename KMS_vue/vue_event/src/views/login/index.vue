<template>
  <div class="login_container">
    <!-- 登录注册区域 -->
    <div class="loginReg">
      <div class="title"></div>
      <!-- 登录 -->
      <div class="reg_box">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input type="text" placeholder="请输入用户名" v-model.trim="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type='password' placeholder="请输入密码" v-model.trim="form.password" @keyup.native.enter="keyupEnter"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login" class="btn_login">登录</el-button>
            <el-link type='info' @click="$router.push('/reg')">去注册</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
import { mapMutations } from 'vuex'
export default {
  name: 'my-Login',
  data () {
    return {
      form: {
        // 表单数据
        username: '',
        password: ''
      },
      rules: {
        // 表单验证规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须由1-10位的字母数字组成', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']),
    // 回车键松开事件
    keyupEnter (e) {
      if (e.keyCode === 13) {
        this.login()
        // document.querySelector('.btn_login').click()
      }
    },
    // 登录事件
    login () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 验证通过
          // 请求接口，返回的数据中只有 data 是想要的内容，所以结构且赋值给res
          const { data: res } = await loginAPI(this.form)
          // console.log(res)
          // 登录失败
          if (res.code !== 0) return this.$message.error(res.message)
          // 登录成功
          this.$message.success(res.message)
          this.updateToken(res.token)
          this.$router.push('/home')
          // this.$store.dispatch('getUserinfoActions')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login_container {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: url('@/assets/images/login_bg.jpg') no-repeat center;
  background-size: cover;
  box-sizing: border-box;
}

.loginReg {
  width: 400px;
  height: 280px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 4px #666;
}

.title {
  height: 60px;
  width: 100%;
  background: url('@/assets/images/login_title.png') no-repeat center;
  // margin-bottom: 10px;
}
.reg_box{
  padding: 0 30px;
}
.el-form-item{
  margin-bottom: 20px !important;
  text-align: right;
}
.btn_login{
  width: 100%;
}
</style>
