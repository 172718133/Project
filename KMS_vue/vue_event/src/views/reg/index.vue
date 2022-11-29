<template>
  <div class="register_container">
    <!-- 登录注册区域 -->
    <div class="loginReg">
      <div class="title"></div>
      <!-- 注册 -->
      <div class="reg_box">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input type="text" placeholder="请输入用户名" v-model.trim="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type='password' placeholder="请输入密码" v-model.trim="form.password"></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input type='password' placeholder="请再次确认密码" v-model.trim="form.repassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register" class="btn_reg">注册</el-button>
            <el-link type='info' @click="$router.push('/login')">去登录</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api/index.js'
export default {
  name: 'my-Register',
  data () {
    const checkRepwd = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        // 表单数据
        username: '',
        password: '',
        repassword: ''
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
        ],
        repassword: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位非空字符', trigger: 'blur' },
          { validator: checkRepwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 验证通过
          // 1.调用注册接口
          const { data: res } = await registerAPI(this.form)
          console.log(res)
          // 2.注册失败
          if (res.code !== 0) return this.$message.error(res.message)
          // 3.注册成功
          this.$message.success(res.message)
          // 4.跳转到登录页面
          this.$router.push('/login')
        } else {
          // 验证失败
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.register_container {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: url('@/assets/images/login_bg.4cf70ad5.jpg') no-repeat center;
  background-size: cover;
  box-sizing: border-box;
}

.loginReg {
  width: 400px;
  height: 330px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // box-shadow: 0 0 4px #666;
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
.btn_reg{
  width: 100%;
}
</style>
