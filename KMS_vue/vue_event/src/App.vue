<template>
  <div class="app_container">
    <el-button>123</el-button>
  </div>
</template>

<script>
import { registerAPI } from '@/api/index.js'
export default {
  async created () {
    const res = await registerAPI('aaa', 111111, 111111)
    console.log(res)
  }
}
</script>

<style lang="lesss" scoped>

</style>
