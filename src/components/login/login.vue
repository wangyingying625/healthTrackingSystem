<template>
  <div id="login">
    <div class="box">
      <span >用户名：</span>
      <el-input class="row" v-model="name"
                placeholder="请输入用户名">
      </el-input>
    </div>
    <div class="box">
      <span>&nbsp;&nbsp;密 码：</span>
      <el-input class="row" v-model="password" show-password
                placeholder="请输入密码">
      </el-input>
    </div>
    <div class="box">
    <el-button round @click="login">登录</el-button>
    </div>
  </div>
</template>
<style scoped lang="less">
  #login {
    width: 60%;
    margin: auto;
    margin-top: 100px;
    /deep/ .el-card{
      width: 50%;
      margin: 10px auto;
    }
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }



  .row {
    width: 75%;
  }
</style>
<script type="text/ecmascript-6">
  import global_ from '../../global.vue';
  import axios from 'axios';
  export default {
    data() {
      return {
        name: '',
        password: ''
      }
    },
    methods: {
      login() {
        var that=this;
        axios.post('http://127.0.0.1:8080/api/v1/login', {
            name:that.name,
            password:that.password
          }
        )
          .then(function (res) {
            if (res == null) {
              alert('用户名或密码错误');
            }
            else {
              global_.token=res.data.data.token;
              localStorage.setItem('token',global_.token);
              localStorage.setItem('userId',res.data.data.user.id);
              localStorage.setItem('familyId',res.data.data.user.family_id);
              let data=JSON.stringify(res.data.data.user)
              localStorage.setItem('user',data);
              console.log(JSON.parse(localStorage.user).id)
              global_.user = res.data.data.user;
              that.$router.push('/index');
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  };
</script>
