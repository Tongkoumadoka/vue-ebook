import { mapGetters, mapActions } from 'vuex'

// 先引入ebook 中需要的mapgetters,让所有组件都只引用mixin
// 修改只在这一处修改,引用只需引用mixin
export const ebookMixin = {
  // 混入getters 实际就是states
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ])
  },
  // 混入actions
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ])
  }
}

// 流程
// 1.设置utils/mixin.js 文件
// 2.在mixin.js配置共用的组件属性
// 3.在需要时组件import mixin
// 4.将引入的mixin.js注册到 mixin:[暴露对象名]
// 5.vue会自动将这些属性和组件的属性混合到一起

// mixin 虽然减少了代码繁杂,但也存在无用混入,要根据实际情况使用
