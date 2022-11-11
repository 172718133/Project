<template>
  <div class="home_container">
    <van-nav-bar title="头条" fixed border />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
      <Article v-for="item in articleList" :key="item.id" :author="item.aut_name" :com="item.comm_count" :date="item.pubdate" :cover="item.cover" :title="item.title"></Article>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
import { Toast } from 'vant'
import { getArticleListAPI } from '@/api/articleAPI.js'
import Article from '@/components/TTArticle.vue'
export default {
  data() {
    return {
      // list: [],
      // 是否正在加载下一页，如果 loading 为true，则不会触发 load 事件
      // 在每次下一页数据请求回来之后，要把 loading 状态改为 false
      loading: true,
      // 所有数据是否加载完毕，如果没有更多数据了，一定要把 finished 改成 true
      finished: false,
      isLoading: false,
      page: 1,
      limit: 10,
      articleList: []
    }
  },
  methods: {
    onLoad() {
      this.page++
      this.initArticleList()
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功')
        // 停止刷新状态
        this.isLoading = false
        // 清空旧数据， 重新请求数据
        this.articleList = []
        this.page = 1
        this.finished = false
        this.initArticleList()
      }, 1000)
    },
    async initArticleList() {
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      // console.log(res)
      // 拼接旧数据和新请求到的数组
      this.articleList = [...this.articleList, ...res]
      this.loading = false
      if (res.length === 0) {
        // 证明数据已经加载完毕，把 finised 改为true，关闭上拉加载下一页
        this.finished = true
      }
    }
  },
  components: {
    Article
  },
  created() {
    this.initArticleList()
  }
}
</script>

<style lang='less' scoped>
.home_container {
  padding: 46px 0 50px 0;
}
// .van-nav-bar {
//   background-color: #0077ff;
// }
// /deep/ .van-nav-bar__title {
//   color: #fff;
// }
</style>
