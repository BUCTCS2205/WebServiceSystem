<template>
  <div>
    <FaPageMain>
      <div class="images">
        <div v-for="(item,index) in images" :key="item" class="block">
          <el-image style="width: 100px; height: 100px;" :src="item" fit="fill" :preview-src-list="images" :initial-index="index" lazy/>
        </div>
      </div>
    </FaPageMain>
  </div>
</template>
<script lang="ts" setup>
import useCulturalRelicsStore from '@/store/modules/culturalRelics';
const culturalRelicsStore=useCulturalRelicsStore();
// let demo=ref<any>([]);
// onMounted(()=>{
//     culturalRelicsStore.allData.forEach((item)=>{
//     demo.value.push(item.url);
//   })
// })
let images=computed({
  get: function(){
    return culturalRelicsStore.allData.map((item)=>{
      return item.url;
    })
  },
  set: function(){

  }
})
</script>
<style scoped>
.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .block {
    margin: 30px;
  }
}
</style>
