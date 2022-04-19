import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  title: '首页',
  component: () => import('../views/index.vue')
}];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router