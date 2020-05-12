<template>
  <div id="test">
    <!--<el-row style="margin-bottom: 50px">
      <el-col :span="24" style="height: 350px"><div id="main" class="grid-content bg-purple-dark" style="width: 100%;height: 100%"></div></el-col>
    </el-row>-->
    <el-row>
      <el-col  v-for="(item,i) in arrayMsg" :id="'card' + i" :key="i" :span="12"  style="height: 350px">
        <div  :id="gernerateId(i)" class="grid-content bg-purple" style="width: 100%;height: 100%"></div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
</style>
<script>
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'

  var echarts = require('echarts');
  import axios from 'axios';
  import global_ from '../../global.vue';


  export default {
    components: {ElButton},
    data () {
      return {
        msg: {},
        finish: false,
        arrayMsg: []
      };
    },
    watch: {
      finish: {
        immediate: true,
        handler() {
          var that=this
          this.$nextTick(() => {
            that.tr()
          })
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      if (global_.token) {
        next();
      }
      else {
        next({path: '/login'});
      }
    },
    beforeCreate: function () {

    },
    mounted: function () {
      console.log('mounted');
      var that = this;
      axios.get('http://127.0.0.1:8080/api/upload/record', {
        headers: {
          'Authorization': global_.token,
        }
      }).then(function (res) {
        that.msg = res.data;
        for (var j in that.msg) {
          that.arrayMsg.push(that.msg[j]);
        }
        that.finish=true
      })



    },
    methods: {
      gernerateId: function (i){
        return "container" + i;
      },
      tr:function () {
        var times = 0;
        var that=this;
        var IndicatorsData = that.arrayMsg
        for(let key in IndicatorsData){
          var id="container"+times;
          that.picture(key,id);
          times++;
        }
      },
      mapToObject(indictors) {
    var series = new Array();
    for (var name of indictors){
      series.push({
        name: name[0],
        type: 'line',
        data: name[1],
      });
    }
    return series;
  },
      picture(key,id) {
        var that=this;
        var data=this.arrayMsg;
    var num=id.slice(9);
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);
    var indictors = new Array();
    var indictorsMap= new Map();
    var timeArray = new Array();
    for (var image in data[key]){
      timeArray.push(data[key][image]['created_at']);
      for (var indictor in data[key][image]['indicators']){
        indictors.push(data[key][image]['indicators'][indictor]['name_ch']);
      }
    }


    indictors = new Set(indictors);
    for (var indictor of indictors){
      for (var image in data[key]){
        for (var indic in data[key][image]['indicators']){
          if (data[key][image]['indicators'][indic]['name_ch']==indictor){
            if(indictorsMap.has(indictor)){
              indictorsMap.get(indictor).push(data[key][image]['indicators'][indic]['value']);
            }else {
              indictorsMap.set(indictor,[]);
              indictorsMap.get(indictor).push(data[key][image]['indicators'][indic]['value']);
            }
          }

        }
      }
    }
    var seriesObject =that.mapToObject(indictorsMap);
    var app = {};
    var option = {
      title: {
        text: data[key][0].type,
        subtext: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: Array.from(indictors),
        type:'scroll',
        left: '50px'
      },
      toolbox: {
        show: false,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: timeArray
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: seriesObject
    };

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  },
    }
  };
</script>
