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
        <div class="block">
          <el-date-picker
            v-model="date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <el-button type="info" @click="upload" plain style="float: right;margin: 5px;margin-right: 15px">确定</el-button>
      </div>
    </el-card>
  </div>
</template>
<style>
</style>
<script>
  import global_ from '../../global.vue';
  import axios from  'axios';
  export default {
    data () {
      return {
        pictureName: '',
        file:'',
        user:{userId:''},
        fileList: [],
        imgId:'',
        pictureType:'',
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        date: ''
      }
    },
    methods: {
      getImgId(response, file, fileList){
        this.imgId=response.id;
      },
      upload(){
        if(this.imgId==''||this. pictureType==''||this.date=='')
        {
          that.$message('请补全病历信息后再试');
        }
        else {
        var that=this;
        axios.post('http://127.0.0.1:8080/api/upload/identify',
          {
            userId:that.user.userId,
            image_id:that.imgId,
            date:that.date,
            type:that.pictureType,
          }).then(function (res) {
          console.log(res.data)
        })
        }
      }
    },
    created:function () {
      this.user.userId= global_.user.id ;
      console.log(this.user.userId)
      console.log(this.user)
    }
  }
</script>
