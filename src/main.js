import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
Mock.bootstrap(VueResource);
import 'font-awesome/css/font-awesome.min.css'

import  './styles/vars.scss'



import vueDragDrag from 'vue-dragdrag'
Vue.use(vueDragDrag)
import addressPicker from 'vue-address-picker'
Vue.use(addressPicker)



Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

// 每一次当token到期之后跳转到login页面   TODO
Vue.http.interceptors.push((request, next) => {
    //console.log(this)//此处this为请求所在页面的Vue实例
    // modify request
    //request.method = 'POST';//在请求之前可以进行一些预处理和配置

    // continue to next interceptor

    next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
        if( response.data.code == "010004" || response.data.code == "010007" ){

//          location.href ="login#/login";
			vm.$router.push({name: '登录页面'});
		
        }else{
            return response;
        }
    });
});


NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

 router.beforeEach((to, from, next) => {
  NProgress.start();
 if (to.path == '/login') {
     sessionStorage.removeItem('userInfo');
  }
  let user = JSON.parse(sessionStorage.getItem('userInfo'));
  if (!user && to.path != '/login' ) {
    next({ path: '/login' })
  } else {
    next();
  }
})

router.afterEach(transition => {
NProgress.done();
});

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

