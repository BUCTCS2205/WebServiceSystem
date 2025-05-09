<template>
  <div>
    <FaPageMain>
      <div class="images">
        <div v-for="item in demo" :key="item" class="block">
          <el-image style="width: 100px; height: 100px;" :src="item" fit="fill" :preview-src-list="demo" lazy/>
        </div>
      </div>
    </FaPageMain>
  </div>
</template>
<script lang="ts" setup>
import useCulturalRelicsStore from '@/store/modules/culturalRelics';
const culturalRelicsStore=useCulturalRelicsStore();
let demo=ref<any>([]);
onMounted(()=>{
    culturalRelicsStore.allData.forEach((item)=>{
    demo.value.push(item.url);
  })
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
