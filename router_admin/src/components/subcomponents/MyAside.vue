<template>
  <div class="layout-aside-container">
    <!-- 左侧边栏列表 -->
    <ul class="user-select-none menu">
      <li class="menu-item">
        <router-link to="/home/users">用户管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/rights">权限管理</router-link>
        </li>
      <li class="menu-item">
        <router-link to="/home/goods">商品管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/orders">订单管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/settings">系统设置</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MyAside',
}
</script>

<style lang="less" scoped>
.layout-aside-container {
  width: 250px;
  height: 100%;
  border-right: 1px solid #eaeaea;
}
.user-select-none{
  width: 100%;
  padding: 0;
  .menu-item{
    line-height: 60px;
    list-style: none;
    font-size: 14px;
    font-weight: 600;
    &:hover{
      background-color: #eaeaea;
      cursor: pointer;
    }
    a{
      display: block;
      padding-left: 40px;
      color: #000;
      &:hover{
        text-decoration: none;
      }
    }
  }
}
.router-link-active {
  background-color: #eaeaea;
  position: relative;
  &::before{
    content: '';
    display: block;
    width: 4px;
    height: 100%;
    background-color: #42b983;
    position: absolute;
    left: 0;
  }
}

</style>