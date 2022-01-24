import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
