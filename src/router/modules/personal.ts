import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw = {
  path: '/Personal',
  component: () => import('@/layouts/index.vue'),
  redirect: '/Personal/personal1',
  name: 'Psrsonal',
  meta: {
    title: '个人中心',
    icon: 'ep:avatar',
  },
  children: [
    {
      path: 'personal1',
      name: 'personal1',
      component: () => import('@/views/Personal/Personal1.vue'),
      meta: {
        title: '个人中心',
      },
    },
  ],
}

export default routes
