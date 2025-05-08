import api from '../index'

export default {
  //测试
  demo: ()=>api.get('/user'),
  // 登录
  login: (data: {
    account: string
    password: string
  }) => api.post('/user/login', data, {
    baseURL: '/mock/',
  }),

  // 获取权限
  permission: () => api.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password?: string
    newPassword: string
  }) => api.post('user/password/edit', data, {
    baseURL: '/mock/',
  }),
}
