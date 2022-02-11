<template>
  <!-- @弹窗组件 -->
  <transition name="popup-slide-up">
    <div class="ebook-popup-list"
         v-show="fontFamilyVisible">
      <div class="ebook-popoup-title">
        <div class="ebook-popup-title-icon"
             @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">选择字体</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-list-item"
             v-for="(item,index) in fontFamilyList"
             :key="index"
             @click="setFontFamily(item.font)">
          <!-- 左右布局 -->
          <!-- 字体选择还有状态变化 -->
          <div class="ebook-popup-item-text"
               :class="{'selected':isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check"
               v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { FONT_FAMILY } from '../../utils/book'
import { saveFontFamily } from '../../utils/localStorage'
//setFontFamilyVisible 控制其显示
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods: {
    hide() {
      this.setFontFamilyVisible(false)
    },
    isSelected(item) {
      return this.defaultFontFamily == item.font
    },
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      // 缓存到本地local
      saveFontFamily(this.fileName, font)
      if (this.defaultFontFamily == 'Default') {
        // 判断是否选择为默认字体
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        // 通过theme对象中的font方式设置字体
        this.currentBook.rendition.themes.font(font)
      }
    }
  },
  mounted() {}
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global.scss';
.ebook-popup-list {
  // 外层绝对定位
  position: absolute;
  bottom: 0;
  left: 0;
  // 覆盖
  z-index: 200;
  width: 100%;
  background-color: ivory;
  box-shadow: 0 px2rem(-4) px2rem(4) rgba(0, 0, 0, 0.15);

  .ebook-popoup-title {
    position: relative;
    padding: px2rem(15);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    text-align: center;
    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      @include center;
      font-size: px2rem(16);
      font-weight: bold;
    }
    .ebook-popup-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-list-item {
      display: flex;
      padding: px2rem(15);
      .ebook-popup-item-text {
        flex: 1;
        font-size: px2rem(14);
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
          font-size: px2rem(16);
        }
      }
      .ebook-popup-item-check {
        text-align: right;
        font-weight: bold;
        flex: 1;
        color: #346cb9;
        font-size: px2rem(16);
      }
    }
  }
}
</style>
