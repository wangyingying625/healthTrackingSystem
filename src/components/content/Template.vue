<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div class="box">
        <el-select v-model="name" style="margin: 0 15px" placeholder="请选择化验模板">
          <el-option
            v-for="item in tempList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
        <el-table v-if="showTable"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name_ch"
            label="中文名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name_en"
            label="英文名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="upper_limit"
            label="上限">
          </el-table-column>
          <el-table-column
            prop="lower_limit"
            label="下限">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位">
          </el-table-column>
        </el-table>

        <router-link to="/newTemp">新建模板</router-link>
        <el-upload style="margin-top: 5px;margin-left: 10px"
                   class="upload-demo"
                   name="file"
                   action="http://127.0.0.1:8080/api/upload/uploadPicture"
                   :data="user"
                   :on-success="getImg"
                   list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div class="cropper-content" v-if="option.img">
          <div class="cropper" style="text-align:center">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :centerBox="option.centerBox"
              :infoTrue="option.infoTrue"
              :fixedBox="option.fixedBox"
            ></vueCropper>
          </div>
          <el-button v-if="isShowCropper"
                     type="danger"
                     @click="finish">确定裁剪图片
          </el-button>

        </div>
        <div v-if="temp">
          <div class="block">
          <el-date-picker
            v-model="date"
            style="width: 100%;margin-top: 10px"
            align="right"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
          <el-button type="info" @click="upload" plain style="float: right;margin: 5px;margin-right: 15px">确定
          </el-button>
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
      </div>
    </el-card>
  </div>
</template>
<style>
  .cropper {
    width: auto;
    height: 300px;
  }
</style>
<script>
  import global_ from '../../global.vue'
  import axios from 'axios'
  import Vue from 'vue';
  import $ from 'jquery'
  import { VueCropper }  from 'vue-cropper'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue';
  export default {
    components: {ElButton, VueCropper},
    data () {
      return {
        date:'',
        indicators:'',
        dialogTableVisible:false,
        user: {userId: ''},
        tempId: '',
        name:'',
        showTable:'',
        temp:false,
        tableData: [{
         }],
        tempList: [],
        blob:'',
        option: {
          img: '', // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 0.8, // 裁剪生成图片的质量
          outputType: 'jpeg', // 裁剪生成图片的格式
          canScale: false, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 300, // 默认生成截图框宽度
          autoCropHeight: 200, // 默认生成截图框高度
          fixedBox: true, // 固定截图框大小 不允许改变
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [7, 5], // 截图框的宽高比例
          full: true, // 是否输出原图比例的截图
          canMoveBox: false, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: false, // 截图框是否被限制在图片里面
          infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        },
        url: '',
        isShowCropper: true,            //是否显示截图框
        fileUpload: null,
        fileinfo: {},
        form: {},
        tempInformation:'',
        options: [],
        value: '',
        imgId: '',
        imageID:''
      }

    },
    mounted () {

    },
    created: function () {
      this.getTempList()
      this.user.userId= localStorage.userId ;
    },
    methods: {
      getImg (response, file) {
        this.imgId = response.id
        this.option.img = file.url
      },
      //获取所有模板的模板名用来显示下拉列表
      getTempList(){
        var that=this;
        axios.get('http://127.0.0.1:8080/api/upload/showTempList',{
          headers: {
            'Authorization': global_.token,
          }
        }).then(function (res) {
          that.tempList=res.data
        })
      },
      // 点击裁剪，这一步是可以拿到处理后的地址
      finish () {
        var that=this
        this.$refs.cropper.getCropBlob((data) => {
          // do something
          var objectURL = URL.createObjectURL(data)
          this.blob=objectURL
          this.temp=true
          // 模拟表单法
          let formData = new FormData();
          formData.append('file', data);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$http.post('http://127.0.0.1:8080/api/upload/uploadTempImg', formData, config).then(function (res) {
              that.image=res.data
          })
        })
      },
      submitChange(){
        let that=this
        axios.get('http://127.0.0.1:8080/api/upload/audi',{
          params: that.indicators
        }).then(function (res) {
          that.$router.push('./index');
        })
      },
      upload() {
        var that=this;
        if(this.date==''){
          this.$message('请输入时间')
        }else {
          let date=Date.parse(that.date);
          console.log(date)
          axios.post('http://127.0.0.1:8080/api/upload/identifyTemp',
            {
              user_id: that.user.userId,
              image_id: that.imgId,
              select: that.image.name,
              date:date,
              temp: that.name,
            }).then(function (res) {
            if (res.data.status == false) {
              that.$message('上传失败，请稍后再试');
            } else {
              that.indicators=res.data.indicators
              that.dialogTableVisible=true
            }
          })
        }
      }
    }
  }
</script>
