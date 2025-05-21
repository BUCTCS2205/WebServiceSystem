<template>
  <FaPageHeader>
    <FaButton @click="goBack">返回</FaButton>
  </FaPageHeader>
  <FaPageMain class="form-container">
  <el-form
    :model="route.query"
    label-position="top"
    class="detail-form"
  >
    <el-row :gutter="20">
      <!-- 左侧信息列 -->
      <el-col :xs="24" :sm="12">
        <el-form-item label="名称" class="form-item__label-bold">
          <div class="form-value">{{ showItem.title }}</div>
        </el-form-item>
        <el-form-item label="类型">
          <el-tag effect="dark" type="info">{{ showItem.material }}</el-tag>
        </el-form-item>
      </el-col>

      <!-- 右侧图片列 -->
      <el-col :xs="24" :sm="12">
        <el-form-item label="图片">
          <div class="image-wrapper">
            <el-image
              :src="(showItem.url as string)"
              fit="cover"
              :preview-src-list="[(showItem.url as string)]"
              class="preview-image"
            />
          </div>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 描述区块 -->
    <el-form-item label="详细描述">
      <div class="description-box">
        {{ showItem.description || '-' }}
      </div>
    </el-form-item>
  </el-form>
  <!-- 相似推荐 -->
  <hr>
  <div class="recommd">
    <el-card class="demo-image">
      <template #header>
        <div class="card-header">
          <span>相似推荐</span>
        </div>
      </template>
    <div v-for="item in recommdArr" :key="item.id" class="block">
      <el-image style="width: 100px; height: 100px" :src="item.url" fit="fill" @click="goDetail(item)"/>
    </div>
  </el-card>
  </div>
  </FaPageMain>
</template>

<script setup lang='ts' name="Details">
import router from '@/router';
import { useRoute } from 'vue-router';
import useCulturalRelicsStore from '@/store/modules/culturalRelics';
const culturalRelicsStore=useCulturalRelicsStore()//获取全部数据
//获取路由参数
let route=useRoute();
// console.log('路由数据',route.query);
//展示的数据，第一次从路由参数获取
let showItem=ref({
  title: '',
  material: '',
  url: '',
  description: '',
})
showItem.value={
  title: route.query.title as string,
  material: route.query.material as string,
  url: route.query.url as string,
  description: route.query.description as string,
}

//按类型过滤出推荐数组
let recommdArr=computed(()=>{
  // console.log('测试推荐');
  return culturalRelicsStore.allData.filter((item)=>{
    if(item.material.includes((showItem.value.material as string))){
      return true
    }
    return false
  });
})

// console.log(recommdArr.value);
/**
 * 回退
 */
function goBack(){
  router.back();
}
/**
 * 点击推荐刷新页面，更新数据,回到顶部
 */
function goDetail(item:any){
  showItem.value={
    title: item.title,
    material: item.material,
    url: item.url,
    description: item.description
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动
  });
}
</script>

<style scoped>
/* 容器级样式 */
.form-container {
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

/* 表单项标签 */
:deep(.el-form-item__label) {
  font-size: 14px;
  color: #64748b !important;
  letter-spacing: 0.5px;
  margin-bottom: 8px !important;
}

.form-item__label-bold :deep(.el-form-item__label) {
  font-weight: 600;
  color: #475569 !important;
}

/* 内容展示区 */
.form-value {
  font-size: 15px;
  color: #334155;
  padding: 8px 12px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

/* 图片容器 */
.image-wrapper {
  border: 2px solid #f1f5f9;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.preview-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: zoom-in;
}

/* 描述区块 */
.description-box {
  background: white;
  padding: 16px;
  line-height: 1.6;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  min-height: 100px;
  white-space: pre-wrap;
}
/* 推荐区块 */
.recommd{
  margin-top: 30px;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .form-container {
    padding: 12px;
  }

  .el-form-item {
    margin-bottom: 18px !important;
  }
}
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
