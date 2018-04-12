<template>
    <div id='orderDetail'>
        <el-form  label-width="90px" >
            <el-row  :span="24" class="order_num">
                <label >订单编码:{{orderNum}}</label>
                <input type="text" v-model = "storeCode"   class = "order_num_input"/><i class="el-icon-circle-close close_btn" @click="backOrderCenter"></i>
            </el-row>
            <el-row  :span="24"  class="order_num width">
                <label >用户信息</label>
            </el-row>
            <el-row  class="store_num ">
                <el-col :span="8">
                    <el-form-item label="姓名：">
                        <el-input v-model="userName" placeholder="张三" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手机号：">
                        <el-input v-model="userName" placeholder="13460306050" :maxlength = "10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身份证号：">
                        <el-input v-model="idCard" placeholder="411528199108584152" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="8">
                    <el-form-item label="申请时间：">
                        <el-input v-model="applyTime" placeholder="2017-05-06" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="认证状态：">
                        <el-input v-model="status" placeholder="认证完毕" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row  :span="24"  class="order_num width">
                <label >用户需求</label>
            </el-row>
            <el-row >
                <el-col :span="8">
                    <el-form-item label="用户身份：">
                        <el-input v-model="identiry" placeholder="个人" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="金额：">
                        <el-input v-model="money" placeholder="5000" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="借款期限：">
                        <el-input v-model="money" placeholder="36个月" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row  :span="24"  class="order_num width">
                <label >推荐产品</label>
            </el-row>
            <el-row >
                <el-col :span="1">
                    <span>优先级1</span>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="产品名称：">
                        <el-input v-model="productName" placeholder="善美贷" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="接单公司：">
                        <el-input v-model="orderCompany" placeholder="善林商务" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="处理状态：">
                        <el-input v-model="handle" placeholder="未接单" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">订单改派</el-button>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="1">
                    <span>优先级1</span>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="产品名称：">
                        <el-input v-model="productName" placeholder="善美贷" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="接单公司：">
                        <el-input v-model="orderCompany" placeholder="善林商务" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="处理状态：">
                        <el-input v-model="handle" placeholder="待接单" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">订单改派</el-button>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="1">
                    <span>优先级1</span>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="产品名称：">
                        <el-input v-model="productName" placeholder="工薪贷" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="接单公司：">
                        <el-input v-model="orderCompany" placeholder="善悉商务" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="处理状态：">
                        <el-input v-model="handle" placeholder="未分配" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">订单改派</el-button>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="1">
                    <span>优先级1</span>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="产品名称：">
                        <el-input v-model="productName" placeholder="善美贷" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="接单公司：">
                        <el-input v-model="orderCompany" placeholder="善林商务" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="处理状态：">
                        <el-input v-model="handle" placeholder="未分配" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">订单改派</el-button>
                </el-col>
            </el-row>
            <el-row  :span="24"  class="order_num width200">
                <label >改派操作记录</label>
            </el-row>
            <el-row  >
                <el-col style="width: 1000px; ">
                   <span style="width: 300px; display: inline-block;">改派时间</span>
                    <span style="width: 300px; display: inline-block;">改派说明</span>
                    <span style="width: 300px; display: inline-block;">操作人</span>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    export default{
        name: 'orderDetail',
        data(){
            return {
                orderNum:'JK0001',
                storeCode:'',
                userName:'',
                phoneNum:'',
                idCard:'',
                applyTime:'',
                status:'',
                identiry:'',
                money:'',
                loanTime:'',
                productName:'',
                orderCompany:'',
                handle:''
            }
        },
        methods: {
            backOrderCenter(){

            }
        },
    }
</script>
<style scoped lang='scss'>
    .order_num{
        width: 100%;
        border-bottom:1px solid #bbbbbb;
        padding: 10px ;
        margin: 0;
        .order_num_input{
            border:0;
            border:none;
            outline:none;
        }
        .close_btn{
            float: right;
        }
    }
    .width{
        width: 80px;
        margin-bottom: 20px;
    }
    .width200{
        width: 120px;
        margin-bottom: 20px;
    }
</style>