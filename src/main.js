import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

// import axios from './axios/axiosinstance.js'
import axios from 'axios'

const app = createApp(App)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store).use(router).mount('#app')

app.config.globalProperties.$axios = axios
console.log(app.config.globalProperties.$axios);

