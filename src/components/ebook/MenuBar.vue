<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper"
           v-show="menuVisible"
           :class="{'hide-box-shadow':settingVisible === 0 || !menuVisible}">
        <div class="icon-wrapper">
          <span class="icon-menu icon"
                @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon"
                @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon"
                @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <!-- 注意下这个icon-a -->
          <span class="icon-A icon"
                @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-fonts></ebook-setting-fonts>
    <ebook-setting-font-popup></ebook-setting-font-popup>

  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'

// 引入四个功能组件
import EbookSettingFonts from './EbookSettingFonts.vue'
import EbookSettingFontPopup from './EbookSettingFontPopup.vue'

// import { mapGetters } from 'vuex'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSettingFonts,
    EbookSettingFontPopup
  },
  data() {
    return {}
  },
  // computed: { ...mapGetters(['menuVisible']) },
  methods: {
    showSetting(key) {
      // console.log(key, this.settingVisible)
      this.setSettingVisible(key)
    },
    // 设置关闭,因为转换页面也得关闭
    hideSetting() {}
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global.scss';
.menu-bar {
  width: 100%;
  .menu-wrapper {
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ivory;
    width: 100%;
    height: px2rem(48);
    z-index: 101;
    // 阴影向上 水平/垂直/扩散
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    // 实现子组件均匀布局 lflex:1 就是子组件平分
    .icon-wrapper {
      flex: 1;
      @include center;
    }
  }
}
</style>
