<template>
  <div class="article_container">
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{title}}</span>
          <!-- 单张图片 -->
          <img :src="cover.images[0]" alt="" class="thumb" v-if="cover.type === 1">
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="cover.type === 3">
          <img v-for="(item, index) in cover.images" :key="index" :src="item" alt="" class="thumb">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>作者 {{author}} &nbsp;&nbsp; {{com}}评论 &nbsp;&nbsp; 发布日期 {{date}}</span>
          <!-- 关闭按钮 -->
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '暂无标题'
    },
    cover: {
      type: Object,
      default: function () {
        return { cover: 0 }
      }
    },
    author: {
      type: String,
      default: ''
    },
    com: {
      type: [Number, String],
      default: 0
    },
    date: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.article_container{
  border-bottom: 1px solid #ccc;
}
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
