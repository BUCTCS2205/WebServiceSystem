import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw = {
  path: '/culturalTypes',
  component: () => import('@/layouts/index.vue'),
  redirect: '/culturalTypes/types1',
  name: 'culturalTypes',
  meta: {
    title: '文物类型管理',
    icon: 'ep:help-filled',
  },
  children: [
    {
      path: 'types1',
      name: 'types1',
      component: () => import('@/views/culturalTypes/types1.vue'),
      meta: {
        title: '类型管理',
      },
    },
  ],
}

export default routes
