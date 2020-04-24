<template>
    <el-row>
        <el-col :span="6"><div class="grid-content bg-purple">
            <div class="demo-image__placeholder">
                <div class="block">

                    <el-image :src="src"></el-image>
                    <span class="demonstration">默认</span>
                </div>
            </div>
        </div></el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
            <div class="demo-image__placeholder">
                <div class="block">

                    <el-image :src="src"></el-image>
                    <span class="demonstration">默认</span>
                </div>
            </div>
        </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
            <div class="demo-image__placeholder">
                <div class="block">

                    <el-image :src="src"></el-image>
                    <span class="demonstration">默认</span>
                </div>
            </div>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">
            <div class="demo-image__placeholder">
                <div class="block">

                    <el-image :src="src"></el-image>
                    <span class="demonstration">默认</span>
                </div>
            </div>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
            <div class="demo-image__placeholder">
                <div class="block">

                    <el-image :src="url" :preview-src-list="srcList"></el-image>
                    <span class="demonstration">{{pictureName}}</span>
                </div>
            </div>
        </div></el-col>
    </el-row>
</template>
<style scoped>
.block{
    margin: 15px;

}
    .grid-content{
    }
</style>
<script>
    import src from '../../../resource/img/001.jpg';
    export default {
        data () {
            return {
                publicPath: process.env.BASE_URL,
                url: src,
                srcList: [
                    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                ]
            };
        }
    };
</script>
