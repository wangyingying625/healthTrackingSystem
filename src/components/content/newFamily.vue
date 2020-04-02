<template>
    <div>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="新建家庭" name="1">
                <div>
                    <el-input v-model="input" placeholder="请输入家庭名"></el-input>
                    <el-button type="info" plain style="float: right;margin: 5px;margin-right: 15px">确定</el-button>
                </div>
            </el-collapse-item>
            <el-collapse-item title="加入已有家庭" name="2">
                <div>
                    <el-input v-model="input" placeholder="请输入家庭账号"></el-input>
                    <el-button type="info" plain style="float: right;margin: 5px;margin-right: 15px">确定</el-button>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<style scoped>

</style>
<script>

    export default {
    }
</script>
