import { createApp } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import '@/styles/index.scss'
import { setupRouter } from './router'


const app = createApp(App)


async function setupApp(){

  await setupRouter(app)
  app.use(createPinia())
  app.mount('#app')
}



setupApp()
