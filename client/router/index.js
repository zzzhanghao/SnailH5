import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      //这种方式 是路由的懒加载
      component: () => import('@/pages/layout'),
      redirect: { name: 'Home' },
      children: [{
        path: 'home',
        name: 'Home',
        //@/pages/home/indexindex
        component: () => import('@/pages/home/index'),
        children: [
          {
            path: 'page-list',
            name: 'pageList',
            component: () => import('@/pages/home/page-list'),
          }, {
            path: 'my-template',
            name: 'myTemplate',
            component: () => import('@/pages/home/my-template'),
          }, {
            path: 'page-data',
            name: 'pageData',
            component: () => import('@/pages/home/page-data'),
          }, {
            path: 'page-data-detail',
            name: 'pageDataDetail',
            component: () => import('@/pages/home/page-data-detail'),
          }, {
            path: 'template-list',
            name: 'templateList',
            component: () => import('@/pages/home/template-list'),
          }
        ]


      }]

    }]

})