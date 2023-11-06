import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from '@/stores'
import './permission'
import router from './router/index'

// unocss
import 'virtual:uno.css'

import 'element-plus/theme-chalk/el-alert.css';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
