<template>
    <div id="dataupload" v-loading="fullscreenLoading">
    	<el-button type="primary" @click="backPage">返回上一页</el-button>
        <p class="title">影像合同上传</p>
        <el-form label-width="90px">
            <el-col :span="8">
                名称：{{docnName}}
            </el-col>
            <el-col :span="16">
                联系人：{{siteleader}}
            </el-col>
            <el-col :span="12">
                <span>*合同寄出快递公司:</span>
                <el-select v-model="expressCompanyName" placeholder="请选择快递公司">
                    <el-option v-for="item in ExpressCompany"
                                :key="item.expressCompanyCode"
                                :lable="item.id"
                                :value="item.expressCompanyName">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <el-form-item label="*快递单号" :span="6" style="display: inline-block;">
                    <el-input  v-model="Couriernumber" placeholder="请输入快递单号"  @keyup.native="textNum" :maxlength="20"></el-input>
                </el-form-item>
            </el-col>





            <!-- 影像合同上传 -->
            <div v-if='wdTogg'>
                <el-col :span="24">
                <span style="margin: 0 20px 0 24px;">*购销合同上传：</span>
                <vue-file-upload url="/terminal-oper/file/upload" ref="vueFileUploader0" v-bind:events='cbEvents'  v-bind:filters="filters"   v-bind:request-options="reqopts0" v-on:onAdd="onAddItem" >
                </vue-file-upload>
                <span v-if="!files0.length">未选择任何文件</span>
                <span v-else>一共选择{{files0.length}}个文件</span>
            </el-col>
            <el-col :span="24">
                <span style="margin: 0 20px 0 25px;">*合同编号:{{contractNumber.buyContractNo}}</span>
                <div class="img_box">
                    <div class="img_item_box" v-for='(file,index) in files0' @click="getIndex(index)">
                        <img :src='onPreview(file)' alt="" @click="showModal(onPreview(file),0)">
                        <span class="img_name" v-html="file.name"></span>

                        <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.name.slice(file.name.length-4,file.name.length).indexOf('doc')>=0">
                        <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.name.slice(file.name.length-3,file.name.length)=='pdf'">

                        <span class="close" @click="deleteItem(file)"> × </span>
                    </div>
                    <div class="no_img" v-show="!this.files0.length">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </el-col>
             <el-col :span="24">
               <span style="margin: 0 20px 0 24px;">*租赁合同上传：</span>
                <vue-file-upload url="/terminal-oper/file/upload" ref="vueFileUploader1" v-bind:events='cbEvents11' v-bind:filters="filters"  v-bind:request-options="reqopts1" v-on:onAdd="onAddItem1" >
                </vue-file-upload>
                <span v-if="!files1.length">未选择任何文件</span>
                <span v-else>一共选择{{files1.length}}个文件</span>
            </el-col>
            <el-col :span="24">
                <span style="margin: 0 20px 0 25px;">*合同编号:{{contractNumber.rentContractNo}}</span>
                <div class="img_box">
                    <div class="img_item_box" v-for='(file,index) in files1' @click="getIndex(index)">
                        <img :src='onPreview(file)' alt="" @click="showModal(onPreview(file),1)">
                        <span class="img_name" v-html="file.name"></span>

                        <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.name.slice(file.name.length-4,file.name.length).indexOf('doc')>=0">
                        <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.name.slice(file.name.length-3,file.name.length)=='pdf'">

                        <span class="close" @click="deleteItem(file)"> × </span>
                    </div>
                    <div class="no_img" v-show="!this.files1.length">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
               <span style="margin: 0 20px 0 24px;">*咨询服务协议上传：</span>
               <vue-file-upload url="/terminal-oper/file/upload" ref="vueFileUploader2" v-bind:events='cbEvents2' v-bind:filters="filters"  v-bind:request-options="reqopts2" v-on:onAdd="onAddItem2" >
               </vue-file-upload>
               <span v-if="!files2.length">未选择任何文件</span>
               <span v-else>一共选择{{files2.length}}个文件</span>
           </el-col>
           <el-col :span="24">
               <span style="margin: 0 20px 0 25px;">*合同编号:{{contractNumber.consultingAgreementNo}}</span>
               <div class="img_box">
                   <div class="img_item_box" v-for='(file,index) in files2' @click="getIndex(index)">
                       <img :src='onPreview(file)' alt="" @click="showModal(onPreview(file),2)">
                       <span class="img_name" v-html="file.name"></span>

                        <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.name.slice(file.name.length-4,file.name.length).indexOf('doc')>=0">
                        <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.name.slice(file.name.length-3,file.name.length)=='pdf'">

                       <span class="close" @click="deleteItem(file)"> × </span>
                   </div>
                   <div class="no_img" v-show="!this.files2.length">
                       <div></div>
                       <div></div>
                       <div></div>
                   </div>
               </div>
           </el-col>

            </div>
            <div v-else>
                <!-- 渠道跳转过来页面 start-->
             <el-col :span="24">
                <span style="margin: 0 20px 0 24px;">*咨询服务协议上传：</span>
                <vue-file-upload1 url="/terminal-oper/file/upload" ref="vueFileUploader3" v-bind:events='cbEvents1' v-bind:filters="filters"  v-bind:request-options="reqopts3" v-on:onAdd="onAddItem3" >
                </vue-file-upload1>
                <span v-if="!files3.length">未选择任何文件</span>
                <span v-else>一共选择{{files3.length}}个文件</span>
            </el-col>
            <el-col :span="24">
                <span style="margin: 0 20px 0 25px;">*合同编号:{{contractNumber.consultingAgreementNo}}</span>
                <div class="img_box">
                    <div class="img_item_box" v-for='(file,index) in files3' @click="getIndex(index)">
                        <img :src='onPreview(file)' alt="" @click="showModal(onPreview(file),3)">
                        <span class="img_name" v-html="file.name"></span>

                         <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.name.slice(file.name.length-4,file.name.length).indexOf('doc')>=0">
                         <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.name.slice(file.name.length-3,file.name.length)=='pdf'">

                        <span class="close" @click="deleteItem(file)"> × </span>
                    </div>
                    <div class="no_img" v-show="!this.files3.length">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
              <span style="margin: 0 20px 0 24px;">*战略合作框架协议</span>
               <vue-file-upload1 url="/terminal-oper/file/upload" ref="vueFileUploader4" v-bind:events='cbEvents1' v-bind:filters="filters"  v-bind:request-options="reqopts4" v-on:onAdd="onAddItem4" >
               </vue-file-upload1>
               <span v-if="!files4.length">未选择任何文件</span>
               <span v-else>一共选择{{files4.length}}个文件</span>
                       </el-col>
                       <el-col :span="24">
               <span style="margin: 0 20px 0 25px;">*合同编号:{{contractNumber.strategicCooperationFrameworkNo}}</span>
               <div class="img_box">
                   <div class="img_item_box" v-for='(file,index) in files4' @click="getIndex(index)">
                       <img :src='onPreview(file)' alt="" @click="showModal(onPreview(file),4)">
                       <span class="img_name" v-html="file.name"></span>

                       <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.name.slice(file.name.length-4,file.name.length).indexOf('doc')>=0">
                       <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.name.slice(file.name.length-3,file.name.length)=='pdf'">

                       <span class="close" @click="deleteItem(file)"> × </span>
                   </div>
                   <div class="no_img" v-show="!this.files4.length">
                       <div></div>
                       <div></div>
                       <div></div>
                   </div>
               </div>
            </el-col>
            </div>
           <!-- 渠道跳转过来页面 end-->

            <el-col :span="24" style="text-align: center;">
                <el-button type="primary" style="width: 160px;" @click="showMod()">上传留档</el-button>
                <el-dialog
                  title="提示"
                  :visible.sync="confirmbox"
                  size="tiny"
                  top="35%"
                  :show-close="false">
                  <span>请确认影像文件与合同编号是否一一对应</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="confirmbox = false">取 消</el-button>
                    <el-button type="primary" @click="submit()" v-show="wdTogg">确 定</el-button>
                    <el-button type="primary" @click="submit1()" v-show="!wdTogg">确 定</el-button>
                  </span>
                </el-dialog>
            </el-col>
    </el-form>
        <Modal :modelTogg="modelTogg" :imgSrc="imgSrc" :files="tempFile"  @closeModal="closeModal" @upperPage="upperPage" @nextPage="nextPage"></Modal>
    </div>
