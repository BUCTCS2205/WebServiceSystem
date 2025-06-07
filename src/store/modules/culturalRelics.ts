
import apiCulturalRelics from '@/api/modules/culturalRelics'

const useCulturalRelicsStore=defineStore('culturalRelics',()=>{
  /**
   * 全部文物数据
   */
    let allData=ref([
      {
        id: 1,
        title: '壶',
        age: '1000',
        url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.jDmpmCyqMqJjZGl4-sPTmQHaJM?w=157&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        material: '青铜器',
        description: '第一件',
      },
      {
        id: 2,
        title: '壶',
        age: '1000',
        url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.jDmpmCyqMqJjZGl4-sPTmQHaJM?w=157&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        material: '青铜器',
        description: '第二件',
      },
      {
        id: 3,
        title: '壶',
        age: '1000',
        url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.jDmpmCyqMqJjZGl4-sPTmQHaJM?w=157&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        material: '青铜器',
        description: '第三件',
      },
    ]);

    /**
     * 获取全部文物数据
     */
    async function getAllData(){
        // const res=await apiCulturalRelics.getCulturalRelicsData();
        // console.log('全部文物数据',res);
        // allData.value=res.data;
        // console.log('allData',allData.value);
      }

    return{
      allData,
      getAllData,
    }
})
export default useCulturalRelicsStore
