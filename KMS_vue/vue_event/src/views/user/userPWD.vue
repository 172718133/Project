<template>
  <div class="pwd_container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>重置密码</span>
      </div>
      <el-form ref="pwdform" :rules="pwdRules" :model="pwdForm" label-width="80px">
        <el-form-item label="原密码" prop="old_pwd">
          <el-input type="password" autocomplete="off" v-model.trim="pwdForm.old_pwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input type="password" autocomplete="off" v-model.trim="pwdForm.new_pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="re_pwd">
          <el-input type="password" autocomplete="off" v-model.trim="pwdForm.re_pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">修改密码</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updatePasswordAPI } from '@/api'
export default {
  name: 'my-PWD',
  data () {
    // 检测新旧密码是否相同的验证规则
    const somePWD = (rule, value, callback) => {
      if (value === this.pwdForm.old_pwd) {
        return callback(new Error('新旧密码不能相同'))
      }
      callback()
    }
    // 检测确认密码是否一样的验证规则
    const rePWD = (rule, value, callback) => {
      if (value !== this.pwdForm.new_pwd) {
        return callback(new Error('确认密码必须与新密码一致！'))
      }
      callback()
    }
    return {
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      pwdRules: {
        old_pwd: [
          { required: true, message: '原密码不能为空！', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '新密码不能为空！', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: somePWD, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请输入确认密码！', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: rePWD, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 修改密码点击事件
    async submit () {
      // 请求api接口
      const { data: res } = await updatePasswordAPI(this.pwdForm)
      if (res.code !== 0) return this.$message.error(res.message)
      // this.$message.success(res.message)
      this.$refs.pwdform.resetFields()
      this.$message.warning('密码已修改，请重新登录！')
      this.$router.push('/login')
      this.$store.commit('updateToken', '')
      this.$store.commit('updateUserinfo', '')
    },
    reset () {
      this.$refs.pwdform.resetFields()
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
.clearfix span{
  font-size: 16px;
  font-weight: bold;
}
.el-form-item {
  width: 480px;
}
</style>
