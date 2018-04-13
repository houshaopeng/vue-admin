<template>
    <div id='channelOffering'>
        <el-form  label-width="90px" :model="order">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="订单编号:">
                        <el-input v-model="order.applicationNo" placeholder="请输入订单编号" :maxlength = "12"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="网点联系人:">
                        <el-input v-model="order.networkContacts" placeholder="请输入申请人姓名" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form label-width="80px">
                        <el-form-item label="推荐渠道:">
                            <el-select v-model="order.recommendChannelId" placeholder="请选择推荐渠道">   <!-- TODO -->
                                <el-option
                                        v-for="item in channels"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="联系电话:">
                        <el-input  v-model="order.contactsMobile" placeholder="请输入申请人电话"  onKeypress="if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"  @blur="yanzhengtel" :maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="网点名称:">
                        <el-input v-model="order.networkName" placeholder="请输入网点名称" :maxlength = "16"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="渠道联系人:">
                        <el-input v-model="order.channelContacts" placeholder="请输入渠道联系人" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="渠道名称:">
                        <el-input v-model="order.channelName" placeholder="请输入渠道名称" :maxlength = "30"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='2'>
                    <el-button type="primary" @click ="printContract">打印合同</el-button>
                </el-col>
                <el-col :span='2'>
                    <el-button type="primary" @click="contractMailing1">合同邮寄</el-button>

                    <el-dialog title="合同邮寄" :visible.sync="contractMailing">
                      <el-form class="form":model="form">
                        <el-form-item label="购销合同编号" :label-width="formLabelWidth">
                          <el-input v-model="form.buyContractNo" auto-complete="off" placeholder="请输入购销合同编号"></el-input>
                        </el-form-item>
                        <el-form-item label="租赁合同编号" :label-width="formLabelWidth">
                          <el-input v-model="form.rentContractNo" auto-complete="off" placeholder="请输入租赁合同编号"></el-input>
                        </el-form-item>
                        <el-form-item label="咨询服务协议编号" :label-width="formLabelWidth">
                          <el-input v-model="form.consultingAgreementNo" auto-complete="off" placeholder="请输入咨询服务协议编号"></el-input>
                        </el-form-item>
                        <el-form-item class="float" label="快递公司" :label-width="formLabelWidth">
                          <el-select v-model="form.expressCompanyName" placeholder="请选择快递公司">
                            <el-option v-for="item in ExpressCompany"
                                        :key="item.expressCompanyCode"
                                        :lable="item.id"
                                        :value="item.expressCompanyName">

                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item class="float kuaidi" label="快递单编号" :label-width="formLabelWidth">
                          <el-input v-model="form.expressNo" auto-complete="off" placeholder="请输入快递单号"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="contractMailing = false">取 消</el-button>
                        <el-button type="primary" @click="contractMailingconfirm">确 定</el-button>
                      </div>
                    </el-dialog>

                </el-col>
                <el-col :span='2'>
                    <el-button type="primary" @click = "sureFile">确认留档</el-button>
                </el-col>
                <el-col :span='2'>
                    <el-button type="primary" @click = "exportData">导出</el-button>
                </el-col>
                </el-col>
                <el-col :span='2'>
                    <el-button class="query" type="primary" @click = "query">查询</el-button>
                </el-col>
            </el-row>
        </el-form>
        <template>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="打印合同" name="first">
                    <template>
                        <el-table
                                :data="tableData0"
                                height ="350"
                                border
                                style="width: 100%"
                                highlight-current-row
                                @current-change="handoverOrder"
                                >
                            <el-table-column
                                    prop="applicationNo"
                                    label="订单编号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="channelName"
                                    label="渠道名称"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="channelContacts"
                                    label="渠道联系人">
                            </el-table-column>
                            <el-table-column
                                    prop="networkName"
                                    label="网点名称">
                            </el-table-column>
                            <el-table-column
                                    prop="networkContacts"
                                    label="网点联系人">
                            </el-table-column>
                            <el-table-column
                                    prop="soureName"
                                    label="推荐渠道"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="userName"
                                    label="申请人"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="contractTypes"
                                    label="合同类型"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="applicationTime"
                                    label="申请时间"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="操作"
                                    width="180">
                                    <template scope="scope">
                                        <el-button @click="Reprint" type="text" size="small">重新打印</el-button>
                                        <el-button @click="printingComplete"  type="text" size="small">打印完成</el-button>
                                    </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="寄回合同" name="second">
                    <template>
                        <el-table
                                :data="tableData1"
                                height ="350"
                                border
                                style="width: 100%"
                                highlight-current-row
                                @current-change="handoverOrder"
                                >
                            <el-table-column
                                    prop="applicationNo"
                                    label="订单编号"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="channelName"
                                    label="渠道名称"
                                    width="">
                            </el-table-column>
                            <el-table-column
                                    prop="channelContacts"
                                    label="渠道联系人">
                            </el-table-column>
                            <el-table-column
                                    prop="networkName"
                                    label="网点名称">
                            </el-table-column>
                            <el-table-column
                                    prop="networkContacts"
                                    label="网点联系人">
                            </el-table-column>
                            <el-table-column
                                    prop="soureName"
                                    label="推荐渠道">
                            </el-table-column>
                            <el-table-column
                                    prop="userName"
                                    label="申请人">
                            </el-table-column>
                            <el-table-column
                                    prop="contractTypes"
                                    label="合同类型">
                            </el-table-column>
                            <el-table-column
                                    prop="applicationTime"
                                    label="申请时间">
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="寄出合同" name="third">
                    <template>
                        <el-table
                                :data="tableData2"
                                height ="350"
                                border
                                style="width: 100%"
                                highlight-current-row
                                @current-change="handoverOrder"
                                >
                            <el-table-column
                                    prop="applicationNo"
                                    label="订单编号">
                            </el-table-column>
                            <el-table-column
                                    prop="channelName"
                                    label="渠道名称">
                            </el-table-column>
                            <el-table-column
                                    prop="channelContacts"
                                    label="渠道联系人">
                            </el-table-column>
                            <el-table-column
                                    prop="networkName"
                                    label="网点名称">
                            </el-table-column>
                            <el-table-column
                                    prop="networkContacts"
                                    label="网点联系人">
                            </el-table-column>
                            <el-table-column
                                    prop="soureName"
                                    label="推荐渠道">
                            </el-table-column>
                            <el-table-column
                                    prop="userName"
                                    label="申请人">
                            </el-table-column>
                            <el-table-column
                                    prop="contractTypes"
                                    label="合同类型">
                            </el-table-column>
                            <el-table-column
                                    prop="applicationTime"
                                    label="申请时间">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="寄出快递公司">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="寄出快递单号">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="邮寄时间">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="180">
                                    <template scope="scope">
                                        <!-- Table -->
                                        <el-button type="text" @click="queryKaudi">查询快递</el-button>

                                        <el-dialog class="dialog" top="50" title="快递信息" :visible.sync="dialogTableVisible">
                                            <span class="close" @click="closekuaidi"></span>
                                          <el-table :data="gridData">
                                            <el-table-column property="time" label="时间"></el-table-column>
                                            <el-table-column property="context" label="快递详情" ></el-table-column>
                                          </el-table>
                                          <el-button type="primary" @click="ok">确认</el-button>
                                        </el-dialog>

                                    </template>

                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="合同留档" name="fourth">
                    <template>
                        <el-table
                                :data="tableData3"
                                height ="350"
                                border
                                style="width: 100%"
                                highlight-current-row
                                @current-change="handoverOrder"
                                >
                            <el-table-column
                                    prop="applicationNo"
                                    label="订单编号"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="channelName"
                                    label="渠道名称"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="channelContacts"
                                    label="渠道联系人">
                            </el-table-column>
                            <el-table-column
                                    prop="networkName"
                                    label="网点名称">
                            </el-table-column>
                            <el-table-column
                                    prop="networkContacts"
                                    label="网点联系人">
                            </el-table-column>
                            <el-table-column
                                    prop="soureName"
                                    label="推荐渠道">
                            </el-table-column>
                            <el-table-column
                                    prop="userName"
                                    label="申请人">
                            </el-table-column>
                            <el-table-column
                                    prop="contractTypes"
                                    label="合同类型">
                            </el-table-column>
                            <el-table-column
                                    prop="applicationTime"
                                    label="申请时间">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="操作"
                                    width="180">
                                    <template scope="scope">
                                        <el-button @click="ViewContract" type="text">查看合同</el-button>
                                    </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </template>
        <div id="clearButton" style="text-align:center;">
            <el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total"
                           layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes"
                           @size-change="sizeChange" @current-change="pageIndexChange">
            </el-pagination>
        </div>

        <div class="address">
            <span>*联系地址:</span>
            <address-picker :opts="obj" v-model="address" id="address-picker"></address-picker>
            <input type="text" placeholder="请输入具体地址" >
        </div>
    </div>
