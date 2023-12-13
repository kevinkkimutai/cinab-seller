// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'


// const app = createApp(App)

// app.use(router)

// app.mount('#app')
import './assets/main.css'

import { createApp } from 'vue'



import App from './App.vue'
import router from './router'
import './axios.js'
import './index.css'
import store from './vuex'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')