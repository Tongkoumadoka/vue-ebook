# vue-imooc-ebook

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

// vue.config.js 进行 build 文件的配置

// 项目技术难度
// 1.阅读器全文搜索,定位

// 2.web 字体设置

// 3.主题的统一设置,高效管理

// 4.分页算法

// 5.离线存储机制 localstorage 的存储量 5m,太小了
所以 还需要 indexedDB 技术

// 6.复杂手势+交互动画

// 7.vuex+mxin 组件解耦复用,进行代码精简

// 8.在线语音的 Api 开发 科大讯飞

<!-- 一.项目准备 -->

1.字体图标

<!-- 注意导入svg文件到iconmoon时,必须前缀没有. -->

在 main.js 引入 icon.css 样式
可以引入后使用任意图标测试是否成功引入
<span class="icon-bookmark"></span>
https://www.cnblogs.com/chaoyueqi/p/10114313.html

限制只在一个组件生效,则在 style scoped 中使用

<style scoped>
.icon-bookmark {
  font-size: 30px;
  color: aquamarine;
}
</style>

2.项目依赖包下载,配置
下载 sass 和 sass 解析器
npm i -D node-sass sass-loader

3.准备 web 字体进行切换
css-3 的新特性
拷贝字体文字放置到 public/fonts 文件夹中,注意区分和 src 中 fonts 文件

测试字体的引入是否生效:比较发现字体确实出现了变化
直接放入 index.html head 中 link
<template>

  <div id="app">
    <span class="text">ABCDEFG</span>
    <span>ABCDEFG</span>
    <router-view />
  </div>
</template>

<style scoped>
.text {
  font-family: 'Days One'; //字体名称在font文件对应字体family设置中看
  
}
</style>

// 引入字体 import 在 main.js 中
4.viewport 配置 浏览器缩放

5.rem 设置 自适应布局

创建一个 rem.js 引入 main.js
(function(){
//用此匿名函数来修改字体大小（根据手机设备大小进行修改
function resize(){
var baseFontSize=100; //设计稿 100 像素相当于 1rem,750px--7.5rem---各种屏幕的 100%的宽度
var designWidth=750;//设计稿的宽度
var width=window.innerWidth//获取屏幕的宽度
var currentFontSize=(width/designWidth)\*baseFontSize;
document.querySelector('html').style.fontSize=currentFontSize+'px';

    }



    window.onresize=function(){
        resize()
    }
    // 当文档载入时监听修改文字大小
    document.addEventListener('DOMContentLoaded',resize)

}())

6.global.scss reset.scss 全局和默认样式文件
https://www.jb51.net/article/222847.htm
sass sass -loader node 版本必须对应
配置 scss px2rem() 函数

7.引入 vuex 8.搭建静态资源服务器
nginx 安装 配置文件 常见问题处理

<!-- 阅读器的开发 -->

vuex+mixin
vue i18n 国际化

<!-- vue-3.0 -->

路径别名@ 已经配置好了
它表示 项目根路径/src
表示方法还是绝对路径
