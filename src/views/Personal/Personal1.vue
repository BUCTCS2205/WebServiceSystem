<template>
  <div class="root">
  <FaPageMain>
      <div class="avatar">
        <div class="text1">头像：</div>
        <el-avatar :size="50" :src="avatar"/>
      </div>
      <div class="username">
          <div class="text2"><span>用户名：</span></div>
          <div class="account">{{ account }}</div>
      </div>
      <div class="password">
        <div class="text3"><span>密码：</span></div>
        <div class="userKey">{{ password }}</div>
      </div>
      <div class="btn">
        <el-button type="primary" round @click="changePassword">修改密码</el-button>
        <el-button type="primary" round @click="userStore.requestLogout">切换账号</el-button>
      </div>
      <el-card v-show="showCard" class="changePassword">
        <template #header>
          <div class="card-header">
            <span>修改密码</span>
          </div>
        </template>
        <el-form
        ref="ruleFormRef"
        label-width="auto"
        style="max-width: 600px;"
        :model="passwordFrom"
        :rules="rules"
        >
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="passwordFrom.newPassword" ref="input_newpassword" @keyup="handleNewPassword"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="nextPassword">
            <el-input v-model="passwordFrom.nextPassword" ref="input_nextpassword" @keyup="handleNextPassword"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="confirm(ruleFormRef)">确认</el-button>
            <el-button type="primary" size="small" @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 近期浏览 -->
      <div class="recently" style="margin-top: 3vh;">
        <el-text tag="div" style="font-weight: 700; font-size: 20px; margin-bottom: 3vh;">浏览历史</el-text>
        <div class="main">
          <div class="item" v-for="recently in recentlyArr" :key="recently.id" @click="goDetail(recently)">
              <img :src="recently.url" class="img">
              <p class="description">{{ recently.description }}</p>
          </div>
        </div>
      </div>
  </FaPageMain>
</div>
</template>
<script lang="ts" setup name="Personal1">
import useUserStore from '@/store/modules/user';
import { ElMessage, type FormInstance,type FormRules } from 'element-plus'
import useCulturalRelicsStore from '@/store/modules/culturalRelics';
import { useRouter } from 'vue-router';
const router=useRouter();
const culturalRelicsStore=useCulturalRelicsStore();

/**
 * 跳转详情
 */
function goDetail(recently:any){
  router.push({
    path:'/Details',
    query:{...recently}
  })
}

//近期浏览
let recentlyArr =computed(()=>{
  return culturalRelicsStore.allData.slice(0,3);
})
// console.log('近期浏览',recentlyArr.value);
let input_newpassword=ref();
let input_nextpassword=ref();
function handleNewPassword($event:any){
    if($event.keyCode!=13){
      return;
    }
    input_nextpassword.value.focus();
}
function handleNextPassword($event:any){
  if($event.keyCode!=13){
    return;
  }
  // console.log('完成');
  confirm(ruleFormRef.value);
}
let ruleFormRef=ref<FormInstance>();
let userStore=useUserStore();
let avatar:string=userStore.avatar;
// console.log(userStore.account);
let account=userStore.account;
let password=userStore.password;
let showCard=ref(false);
let passwordFrom=reactive({
    newPassword: '',
    nextPassword: '',
})
function changePassword(){
  if(ruleFormRef.value){
    ruleFormRef.value.resetFields();
  }
  showCard.value=true;
}
function confirm(ruleFormRef:FormInstance | undefined){
  // console.log(ruleFormRef);
  (ruleFormRef as FormInstance).validate((val)=>{
    if(!val){

      return;
    }
    else{
      let data={
        newPassword:passwordFrom.newPassword
      }
      userStore.editPassword(data);
      ElMessage({
        message: '密码修改成功，请重新登录',
        type: 'success',
      });
      userStore.requestLogout();
    }
  })
  // showCard.value=false;
}
function cancel(){
  showCard.value=false;
  passwordFrom.newPassword="";
  passwordFrom.nextPassword="";
}
const validatePass = (rules:any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('输入不能为空'));
  }
  else{
    callback();
  }
}
const validatePass2 = (rules: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('输入不能为空'))
  } else if (value !== passwordFrom.newPassword) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}
const rules:any=reactive<FormRules<typeof passwordFrom>>({
  newPassword: [{ validator: validatePass, trigger: 'blur'}],
  nextPassword: [{ validator: validatePass2, trigger: 'change'}],
})
</script>
<style scoped>
.recently{
  .main{
    .item{
      display: flex;
      justify-content: space-around;
      border-bottom: 2px solid black;
    }
  }
}
  .avatar {
    display: flex;
    height: 50px;
    margin-bottom: 30px;

    .text1 {
      height: 50px;
      font-size: 16px;
      line-height: 50px;
    }
  }
  .username {
    display: flex;
    margin-bottom: 30px;
  }

  .password {
    display: flex;
    margin-bottom: 30px;
  }

  .root{
    position: relative;
    .changePassword {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    transform: translate(-50%, -50%);
  }
  }
</style>
