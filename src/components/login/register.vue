<template>
  <div id="register">
    <div class="box">
      <span>用户名：</span>
      <el-input class="row" v-model="name"
                placeholder="请输入用户名">
      </el-input>
    </div>
    <div class="box">
      <span>邮箱：</span>
      <el-input class="row" v-model="email"
                placeholder="请输入邮箱">
      </el-input>
    </div>
    <div class="box">
      <span>密码：</span>
      <el-input class="row" v-model="password"
                placeholder="请输入密码">
      </el-input>
    </div>
    <div class="box">
      <span>确认密码：</span>
      <el-input class="row"
                placeholder="请确认密码">
      </el-input>
    </div>
    <div class="box">
      <span>身高：</span>
      <el-input class="row" v-model="height"
                placeholder="请输入身高">
      </el-input>
    </div>
    <div class="box">
      <span>性别：</span>
      <el-input class="row" v-model="sex"
                placeholder="请输入性别">
      </el-input>
    </div>
    <div class="box">
      <span>体重：</span>
      <el-input class="row" v-model="weight"
                placeholder="请输入体重">
      </el-input>
    </div>
    <div class="box">
      <span>生日：</span>
      <el-input class="row" v-model="birthday"
                placeholder="请输入生日">
      </el-input>
    </div>
    <div class="box">
      <el-button round @click="register">注册</el-button>
    </div>
  </div>
</template>
<style>
  #register {
    width: 60%;
    margin: auto;
    margin-top: 100px;
  }

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
  import axios from 'axios';
export default {
  data () {
    return {
      name: this.name,
      password: this.password,
      sex: this.sex,
      birthday: this.birthday,
      height: this.height,
      weight: this.weight,
      email: this.email
    }
  },
    methods:{
      register:function () {
        var that=this;
        axios.post('http://127.0.0.1:8080/api/v1/register',{
          name: this.name,
          password: this.password,
          sex: this.sex,
          birthday: this.birthday,
          height: this.height,
          weight: this.weight,
          email: this.email
        }).then(function () {
          that.$router.push('./login');
        }).catch(function () {
          alert("请稍后再试")
        })
      }
  }
}
</script>
