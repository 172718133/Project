<template>
  <div class="avatar_container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改头像</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'my-Avatar'
}
</script>

<style lang="less" scoped>
.avatar_container {
  background-color: #fff;
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
.clearfix span{
  font-size: 16px;
  font-weight: bold;
}

.box-card {
  height: 100%;
}
</style>
