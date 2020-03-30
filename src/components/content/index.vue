<template>
  <div>
    <el-row style="margin-bottom: 50px">
      <el-col :span="24" style="height: 350px"><div id="main" class="grid-content bg-purple-dark" style="width: 100%;height: 100%"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"  style="height: 350px"><div id="other1" class="grid-content bg-purple" style="width: 100%;height: 100%"></div></el-col>
      <el-col :span="12" style="height: 350px"><div id="other2" class="grid-content bg-purple-light" style="width: 100%;height: 100%"></div></el-col>
    </el-row>
  </div>
</template>
<style scoped>
</style>
<script>
  var echarts = require('echarts');
  export default {
    data () {
      return {
      };
    },
    mounted: function () {
      var option1 = {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      this.drawLine('other1', option1);
      this.drawLine('main', option1);
      this.drawLine('other2', option1);
    },
    methods: {
       drawLine (id, option) {
        let myChart = echarts.init(document.getElementById(id));
        myChart.setOption(option);
      }
    }
  };
</script>
