
import { culturalRelicsData } from "@/api/modules/culturalRelics";
import { ElMessage } from "element-plus";


const useCulturalRelicsStore=defineStore('culturalRelics',()=>{
  /**
   * 全部文物数据
   */
    let allData=ref([
      {
        id: 1,
        name: '壶',
        years: '1000',
        url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.jDmpmCyqMqJjZGl4-sPTmQHaJM?w=157&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        type: '青铜器',
        describe: '第一件',
      },
      {
        id: 2,
        name: '罐',
        years: '2000',
        url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.TQwFNNfljYEUTjRBfKPzCwHaID?w=157&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        type: '青铜器',
        describe: '第二件',
      },
      {
        id: 3,
        name: '钟',
        years: '3000',
        url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.tBW8DNGo8NNNqcJuigdhGQHaJX?w=157&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        type: '青铜器',
        describe: '第三件',
      },
      {
        id: 4,
        name: '炉',
        years: '4000',
        url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.8cFO9qJDrJTpc-Mq0PZIOwHaIB?w=190&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
        type: '青铜器',
        describe: '第四件',
      },
    ]);

    /**
     * 获取全部文物数据
     */
    async function getAllData(){
      try{
        const res=await culturalRelicsData();
        allData.value=res.data;
      }
      catch{
        ElMessage({
          type: 'error',
          message: '请求出错',
        })
      }
    }

    return{
      allData,
      getAllData,
    }
})
export default useCulturalRelicsStore
