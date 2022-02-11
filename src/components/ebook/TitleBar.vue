<template>
  <transition name="slide-down">
    <div class="read-wrapper"
         v-show="menuVisible">
      <div class="left">
        <div class="icon-back icon"
             @click="backPage"></div>
      </div>
      <div class="right">
        <div class="icon-wrapper ">
          <div class="icon-shelf icon"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-cart icon"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-more icon"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 实现点击屏幕=>标题菜单栏显示/隐藏 + 动画效果
// 因为把menuVisible设置到了vuex,所以使用时需要映射 注意是vuex
// import { mapGetters } from 'vuex'
import { ebookMixin } from '../../utils/mixin'

export default {
  mixins: [ebookMixin],
  data() {
    return {}
  },
  // computed: {
  //   ...mapGetters(['menuVisible'])
  // },
  methods: {
    // 实现<按钮回退功能
    backPage() {
      console.log('back')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global.scss';
.read-wrapper {
  display: flex;
  // justify-content: space-between;
  // align-items: center;
  position: absolute;
  width: 100%;
  height: px2rem(60);
  background: ivory;
  top: 0px;
  left: 0px;

  // 一定要设置z轴,绝对块才放在文件流上面
  z-index: 101;
  // 阴影
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  .left {
    @include center;
    flex: 0 0 px2rem(60);
  }
  .right {
    display: flex;
    flex: 1;
    justify-content: flex-end;

    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
    }
  }
}
</style>
