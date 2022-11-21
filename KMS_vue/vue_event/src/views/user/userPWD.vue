<template>
  <div class="pwd_container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>重置密码</span>
      </div>
      <el-form ref="pwdform" :model="pwdForm" label-width="80px">
        <el-form-item label="原密码">
          <el-input autocomplete="off" v-model.trim="pwdForm.old_pwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input autocomplete="off" v-model.trim="pwdForm.new_pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input autocomplete="off" v-model.trim="pwdForm.re_pwd"></el-input>
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
export default {
  name: 'my-PWD',
  data () {
    return {
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      }
    }
  },
  methods: {
    submit () {
      console.log(this.pwdForm)
    },
    reset () {}
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
