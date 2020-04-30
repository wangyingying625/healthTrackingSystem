<template>
  <div>
    <form :model="form" id="form" ref="form">
      <table style="width: 100%">
       <!-- <colgroup>
          <col width="150">
          <col width="200">
          <col>
        </colgroup>-->
        <thead>
        <tr>
          <th>中文名</th>
          <th>英文名</th>
          <th>上限</th>
          <th>下限</th>
          <th>单位</th>
          <th><p style="cursor: pointer;color: #FF5722" @click="addRow">添加一行</p></th>
        </tr>
        </thead>
        <tbody id="tBody">
        <tr v-for="(item,i) in form.temp" :key="i">
          <td><el-input required v-model="item.name_ch" type="text"></el-input></td>
          <td><el-input  v-model="item.name_en" type="text"></el-input></td>
          <td><el-input type="text" v-model="item.upper_limit"></el-input></td>
          <td><el-input type="text" v-model="item.lower_limit"></el-input></td>
          <td><el-input type="text" v-model="item.unit"></el-input></td>
        </tr>
        </tbody>
      </table>
      <el-input class="name" placeholder="请输入化验名称" v-model="form.type"></el-input>
      <el-input class="name" type="text" placeholder="请输入模板名称" v-model="form.tempName"></el-input>
    </form>
    <el-button style="float: right" @click="submitForm">确定</el-button>
  </div>
</template>
<style>
  .hidden {
    display: none;
  }
  .name{
    margin: 10px 0;
  }
</style>
<script type="text/ecmascript-6">
  import global_ from '../../global.vue'
  import $ from 'jquery'
  import axios from 'axios'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'

  export default {
    components: {ElButton},
    data() {
      return {
        tempList: [0],
        index: 0,
        form: {
          temp:[],
          user_id:'',
          type:'',
          tempName:''
        },
        userId: ''
      }
    },
    created: function () {
      this.form.user_id = global_.user.id
    },
    methods: {
    addRow() {
      var list = {
        upper_limit:"",
        name_ch:'',
        unit:'',
        name_en:'',
        lower_limit:''
      }
      this.tempList.push(this.index++);
      this.form.temp.push(list);
    },
    submitForm() {
      console.log(this.form)
      var that = this
      this.$http.post("http://127.0.0.1:8080/api/upload/createTemp",that.form).then(result => {
        // 注意： 通过 $http 获取到的数据，都在 result.body 中放着
        var content = result.body;
        if (result.status === 200) {
          that.$router.push('/Template');
        } else {
          // 失败了
          that.$message('添加失败，请稍后重试');
        }
      });


    /*  console.log(this.form)
      var that = this
      axios.get('http://127.0.0.1:8080/api/upload/createTemp', {
        params: this.from
      }).then(function (res) {
        console.log(res.data)
        //that.options=res.data
      })*/
    },
  }
  }
</script>
