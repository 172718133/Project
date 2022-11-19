<template>
  <div class="userinfo_container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <el-form ref="userform" :model="userForm" :rules="userFromRules" label-width="80px">
        <el-form-item label="账号名称">
          <el-input disabled :value="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input autocomplete="off" v-model="userForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input autocomplete="off"  v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交修改</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateUserInfoAPI } from '@/api'
export default {
  name: 'my-userInfo',
  data () {
    return {
      userForm: {
        username: this.$store.state.userInfo.username,
        nickname: '',
        email: ''
      },
      userFromRules: {
        nickname: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称长度为1-10位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '用户邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交修改用户信息->点击事件
    submit () {
      this.$refs.userform.validate(async valid => {
        if (valid) {
          // 用户信息表单中没有id属性，所以直接传this.userForm在请求的时候会缺少id必填项
          this.userForm.id = this.$store.state.userInfo.id
          const { data: res } = await updateUserInfoAPI(this.userForm)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.$refs.userform.resetFields()
          this.$store.dispatch('getUserinfoActions')
        } else {
          return false
        }
      })
    },
    // 重置用户信息->点击事件
    reset () {
      // this.userForm.nickname = ''
      // this.userForm.email = ''
      this.$refs.userform.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.userinfo_container {
  height: 100%;
}
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

.box-card {
  height: 100%;
}
.el-form-item {
  width: 480px;
}
</style>
