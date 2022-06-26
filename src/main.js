import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//import './index.css'
import './index.css'
import MasterLayout from './components/MasterLayoutComponent.vue'

createApp(App)
        //.render( h => h(App))
        .use(store)
        .use(router)
        .component('master-layout', MasterLayout)
        .mount('#app')
