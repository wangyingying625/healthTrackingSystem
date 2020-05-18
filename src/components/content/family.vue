<template>
  <div v-loading="loading">
    <el-card shadow="always" v-if="admin && applyList.length!=0"  v-for="(item,i) in applyList" :key="i">
      <div>
        <strong>{{item.name}}</strong>申请加入
        <el-button type="danger" @click="refuse(item.id)" plain style="float: right;margin-bottom: 15px">拒绝</el-button>
        <el-button type="success" @click="agree(item.id)" plain style="float: right;margin-right: 10px;margin-bottom: 15px">同意</el-button>
      </div>
    </el-card>
    <div class="family_header" v-if="member || admin">
      ID:{{familyId}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{familyName}}
      <el-link type="danger" v-if="admin" @click="disband"  style="float: right">解散家庭</el-link>
      <el-link type="danger" v-if="member" @click="quit" style="float: right">退出家庭</el-link>
    </div>
    <div id="box">
      <div>
        <el-card  v-if="admin"  v-for="(item,i) in familyList" :key="i" class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <el-button type="text" @click="del (item.id)" style="float: right; padding: 3px 0;color: rgb(84, 92, 100)
                        ;">移除成员
            </el-button>
            <el-button style="float: right; padding: 3px 0;color: rgb(84, 92, 100)
                        ;" type="text" @click="viewFamily(item.id,item.name)">查看病历
            </el-button>
          </div>
          <div class="text item">
            用户名:{{item.name}}
          </div>
          <div class="text item" v-if="item.email">
            体重:{{item.email}}
          </div>
          <div class="text item" v-if="item.sex">
            体重:{{item.sex}}
          </div>
          <div class="text item" v-if="item.weight">
            体重:{{item.weight}}
          </div>
          <div class="text item" v-if="item.height">
            体重:{{item.height}}
          </div>
          <div class="text item" v-if="item.birthday">
            体重:{{item.birthday}}
          </div>
        </el-card>
        <el-card  v-if="member"  v-for="(item,i) in familyList" :key="i" class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <el-button style="float: right; padding: 3px 0;color: rgb(84, 92, 100)
                        ;" type="text">查看病历
            </el-button>
          </div>
          <div class="text item">
            用户名:{{item.name}}
          </div>
          <div class="text item" v-if="item.email">
            体重:{{item.email}}
          </div>
          <div class="text item" v-if="item.sex">
            体重:{{item.sex}}
          </div>
          <div class="text item" v-if="item.weight">
            体重:{{item.weight}}
          </div>
          <div class="text item" v-if="item.height">
            体重:{{item.height}}
          </div>
          <div class="text item" v-if="item.birthday">
            体重:{{item.birthday}}
          </div>
        </el-card>
        <el-card v-if="toJoin">
          您已申请加入家庭，等待管理员同意
        </el-card>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #box {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
.family_header{
  width: 100%;
  padding: 20px;
  size:14px;
  box-sizing: border-box;
}
  .text {
    font-size: 14px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 330px;
    margin: 10px;
    margin-left: 20px;
    margin-right: 0;
    display: inline-block;
  }
