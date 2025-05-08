<template>
  <div>
    <FaPageMain>
      <div class="top">
        <div class="left_top" ref="left_top"></div>
        <div class="right_top" ref="right_top"></div>
      </div>
      <div class="bottom">
        <div class="bottom_all" ref="bottom_all"></div>
      </div>
    </FaPageMain>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
let left_top=ref();
let right_top=ref();
let bottom_all=ref();
let bar_optional={
      title: { text: '藏品年份数量分布图',left: 'center' },
      tooltip: {},
      xAxis: {
        name: '年份',
        data: ['唐', '宋', '元', '明', '清']
      },
      yAxis: {
        name: '藏品数量',
      },
      series: [{ name: '藏品数量', type: 'bar', data: [5, 20, 36, 10, 10] }]
}
let pie_option = {
      title: {
        text: '文物类型分布图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      color: ['#FFD700', '#C0C0C0', '#B87333','black','gray'],
      series: [
        {
          name: '类型',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '金器' },
            { value: 735, name: '银器' },
            { value: 580, name: '铜器' },
            { value: 484, name: '铁器' },
            { value: 300, name: '石器' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
};
let line_option = {
  title: {
    text: '近七天系统浏览量',
    left: 'center',
  },
  tooltip: {

  },
  xAxis: {
    name: '最近天数',
    type: 'category',
    data: ['一', '二', '三','四','五','六','七'],
  },
  yAxis: {
    type: 'value',
    name: '浏览量',
  },
  series: [
    {
      data: [120, 200, 150,250,130,80,300,170],
      type: 'line'
    }
  ]
};
onMounted(() => {
    const leftTop = echarts.init(left_top.value);
    let rightTop=echarts.init(right_top.value);
    let bottomAll=echarts.init(bottom_all.value);

    leftTop.setOption(bar_optional);

    rightTop.setOption(pie_option);
    bottomAll.setOption(line_option);

});
</script>

<style scoped>
.top{
  display: flex;
  height: 300px;
  .left_top{
    flex: 1;
    height: 100%;
  }
  .right_top{
    flex: 1;
    height: 100%;
  }
  margin-bottom: 30px;
}
.bottom_all{
  height:400px ;
  width: 100%;
}

</style>
