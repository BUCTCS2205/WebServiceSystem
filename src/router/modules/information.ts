import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw = {
  path: '/Information',
  component: () => import('@/layouts/index.vue'),
  redirect: '/Information/informationPage1',
  name: 'Information',
  meta: {
    title: '文物信息管理',
    icon: 'ep:document',
  },
  children: [
    {
      path: 'informationPage1',
      name: 'informationPage1',
      component: () => import('@/views/information/informationPage1.vue'),
      meta: {
        title: '信息管理',
      },
    },
  ],
}

export default routes
