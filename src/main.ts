import { createApp } from 'vue'
import { store, playerKey } from './store'
import App from './App.vue'

const app = createApp(App)
app.use(store, playerKey)
app.mount('#app')
