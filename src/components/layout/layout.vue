<template>
  <div id="layout">
    <el-container>
      <v-header></v-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import head from '../header/header.vue';
  import global_ from '../../global.vue';
  export default {
    name: 'layout',
    data () {
      return {
        user: global_.user
      };
    },
    components: {
      'v-header': head
    },
    beforeMount: function () {
    }
  };

</script>

<style>
</style>
