import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/styles/index.scss'
import { setupRouter } from './router'
import { setupDirective } from '@/plugins/directive'

const app = createApp(App)


async function setupApp() {
  setupDirective(app)
  await setupRouter(app)
  app.use(createPinia())
  app.mount('#app')
}


setupApp()
