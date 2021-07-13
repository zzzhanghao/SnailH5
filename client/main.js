import App from './App.vue'
import router from './router'
import store from './store/index'


import Vue from 'vue'
import Element from 'element-ui'
import '@/common/styles/element-variables.scss'
// import '@/common/styles/index.scss' // 自定义 css
import 'animate.css'

Vue.use(Element)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
