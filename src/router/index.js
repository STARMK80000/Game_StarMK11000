import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue' // 假设你有一个 Home 组件
import About from '../views/About.vue' // 假设你有一个 About 组件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
  // 你可以在这里添加更多路由
]

const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes
})

export default router