<template>
  <div class="detail_container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArtDetailAPI } from '@/api'
export default {
  props: ['artId'],
  name: 'art-detail',
  data () {
    return {
      artDetail: []
    }
  },
  methods: {
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
</style>
