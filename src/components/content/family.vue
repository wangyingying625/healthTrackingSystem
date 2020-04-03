<template>
  <div>
    <el-card shadow="always">
      <div>
        申请加入
        <el-button type="danger" plain style="float: right;margin-bottom: 15px">拒绝</el-button>
        <el-button type="success" plain style="float: right;margin-right: 10px;margin-bottom: 15px">同意</el-button>

      </div>
    </el-card>
    <div class="family_header">
      家庭:{{}}
      <el-link type="danger" style="float: right">解散家庭</el-link>
    </div>
    <div id="box">
      <div>
        <el-card v-for="item in familyList" :key="item" class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <el-button type="text" @click="open" style="float: right; padding: 3px 0;color: rgb(84, 92, 100)
                        ;">移除成员
            </el-button>
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

  export default {
    data () {
      return {
        familyList: []
      }
    },
    created: function () {
      var that = this
      axios.get('http://127.0.0.1:8080/api/family/familyList', {
        params: {
          family_id: global_.user.family_id
        }
      }).then(function (res) {
        console.log(res.data)
        that.familyList = res.data.members
      })
    },
    methods: {
      open () {
        this.$alert('确定移除该成员吗', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info'
            })
          }
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      if (global_.user.family_id) {
      next();
      }
      else {
        next({path: '/newFamily'});
      }
    },
    beforeCreate: {}
  }
</script>
