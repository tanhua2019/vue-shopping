import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/admin/Login')
    },
    {
      path: '/backHome',
      name: 'BackHome',
      component: () => import('@/pages/admin/backHome'),
      redirect: "/backHome/editUser",
      children: [
        {
          path: 'editUser',
          name: 'EditUser',
          component: () => import('@/pages/admin/EditUser'),
          meta: {
            requireLogin: true,
          },
        },
        {
          path: 'editAdmin',
          name: 'EditAdmin',
          component: () => import('@/pages/admin/EditAdmin'),
          meta: {
            requireLogin: true,
          },
        },
        {
          path: 'goods',
          name: 'Goods',
          component: () => import('@/pages/admin/Goods'),
          meta: {
            requireLogin: true,
          },
        },
        {
          path: 'goods/:id',
          name: 'EditGoods',
          component: () => import('@/pages/admin/EditGoods'),
          meta: {
            requireLogin: true,
          },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('@/pages/admin/Orders'),
          meta: {
            requireLogin: true,
          },
        },
        {
          path: 'messages',
          name: 'Messages',
          component: () => import('@/pages/admin/Messages'),
          meta: {
            requireLogin: true,
          },
        }
      ]
    },
    {
      path: '*',
      name: 'Error',
      component: () => import('@/pages/Error')
    }
  ],
});

//登录拦截() => import('@/pages/admin/')
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    if (store.state.adminToken) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
});

export default router;
