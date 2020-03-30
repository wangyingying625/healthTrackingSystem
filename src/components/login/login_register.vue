<template>
  <div id="login1">
    <el-menu class="el-menu-demo"
             mode="horizontal">
      <el-menu-item >
        <router-link to="/login">登录</router-link>
      </el-menu-item>
      <el-menu-item >
        <router-link to="/register">注册</router-link>
      </el-menu-item>
    </el-menu>
    <el-card shadow="hover">
        <router-view></router-view>
    </el-card>
  </div>
</template>
<style scoped>
</style>
<script>
  import global_ from '../../global.vue';
  export default {
    data () {
      return {
        name: '',
        user: global_.user,
        password: ''
      };
    },
  };
</script>
