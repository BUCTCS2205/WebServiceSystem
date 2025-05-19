import apiUser from '@/api/modules/user'
import router from '@/router'
import useMenuStore from './menu'
import useRouteStore from './route'
import useSettingsStore from './settings'
import useTabbarStore from './tabbar'
import useCulturalRelicsStore from './culturalRelics'
import { ElMessage } from 'element-plus'
const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const culturalRelicsStore=useCulturalRelicsStore();
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()
    const tabbarStore = useTabbarStore()
    const password=ref(localStorage.password ?? '');
    const account = ref(localStorage.account ?? '')
    // const token = ref(localStorage.token ?? '')
    const token=ref('');
    const avatar = ref(localStorage.avatar ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      if (token.value) {
        return true
      }
      return false
    })
    /**
     *
     * 用户注册
     */
    async function register(data:any) {
        // console.log('注册');
        await apiUser.register(data)
    }

    // 登录
    async function login(data: {
      account: string
      password: string
    }) {
      // console.log('点击登录');
      const res:any = await apiUser.login(data)
      // console.log('res',res);
      if(res.code==500){
        console.log('500');
        ElMessage({
          type: 'error',
          message: res.message,
        })
        return ;
      }
      password.value=data.password;
      localStorage.setItem('account', data.account);
      // localStorage.setItem('account',data.account);
      localStorage.setItem('token', 'token')
      // localStorage.setItem('token',nanoid())
      localStorage.setItem('avatar', 'https://fantastic-admin.hurui.me/logo.svg')
      // localStorage.setItem('avatar','https://fantastic-admin.hurui.me/logo.svg');
      localStorage.setItem('password',data.password);

      account.value = data.account
      token.value = 'token'
      avatar.value = 'https://fantastic-admin.hurui.me/logo.svg'
      culturalRelicsStore.getAllData();
    }

    // 手动登出
    function logout(redirect = router.currentRoute.value.fullPath) {
      // 此处仅清除计算属性 isLogin 中判断登录状态过期的变量，以保证在弹出登录窗口模式下页面展示依旧正常
      localStorage.removeItem('token')
      token.value = ''
      router.push({
        name: 'login',
        query: {
          ...(redirect !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      }).then(logoutCleanStatus)
    }
    // 请求登出
    function requestLogout() {
      // 此处仅清除计算属性 isLogin 中判断登录状态过期的变量，以保证在弹出登录窗口模式下页面展示依旧正常
      localStorage.removeItem('token')
      token.value = ''
      router.push({
        name: 'login',
        query: {
          ...(
            router.currentRoute.value.fullPath !== settingsStore.settings.home.fullPath
            && router.currentRoute.value.name !== 'login'
            && {
              redirect: router.currentRoute.value.fullPath,
            }
          ),
        },
      }).then(logoutCleanStatus)
    }
    // 登出后清除状态
    function logoutCleanStatus() {
      localStorage.removeItem('account')
      localStorage.removeItem('avatar')
      localStorage.removeItem('password');
      account.value = ''
      avatar.value = ''
      password.value=''
      permissions.value = []
      settingsStore.updateSettings({}, true)
      tabbarStore.clean()
      routeStore.removeRoutes()
      menuStore.setActived(0)
    }

    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
    }
    // 修改密码
    async function editPassword(data: {
      password?: string
      newPassword: string
    }) {
      // console.log("修改密码");
      // console.log(data.newPassword);
      await apiUser.passwordEdit(data)
    }

    return {
      account,
      password,
      token,
      avatar,
      permissions,
      isLogin,
      register,
      login,
      logout,
      requestLogout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
