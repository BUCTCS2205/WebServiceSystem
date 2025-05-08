import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw = {
  path: '/Home',
  component: () => import('@/layouts/index.vue'),
  redirect: '/Home/homePage1',
  name: 'Home',
  meta: {
    title: '首页',
    icon: 'i-ep:home-filled',
  },
  children: [
    {
      path: 'homePage1',
      name: 'homePage1',
      component: () => import('@/views/Home/homePage1.vue'),
      meta: {
        title: '首页',
      },
    },
  ],
}

export default routes
