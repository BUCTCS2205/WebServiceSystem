import api from "../index";
/**
 *
 * @returns 获取全部文物数据api
 */
// export function culturalRelicsData(){
//   return api.get('/relic');
// }
export default {
  getCulturalRelicsData: ()=>api.get('/relic')
}
