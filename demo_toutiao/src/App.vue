<template>
  <div class="app_container">
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">้ฆ้กต</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">ๆ็</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      active: 0
    }
  },
  methods: {
    // toHome() {
    //   this.$router.push('/home')
    // },
    // toUser() {
    //   this.$router.push('/user')
    // }
  }
}
</script>

<style lang='less' scoped>
</style>
