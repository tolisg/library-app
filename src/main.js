import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import { i18n } from './lang/i18n';

Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    invalid: 'is-invalid',
  },
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
