<template>
    <div v-loading="loading">
        <el-collapse>
            <el-collapse-item title="新建家庭">
                <div>
                    <el-input v-model="familyName"  placeholder="请输入家庭名"></el-input>
                    <el-button @click="newFamily" type="info" plain style="float: right;margin: 5px;margin-right: 15px">确定</el-button>
                </div>
            </el-collapse-item>
            <el-collapse-item title="加入已有家庭">
                <div>
                    <el-input v-model="familyId" placeholder="请输入家庭账号"></el-input>
                    <el-button @click="joinFamily" type="info" plain style="float: right;margin: 5px;margin-right: 15px">确定</el-button>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<style scoped>

</style>
<script>
  import axios from  'axios';
  import global_ from '../../global.vue';
    export default {
      data(){
        return{
          familyName:'',
          loading:false,
          familyId:''
        }
      },
      methods:{
        joinFamily() {
          var that=this;
          if(this.familyId=='')
          {
            this.$message('账号不能为空');
          }
          else {
            that.loading=true
            axios.get('http://127.0.0.1:8080/api/family/join',{
              params:{
                id:that.familyId
              },
              headers:{
                'Authorization': localStorage.token
              }
            }).then(function (res) {
              if(res.data.status==true)
              {
                let user=JSON.parse(localStorage.user)
                user.family_id=that.familyId;
                user.status='joining'
                localStorage.setItem('familyId',that.familyId);
                localStorage.setItem('user',JSON.stringify(user));
                that.loading=false
                that.$router.push('/family');
                that.$message('申请成功，等待管理员同意');

              }
            })
          }
        },
        newFamily() {
          var that=this;
          if(this.familyName==''){
            this.$message('名称不能为空');
          }
          else {
            axios.get('http://127.0.0.1:8080/api/family/newFamily',{
              params:{
                name:that.familyName
              },
              headers:{
                'Authorization': localStorage.token
              }
            }).then(function (res) {
                let user=JSON.parse(localStorage.user);
                user.family_id=res.data.id;
                user.status='admin'
                localStorage.setItem('user',JSON.stringify(user));
                localStorage.setItem('familyId',user.family_id);
              that.$router.push('/family');
            })
          }
        }
      },
      // beforeRouteEnter(to, from, next) {
      //   if (localStorage.familyId && localStorage.familyId!=0) {
      //     next({path: '/family'});
      //   }
      //   else {
      //     next();
      //   }
      // }
    }
</script>
