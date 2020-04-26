// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import router from './router';
import Router from 'vue-router';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';
import global_ from './global.vue';
import VueCropper from 'cropper';
Vue.use(VueCropper);
/* eslint-disable */
Vue.use(ElementUI);
Vue.use(VueResource)
Vue.use(Router);
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  global_.token=localStorage.token;
  if (global_.token == null) {
    if (to.path === '/login' || to.path === '/register') {
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    next();
  }
});
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
