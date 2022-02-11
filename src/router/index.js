import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ebook'
  },
  {
    path: '/ebook',
    // TODO: 这个写法是实现路由懒加载,只有需要时才动态导入组件
    // 注意路径配置很容易写错出现module unfounded 问题
    component: () => import('../views/ebook/index.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('../components/ebook/EbookReader.vue') //这里写错了
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
