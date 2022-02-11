<template>
  <div class="ebook">
    <title-bar></title-bar>
    <ebook-reader> </ebook-reader>
    <menu-bar></menu-bar>
  </div>
</template>

<script>
// (1)作为ebook父组件引入ebookreader实现动态路由
import EbookReader from '@/components/ebook/EbookReader.vue'
// (2)引入标题栏和菜单栏组件
import TitleBar from '../../components/ebook/TitleBar.vue'
import MenuBar from '../../components/ebook/MenuBar.vue'
export default {
  components: {
    EbookReader,
    TitleBar,
    MenuBar
  },
  mounted() {
    // console.log('$route:', this.$route)
    // console.log('$router:', this.$router)
  }
}
</script>

<style type="text/css" scoped>
</style>
