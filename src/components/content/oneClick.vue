<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div>
        <el-upload
          class="upload-demo"
          name="file"
          action="http://127.0.0.1:8080/api/upload/uploadPicture"
          :data="user"
          :on-success="getImgId"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <el-input style="margin: 10px 0" v-model="pictureType"  placeholder="请输入检查名"></el-input>
        <!--<div class="block">
          <el-date-picker
            v-model="date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>-->
        <el-button type="info" @click="upload" plain style="float: right;margin: 5px;margin-right: 15px">确定</el-button>
        <el-dialog title="识别结果" :visible.sync="dialogTableVisible" class="dialog">
          <table>
            <thead>
            <tr>
              <td>中文名</td>
              <td>英文名</td>
              <td>值</td>
              <td>上限</td>
              <td>下限</td>
              <td>单位</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in indicators" :key="i">
              <td><el-input v-model="item.name_ch"></el-input></td>
              <td><el-input v-model="item.name_en"></el-input></td>
              <td><el-input v-model="item.value"></el-input></td>
              <td><el-input v-model="item.upper_limit"></el-input></td>
              <td><el-input v-model="item.lower_limit"></el-input></td>
              <td><el-input v-model="item.unit"></el-input></td>
            </tr>
            </tbody>
          </table>
          <el-button @click="submitChange">确定</el-button>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<style  scoped>
  .dialog table {
    width: 100%;}
  table tr{
    width: 100%;
  }
</style>
<script>
  import global_ from '../../global.vue';
  import axios from  'axios';
  export default {
    data () {
      return {
        pictureName: '',
        indicators:'',
        dialogTableVisible: false,
        file:'',
        user:{userId:''},
        fileList: [],
        imgId:'',
        pictureType:'',
      }
    },
    methods: {
      getImgId(response, file, fileList){
        this.imgId=response.id;
      },
      submitChange(){
        let that=this
        axios.get('http://127.0.0.1:8080/api/upload/audi',{
          params: {
            list: that.indicators
          }
        }).then(function (res) {
          that.$router.push('./index');
        })
      },
      upload(){
        if(this.imgId==''||this. pictureType=='')
        {
          that.$message('请补全病历信息后再试');
        }
        else {
        var that=this;
        axios.post('http://127.0.0.1:8080/api/upload/identify',
          {
            userId:that.user.userId,
            image_id:that.imgId,
            type:that.pictureType,
          }).then(function (res) {
          if(res.data.status==false)
          {
            that.$message('上传失败，请稍后再试');
          }
          else {
            console.log(res.data)
            that.indicators=res.data.indicators
            that.dialogTableVisible=true
          }
        })
        }
      }
    },
    created:function () {
      this.user.userId= global_.user.id ;
    }
  }
</script>
