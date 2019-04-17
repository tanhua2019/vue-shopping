import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/mall"
    },
    {
      path: '/login',
      name: 'MallLogin',
      component: () => import('@/pages/client/MallLogin')
    },
    {
      path: '/mall',
      name: 'Mall',
      component: () => import('@/pages/client/Mall'),
      redirect: '/mall/show/index',
      children: [
        {
          path: '/mall/show/index',
          name: 'MallIndex',
          component: () => import('@/pages/client/MallIndex')
        },
        {
          path: '/mall/show/goodsList/:typeId/:keyword',
          name: 'GoodsList',
          component: () => import('@/pages/client/GoodsList')
        },
        {
          path: 'goods/:id',
          name: 'GoodsDetail',
          component: () => import('@/pages/client/GoodsDetail')
        },
        {
          path: 'personal',
          name: 'Personal',
          component: () => import('@/pages/client/Personal'),
          redirect: '/mall/personal/cart',
          children: [
            {
              path: 'cart',
              name: 'Cart',
              component: () => import('@/pages/client/Cart'),
              meta: {
                requireLogin: true,
              },
            },
            {
              path: 'myData',
              name: 'MyData',
              component: () => import('@/pages/client/MyData'),
              meta: {
                requireLogin: true,
              },
            },
            {
              path: 'myOrder',
              name: 'MyOrder',
              component: () => import('@/pages/client/MyOrder'),
              meta: {
                requireLogin: true,
              },
            }
          ]
        }
      ]
    },
    {
      path: '*',
      name: 'ErrorPage',
      component: () => import('@/pages/ErrorPage')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

//登录拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {  //判断该路由是否需要登陆权限
    if (store.state.clientToken) { //通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

export default router;
