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
          <div class="form-value">{{ route.query.name }}</div>
        </el-form-item>
        <el-form-item label="类型">
          <el-tag effect="dark" type="info">{{ route.query.type }}</el-tag>
        </el-form-item>
      </el-col>

      <!-- 右侧图片列 -->
      <el-col :xs="24" :sm="12">
        <el-form-item label="图片">
          <div class="image-wrapper">
            <el-image
              :src="(route.query.url as string)"
              fit="cover"
              :preview-src-list="[(route.query.url as string)]"
              class="preview-image"
            />
          </div>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 描述区块 -->
    <el-form-item label="详细描述">
      <div class="description-box">
        {{ route.query.describe || '-' }}
      </div>
    </el-form-item>
  </el-form>
</FaPageMain>
</template>

<script setup lang='ts' name="Details">
import router from '@/router';
import { useRoute } from 'vue-router';
//获取路由参数
let route=useRoute();
// console.log(route.query);
function goBack(){
  router.back();
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

/* 响应式优化 */
@media (max-width: 768px) {
  .form-container {
    padding: 12px;
  }

  .el-form-item {
    margin-bottom: 18px !important;
  }
}
</style>
