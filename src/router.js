import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from '@/views/login.vue';
import Dashboard from '@/views/dashboard.vue';
import products from '@/views/dashboard/Products.vue';
import CustomerOrders from '@/views/dashboard/CustomerOrders.vue'
import Coupon from '@/views/dashboard/Coupon.vue';
import OrderList from '@/views/dashboard/OrderList.vue';
import orderCheckout from '@/views/dashboard/CustomerCheckout.vue';



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'*',
      redirect:'login',
    },
    {
      path:'/login',
      name:'login',
      component:login,
    },
    {
      path:'/dashboard',
      component:Dashboard,
      meta: { requiresAuth: true },
      children:[
        {
          path:'products',
          name:'products',
          component:products,
          meta: { requiresAuth: true },
        },
        {
          path:'customerOrders',
          name:'CustomerOrders',
          component:CustomerOrders,
        },
        {
          path:'coupon',
          name:'Coupon',
          component:Coupon,
          meta: { requiresAuth: true },
        },
        {
          path:'orderList',
          name:'orderList',
          component:OrderList,
          meta: { requiresAuth: true },
        },
        {
          path:'orderCheckout/:orderId',
          name:'orderCheckout',
          component:orderCheckout,
          meta: { requiresAuth: true },
        },
      ],
    }
  ]
})
