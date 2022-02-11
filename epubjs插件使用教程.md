1.引入
// npm i epubjs@0.3.71 -S 安装在生产模式

2.设置 epub 对象为全局属性
import Epub from 'epubjs'
// 定义全局的 epub 属性
global.ePub = Epub

3.引入的 Epub 是一个构造函数,可以创建 epub 实例对象