</template>

<script>

    import VueFileUpload from '../../components/vue-file-upload.vue'
    import VueFileUpload1 from '../../components/vue-file-upload.vue'
    import Modal from '../../components/modal0.vue'
    export default {
        data() {
            return {
                fullscreenLoading: false,   //整页loading
                region:[],
                confirmbox:false,           //确认上传弹框
                contractNumber:'',          //合同编号
                docnName:'',
                siteleader:'',
                ExpressCompany:[],
                expressCompanyName:'',
                Couriernumber:'',
                tempFile:"",
                filtes:[],
                files0: [],
                files1: [],
                files2: [],
                files3: [],
                files4: [],
                routerTogg:0,
                routerTogg1:0,
                routerTogg2:0,
                flag:true,
                flag1:true,
                flag2:true,
                routerJump:false,
                routerToggWd:0,
                routerJumpWd:false,
                //过滤器回调
                filters: [{
                    name: "imageFilter",
                    fn(file) {
                        /*var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|pdf|vnd.openxmlformats-officedocument.wordprocessingml.document|msword|'.indexOf(type) !== -1;*/
                        if(/^[A-Z]+$/.test(file.name.split(".")[1])){
                            return false;
                        }else{
                            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|pdf|vnd.openxmlformats-officedocument.wordprocessingml.document|msword|'.indexOf(type) !== -1;
                        }
                    }
                }],
                //事件回调
                cbEvents: {
                    onCompleteUpload: (file, response, status, header) => {
                    this.flag = false;
                    /*this.routerTogg++;
                       console.log(this.routerTogg)
                       if(this.routerTogg ==this.files0.length){
                        this.flag = true;
                       }
                       if(this.flag&&this.flag1&&this.flag2&&this.routerJump){
                            this.$router.push({path:'/contractmail'})    //  TODO
                       })*/
                       /*this.routerTogg++;
                       console.log(this.routerTogg)
                       if(this.routerTogg+this.routerTogg1+this.routerTogg2 ==(this.files0.length+this.files1.length+this.files2.length)&&this.routerJump){
                           // 页面跳转
                           this.$router.push({path:'/contractmail'})    //  TODO
                       }*/
                    },

                },
                cbEvents11: {
                    onCompleteUpload: (file, response, status, header) => {
                        /*this.flag1 = false;
                        this.routerTogg1++;
                           console.log(this.routerTogg1)
                           if(this.routerTogg1 ==this.files1.length){
                            this.flag1 = true;
                           }
                           if(this.flag&&this.flag1&&this.flag2&&this.routerJump){
                                this.$router.push({path:'/contractmail'})    //  TODO
                           })*/
                        /*this.routerTogg1++;
                        console.log(this.routerTogg)
                        if(this.routerTogg+this.routerTogg1+this.routerTogg2 ==(this.files0.length+this.files1.length+this.files2.length)&&this.routerJump){
                            // 页面跳转
                            this.$router.push({path:'/contractmail'})    //  TODO
                        }*/
                    },
                    onAddFileSuccess: (file) => {

                    }
                },
                cbEvents2: {
                    onCompleteUpload: (file, response, status, header) => {
                        /*this.flag2 = false;
                        this.routerTogg2++;
                           console.log(this.routerTogg2)
                           if(this.routerTogg2 ==this.files2.length){
                            this.flag2 = true;
                           }
                           if(this.flag&&this.flag1&&this.flag2&&this.routerJump){
                                this.$router.push({path:'/contractmail'})    //  TODO
                           })*/
                        /*this.routerTogg2++;
                        console.log(this.routerTogg)
                        if(this.routerTogg+this.routerTogg1+this.routerTogg2 ==(this.files0.length+this.files1.length+this.files2.length)&&this.routerJump){
                            // 页面跳转
                            this.$router.push({path:'/contractmail'})    //  TODO
                        }*/
                    },

                },
                cbEvents1: {
                    onCompleteUpload: (file, response, status, header) => {
                        this.routerToggWd++;
                        if(this.routerToggWd ==(this.files3.length+this.files4.length)&&this.routerJumpWd){
                            // 页面跳转

                            this.$router.push({path:'/contractmail'})

                        }
                    },
                    onAddFileSuccess: (file) => {

                    }
                },
                reqopts0: {
                    formData: {
                         'applicationNo':this.$store.state.pendingContract.applicationNo,
                         'type':""
                    },
                    responseType: 'json',
                    withCredentials: false
                },
                reqopts1: {
                    formData: {
                         'applicationNo':this.$store.state.pendingContract.applicationNo,
                         'type':""
                    },
                    responseType: 'json',
                    withCredentials: false
                },
                reqopts2: {
                    formData: {
                         'applicationNo':this.$store.state.pendingContract.applicationNo,
                         'type':""
                    },
                    responseType: 'json',
                    withCredentials: false
                },

                reqopts3: {
                    formData: {
                         'applicationNo':this.$store.state.pendingContract.applicationNo,
                         'type':""
                    },
                    responseType: 'json',
                    withCredentials: false
                },
                reqopts4: {
                    formData: {
                         'applicationNo':this.$store.state.pendingContract.applicationNo,
                         'type':""
                    },
                    responseType: 'json',
                    withCredentials: false
                },
                remarks: '',
                modelTogg: false,
                imgSrc: '',
                srcArr: [],
                index: "",
                pro: "",
                wdTogg:true,
            }
        },
        methods: {
        	  //返回上一页
        		backPage(){
        			this.$router.push({ path: '/contractmail' });
        		},
            showMod(){

                if(this.wdTogg){
                    if(!this.files0.length){
                        this.$message({
                            message: "购销合同文件必须上传",
                            type: 'error'
                        })
                        return false;
                    }else if(!this.files1.length){
                        this.$message({
                            message: "租赁合同文件必须上传",
                            type: 'error'
                        })
                        return false;
                    }else if(!this.files2.length){
                        this.$message({
                            message: "咨询服务协议文件必须上传",
                            type: 'error'
                        })
                        return false;
                    }else if(this.expressCompanyName=="" || this.Couriernumber==""){
                        this.$message({
                            message: "带*号为必填选项",
                            type: 'error'
                        })
                        return false;
                    }else{
                        this.confirmbox = true;
                    }

                }else{
                    if(!this.files3.length){
                        this.$message({
                            message: "咨询服务协议文件必须上传",
                            type: 'error'
                        })
                        return false;
                    }else if(!this.files4.length){
                        this.$message({
                            message: "战略合作框架文件必须上传",
                            type: 'error'
                        })
                        return false;
                    }else if(this.expressCompanyName=="" || this.Couriernumber==""){
                        this.$message({
                            message: "带*号为必填选项",
                            type: 'error'
                        })
                        return false;
                    }else{
                        this.confirmbox = true;
                    }
                }
            },
            initpage(){
              var formCode = this.$route.params.formCode
                if(formCode.pendingContract.applicationNo.slice(0,2)=="WD"){
                    this.docnName = formCode.pendingContract.networkName;
                    this.siteleader = formCode.pendingContract.networkContacts;
                    this.wdTogg = true;
                }else if(formCode.pendingContract.applicationNo.slice(0,2)=="QD"){
                    this.wdTogg = false;
                    this.docnName = formCode.pendingContract.channelName;
                    this.siteleader = formCode.pendingContract.channelContacts;
                }
                console.log(this.wdTogg)
            },
            findContractNoByAppNo(){
                this.$http({
                  method:'POST',
                  url:process.env.API+'/contract/findContractNoByAppNo',
                  // url:'http:192.16.2.33:8082/contract/findContractNoByAppNo',
                  headers:{
                    "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                  },
                  body:{
                    "applicationNo":this.$route.params.formCode.pendingContract.applicationNo
                  }
                }).then((res)=>{
                  if(res.data.code=="000000"){
                    console.log(res.data);
                    this.contractNumber = res.data.data
                  }
                },(res)=>{
                  this.$message({
                    type:'error',
                    message:res.data.messages
                  })
                })
            },
            textNum(){
                this.Couriernumber = this.Couriernumber.replace(/\D/g,'');
            },
            prochange: function() {
                this.city = this.all.city[this.pid];
                this.cid = this.city[0]['id'];
                this.county = this.all.county[this.cid];
                if(this.county.length > 0) {
                    this.ccid = this.county[0]['id']
                }
            },
            citychange: function() {
                this.county = this.all.county[this.cid];
                if(this.county.length > 0) {
                    this.ccid = this.county[0]['id'];
                }
            },
            onStatus(file) {
                if(file.isSuccess) {
                    return "上传成功";
                } else if(file.isError) {
                    return "上传失败";
                } else if(file.isUploading) {
                    return "正在上传";
                } else {
                    return "待上传";
                }
            },
            onPreview(file) {
                var src = window.URL.createObjectURL(file.file);
                return src;
            },
            onAddItem(files) {

                this.files0 = files;


            },
            onAddItem1(files) {

                this.files1 = files;

            },
            onAddItem1(files) {
                this.files1 = files;
            },
            onAddItem2(files) {
                this.files2 = files;
            },
            onAddItem3(files) {
                this.files3 = files;
            },
            onAddItem4(files) {
                this.files4 = files;
            },
            uploadItem(file) {
                file.upload();
            },
            deleteItem(file) {
                file.remove();
            },
            uploadAll() {
                this.$refs.vueFileUploader.uploadAll();
            },
            clearAll() {
                this.$refs.vueFileUploader.clearAll();
            },

            showModal(val,idx) {
                console.log(val+"===="+idx)
                if(idx == 0){
                    this.tempFile = this.files0;
                }else if(idx == 1){
                    this.tempFile = this.files1;
                }else if(idx == 2){
                    this.tempFile = this.files2;
                }else if(idx == 3){
                    this.tempFile = this.files3;
                }else if(idx == 4){
                    this.tempFile = this.files4;
                }
                this.initIndex = 0;
                this.imgSrc =val;
                this.modelTogg = true;

            },
            closeModal() {
                this.modelTogg = false;
            },
            getIndex(val) {
                this.index = val;
            },
            upperPage(val) {
                console.log(val)
                var data = val;
                this.srcArr = [];
                for(var i = 0; i < data.length; i++) {
                    this.srcArr.push(window.URL.createObjectURL(data[i].file));
                }
                this.index--;
                if(this.index == -1) {
                    this.index = this.srcArr.length - 1;
                }
                this.imgSrc = this.srcArr[this.index];
            },
            nextPage(val) {
                var data = val;
                this.srcArr = [];
                for(var i = 0; i < data.length; i++) {
                    this.srcArr.push(window.URL.createObjectURL(data[i].file));
                }
                this.index++;
                if(this.index == this.srcArr.length) {
                    this.index = 0;
                }
                this.imgSrc = this.srcArr[this.index];
            },
            //   提交操作    先判断是否必选条件选中   然后发请求    判断图片是否上传成功   然后   路由跳转
            submit() {

                this.fullscreenLoading = true;
                this.confirmbox=false;
                if(!this.expressCompanyName){
                    this.$message({
                        message: '请选择快递公司',
                        type: 'error'
                    });
                    return false;
                }
                if(!this.Couriernumber){
                    this.$message({
                        message: '请选择快递单号',
                        type: 'error'
                    });
                    return ;
                }

                if(this.expressCompanyName && this.Couriernumber) {

                    this.$http.post(
                        process.env.API + "/contract/archives",
                        {
                            "applicationNo": this.$store.state.pendingContract.applicationNo,
                            "expressCompanyName": this.expressCompanyName,
                            "expressNo": this.Couriernumber
                        }, {
                            headers: {
                                "x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                            }
                        }).then((res) => {
                            this.fullscreenLoading = false;
                        if (res.data.code == "000000") {
                            console.log("upload",this.$refs.vueFileUploader0.uploadAll())
                            this.$refs.vueFileUploader0.uploadAll();
                            this.$refs.vueFileUploader1.uploadAll();
                            this.$refs.vueFileUploader2.uploadAll();
                            this.routerJump=true;
                            setTimeout(()=>{
                                this.$router.push({path:'/contractmail'})    // TODO   判断跳转的部分
                            },4000)
                        }else{
                            this.$message({
                                message:res.data.messages,
                                type:'warning'
                            })
                        }
                    },(res)=>{
                        this.$message({
                            message:res.data.messages,
                            type:'warning'
                        })
                    })
                }else{
                     this.$message({
                        message: "*为必填选项",
                        type: 'error'
                    })
                }
            },

            submit1() {
                this.$refs.vueFileUploader3.uploadAll();
                this.$refs.vueFileUploader4.uploadAll();
                this.fullscreenLoading = true;
                this.confirmbox=false;
                if(!this.expressCompanyName){
                    this.$message({
                        message: '请选择快递公司',
                        type: 'error'
                    });
                    return false;
                }
                if(!this.Couriernumber){
                    this.$message({
                        message: '请选择快递单号',
                        type: 'error'
                    });
                    return ;
                }
                if(this.expressCompanyName && this.Couriernumber) {

                    this.$http.post(
                        process.env.API + "/contract/archives",
                        {
                            "applicationNo": this.$store.state.pendingContract.applicationNo,
                            "expressCompanyName": this.expressCompanyName,
                            "expressNo": this.Couriernumber
                        }, {
                            headers: {
                                "x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
                            }
                        }).then((res) => {
                        if (res.data.code == "000000") {


                            this.routerJumpWd=true;
                            this.fullscreenLoading = false;
                            setTimeout(()=>{
                                this.$router.push({path:'/contractmail'})    // TODO   判断跳转的部分
                            },4000)
                        }else{
                            this.$message({
                                message:res.data.messages,
                                type:'warning'
                            })
                        }
                    },(res)=>{
                        this.$message({
                                message:res.data.messages,
                                type:'warning'
                            })
                    })
                }else{
                     this.$message({
                        message: "*为必填选项",
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

                        this.ExpressCompany = res.data.data;
                    }else{
                        this.$message({
                            message: res.data.messages,
                            type: 'error'
                        })
                    }

                })
            }
        },
        components: {
            VueFileUpload,
            VueFileUpload1,
            Modal
        },
        created() {
            this.reqopts0.formData.type = 2;
            this.reqopts1.formData.type = 3;
            this.reqopts2.formData.type = 4;
            this.reqopts3.formData.type = 4;
            this.reqopts4.formData.type = 5;
        },

        computed: {

        },
        mounted: function() {
            this.searchExpressCompany();
            this.initpage();
            this.findContractNoByAppNo();
        }
    }
</script>
<style lang='scss' scoped>
    .imgType{
        width: 100%;
        width:200px;
        display: block;
        height:200px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 15;
    }
    #dataupload {
        padding: 0px 30px;
        position: relative;
        height: 1200px;
        .title {
            font-size: 24px;
            width: 100%;
        }
        .label_title {
            margin-right: 20px;
        }
        .img_box {
            margin: 20px 0;
            overflew: hidden;
            .no_img {
                width: 100%;
                div {
                    width: 200px;
                    height: 200px;
                    display: inline-block;
                    margin: 0 20px;
                    background: #e5e5e5 url("~STATIC/image/pic.png") no-repeat center;
                    background-size: 10%;
                    span {
                        float: left;
                        line-height: 200px;
                        color: #ababab;
                    }
                }
            }
            .img_item_box {
                width: 200px;
                height: 200px;
                background: #e5e5e5;
                position: relative;
                display: inline-block;
                overflow: hidden;
                margin: 0 20px;
                .img_name{
                    position: absolute;
                    bottom: 0;
                    display: block;
                    text-align: center;
                    width: 100%;
                    background: rgba(0,0,0,0.5);
                    color: #ffffff;
                    height: 20px;
                    overflow: hidden;
                    white-space:nowrap; /*文字不换行*/
                    text-overflow:ellipsis; /*超出则...代替*/
                    -o-text-overflow:ellipsis;  /*opera*/
                    z-index:40;
                }
                img {
                    width: 100%;
                }
                .close {
                    font-size: 24px;
                    font-weight: bolder;
                    position: absolute;
                    right: 0;
                    top: 0;
                    cursor: pointer;
                    z-index:25;
                }
            }
        }
    }
</style>