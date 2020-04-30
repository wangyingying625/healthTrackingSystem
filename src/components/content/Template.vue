<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div class="box">
        <el-select v-model="value" style="margin: 0 15px" placeholder="请选择化验模板">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-table
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
        <el-upload v-if="temp"
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
          <el-button type="info" @click="createTemp" plain style="float: right;margin: 5px;margin-right: 15px">确定
          </el-button>
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
  import Cropper from 'cropper';
  import Vue from 'vue';
  import $ from 'jquery'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue';
  export default {
    components: {ElButton},
    data () {
      return {
        user: {userId: ''},
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        tempList: [],
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        imgId: '',
      }

    },
    mounted () {

    },
    created: function () {
      this.user.userId = global_.user.id
      console.log(this.user.userId)
      console.log(this.user)
      var that = this
      axios.get('http://127.0.0.1:8080/api/upload/showTemp', {
        params: {
          user_id: global_.user.id
        }
      }).then(function (res) {
        console.log(res.data)
        that.tempList=res.data
      })
    },
    methods: {
      getImg (response, file) {
        this.imgId = response.id
        this.option.img = file.url
      },
      getTempInformation(name){
        var that=this;
        axios.get('http://127.0.0.1:8080/api/upload/tempInformation', {
          params: {
            tempName: name
          }
        }).then(function (res) {
          console.log(res.data)
          that.tempInformation=res.data
        })
      },
      // 点击裁剪，这一步是可以拿到处理后的地址
      finish () {
        this.$refs.cropper.getCropBlob((data) => {
          // do something
          console.log(data)
          var objectURL = URL.createObjectURL(data)
          console.log(objectURL)
        })
      },
    }
  }
</script>
