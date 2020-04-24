<template>
    <div>
        <el-card class="box-card"  shadow="hover">
          <div class="box">
            <span >用户名：</span>
            <el-input class="row" v-model="user.name">
            </el-input>
          </div>
          <div class="box">
            <span >邮箱：</span>
            <el-input class="row" v-model="user.email">
            </el-input>
          </div>
          <div class="box">
            <span >性别：</span>
            <el-input class="row" v-model="user.sex">
            </el-input>
          </div>
          <div class="box">
            <span >体重：</span>
            <el-input class="row" v-model="user.weight">
            </el-input>
          </div>
          <div class="box">
            <span >身高：</span>
            <el-input class="row" v-model="user.height">
            </el-input>
          </div>
          <div class="box">
            <span >生日：</span>
            <el-input class="row" v-model="user.birthday">
            </el-input>
          </div>
          <div class="box">
            <el-button round @click="edit">确定</el-button>
          </div>
        </el-card>
    </div>
</template>
<style>
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .row {
    width: 75%;
  }
</style>
<script>
  import global_ from '../../global.vue';
  import axios from  'axios';
  export default {
  data(){
    return {
      user:null,
    }
  },
    methods:{
    edit:function () {
      var parms=JSON.stringify(this.user);
      axios.post('http://127.0.0.1:8080/api/v1/edit',
        {
          user:parms
        },
        {
        headers: {
          'Authorization': global_.token,
        }
      }).then(function (res) {
        if(res.data.status=='success')
        {alert('修改成功')
        console.log(res.data);
        global_.user=that.user;}
      })
    }
    },
    beforeCreate:function () {
      if(!global_.user)
      {
        axios.get('http://127.0.0.1:8080/api/v1/users/info', {
          headers: {
            'Authorization': global_.token,
          }
        }).then(function (res) {
          global_.user=res.data.data;
          this.user = global_.user;
        })
      }
    },
  created:function () {
    if(global_.user) {
      this.user = global_.user;
      console.log('have userInfo')
    }
  }
}
</script>
