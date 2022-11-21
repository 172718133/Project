<template>
  <el-container class="main_container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" class="logo" />
      <!-- 右侧的菜单 -->
      <el-menu class="el-menu-top" mode="horizontal" background-color="#23262E" text-color="#fff" active-text-color="#409EFF">
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img :src="user_pic" alt="" class="avatar" v-if="user_pic"/>
            <img src="../../assets/images/avatar.jpg" alt="" class="avatar" v-else />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" class="btn_logout" @click="logout"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic" />
          <img src="../../assets/images/logo.png" alt="" v-else />
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 侧边栏菜单数据 -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#23262E" text-color="#fff" active-text-color="#409EFF" unique-opened router>
          <template v-for="item in menus">
            <!-- 不包含子菜单的“一级菜单” -->
            <el-menu-item :index="item.indexPath" :key="item.indexPath" v-if="!item.children"><i :class="item.icon"></i>{{ item.title }}</el-menu-item>
            <!-- 包含子菜单的“一级菜单” -->
            <el-submenu :index="item.indexPath" :key="item.indexPath" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item :index="subitem.indexPath" v-for="subitem in item.children" :key="subitem.indexPath"><i :class="subitem.icon"></i>{{ subitem.title }}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <!-- 二级路由挂载点 -->
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© 123456789@qq.com - 迪迦</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// import { getUserinfoActions } from '@/api/index.js'
import { mapGetters } from 'vuex'
import { getAsideListAPI } from '@/api/index.js'
export default {
  name: 'my-Main',
  data () {
    return {
      menus: {}
    }
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  },
  methods: {
    // 退出登录事件
    logout () {
      this.$confirm('是否确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 调用vuex中的方法，重新赋值token为''，等于清空token值
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserinfo', '')
          this.$message.success('退出登录成功！')
          // console.log(this.$store.state.token)
          this.$router.push('/login')
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消退出'
          // })
        })
    },
    // 获取侧边栏数据
    async getAsideList () {
      const { data: res } = await getAsideListAPI()
      // console.log(res)
      this.menus = res.data
    },
    // 侧边栏菜单项展开事件
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    // 侧边栏菜单项关闭事件
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created () {
    this.getAsideList()
  }
}
</script>

<style lang="less" scoped>
.logo {
  height: 50px;
  margin: 5px;
}
.main_container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0 20px 0 30px;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f1f4f5;
  }
  .el-footer {
    height: 40px !important;
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.user-box {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