</template>
<script>
import vue from "vue"
    export default{
        name: '',
        data(){
            return {
                address:{},
                obj: { label: { province: '所在省', city: '所在市', district: '' }, default: { province: '河南', city: '信阳', district: '息县' }, noLabel: true,disable:true },
                 gridData: [],
                 tel:'',
                contractMailing:false,          //合同邮寄数据
                Contractinformation:'',         //查看合同返回信息
                form: {
                  buyContractNo: '',
                  rentContractNo: '',
                  consultingAgreementNo: '',
                  expressCompanyName: '',
                  expressNo: '',
                },
                formLabelWidth: '130px',
                order:{
                    applicationNo:'',
                    networkContacts:'',
                    recommendChannelId:'',
                    contactsMobile:'',
                    networkName:'',
                    channelContacts:'',
                    channelName:'',
                    expressNo:'',
                    verifyStatus:'',
                },
                order0:{
                    applicationNo:'',
                    networkContacts:'',
                    recommendChannelId:'',
                    contactsMobile:'',
                    networkName:'',
                    channelContacts:'',
                    channelName:'',
                    expressNo:'',
                    verifyStatus:'0',
                },
                order1:{
                    applicationNo:'',
                    networkContacts:'',
                    recommendChannelId:'',
                    contactsMobile:'',
                    networkName:'',
                    channelContacts:'',
                    channelName:'',
                    expressNo:'',
                    verifyStatus:'1',
                },
                order2:{
                    applicationNo:'',
                    networkContacts:'',
                    recommendChannelId:'',
                    contactsMobile:'',
                    networkName:'',
                    channelContacts:'',
                    channelName:'',
                    expressNo:'',
                    verifyStatus:'2',
                },
                order3:{
                    applicationNo:'',
                    networkContacts:'',
                    recommendChannelId:'',
                    contactsMobile:'',
                    networkName:'',
                    channelContacts:'',
                    channelName:'',
                    expressNo:'',
                    verifyStatus:'3',
                },
                currentOrder:'',    //当前选中订单编号
                currentType:'',     //当前选中订单类型
                ExpressCompany:'',  // 查询快递公司数据
                dialogTableVisible: false,  //快递信息展示
                kuaidiDetail:'',            //快递详情
                channels:[
                    {
                        value: '邦德公司',
                        label: '邦德公司'
                    }, {
                        value: '中捷代购',
                        label: '中捷代购'
                    }, {
                        value: 'DELL渠道',
                        label: 'DELL渠道'
                    }, {
                        value: '内部渠道',
                        label: '内部渠道'
                    },
                ],
                value:"选项1",

                // TAB切换
                activeName: 'first', //tab切换
                tableData0: [{
                    applicationNo: '',      //订单编号
                    channelName: '',       //渠道名称
                    dotName: '',           //渠道联系人
                    contacts:'',           //网点名称
                    networkName:'',        //网点联系人
                    soureName:'',         //推荐渠道
                    userName:'',           //申请人
                    contractTypes:'',     //合同类型
                    applicationTime:''    //申请时间
                }],
                tableData1: [{
                    applicationNo: '',      //订单编号
                    channelName: '',       //渠道名称
                    dotName: '',           //渠道联系人
                    contacts:'',           //网点名称
                    networkName:'',        //网点联系人
                    soureName:'',         //推荐渠道
                    userName:'',           //申请人
                    contractTypes:'',     //合同类型
                    applicationTime:''    //申请时间
                }],
                tableData2: [{
                    applicationNo: '',      //订单编号
                    channelName: '',       //渠道名称
                    dotName: '',           //渠道联系人
                    contacts:'',           //网点名称
                    networkName:'',        //网点联系人
                    soureName:'',         //推荐渠道
                    userName:'',           //申请人
                    contractTypes:'',     //合同类型
                    applicationTime:''    //申请时间
                }],
                tableData3: [{
                    applicationNo: '',      //订单编号
                    channelName: '',       //渠道名称
                    dotName: '',           //渠道联系人
                    contacts:'',           //网点名称
                    networkName:'',        //网点联系人
                    soureName:'',         //推荐渠道
                    userName:'',           //申请人
                    contractTypes:'',     //合同类型
                    applicationTime:''    //申请时间
                }],
                pageSize: null, // 每一页展示数据条数
                pageIndex: 0,
                total: 0,       //总页数
                pageSizes: [20, 30, 50],     //切换每页展示数据条数
                pendingContract:"",
            }

        },
        methods: {
            aa(){

                /*this.obj= {  default: { province: '河南', city: '信阳', district: '息县' } }*/
            },
            yanzhengtel(){
                if (!(/^1[34578]\d{9}$/.test(this.order.contactsMobile))) {
                    this.$message({
                      type: 'info',
                      message:"输入手机号有误"
                    })
                };
            },
            handoverOrder(row){
                this.currentOrder = row.applicationNo; //点击选中当前行 并拿到当前行订单编号
                this.pendingContract = row;
                console.log(this.pendingContract)
                this.currentType  =row.contractTypes;
            },
            printContract(){            //打印合同 首先判断是否选中当前的订单
                if(this.currentOrder==""){
                    this.$message({
                      type: 'info',
                      message:"请先选择订单"
                    });
                }else{

                    this.$alert('请确认您选择的订单编号:'+this.currentOrder, '您即将打印以下订单:', {
                      confirmButtonText: '确定',
                      callback: action => {
                        const  params = {applicationNo:this.currentOrder}
                        window.location.href = process.env.API+"/contract/buySalePrint?applicationNo="+this.pendingContract.applicationNo;
                        // this.$http({
                        //     method:"GET",
                        //     url:process.env.API+"/contract/leasePrint",
                        //     params:params,
                        //     headers: {
                        //         "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                        //     }

                        // }).then((res)=>{
                        //     console.log(res)
                        //     if(res.data.code =="000000"){

                        //         this.$message({
                        //           type: 'info',
                        //           message: `action: ${ action }`
                        //         });

                        //     }
                        // }),(res)=>{
                        //     this.$message({
                        //       message: "网络请求错误",
                        //       type: 'error'
                        //     })
                        // }

                      }
                    });
                }


            },
            Reprint(){                          //重新打印
                this.printContract();
            },
            printingComplete(){                 //打印完成 跳转到待邮寄合同页面 重新渲染数据
                this.$http({
                    method:"POST",
                    url:process.env.API+"/contract/printFinish",
                    body:{"applicationNo":this.currentOrder},
                    headers: {
                        "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                    }
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.code =="000000"){
                        this.$message({
                            message: res.data.messages,
                            type: 'success'
                        })
                        this.activeName = "second"
                        this.$http({
                            method:'POST',
                            url:process.env.API+"/contract/search",
                            body:JSON.stringify(this.order1),
                            headers: {
                                "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                            }
                        }).then((res)=>{
                            console.log("待邮寄查询成功")
                            if(res.data.code = "000000"){
                                this.tableData1=res.data.data;
                                if(res.data.pageInfo){
                                    this.pageSize=res.data.pageInfo.pageSize;
                                    this.total = res.data.pageInfo.total;
                                    this.pageIndex = res.data.pageInfo.pageNum;
                                    for(var i=0; i<this.tableData1.length;i++){
                                        this.tableData1[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
                                    }
                                }

                            }

                        }),(res)=>{
                            this.$message({
                              message: "网络请求错误",
                              type: 'error'
                            })
                        }

                    }else{
                        this.$message({
                            message: res.data.messages,
                            type: 'error'
                        })
                    }
                })

            },
            hetongcode(){   //查询合同编号

                this.$http({        //查询合同编号
                    method:'POST',
                    url:process.env.API+"/numberRule/generate",
                    body:{
                        "applicationNo":this.currentOrder,
                        "contractType":"WD"
                    },
                    headers: {
                        "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                    }
                }).then((res)=>{
                    if(res.data.code == "000000"){
                        this.form.buyContractNo = res.data.data[0].buySaleContractNo;
                        this.form.rentContractNo = res.data.data[0].leaseContractNo;
                        this.form.consultingAgreementNo = res.data.data[0].consultationServiceNo;
                    }


                }),(res)=>{
                    this.$message({
                      message: "网络请求错误",
                      type: 'error'
                    })
                }
            },
            contractMailing1(){             // 合同邮寄
                if(this.currentOrder==""){
                    this.$message({
                      type: 'info',
                      message:"请先选择订单"
                    });
                }else{
                    this.contractMailing =true;
                     this.hetongcode();
                }
            },
            contractMailingconfirm(){                   //合同邮寄确认
                this.$http.post(
                        process.env.API+"/contract/mail",
                        {
                            "applicationNo":this.currentOrder,
                            "buyContractNo":this.form.buyContractNo,
                            "consultingAgreementNo":this.form.consultingAgreementNo,
                            "expressCompanyName":this.form.expressCompanyName,
                            "expressNo":this.form.expressNo,
                            "rentContractNo":this.form.rentContractNo

                        },
                        {
                            headers: {
                                "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                            }
                        }
                    ).then((res)=>{
                        console.log(res)
                        if(res.data.code =="000000"){
                            console.log(res.data.data)
                            this.$message({
                                type: 'success',
                                message: res.data.messages
                              });

                            this.contractMailing = false;
                            this.activeName = "third"

                            this.$http({
                                    method:'POST',
                                    url:process.env.API+"/contract/search",
                                    body:JSON.stringify(this.order2),
                                    headers: {
                                        "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                                    }
                                }).then((res)=>{
                                    console.log("待接收查询成功")
                                    if(res.data.code == "000000"){
                                        this.tableData2=res.data.data;
                                        this.pageSize=res.data.pageInfo.pageSize;
                                        this.total = res.data.pageInfo.total;
                                        this.pageIndex = res.data.pageInfo.pageNum;
                                        for(var i=0; i<this.tableData2.length;i++){
                                            this.tableData2[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
                                        }
                                    }

                                }),(res)=>{
                                    this.$message({
                                      message: "网络请求错误",
                                      type: 'error'
                                    })
                                }


                            }else{
                                this.$message({
                                    message: res.data.messages,
                                    type: 'error'
                                })
                            }
                    })
            },
            queryKaudi(){                               //快递查询
                this.$http({
                        method:'POST',
                        url:process.env.API+"/contract/searchExpress",
                        body:{
                           "expressNo":"885488776116625099",
                           "expressType":"yuantong" //this.ExpressCompany.expressCompanyCode
                        },
                        headers: {"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken}
                    }).then((res)=>{
                        this.dialogTableVisible = true;
                       this.gridData = res.data.data
                    }),(res)=>{
                        this.$message({
                          message: "网络请求错误",
                          type: 'error'
                        })
                    }
            },
            ok(){
                this.activeName = "fourth";
                this.dialogTableVisible = false;
            },
            closekuaidi(){
                    this.dialogTableVisible =false;
            },
            sureFile(){                          // 确认留档
                if(this.pendingContract!=""){
                    this.$store.commit('PENDING_CONTRACT',this.pendingContract);
                    this.$router.push({path:'/Contractretention'})
                    this.activeName = "fourth"
                }else{
                    this.$message({
                        message: "请先选择订单",
                        type: 'info'
                    })
                }



            },
            exportData(){                       // 导出数据
                if(this.pendingContract==""){
                    this.$message({
                      type: 'info',
                      message:"请先选择订单"
                    });
                }else{
                    if(this.activeName == "first"){
                        this.pendingContract.verifyStatus="0"
                    }else if(this.activeName == "second"){
                        this.pendingContract.verifyStatus="1"
                    }else if(this.activeName == "third"){
                        this.pendingContract.verifyStatus="2"
                    }else if(this.activeName == "fourth"){
                        this.pendingContract.verifyStatus="3"
                    }
                    console.log(process.env)
                    window.location.href=process.env.API+"/contract/export?applicatonNo="+this.pendingContract.applicationNo
                    +"&channelContacts="+this.pendingContract.channelContacts
                    +"&channelName="+this.pendingContract.channelName
                    +"&contactsMobile="+""
                    +"&expressNo="+this.pendingContract.expressNo
                    +"&networkContacts="+this.pendingContract.networkContacts
                    +"&networkName="+this.pendingContract.networkName
                    +"&recommendChannelId="+""
                    +"&verifyStatus="+this.pendingContract.verifyStatus
                }


            },
            ViewContract(){                     //查看合同
                if(this.pendingContract==""){
                    this.$message({
                      type: 'info',
                      message:"请先选择订单"
                    });
                }else{
                    this.$http({
                            method:'POST',
                            url:process.env.API+"/contract/detail",
                            body:{
                               "applicationNo":this.currentOrder,
                            },
                            headers: {"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken}
                        }).then((res)=>{

                            if(res.data.code =="000000"){
                                sessionStorage.setItem("contractdetail",JSON.stringify(res.data))
                                this.Contractinformation=res.data.data.picLogs;
                                this.$message({
                                    type: 'success',
                                    message: res.data.messages
                                  });
                                this.$router.push({path:'/ViewContract'})

                            }else{
                                this.$message({
                                    message: res.data.messages,
                                    type: 'error'
                                })
                            }

                        }),(res)=>{
                            this.$message({
                              message: "网络请求错误",
                              type: 'error'
                            })
                        }
                    }


            },
            handleClick(tab, event) {
                if(tab.name == "first"){
                    this.$http({
                            method:'POST',
                            url:process.env.API+"/contract/search",
                            body:JSON.stringify(this.order0),
                            headers: {
                                "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                            }
                        }).then((res)=>{
                            console.log("待打印查询成功")
                            if(res.data.code = "000000"){
                                this.tableData0=res.data.data;
                                if(res.data.pageInfo){
                                    this.pageSize=res.data.pageInfo.pageSize;
                                    this.total = res.data.pageInfo.total;
                                    this.pageIndex = res.data.pageInfo.pageNum;
                                    for(var i=0; i<this.tableData0.length;i++){
                                        this.tableData0[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
                                    }
                                }
                            }

                        }),(res)=>{
                            this.$message({
                              message: "网络请求错误",
                              type: 'error'
                            })
                        }
                }else if(tab.name == "second"){
                    this.$http({
                            method:'POST',
                            url:process.env.API+"/contract/search",
                            body:JSON.stringify(this.order1),
                            headers: {
                                "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                            }
                        }).then((res)=>{
                            console.log("待邮寄查询成功")
                            if(res.data.code = "000000"){
                                this.tableData1=res.data.data;
                                if(res.data.pageInfo){
                                    this.pageSize=res.data.pageInfo.pageSize;
                                    this.total = res.data.pageInfo.total;
                                    this.pageIndex = res.data.pageInfo.pageNum;
                                    for(var i=0; i<this.tableData1.length;i++){
                                        this.tableData1[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
                                    }
                                }

                            }

                        }),(res)=>{
                            this.$message({
                              message: "网络请求错误",
                              type: 'error'
                            })
                        }
                }else if(tab.name == "third"){
                    this.$http({
                            method:'POST',
                            url:process.env.API+"/contract/search",
                            body:JSON.stringify(this.order2),
                            headers: {
                                "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                            }
                        }).then((res)=>{
                            console.log("待接收查询成功")

                            if(res.data.code == "000000"){
                                this.tableData2=res.data.data;
                                if(res.data.pageInfo){
                                    this.pageSize=res.data.pageInfo.pageSize;
                                    this.total = res.data.pageInfo.total;
                                    this.pageIndex = res.data.pageInfo.pageNum;
                                    for(var i=0; i<this.tableData2.length;i++){
                                        this.tableData2[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
                                    }
                                }

                            }

                        }),(res)=>{
                            this.$message({
                              message: "网络请求错误",
                              type: 'error'
                            })
                        }
                }else if(tab.name == "fourth"){
                    this.$http({
                            method:'POST',
                            url:process.env.API+"/contract/search",
                            body:JSON.stringify(this.order3),
                            headers: {
                                "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                            }
                        }).then((res)=>{
                            console.log("合同留档查询成功")
                            if(res.data.code == "000000"){
                                this.tableData3=res.data.data;
                                if(res.data.pageInfo){
                                    this.pageSize=res.data.pageInfo.pageSize;
                                    this.total = res.data.pageInfo.total;
                                    this.pageIndex = res.data.pageInfo.pageNum;
                                    for(var i=0; i<this.tableData3.length;i++){
                                        this.tableData3[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
                                    }
                                }

                            }

                        }),(res)=>{
                            this.$message({
                              message: "网络请求错误",
                              type: 'error'
                            })
                        }
                }
            },
            query(){
                var body = null;                                  //查询
                if(this.activeName == "first"){
                    this.order0=this.order;
                    this.order0.verifyStatus ="0"
                    body = this.order0;
                }else if(this.activeName == "second"){
                    this.order1=this.order;
                    this.order1.verifyStatus ="1"
                    body = this.order1;
                }else if(this.activeName == "third"){
                    this.order2=this.order;
                    this.order2.verifyStatus ="2"
                    body = this.order2;
                }else if(this.activeName == "fourth"){
                    this.order3=this.order;
                    this.order3.verifyStatus ="3"
                    body = this.order3;
                }
                this.$http({
                        method:'POST',
                        url:process.env.API+"/contract/search",
                        body:JSON.stringify(body),
                        headers: {
                            "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                        }
                    }).then((res)=>{

                        if(res.data.code == "000000"){

                            if(this.activeName == "first"){
                                this.tableData0=res.data.data;
                                if(res.data.pageInfo){
                                    this.pageSize=res.data.pageInfo.pageSize;
                                    this.total = res.data.pageInfo.total;
                                    this.pageIndex = res.data.pageInfo.pageNum;
                                    for(var i=0; i<this.tableData0.length;i++){
                                        this.tableData0[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
                                    }
                                }
                            }else if(this.activeName == "second"){
                                this.tableData1=res.data.data;
                            }else if(this.activeName == "third"){
                                this.tableData2=res.data.data;
                            }else if(this.activeName == "fourth"){
                                this.tableData3=res.data.data;
                            }
                            this.order ={
                                    applicationNo:'',
                                    networkContacts:'',
                                    recommendChannelId:'',
                                    contactsMobile:'',
                                    networkName:'',
                                    channelContacts:'',
                                    channelName:'',
                                    expressNo:'',
                                    verifyStatus:'',
                                }

                        }else{
                            this.tableData0 =[];
                            this.$message({
                              message: "未查询到相关信息",
                              type: 'info'
                            })
                        }


                    }),(res)=>{
                        this.$message({
                          message: "网络请求错误",
                          type: 'error'
                        })
                    }
            },
            searchExpressCompany(){                         //查询快递公司
                this.$http({
                        method:'POST',
                        url:process.env.API+"/contract/searchAllExpress",
                        headers: {
                            "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                        }

                    }).then((res)=>{
                        if(res.data.code =="000000"){
                            this.$message({
                                type: 'success',
                                message: "快递公司信息"+res.data.messages
                              });
                            this.ExpressCompany = res.data.data;
                        }else{
                            this.$message({
                                message: res.data.messages,
                                type: 'error'
                            })
                        }

                    }),(res)=>{
                        this.$message({
                          message: "网络请求错误",
                          type: 'error'
                        })
                    }
            },
            handleCurrentChange(val) {           // 分页请求查询
                this.currentPageNum = val;
            },
            sizeChange: function (pageSize) {
                this.pageSize = pageSize;
            },
            pageIndexChange: function (pageIndex) {
                this.pageIndex = pageIndex;
            },
        },
        watch:{
            address:function(newval){


            }
        },
        mounted:function(){
            console.log(this.address)
            this.searchExpressCompany();
            this.query();

        }
    }
</script>
<style  lang='scss'>
    .query{
        float: right;
        margin-right: -200px;
    }
    .float{
        position: absolute;
        top: 0;
        right:-100%;
    }
    .kuaidi{
        top:60px;
    }
    .form{
        width:50%;
        position: relative;
    }
    .close{
        position: absolute;
        top: 20px;
        right:20px;
        background:rgba(255,255, 255, 0.0);
        width: 20px;
        height: 20px;
        cursor:pointer;
    }
    .dialog{
        text-align: center;
    }
    .address{
        height:40px;
        span{
            float: left;
            line-height: 40px;
        }
        #address-picker{
            display: inline-block;
            float: left;
            font-size:24px;
            height: 40px;
            select{
                min-width: 80px;
                margin: 0 10px;
                height: 40px;
                border-radius:5px ;
                border: 1px solid #cccccc;
                outline: none;
            }
        }
        input{
            width: 180px;
            float: left;
            height: 36px;
            border-radius:5px ;
            padding: 0 10px;
            border: 1px solid #cccccc;
            outline: none;
        }
    }


</style>