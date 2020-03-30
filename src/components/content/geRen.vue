<template>
    <div>
        <el-card class="box-card"  shadow="hover">
            <div slot="header" class="clearfix">
            </div>
            <div class="text item">
                用户名：{{user.name}}
            </div>
          <div class="text item" v-if="user.email">
            邮箱：{{user.email}}
          </div>
          <div  class="text item" v-if="user.sex">
            性别:{{user.sex}}
          </div>
          <div class="text item" v-if="user.height">
            身高：{{user.height}}
          </div>
          <div class="text item" v-if="user.weight">
            体重：{{user.weight}}
          </div>
          <div class="text item" v-if="user.birthday">
            生日：{{user.birthday}}
          </div>
        </el-card>
    </div>
</template>
<style>

</style>
<script>
  import global_ from '../../global.vue';
    export default {
      data(){
        return {
          user:null
        }
      },
      created:function () {
        this.user=global_.user;
        console.log(this.user);
      }
    };
</script>
