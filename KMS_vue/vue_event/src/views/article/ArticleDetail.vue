<template>
  <div class="detail_container">
    <el-card class="box-card">
      <div slot="header" class="header_box">
        <!-- <div>&lsaquo;  返回</div> -->
        <span>文章详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.back()">关闭</el-button>
      </div>
      <!-- 文章详情信息 -->
      <div class="detail_main">
        <div class="title">{{ artDetail.title }}</div>
        <div class="art_info">
          <div class="author"><span class="bold">作者：</span>{{ artDetail.nickname || artDetail.username }}</div>
          <div class="up_date">
            <template>
              <span class="bold">发布时间：</span>
              <span>{{ $formatDate(artDetail.pub_date) }} </span>
            </template>
          </div>
          <div class="art_cate"><span class="bold">分类：</span>{{ artDetail.cate_name }}</div>
          <div class="state"><span class="bold">状态：</span>{{ artDetail.state }}</div>
        </div>
        <el-divider></el-divider>
        <img v-if="artDetail.cover_img" :src="baseURL + artDetail.cover_img" alt="">
        <div class="art_content" v-html="artDetail.content"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArtDetailAPI } from '@/api'
import { baseURL } from '@/utils/request.js'
export default {
  props: ['artId'],
  name: 'art-detail',
  data () {
    return {
      baseURL: baseURL,
      artDetail: []
    }
  },
  methods: {
    // 获取文章详情
    async getArtDetail () {
      const { data: res } = await getArtDetailAPI(this.artId)
      if (res.code !== 0) return this.$message.error(res.$message)
      this.artDetail = res.data
      console.log(this.artDetail)
    }
  },
  created () {
    this.getArtDetail()
  }
}
</script>

<style lang="less" scoped>
.header_box span {
  font-size: 16px;
  font-weight: bold;
}
.header_box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 50px;
}
.art_info{
  display: flex;
  align-content: center;
  margin-bottom: 20px;
}
.bold{
  color: #000;
  font-weight: bold;
}
.art_info :nth-child(n){
  margin-right: 10px;
}
</style>
