import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入路由实例

const app = createApp(App)

app.use(router) // 安装路由插件

app.mount('#app')