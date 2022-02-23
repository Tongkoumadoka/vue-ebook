<template>
  <div class="ebook-reader">
    <div id="read">
      <!-- 展示电子书 -->
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
// import { mapActions } from 'vuex'
// import { mapGetters } from 'vuex'
import Epub from 'epubjs'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  saveTheme,
  getTheme
} from '../../utils/localStorage'
import { addCss } from '../../utils/book'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  data() {
    return {}
  },
  computed: {
    test() {
      return '测试数据'
    }
    // 获取filename,并混入
    // ...mapGetters(['fileName', 'menuVisible'])
    // 使用mixin混入,无需重复代码
  },
  methods: {
    // ...mapActions(['setMenuVisible', 'setFileName']),
    initEpub() {
      // 确定url
      const url =
        process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
      // 实例化epubjs来解析/渲染电子书
      this.book = new Epub(url)
      // 解析完成后传入book到vuex
      this.setCurrentBook(this.book)
      this.initRender()
      this.initGesture()
      this.initFontReject()
      // 当全部渲染完成后触发ready=>promise事件
      this.book.ready
        .then(() => {
          // 分页算法 :当前屏幕宽度和标准375宽比值 屏宽系数 当前字体尺寸和标准尺寸比值 字体系数 基数为750字符一页
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
        })
        .then((locations) => {
          // console.log(locations)
          // 分页完毕,true
          this.setBookAvailable(true)
        })
    },
    initRenition() {
      // 渲染 注意要绑定一个dom的id作为电子书渲染出口
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
    },
    initRender() {
      this.initRenition()
      this.rendition.display().then(() => {
        this.initFontSize()
        this.initFontFamily()
        this.initTheme()
        // this.initGlobalStyle()
      })
    },
    initFontSize() {
      // @缓存fontsize
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        // 不能获取到则缓存默认设置
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        // 能获取到则设置为该属性
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily() {
      //  @缓存fontfamily
      let font = getFontFamily(this.fileName)
      if (!font) {
        // 不能获取到则缓存默认设置
        saveFontFamily(this.fileName, 'Default')
      } else {
        // 能获取到则设置为该属性
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    // 注册主题
    initTheme() {
      // 缓存设置
      let defaultTheme = getTheme(this.fileName)
      console.log(defaultTheme)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        this.setDefaultTheme(defaultTheme)
        saveTheme(this.fileName, defaultTheme)
      }
      this.themeList.forEach((theme) => {
        // 注册名称和对应style
        this.rendition.themes.register(theme.name, theme.style)
      })
      // 选择默认样式
      this.rendition.themes.select(defaultTheme)
    },
    // 初始化全局样式
    // initGlobalStyle() {
    //   switch (this.defaultTheme) {
    //     case 'Default':
    //       addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
    //       break
    //     case 'Eye':
    //       addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
    //       break
    //     case 'Gold':
    //       addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
    //       break
    //     case 'Night':
    //       addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
    //       break
    //     default:
    //       addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
    //       break
    //   }
    // },
    initGesture() {
      // @实现手势翻页
      // 移动端的touch事件处理
      this.rendition.on('touchstart', (e) => {
        // 将触碰屏幕的手指X坐标位置数据取第一个
        this.touchStartX = e.changedTouches[0].clientX
        // 设置触碰的开始时间
        this.touchStartTime = e.timeStamp
        // console.log(e)
      })
      this.rendition.on('touchend', (e) => {
        // 用离开时手指位置减去开始的,得到X轴偏移量,就可以判断滑动方向
        // 用离开时的时间戳减去开始的,得到偏移执行时间
        const offsetX = e.changedTouches[0].clientX - this.touchStartX
        const time = e.timeStamp - this.touchStartTime

        console.log(offsetX, time) //测试是否取到值

        // 设置翻页逻辑 时间小于500ms 偏移量大于40
        if (offsetX > 40 && time < 500) {
          this.prevPage()
        } else if (offsetX < -40 && time < 500) {
          this.nextPage()
        } else {
          // 都不满足则显示菜单栏
          this.toggleTitleAndMenu()
        }
        // 禁止默认行为
        e.preventDefault()
        // 禁止事件传播
        e.stopPropagation()
      })
    },
    // 字体注入
    initFontReject() {
      // 修改字体
      this.rendition.hooks.content.register((contents) => {
        // 手动添加样式文件 需要url,将其放入静态资源服务器中
        // addStylesheet 返回promise对象
        // process.env引用环境变量
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          )
        ]).then((res) => {
          // 字体全部加载完成后进行某些操作=>缓存
          console.log('字体加载完毕')
        })
        // contents.addStylesheet('http://127.0.0.1:8081/fonts/daysOne.css')
        // contents.addStylesheet('http://127.0.0.1:8081/fonts/cabin.css')
        // contents.addStylesheet('http://127.0.0.1:8081/fonts/montserrat.css')
        // contents.addStylesheet('http://127.0.0.1:8081/fonts/tangerine.css')
      })
    },
    // 翻页
    prevPage() {
      //判断rendition对象是否存在,存在就调用prev()方法 => epubjs的
      if (this.rendition) {
        this.hideTitleAndMenu()
        this.rendition.prev()
        // 翻页隐藏菜单栏
      }
    },
    // 翻页后
    nextPage() {
      // 同理判断
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    // 短点击屏幕则显示/隐藏标签栏
    toggleTitleAndMenu() {
      // console.log('点击') 测试有效
      // 实现: 调用时对menuVisible取反
      // this.$store.dispatch('setMenuVisible', !this.menuVisible)
      // console.log(this.menuVisible) 需要映射才能这么写
      this.setMenuVisible(!this.menuVisible)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
      // 判断menu中显示的setting是否隐藏,没有则隐藏
    }
    // 直接隐藏的控制-->抽象到mixins中
    // hideTitleAndMenu() {
    //   this.setMenuVisible(false)
    //   this.setSettingVisible(-1)
    //   this.setFontFamilyVisible(false)
    // }
  },
  mounted() {
    // 电子书路径名称为 History|电子书名
    const fileName = this.$route.params.fileName.split('|').join('/')
    // 设置nginx 服务器路径,并使用这个路径下载电子书
    this.setFileName(fileName).then(() => {
      this.initEpub()
      console.log(this.test)
    })
  }
}

// 实现动态路由接收
</script>

<style scoped>
</style>

