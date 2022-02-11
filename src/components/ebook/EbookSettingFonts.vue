<template>
  <transition name="slide-up">
    <div class="setting-wrapper"
         v-show="menuVisible && settingVisible === 0">
      <!-- 字号设置组件 -->
      <div class="setting-font-size">
        <!-- 最小字号 -->
        <div class="preview"
             :style="{fontSize:fontSizeList[0].fontSize + 'px'}">A</div>
        <!-- 字号选择器 -->
        <div class="select">
          <div class="select-wrapper"
               v-for="(item ,index) in fontSizeList"
               :key="index"
               @click="setFontSize(item.fontSize)">
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point"
                   v-show="defaultFontSize===item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>

        <!-- 最大字号 -->
        <div class="preview"
             :style="{'font-size':fontSizeList[fontSizeList.length-1].fontSize + 'px'}">A</div>
      </div>
      <div class="setting-font-family"
           @click="showFontFamilyPopup">
        <!-- 点击面板会有弹出层,所以需要设置点击事件 -->
        <div class="setting-font-family-text-wrapper">
          <span class="setting-font-family-text">{{defaultFontFamily}}</span>
        </div>
        <div class="setting-font-family-icon-wrapper">
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { FONT_SIZE_LIST, FONT_FAMILY } from '../../utils/book'
import { getFontSize, saveFontSize } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST
    }
  },
  methods: {
    setFontSize(fontSize) {
      this.currentBook.rendition.themes.fontSize(fontSize)
      // 缓存
      saveFontSize(this.fileName, fontSize)
      this.setDefaultFontSize(fontSize)
    },
    showFontFamilyPopup() {
      // console.log(1) 测试生效与否
      this.setFontFamilyVisible(true)
    }
  },
  mounted() {
    // console.log(this.menuVisible, this.defaultFontSize, this.currentBook)
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global.scss';
.setting-wrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  width: 100%;
  height: px2rem(90);
  background-color: ivory;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-font-size {
    flex: 2;
    height: 100%;
    display: flex;
    .preview {
      flex: 0 0 px2rem(40);
      @include center;
    }
    // 因为要选择selectwrapper 所以还得加一个父级元素
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        // 隐藏第一条line
        &:first-child {
          // 选择第一个元素的line进行隐藏
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        // 隐藏最后一条line
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          // 固定宽度,但是自动伸缩,没有高度
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid #ccc;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: px2rem(7);
          border-left: px2rem(1) solid #ccc;
          // 绝对定位
          .point {
            position: absolute;
            top: px2rem(-6.5);
            left: px2rem(-10);
            width: px2rem(20);
            height: px2rem(20);
            border-radius: 50%;
            background: white;
            border: px2rem(1) solid #ccc;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
            @include center;
            .small-point {
              background-color: black;
              width: px2rem(5);
              height: px2rem(5);
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: px2rem(14);
    background: ivory;
    @include center;
    .setting-font-family-text-wrapper {
      @include center;
      .setting-font-family-text {
      }
    }
    .setting-font-family-icon-wrapper {
      @include center;
    }
  }
}
</style>
