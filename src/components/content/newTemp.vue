<template>
  <div>
  <form action="http://127.0.0.1:8080/api/upload/createTemp" method="get" id="form" ref="form">
    <table>
      <colgroup><col width="150">
        <col width="200"><col></colgroup>
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
      <tr v-for="(item,i) in tempList" :key="i">
        <td><input required  :name="'temp['+i+'][name_ch]'" type="text"></td>
        <td><input  :name="'temp['+i+'][name_en]'"  type="text"></td>
        <td><input type="text"  :name="'temp['+i+'][upper_limit]'" ></td>
        <td><input type="text"  :name="'temp['+i+'][lower_limit]'" ></td>
        <td><input type="text"  :name="'temp['+i+'][unit]'" ></td>
      </tr>
      </tbody>
    </table>
    <input style="margin-bottom: 10px" placeholder="请输入化验名称" name="type">
    <input type="text" placeholder="请输入模板名称" name="tempName">
  </form>
  <el-button @click="submitForm">确定</el-button>
  </div>
</template>
<style>
  .hidden{
    display: none;
  }
</style>
<script type="text/ecmascript-6">
  import global_ from '../../global.vue'
  import $ from 'jquery'
  import axios from 'axios'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
  export default {
    components: {ElButton},
    data () {
      return {
        tempList:[0],
        index:1,
        userId:''
      }
    },
    created:function () {
      this.userId = global_.user.id
    },
    methods:{
      addRow(){
        this.tempList.push(this.index++);
      },
      submitForm(){
        var oInput=document.createElement("input");
        oInput.value=this.userId;
        oInput .setAttribute("name", "user_id")
        oInput .setAttribute("class", "hidden")
        document.getElementById("form").appendChild(oInput);
        var that=this;
          var options  = {
            url:'http://127.0.0.1:8080/api/upload/createTemp',
            type:'get',
            success:function(data)
            {
              console.log('success')
              that.$router.push('/Template');
            }
          };
        $("#form").submit(function() {
          $(this).ajaxSubmit(options);
          return false;
        });
          form.ajaxSubmit(options);
      },
      createTemp () {
        var that = this
        axios.get('http://127.0.0.1:8080/api/upload/createTemp', {
          params: {
            user_id: id
          }
        }).then(function (res) {
          console.log(res.data)
          this.chooseNewTemp=false;
          //that.options=res.data
        })
      }
    }
  }
</script>
