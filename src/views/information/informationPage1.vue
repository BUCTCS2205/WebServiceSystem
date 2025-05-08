<template>
  <div class="root">
    <!-- 内容表格区 -->
  <FaPageMain>
    <FaButton class="btn" @click="add">添加文物</FaButton>
    <el-table :data="tableData" border style="width: 100%; margin-bottom: 30px">
      <el-table-column prop="name" label="名称" width="100" />
      <el-table-column prop="image" label="图片" width="150" >
        <template #default="scope">
          <el-image :src="scope.row.url" style="width: 100px;
          height: 100px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型"  width="150"/>
      <el-table-column prop="describe" label="描述" class="describe"></el-table-column>
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
        <el-select size="large" style="width: 240px;" v-model="changeItem.type">
          <el-option
            v-for="item in typeArr"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
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
        <el-select size="large" style="width: 240px;" v-model="addItem.type">
          <el-option
            v-for="item in typeArr"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
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
let currentPage=ref(3);//当前页数
let pageSize=ref(3);//表格大小
let showAddCard=ref(false)//添加卡片显示控制
let addItem=reactive({
  name: '',
  url: '',
  type: '',
  describe: '',
})
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
}
//类型数组
let typeArr=reactive([
  {
    value: '青铜器',
    lable: '青铜器',
  },
  {
    value: '铁器',
    label: '铁器',
  }
])
//待展示数据
const tableData = reactive([
  {
    id: 1,
    name: '壶',
    url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.jDmpmCyqMqJjZGl4-sPTmQHaJM?w=157&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    type: '青铜器',
    describe: '第一件',
  },
  {
    id: 2,
    name: '罐',
    url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.TQwFNNfljYEUTjRBfKPzCwHaID?w=157&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    type: '青铜器',
    describe: '第二件',
  },
  {
    id: 3,
    name: '钟',
    url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.tBW8DNGo8NNNqcJuigdhGQHaJX?w=157&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    type: '青铜器',
    describe: '第三件',
  },
  {
    id: 4,
    name: '炉',
    url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.8cFO9qJDrJTpc-Mq0PZIOwHaIB?w=190&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    type: '青铜器',
    describe: '第四件',
  },
])
//总数据量
let total=ref(400);
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
  console.log("上传成功");
  console.log(uploadFile);
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('点击按钮后上传成功前');
  console.log(rawFile);
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文件过大');
    return false
  }
  return true
}

</script>
<style scoped>
.root {
  .btn{
    margin-bottom: 20px;
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
