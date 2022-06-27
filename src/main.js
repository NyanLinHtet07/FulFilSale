import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './axios';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
//import './index.css'
import './index.css'
import MasterLayout from './components/MasterLayoutComponent.vue'


//for sweet alert
const options = {
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674',
      };

createApp(App)
        //.render( h => h(App))
        .use(store)
        .use(router)
        .use(VueSweetalert2, options)
        .component('master-layout', MasterLayout)
        .mount('#app')
