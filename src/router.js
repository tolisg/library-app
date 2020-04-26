import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/pageNotFound.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/login.vue';
import Register from '@/views/register.vue';
import { getToken, checkAuth } from '@/shared/authServices/auth';
import store from '@/store/index';
import { getStartingLocale, loadLanguageAsync } from '@/lang/i18n';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/managebooks',
      name: 'manageBooks',
      component: () => import(/* webpackChunkName: "bundle.books" */ './views/manageBooks.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/loanbook',
      name: 'loanBook',
      component: () => import(/* webpackChunkName: "bundle.books" */ './views/loanBook.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/returnbook',
      name: 'returnBook',
      component: () => import(/* webpackChunkName: "bundle.books" */ './views/returnBook.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createbook',
      name: 'createbook',
      component: () => import(/* webpackChunkName: "bundle.books" */ './views/createBook.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createuser',
      name: 'createuser',
      component: () => import(/* webpackChunkName: "bundle.users" */ './views/createUser.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/manageusers',
      name: 'manageUsers',
      component: () => import(/* webpackChunkName: "bundle.users" */ './views/manageUsers.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      component: PageNotFound,

    },
  ],
});
router.beforeEach((to, from, next) => {
  const protectedPage = to.meta.requiresAuth;
  const loggedIn = getToken();
  const user = checkAuth();
  const lang = getStartingLocale();
  loadLanguageAsync(lang);
  if (protectedPage && !loggedIn) {
    store.dispatch('logoutUserAction');
    return next('/login');
  }
  store.dispatch('checkLogin', user);
  next();
});

export default router;
