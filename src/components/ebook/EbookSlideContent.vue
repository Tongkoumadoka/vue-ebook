<template>
  <div class="ebook-slide-contents">
    内容组件
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input class="slide-contents-search-input"
               type='text'
               :placeholder="$t('book.searchHint')">
      </div>
      <div class="slide-contents-search-cancel">{{$t(book.cancel)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global.scss';
</style>
