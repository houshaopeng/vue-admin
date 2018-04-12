<template>
    <div id='wealthProduct'>
        <section>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="产品名称:">
                            <el-input v-model="form.productNum" placeholder="请输入产品名称"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="6">
                    <el-form label-width="80px">
                        <el-form-item label="接单公司:">
                            <el-select v-model="value" placeholder="善林商务">   <!-- TODO -->
                                <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-col :span="8">
                <el-button type="primary">查询</el-button>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" style="margin-left:50px;">添加</el-button>
            </el-col>
            <el-col :span="8">
                <el-button type="primary">删除</el-button>
            </el-col>
            <el-col >

            </el-col>
        </section>
    </div>
</template>
<script>
    export default{
        name: 'wealthProduct',
        data(){
            return {
                form: {
                    productNum: '',
                },
                options1: [{
                    value: '选项1',
                    label: '善林商务'
                },{
                    value: '选项2',
                    label: '善悉商务'
                }],
                value: '选项1',

                gender: [{
                    value: '选项1',
                    label: '男，女'
                },{
                    value: '选项2',
                    label: '男'
                },{
                    value: '选项3',
                    label: '女'
                }],

                identity: [{
                    value: '选项1',
                    label: '工薪族'
                },{
                    value: '选项2',
                    label: '企业主'
                },{
                    value: '选项3',
                    label: '学生'
                }],
            }
        },
        methods: {},
    }
</script>
<style scoped lang='scss'>

</style>