import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import './bus';
import currencyFilter from './filters/currency'
import VeeValidate from 'vee-validate';
import dateFormat from './filters/dateFormat';



Vue.use(VeeValidate);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('dateFormat',dateFormat);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then(res => {
      if(res.data.success){
        next();
      }else{
        next({
          path:'/login',
        })
      }
    });
  }else{
    next();
  }
  
});