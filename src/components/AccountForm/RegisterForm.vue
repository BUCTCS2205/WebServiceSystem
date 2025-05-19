<script setup lang="ts">
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/shadcn/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { ElMessage } from 'element-plus';
import { useForm } from 'vee-validate'
import useUserStore from '@/store/modules/user';
import * as z from 'zod'
const userStore=useUserStore();
defineOptions({
  name: 'RegisterForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account?: string]
  onRegister: [account?: string]
  onResetPassword: [account?: string]
}>()

const loading = ref(false)

let myForm=ref({
  username: '',
  password: '',
  checkPassword: '',
})
const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      account: z.string().min(1, '请输入用户名'),
      captcha: z.string().min(6, '请输入验证码'),
      password: z.string().min(1, '请输入密码').min(6, '密码长度为6到18位').max(18, '密码长度为6到18位'),
      checkPassword: z.string().min(1, '请再次输入密码'),
    }).refine(data => data.password === data.checkPassword, {
      message: '两次输入的密码不一致',
      path: ['checkPassword'],
    }),
  ),
  initialValues: {
    account: props.account ?? '',
    captcha: '',
    password: '',
    checkPassword: '',
  },
})
const onSubmit = form.handleSubmit((values) => {
  console.log("点击注册");
  loading.value = true
  emits('onRegister', values.account)
})
/**
 * 注册按钮
 */
function register(){
  if(myForm.value.checkPassword!==myForm.value.password){
    return;
  }
  let registerData={
    account: myForm.value.username,
    password: myForm.value.password
  }
  userStore.register(registerData);
  let count=3;

  ElMessage({
    type: 'success',
    message: `注册成功，请前往登录,${count}秒后自动跳转`,
    duration: 3000,
    customClass: 'dynamic-message' // 添加自定义类名
  })
  let timer1=setInterval(()=>{
    count--;
    if(count==0){
      clearInterval(timer1);
    }
    else{
      const messageContent = document.querySelector('.dynamic-message .el-message__content');
      if(messageContent){
        messageContent.textContent=`注册成功，请前往登录,${count}秒后自动跳转`;
      }
    }
},1000)
  let timer2=setTimeout(()=>{
    emits('onRegister',myForm.value.username);
    clearTimeout(timer2);
  },3000)

}
</script>

<template>
  <div class="min-h-500px w-full flex-col-stretch-center p-12">
    <form @submit="onSubmit">
      <div class="mb-8 space-y-2">
        <h3 class="text-4xl color-[var(--el-text-color-primary)] font-bold">
          探索从这里开始 🚀
        </h3>
        <p class="text-sm text-muted-foreground lg:text-base">
          演示系统注册功能
        </p>
      </div>
      <FormField v-slot="{  errors }" name="account">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <FaInput v-model="myForm.username" type="text" placeholder="请输入用户名" class="w-full" :class="errors.length && 'border-destructive'"  />
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, value, errors }" name="password">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <FaInput v-model="myForm.password" type="password" placeholder="请输入密码" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            <FaPasswordStrength :password="value" class="mt-2" />
          </FormDescription>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, errors }" name="checkPassword">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <FaInput v-model="myForm.checkPassword" type="password" placeholder="请再次输入密码" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <FaButton @click="register" :loading="loading" size="lg" class="mt-4 w-full" type="submit">
        注册
      </FaButton>
      <div class="mt-4 flex-center gap-2 text-sm">
        <span class="text-secondary-foreground op-50">已经有帐号?</span>
        <FaButton variant="link" class="h-auto p-0" @click="emits('onLogin', form.values.account)">
          去登录
        </FaButton>
      </div>
    </form>
  </div>
</template>
