<template>
  <div class="user-container">
    <!-- 用户面板 -->
    <div class="userinfo">
      <!-- 用户信息 -->
      <div class="info">
        <div class="img">
          <img src="@/assets/logo.png" alt="">
        </div>
        <div class="con">
          <div class="name">Loong</div>
          <div class="cer">申请认证</div>
        </div>
      </div>
      <!-- 动态信息 -->
      <div class="about">
        <div class="ab_item">
          <div class="num">0</div>
          <div class="title">动态</div>
        </div>
        <div class="ab_item">
          <div class="num">0</div>
          <div class="title">关注</div>
        </div>
        <div class="ab_item">
          <div class="num">0</div>
          <div class="title">粉丝</div>
        </div>
      </div>
    </div>
    <!-- 功能面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link />
      <van-cell icon="chat-o" title="小思同学" is-link />
      <van-cell icon="warning-o" title="退出登录" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'TTUser'
}
</script>

<style lang="less" scoped>
.userinfo {
  color: #fff;
  font-size: 14px;
  background-color: #0077ff;
  padding: 30px 20px;
  .info {
    display: flex;
    margin-bottom: 40px;
    .img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #fff;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .con {
      display: flex;
      flex-direction: column;
      padding: 10px 20px;
      justify-content: space-around;
      .name {
        font-weight: bold;
        font-size: 18px;
      }
      .cer {
        font-size: 12px;
        color: #0077ff;
        text-align: center;
        border-radius: 4px;
        padding: 0 2px 2px 2px;
        background-color: #fff;
      }
    }
  }
  .about {
    display: flex;
    .ab_item {
      text-align: center;
      width: 33.33%;
      // .num {
      // }
      // .title {
      // }
    }
  }
}
</style>