</style>
<script>
  import global_ from '../../global.vue'
  import axios from 'axios'
  import ElCard from '../../../node_modules/element-ui/packages/card/src/main.vue'
  export default {
    components: {ElCard},
    data () {
      return {
        familyList: [],
        familyName:'',
        admin:false,
        member:false,
        loading:false,
        familyId:'',
        toJoin:false,
        applyList:[],
        user:''
      }
    },
    beforeCreate() {
      axios.get('http://127.0.0.1:8080/api/v1/users/info', {
        headers: {
          'Authorization':localStorage.token,
        }
      }).then(function (res) {
        let user=res.data.data;
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('familyId',user.family_id)
      })
    },
    created: function () {
      this.user=JSON.parse(localStorage.user)
      var that = this
      if(this.user.status=='member') {
        this.member=true
        that.loading = true
        axios.get('http://127.0.0.1:8080/api/family/familyList', {
          params: {
            family_id: that.user.family_id
          }
        }).then(function (res) {
          that.loading = false
          that.familyList = res.data.members,
            that.familyName = res.data.family.name,
            that.familyId = res.data.family.id
        });
      }
      else if(this.user.status=='admin'){
        this.admin=true
        that.loading = true
        axios.get('http://127.0.0.1:8080/api/family/familyList', {
          params: {
            family_id: that.user.family_id
          }
        }).then(function (res) {
          that.loading = false
          that.familyList = res.data.members,
            that.familyName = res.data.family.name,
            that.familyId = res.data.family.id
        });
      }
      else {
        that.toJoin=true
      }
    },
    methods: {
      del (id) {
        var that=this;
        if(id==localStorage.userId)
          this.$message('不能移除自己');
        else {
          this.$alert('确定移除该成员吗', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              axios.get('http://127.0.0.1:8080/api/family/delete', {
                headers: {
                  'Authorization': localStorage.token,
                },
                params: {
                  id: id
                }
              }).then(function (res) {
                if (res.data.status == true) {
                  that.$message('移除成功');
                }
                that.getMemberList(that);
              })
            }
          })
        }
      },
      viewFamily(id,name) {
        this.$router.push({
          path: `/record`,
          query: {id: id, name: name}
        })
      },
      disband(){
        var that=this;
        this.$alert('确定解散家庭吗', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            axios.get('http://127.0.0.1:8080/api/family/disband', {
              headers: {
                'Authorization': localStorage.token,
              },
            }).then(function (res) {
              if(res.data.status==true)
              {
                localStorage.familyId=0;
                that.user.family_id=0;
                that.user.status='no';
                localStorage.setItem('user',JSON.stringify(that.user));
                that.$router.push('/newFamily');
              }
            })
          }
        })
      },
      quit(){
        var that=this;
        this.$alert('确定退出家庭吗', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            axios.get('http://127.0.0.1:8080/api/family/quitFamily', {
              headers: {
                'Authorization': localStorage.token,
              },
            }).then(function (res) {
              if(res.data.status==true)
              {
                localStorage.familyId=0;
                that.user.family_id=0;
                that.user.status='no';
                localStorage.setItem('user',JSON.stringify(that.user));
                that.$router.push('/newFamily');
              }
            });
          }
        })

      },

      getMemberList(that){
        let that1=this;
        axios.get('http://127.0.0.1:8080/api/family/familyList', {
          params: {
            family_id: that1.user.family_id
          }
        }).then(function (res) {
          that.familyList = res.data.members
        });
      },
      getApplyList(that)
      {
        axios.get('http://127.0.0.1:8080/api/family/applyList', {
          headers: {
            'Authorization': localStorage.token,
          }
        }).then(function (res) {
          that.applyList=res.data;
        });
      },
      agree(id){
        var that=this;
        axios.get('http://127.0.0.1:8080/api/family/accept', {
          headers: {
            'Authorization': localStorage.token,
          },
          params:{
            user_id:id
          }
        }).then(function (res) {
          if(res.data.status==true)
          {
            that.$message('同意成功');
            that.getMemberList(that);
            that.getApplyList(that);
          }
          else{
            that.$message('稍后再试');
          }
        })
      },
      refuse(id){
        var that=this;
        axios.get('http://127.0.0.1:8080/api/family/refuse', {
          headers: {
            'Authorization': localStorage.token,
          },
          params:{
            user_id:id
          }
        }).then(function (res) {
          if(res.data.status==true)
          {
            that.$message('拒绝成功');
            that.getMemberList(that);
            that.getApplyList(that);
          }
          else{
            that.$message('稍后再试');
          }
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      if (localStorage.familyId!= null  && localStorage.familyId!=0) {
      next();
      }
      else {
        next({path: '/newFamily'});
      }
    }
  }
</script>
