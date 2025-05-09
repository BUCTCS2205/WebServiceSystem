<route lang="yaml">
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import useCulturalRelicsStore from '@/store/modules/culturalRelics';
import router from '@/router';
const culturalRelicsStore=useCulturalRelicsStore();
let recommmds=ref<any>([]);
for(let i=0;i<3;i++){
  recommmds.value.push(culturalRelicsStore.allData[i]);
}
const versionType = ref('basic')
watch(versionType, (val) => {
  if (val === 'pro') {
    location.href = `${location.origin}${location.pathname}`.replace('basic-example', 'pro-example')
  }
})
function open(url: string) {
  window.open(url, '_blank')
}
//点击图片跳转详情页
function gotoDetails(item:any){
  // console.log('跳转')
  router.push({
    path: '/Details',
    query: {...item}
  })
}
</script>

<template>
  <div>
    <FaPageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          欢迎使用海外文物知识服务子系统
        </div>
      </template>
      <template #description>
        <div class="text-sm/6">
          <div>
            这是一款<b class="text-emphasis">开箱即用</b>的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护
          </div>
          <div>
            注：在作者就职过的公司，本框架已在电商、直播、OA、ERP等多个不同领域的中后台系统中应用并稳定运行
          </div>
        </div>
      </template>
      <div class="flex gap-2">
        <!-- <FaButton variant="outline" @click="open('https://fantastic-admin.hurui.me')">
          <FaIcon name="i-ri:file-text-line" />
          开发文档
        </FaButton> -->
        <FaDropdown
          :items="[
            [
              { label: 'Github', icon: 'i-simple-icons:github', handle: () => open('https://github.com/fantastic-admin/basic') },
              { label: 'Gitee', icon: 'i-simple-icons:gitee', handle: () => open('https://gitee.com/fantastic-admin/basic') },
            ],
          ]"
        >
          <FaButton>
            <FaIcon name="i-ri:code-s-slash-line" />
            代码仓库
            <FaIcon name="i-ep:arrow-down" />
          </FaButton>
        </FaDropdown>
      </div>
    </FaPageHeader>
    <FaPageMain>
      <el-carousel :interval="2000" arrow="hover" height="450px">
        <el-carousel-item v-for="item in recommmds" :key="item.id" style="height: 500px;">
            <img :src="item.url" style="width: 100%; height: 100%;" @click="gotoDetails(item)">
        </el-carousel-item>
      </el-carousel>
    </FaPageMain>
  </div>
</template>

<style scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.title-info {
  --uno: flex items-center gap-4;

  img {
    --uno: block w-12 h-12;
  }

  h1 {
    --uno: m-0 text-2xl;
  }

  h2 {
    --uno: m-0 text-base text-secondary-foreground/50 font-normal;
  }
}

</style>
