<!-- App.vue -->
<template>
  <div id="header">
      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
         <el-menu-item index="1"> <router-link to="/index"  style="text-decoration: none">首页</router-link></el-menu-item>
         <el-menu-item index="2"> <router-link to="/oneClick"  style="text-decoration: none">一键上传</router-link></el-menu-item>
         <el-menu-item index="3"> <router-link to="/Template"  style="text-decoration: none">模板上传</router-link></el-menu-item>
          <el-menu-item index="4"><router-link to="/family" >我的家庭</router-link></el-menu-item>
          <el-submenu index="5">
            <template slot="title">个人中心</template>
            <router-link to="/geRen"  style="text-decoration: none"><el-menu-item index="5-1">我的资料</el-menu-item></router-link>
            <router-link to="/editGeren" style="text-decoration: none"><el-menu-item index="5-2" >编辑资料</el-menu-item></router-link>
          </el-submenu>
          <el-menu-item index="6" @click="loginOut">退出</el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
  </div>
</template>
<script>
  import global_ from '../../global.vue';
  import axios from 'axios';
  export default {
    beforeRouteEnter(to, from, next) {
      if (global_.token) {
        next();
      }
      else {
        next({path: '/login'});
      }
    },
    methods: {
      loginOut () {
        sessionStorage.token=null;
        global_.token=null;
        this.$router.push('/login');
        localStorage.token=null;
      }
    },
    beforeCreate:function () {

      if (!global_.user) {
        axios.get('http://127.0.0.1:8080/api/v1/users/info', {
          headers: {
            'Authorization': global_.token,
          }
        }).then(function (res) {
          console.log(res.data)
          global_.user = res.data.data;
          localStorage.userId=res.data.id
        })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  };
</script>
<style scoped>
</style>
