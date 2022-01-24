import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import { clientConfig } from './api/client'
import urql from '@urql/vue'

import './index.css'
const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).use(urql, clientConfig).mount('#app')
