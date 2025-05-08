import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw = {
  path: '/photoWall',
  component: () => import('@/layouts/index.vue'),
  redirect: '/photoWall/wallPage1',
  name: 'photoWall',
  meta: {
    title: '藏品墙',
    icon: 'ep:grid',
  },
  children: [
    {
      path: 'wallPage1',
      name: 'wallPage11',
      component: ()=>import('@/views/photoWall/wallPage1.vue'),
      meta: {
        title: '藏品墙',
      },
    },
  ],
}

export default routes
