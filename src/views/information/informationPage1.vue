<template>
  <div class="root">
    <!-- 主体 -->
  <FaPageMain>
    <!-- 顶部功能区 -->
    <div class="func">
      <FaButton class="btn1" @click="add">添加文物</FaButton>
      <div class="search">
        <el-input class="myInput" v-model="searchForm.title" placeholder="请输入标题" />
        <el-input class="myInput" v-model="searchForm.age" placeholder="请输入年份" />
        <el-input class="myInput" v-model="searchForm.material" placeholder="请输入材质" />
        <FaButton class="btn2" @click="handleSerch">条件查询</FaButton>
      </div>
    </div>
    <!-- 内容表格区 -->
    <el-table :data="showData" border style="width: 100%; margin-bottom: 30px">
      <el-table-column prop="title" label="标题" width="100" />
      <el-table-column prop="age" label="年份" width="100"></el-table-column>
      <el-table-column label="图片" width="150" >
        <template #default="scope">
          <el-image :src="scope.row.url" style="width: 100px;
          height: 100px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="material" label="材质"  width="150"/>
      <el-table-column prop="description" label="描述" class="describe"></el-table-column>
      <el-table-column label="操作" width="250" class="handle">
        <template #default="scope">
          <el-button size="small" type="success" @click="details(scope.row)">详情</el-button>
          <el-button size="small" type="warning" @click="changes(scope.row)">修改</el-button>
          <el-popconfirm title="确定删除吗">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background=true
      layout="prev, pager, next, jumper, sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </FaPageMain>

  <!-- 修改卡片 -->
  <el-card v-show="changeCard" class="changeCard">
    <template #header>
        <span>修改</span>
    </template>
    <el-form :model="changeItem">
      <el-form-item label="名称">
        <el-input v-model="changeItem.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="image-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          accept=".png,.jpg"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="changeItem.type"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="changeItem.describe" type="textarea" :rows="2" style="width: 240px;"></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <el-button @click="changeConfirm" type="primary">确定</el-button>
      <el-button @click="closeChangeCard" >取消</el-button>
    </template>
  </el-card>
  <!-- 添加卡片 -->
  <el-card v-show="showAddCard" class="addCard">
    <template #header>
        <span>修改</span>
    </template>
    <el-form :model="addItem">
      <el-form-item label="名称">
        <el-input v-model="addItem.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="image-uploader"
          action="http://localhost:8080/upload"
          accept=".png,.jpg"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="addItem.type"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="addItem.describe" type="textarea" :rows="2" style="width: 240px;"></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <el-button @click="addconfirm" type="primary">确定</el-button>
      <el-button @click="closeAddCard" >取消</el-button>
    </template>
  </el-card>
</div>
</template>
<script lang="ts" setup name="informationPage1">
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import router from '@/router';
import useCulturalRelicsStore from '@/store/modules/culturalRelics';
const culturalRelicsStore=useCulturalRelicsStore();//从文物仓库中取出全部数据
let tempArr:any[]=[]//条件查询临时数据
let showData=ref<any>([]);//正真展示的数据

//总数据量
let total=ref(culturalRelicsStore.allData.length);
let currentPage=ref(1);//当前页数
let pageSize=ref(3);//表格大小
Pagination(culturalRelicsStore.allData);
/**
 * 将数据分页
 */
function Pagination(arr:any[]){
  showData.value=[];
  total.value=arr.length
  let start=(currentPage.value-1)*pageSize.value
  let end=start+pageSize.value>=arr.length? arr.length : start+pageSize.value
  for(let i=start;i<end;i++){
    showData.value.push(arr[i]);
  }
}
let showAddCard=ref(false)//添加卡片显示控制
let addItem=reactive({
  name: '',
  url: '',
  type: '',
  describe: '',
})
//查询数据
let searchForm=reactive({
    title: '',
    age: '',
    material: '',
})

/**
 * 数据查询按钮
 */
function handleSerch(){
  tempArr=[];//条件查询临时数组（未分页数据）
  // console.log(culturalRelicsStore.allData);

  tempArr=culturalRelicsStore.allData.filter((item)=>{
    if((item.title.toLocaleLowerCase().includes(searchForm.title)||!searchForm.title)&&(item.age.includes(searchForm.age)||!searchForm.age)&&(item.material.includes(searchForm.material)||!searchForm.material)){
      return true;
    }
    return false;
  })
  showData.value=[];
  Pagination(tempArr)
}
/**
 * 添加文物按钮回调
 */
function add(){
  showAddCard.value=true;
}
/**
 * 添加文物确认按钮回调
 */
function addconfirm(){
  // console.log('添加文物',addItem.name,addItem.type,addItem.describe);

  Object.assign(addItem,{
  name: '',
  url: '',
  type: '',
  describe: '',
})
  showAddCard.value=false;

}
/**
 * 添加文物取消按钮回调
 */
function closeAddCard(){
  Object.assign(addItem,{
  name: '',
  url: '',
  type: '',
  describe: '',
})
  showAddCard.value=false;
}
//表格项数发生变化事件
function handleSizeChange(val:number){
  pageSize.value=val;


}
//当前页数发生变化事件
function handleCurrentChange(val:number){
  currentPage.value=val;
  if(!searchForm.title&&!searchForm.material&&!searchForm.age)
    Pagination(culturalRelicsStore.allData);
  else
    Pagination(tempArr);
}

//详情按钮
function details(item:any){
  // console.log('item',item);
  router.push({
    path: '/Details',
    query: {...item}
  })
  // console.log(dataItem.value);
}
//修改数据项，需向后端发送
let changeItem=ref({
  name: '',
  url: '',
  type: '',
  describe: '',
})
//修改卡片事件
function changes(item:any){
  changeCard.value=true;
  changeItem.value=item;
}
//关闭修改卡片
function closeChangeCard(){
  changeCard.value=false;
}
//修改卡片显示控制
let changeCard=ref(false);
//修改卡片确认事件
function changeConfirm(){
  console.log(changeItem.value);
  changeCard.value=false;
}
const imageUrl = ref('')
//图片上传
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  uploadFile
) => {
  // console.log("上传成功");
  // console.log(uploadFile);
  imageUrl.value = uploadFile.data;
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // console.log('点击按钮后上传成功前');
  // console.log(rawFile);
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文件过大');
    return false
  }
  return true
}

</script>
<style scoped>
.root {
  .func{
    margin-bottom: 20px;
    display: flex;
    /* 新增文物 */
    .btn1{
      margin-right: 20px;
    }
    /* 条件查询 */
    .search{
      width: 800px;
      padding-left: 20px;
      border-left: 1px dashed gray;
      display: flex;
      justify-content: space-between;
      .myInput{
        width: 200px ;
        height: 40px ;
      }
    }
  }


  /* 修改卡片 */
  .changeCard {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    width: 700px;
    height: 400px;
    overflow: auto;
    transform: translate(-50%, -50%);
  }
  .addCard{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    width: 700px;
    height: 400px;
    overflow: auto;
    transform: translate(-50%, -50%);
  }
  /* 图片上传 */
  .image-uploader .avatar {
    display: block;
    width: 178px;
    height: 178px;
  }

  .image-uploader {
    border: 1px dashed black;
  }

  .image-uploader .el-upload {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed black;
    border-radius: 6px;
    transition: var(--el-transition-duration-fast);
  }

  .image-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  /* 加号 */
  .el-icon.avatar-uploader-icon {
    width: 178px;
    height: 178px;
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
}

</style>
