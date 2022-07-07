import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path:'/login',
    component:() => import('../views/Auth/LoginPage.vue')
  },

  {
    path:'/select_sales',
    component:() => import('../views/Sales/selectSale.vue')
  },

  {
    path:'/wholesales',
    component:() => import('../views/Sales/wholeSales.vue')
  },

  {
    path:'/retailsales',
    component:() => import('../views/Sales/retailSales.vue')
  },

  {
    path:'/customers',
    component:() => import('../views/Customer/customerView.vue'), 
  },

  {
    path:'/customers/invoices/:id',
    name: 'customer.detail',
    component:() => import('../views/Customer/customerDetail.vue'),
  },

  {
    path:'/history',
    component:() => import('../views/Sales/HistoryPage'),
  },

  {
    path:'/invoice-detail/:id',
    name: 'invoice.detail',
    component:() => import('../views/Sales/invoiceDetail.vue'),
  },

  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if( to.path !== '/login'){
    let auth = localStorage.getItem('token')
    if(auth){
      next();
    }

    else{
      next('/login')
    }
  }

  else{
    next();
  }
})



export default router
