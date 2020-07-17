import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import App from './App.vue'
import 'bulma/bulma.sass'
import 'highlight.js/styles/tomorrow.css'
import './index.css'

import Paste from "./components/Paste.vue";
import Show from "./components/Show.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Paste
    },
    {
      name: 'show',
      path: '/p/:id',
      component: Show
    }
  ]
})

createApp(App)
  .use(router)
  .mount('#app')
