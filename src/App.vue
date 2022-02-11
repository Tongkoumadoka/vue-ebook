<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// (1)引入rem的设置
// 当dom加载完毕时调用该方法

export default {}
document.addEventListener('DOMContentloaded', () => {
  const html = document.querySelector('html') // 获取根元素
  let fontSize = window.innerWidth / 10

  // 设置rem的最大fontsize值
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
