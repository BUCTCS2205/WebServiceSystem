<template>
  <div class="root">
  <FaPageMain>
    <FaButton class="addType" @click="addType">新增类型</FaButton>
    <el-table :data="typeData" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="50" />
      <el-table-column prop="type" label="类型"/>
      <el-table-column  label="操作" width="300" >
        <template #default="scope">
          <el-button type="danger" @click="deleteType(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </FaPageMain>
  <el-card style="width: 800px" v-show="showChange" class="card">
    <template #header>
      <span>新增类型</span>
    </template>
    <div class="main">
      <span>类型名：</span>
      <el-input v-model="typeName"></el-input>
    </div>
    <template #footer>
      <el-button @click="confirm" type="primary">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-card>
</div>
</template>
<script lang="ts" name="types1" setup>
import { ElMessage } from 'element-plus';
let showChange=ref(false)//修改卡片是否展示
let typeName=ref();//类型名称待提交数据
function addType(){
  showChange.value=true
}
//确认修改
function confirm(){
  // console.log(typeName.value);
  typeName.value="";
  showChange.value=false;
}
//取消修改
function cancel(){
  typeName.value="";
  showChange.value=false;
}
function deleteType(id:any){
  console.log(id);
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
}
const typeData = reactive([
  {
    id: '1',
    type: '金',
  },
  {
    id: '2',
    type: '银',
  },
  {
    id: '3',
    type: '铜',
  },
  {
    id: '4',
    type: '铁',
  },
  {
    id: '5',
    type: '石',
  },
])
</script>
<style scoped>
/* 新增类型 */
.addType{
  margin-bottom: 30px;
}
.root{
  position: relative;
  .card{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9999
  }
}
</style>
