import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw = {
  path: '/Visualization',
  component: () => import('@/layouts/index.vue'),
  redirect: '/Visualization/visualization1',
  name: 'Visualization',
  meta: {
    title: '数据可视化',
    icon: 'ep:histogram',
  },
  children: [
    {
      path: 'visualization1',
      name: 'visualization',
      component: () => import('@/views/visualization/visualization1.vue'),
      meta: {
        title: '数据可视化',
      },
    },
  ],
}

export default routes
