<template>
  <transition name="slide-up">
    <div class="setting-wrapper"
         v-if="menuVisible && settingVisible===1">
      <div class="setting-theme">
        <div class="setting-theme-item"
             v-for="(item,index) in themeList"
             :key="index"
             @click="setTheme(index)">
          <div class="preview"
               :class="{'selected':item.name === defaultTheme}"
               :style="{background:item.style.body.background}"></div>
          <div class="text"
               :class="{'selected':item.name === defaultTheme}">{{item.alias}}</div>
          <!-- alias国际化显示 -->
        </div>
      </div>
    </div>
  </transition>
  <!-- 对应icon-bright功能 -->

</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { saveTheme } from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  data() {
    return {}
  },
  methods: {
    setTheme(index) {
      const theme = this.themeList[index]
      // console.log(this.defaultTheme)
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
        saveTheme(this.fileName, this.defaultTheme)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global.scss';

.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 160;
  width: 100%;
  height: px2rem(90);
  background: ivory;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      // 重要
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>
