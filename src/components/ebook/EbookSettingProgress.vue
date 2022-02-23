<template>
  <transition name="slide-up">
    <div class="setting-wrapper"
         v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <!-- 统计阅读总时长 -->
        <div class="read-time-wrapper">
          <span class="read-time-text">{{'getReadTimeText()+10分钟'}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper"
               @click="prevSection()">
            <span class="icon-back"></span>
          </div>
          <!-- 进度条 -->
          <input class="progress"
                 type="range"
                 max="100"
                 min="0"
                 step="1"
                 @change="onProgressChange($event.target.value)"
                 @input="onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
          <div class="progress-icon-wrapper"
               @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <!-- 显示阅读进度条和加载 -->
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'

export default {
  mixins: [ebookMixin],
  computed: {
    getSectionName() {
      if (this.section) {
        // 获取当前section
        const sectionInfo = this.currentBook.section(this.section)
        // 判断是否存在
        if (sectionInfo && sectionInfo.href) {
          // 获取对应章节的目录
          console.log(this.currentBook.navigation.get(sectionInfo.href))
          return this.currentBook.navigation.get(sectionInfo.href).label
        }
      }
      return ''
    }
  },
  methods: {
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        // 获取定位后,展示当前进度所在页面
        this.displayProgress()
        this.updateProgressBg()
      })
    },
    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.updateProgressBg()
      })
    },
    displayProgress() {
      // 获取当前页面对应cfi 也就是当前百分比页
      const cfi = this.currentBook.locations.cfiFromPercentage(
        this.progress / 100
      )
      // console.log(cfi)
      // 展示当前页
      this.currentBook.rendition.display(cfi)
      // this.display(cfi)
    },

    // 实时更新进度条背景色比例
    updateProgressBg() {
      // 通过获取dom来直接修改
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    prevSection() {
      // 返回上一章必须判断章节
      if (this.section > 0 && this.bookAvailable) {
        // 返回上一章后重新展示
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      }
    },
    nextSection() {
      console.log(this.currentBook.spine)
      // 判断章节数必须小于最大值而且设置栏必须显示
      if (
        this.section < this.currentBook.spine.length - 1 &&
        this.bookAvailable
      ) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    },
    // 展示章节
    displaySection() {
      //
      const sectionInfo = this.currentBook.section(this.section)
      if (sectionInfo && sectionInfo.href) {
        this.currentBook.rendition.display(sectionInfo.href).then(() => {
          this.refreshLocation()
        })
      }
    },
    // 进度跟随章节跳转
    refreshLocation() {
      // 获取当前百分比
      const currentLocation = this.currentBook.rendition.currentLocation()
      console.log(currentLocation)
      // 获取本章开始位置的cfi 输入 cfi => 百分比
      const progress = this.currentBook.locations.percentageFromCfi(
        currentLocation.start.cfi
      )
      console.log(progress)
      // 整数化
      this.setProgress(Math.floor(progress * 100))
    }
  },
  updated() {
    this.updateProgressBg()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';

.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 160;
  width: 100%;
  height: px2rem(90);
  background: ivory;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(40);
      font-size: px2rem(12);
      @include center;
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .progress-icon-wrapper {
        font-size: px2rem(20);
      }
      .progress {
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        margin: 0 px2rem(10);
        background: -webkit-linear-gradient(#059cfa, #059cfa) no-repeat;
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          // 清除默认样式
          -webkit-appearance: none;
          // 设置圆滑块
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #ddd;
        }
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(10);
      width: 100%;
      color: #333;
      font-size: px2rem(12);
      padding: 0 px2rem(15);
      box-sizing: border-box;
      @include center;
      .progress-section-text {
        @include ellipsis;
      }
    }
  }
}
</style>
