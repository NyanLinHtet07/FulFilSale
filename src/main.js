import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './axios';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//import VueHtmlToPaper from 'vue-html-to-paper';
// const o = {
//         name: '_blank',
//         specs: [
//           'fullscreen=yes',
//           'titlebar=yes',
//           'scrollbars=yes'
//         ],
//         styles: [
//                 './index.css'
//         ]
//       }




//import './index.css'
import './index.css'
import MasterLayout from './components/MasterLayoutComponent.vue'

import Vue3Geolocation from 'vue3-geolocation';

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
        .use(Vue3Geolocation)
        .component('master-layout', MasterLayout)
        .mount('#app')
