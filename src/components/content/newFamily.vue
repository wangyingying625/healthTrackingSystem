<template>
    <div>
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
          familyId:''
        }
      },
      methods:{
        joinFamily:function () {
          if(!this.familyId)
          {
            alert('不能为空');
          }
          else {
            var that=this;
            axios.get('http://127.0.0.1:8080/api/family/apply',{
              params:{
                id:that.familyId
              },
              headers:{
                'Authorization': global_.token
              }
            }).then(function (res) {
              console.log(res.data)
              alert('申请成功，等待管理员同意')
            })
          }
        },
        newFamily:function () {
          var that=this;
          if(this.familyName==''){
            alert('不能为空')
          }
          else {
            console.log(this.familyName)
            axios.get('http://127.0.0.1:8080/api/family/newFamily',{
              params:{
                name:that.familyName
              },
              headers:{
                'Authorization': global_.token
              }
            }).then(function (res) {
              console.log(res.data)
                global_.user.family_id=res.data.id;
              that.$router.push('/family');
            })
          }
        }
      }
    }
</script>
