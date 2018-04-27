<template>
    <div id="dataupload">
    	<el-button type="primary" @click="backPage">返回上一页</el-button>
        <p class="title">影像合同</p>
        <el-form label-width="90px">

            <div v-show="wdTogg">
                <el-col :span="8">
                    网点名称：{{docnName}}
                </el-col>
                <el-col :span="8">
                    网点负责人：{{siteleader}}
                </el-col>
                <!-- 购销合同 start-->
                <div class="contract_box">
                    <el-col :span="24">
                        <span style="margin: 10px 20px; font-size: 20px;">*购销合同：</span>
                        <span>一共上传{{this.files0.length}}个文件</span>
                    </el-col>
                    <div class="img_box">
                        <div class="img_item_box" v-for='(file,index) in files0' @click="getIndex(index)">
                            <img :src='file.picUrl' alt=""  @click="showModal(file.picUrl,0)">
                            <span class="img_name" v-html="file.picName"></span>
                            <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.picName.slice(file.picName.length-4,file.picName.length).indexOf('doc')>=0">
                            <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.picName.slice(file.picName.length-3,file.picName.length)=='pdf'">
                            <a href="" class="downLoad0"  @click="downLoad(file.picUrl,index)" ><img src="../../../static/image/down.png" alt=""></a>
                        </div>
                    </div>

                </div>
                <!-- 购销合同 end-->

                <!-- 租赁合同 start-->
                <div class="contract_box">
                    <el-col :span="24">
                        <span style="margin: 10px 20px; font-size: 20px;">*租赁合同：</span>
                        <span>一共上传{{this.files1.length}}个文件</span>
                    </el-col>
                    <el-col :span="24">
                        <div class="img_box">
                            <div class="img_item_box" v-for='(file,index) in files1' @click="getIndex(index)">
                                <img :src='file.picUrl' alt=""  @click="showModal(file.picUrl,1)">
                                <span class="img_name" v-html="file.picName"></span>

                                <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.picName.slice(file.picName.length-4,file.picName.length).indexOf('doc')>=0">
                                <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.picName.slice(file.picName.length-3,file.picName.length)=='pdf'">
                                <a href="" class="downLoad1"  @click="downLoad1(file.picUrl,index)" ><img src="../../../static/image/down.png" alt=""></a>
                            </div>
                        </div>
                    </el-col>
                </div>
                <!--租赁合同 end-->

                <!--咨询服务协议 start-->
                <div class="contract_box">
                    <el-col :span="24">
                        <span style="margin: 10px 20px; font-size: 20px;">*咨询服务协议：</span>
                        <span>一共上传{{this.files2.length}}个文件</span>
                    </el-col>
                    <el-col :span="24">
                        <div class="img_box">
                            <div class="img_item_box" v-for='(file,index) in files2' @click="getIndex(index)">
                                <img :src='file.picUrl' alt=""  @click="showModal(file.picUrl,2)">
                                <span class="img_name" v-html="file.picName"></span>

                                <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.picName.slice(file.picName.length-4,file.picName.length).indexOf('doc')>=0">
                                <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.picName.slice(file.picName.length-3,file.picName.length)=='pdf'">
                                <a href="" class="downLoad2"  @click="downLoad2(file.picUrl,index)" ><img src="../../../static/image/down.png" alt=""></a>
                            </div>
                        </div>
                    </el-col>
                </div>
                <!--咨询服务协议 end-->
            </div>



            <!-- 渠道 start-->
            <div v-show="!wdTogg">
                <el-col :span="8">
                    渠道名称：{{docnName}}
                </el-col>
                <el-col :span="8">
                    渠道负责人：{{siteleader}}
                </el-col>
                <div class="contract_box">
                    <el-col :span="24">
                        <span style="margin: 10px 20px; font-size: 20px;">*战略合作框架协议：</span>
                        <span>一共上传{{this.files3.length}}个文件</span>
                    </el-col>
                    <el-col :span="24">
                        <div class="img_box">
                            <div class="img_item_box" v-for='(file,index) in files3' @click="getIndex(index)">
                                <img :src='file.picUrl' alt=""  @click="showModal(file.picUrl,3)">
                                <span class="img_name" v-html="file.picName"></span>

                                <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.picName.slice(file.picName.length-4,file.picName.length).indexOf('doc')>=0">
                                <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.picName.slice(file.picName.length-3,file.picName.length)=='pdf'">
                                <a href="" class="downLoad3"  @click="downLoad3(file.picUrl,index)" ><img src="../../../static/image/down.png" alt=""></a>
                            </div>
                        </div>
                    </el-col>
                </div>


                <!--咨询服务协议 start-->
                <div class="contract_box">
                    <el-col :span="24">
                        <span style="margin: 10px 20px; font-size: 20px;">*咨询服务协议：</span>
                        <span>一共上传{{this.files4.length}}个文件</span>
                    </el-col>
                    <el-col :span="24">
                        <div class="img_box">
                            <div class="img_item_box" v-for='(file,index) in files4' @click="getIndex(index)">
                                <img :src='file.picUrl' alt=""  @click="showModal(file.picUrl,4)">
                                <span class="img_name" v-html="file.picName"></span>
                                <img src="~STATIC/image/word.png" alt="" class="imgType"  v-show="file.picName.slice(file.picName.length-4,file.picName.length).indexOf('doc')>=0">
                                <img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.picName.slice(file.picName.length-3,file.picName.length)=='pdf'">
                                <a href="" class="downLoad4"  @click="downLoad4(file.picUrl,index)" ><img src="../../../static/image/down.png" alt=""></a>
                            </div>
                        </div>
                    </el-col>
                </div>
                <!--咨询服务协议 end-->
                    <!-- 渠道 end-->
            </div>

             <Modal :modelTogg="modelTogg" :imgSrc="imgSrc" :files="tempFile"   @closeModal="closeModal" @upperPage="upperPage" @nextPage="nextPage"></Modal>

        </el-form>
    </div>
</template>

<script>
    import VueFileUpload from '../../components/vue-file-upload.vue'
    import Modal from '../../components/modal2.vue'
    export default {
        data() {
            return {
                region:[],
                docnName:'',
                siteleader:'',
                ExpressCompany:[],
                expressCompanyName:'',
                Couriernumber:'',
                expressNo:'',
                files:[],   //查询到的文件结果数组
                files0: [],
                files1: [],
                files2: [],
                files3: [],
                files4: [],
                routerTogg:0,
                //过滤器回调
                 filters: [{
                     name: "imageFilter",
                     fn(file) {
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
                        this.routerTogg++;
                        if(this.routerTogg == this.files.length){
                            this.$router.push({path:'outletsQuote'});
                        }
                    },
                    onAddFileSuccess: (file) => {

                    }
                },
                reqopts: {
                    formData: {
                         'applicationNo':this.$store.state.pendingContract.applicationNo,
                         'type':2
                    },
                    responseType: 'json',
                    withCredentials: false
                },
                remarks: '',
                modelTogg: false,
                imgSrc: '',
                srcArr: [],
                index: "",
                initIndex:0,
                tempFile:'',
                wdTogg:false,
            }
        },
        methods: {
        	//返回上一页
			backPage(){
				this.$router.push({ path: '/contractmail' });	
			},

            initpage(){
                if(this.$store.state.pendingContract.applicationNo.slice(0,2)=="WD"){
                    this.wdTogg=true;
                    this.docnName = this.$store.state.pendingContract.networkName;
                    this.siteleader = this.$store.state.pendingContract.networkContacts;
                }else if(this.$store.state.pendingContract.applicationNo.slice(0,2)=="QD"){
                    this.wdTogg=false;
                    this.docnName = this.$store.state.pendingContract.channelName;
                    this.siteleader = this.$store.state.pendingContract.channelContacts;
                }
            },
            downLoad(src,index){
                var odownLoad=document.getElementsByClassName("downLoad0")[index];
                this.myBrowser();
                if (this.myBrowser()==="IE"||this.myBrowser()==="Edge"){
                    //IE
                    odownLoad.href="#";
                    var oImg=document.createElement("img");
                    oImg.src=src;
                    oImg.id="downImg";
                    var odown=document.getElementById("down");
                    odown.appendChild(oImg);
                    this.SaveAs5(document.getElementById('downImg').src)
                }else{
                    odownLoad.href=src;
                    odownLoad.download="";
                }
            },
            downLoad1(src,index){
                var odownLoad=document.getElementsByClassName("downLoad1")[index];
                this.myBrowser();
                if (this.myBrowser()==="IE"||this.myBrowser()==="Edge"){
                    //IE
                    odownLoad.href="#";
                    var oImg=document.createElement("img");
                    oImg.src=src;
                    oImg.id="downImg";
                    var odown=document.getElementById("down");
                    odown.appendChild(oImg);
                    this.SaveAs5(document.getElementById('downImg').src)
                }else{
                    odownLoad.href=src;
                    odownLoad.download="";
                }
            },
            downLoad2(src,index){
                var odownLoad=document.getElementsByClassName("downLoad2")[index];
                this.myBrowser();
                if (this.myBrowser()==="IE"||this.myBrowser()==="Edge"){
                    //IE
                    odownLoad.href="#";
                    var oImg=document.createElement("img");
                    oImg.src=src;
                    oImg.id="downImg";
                    var odown=document.getElementById("down");
                    odown.appendChild(oImg);
                    this.SaveAs5(document.getElementById('downImg').src)
                }else{
                    odownLoad.href=src;
                    odownLoad.download="";
                }
            },
            downLoad3(src,index){
                var odownLoad=document.getElementsByClassName("downLoad3")[index];
                this.myBrowser();
                if (this.myBrowser()==="IE"||this.myBrowser()==="Edge"){
                    //IE
                    odownLoad.href="#";
                    var oImg=document.createElement("img");
                    oImg.src=src;
                    oImg.id="downImg";
                    var odown=document.getElementById("down");
                    odown.appendChild(oImg);
                    this.SaveAs5(document.getElementById('downImg').src)
                }else{
                    odownLoad.href=src;
                    odownLoad.download="";
                }
            },
            downLoad4(src,index){
                var odownLoad=document.getElementsByClassName("downLoad4")[index];
                this.myBrowser();
                if (this.myBrowser()==="IE"||this.myBrowser()==="Edge"){
                    //IE
                    odownLoad.href="#";
                    var oImg=document.createElement("img");
                    oImg.src=src;
                    oImg.id="downImg";
                    var odown=document.getElementById("down");
                    odown.appendChild(oImg);
                    this.SaveAs5(document.getElementById('downImg').src)
                }else{
                    odownLoad.href=src;
                    odownLoad.download="";
                }
            },
            //判断浏览器类型
            myBrowser(){
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                var isOpera = userAgent.indexOf("Opera") > -1;
                if (isOpera) {
                    return "Opera"
                }; //判断是否Opera浏览器
                if (userAgent.indexOf("Firefox") > -1) {
                    return "FF";
                } //判断是否Firefox浏览器
                if (userAgent.indexOf("Chrome") > -1){
                    return "Chrome";
                }
                if (userAgent.indexOf("Safari") > -1) {
                    return "Safari";
                } //判断是否Safari浏览器
                if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                    return "IE";
                }; //判断是否IE浏览器
                if (userAgent.indexOf("Trident") > -1) {
                    return "Edge";
                } //判断是否Edge浏览器
            },
            SaveAs5(imgURL) {
                var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
                for(; oPop.document.readyState != "complete"; )
                {
                    if (oPop.document.readyState == "complete")break;
                }
                oPop.document.execCommand("SaveAs");
                oPop.close();
            },

            onPreview(file) {

            },
            onAddItem(files) {
                this.files0 = files;
            },
            deleteItem(file) {
                file.remove();
            },

            clearAll() {
                this.$refs.vueFileUploader.clearAll();
            },
            showModal(val,idx) {

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
                if(this.initIndex == 0) {
                    this.initIndex = val.length;
                }
                this.initIndex--;
                this.imgSrc = val[this.initIndex].picUrl;
            },
            nextPage(val) {
                this.initIndex++;
                if(this.initIndex == val.length) {
                    this.initIndex = 0;
                }
                this.imgSrc = val[this.initIndex].picUrl;

            },

            initPage(){
                this.$http({
                    method:'POST',
                    url:process.env.API+"/contract/detail",
                    body:{
                        "applicationNo":this.$route.params.currentOrder,
                    },
                    headers: {"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken}
                }).then((res)=>{
                    if(res.data.code =="000000"){
                        this.files = res.data.data.picLogs;
                        // 渠道中     5战略   4 咨询
                        // 网点中     2购销     3租赁    4咨询
                        // 遍历循环文件并分类    2表示购销   3表示租赁     4 咨询     5  战略
                        console.log(this.files)
                        for(var i =0;i<this.files.length;i++){
                            if(this.files[i].fileType == 2){
                                this.files0.push({"picUrl":this.files[i].picUrl,"picName":this.files[i].picName})
                            }else if(this.files[i].fileType == 3){
                                this.files1.push({"picUrl":this.files[i].picUrl,"picName":this.files[i].picName})
                            }else if(this.files[i].fileType == 4){
                                this.files2.push({"picUrl":this.files[i].picUrl,"picName":this.files[i].picName})   // 网点咨询服务协议
                                this.files4.push({"picUrl":this.files[i].picUrl,"picName":this.files[i].picName})   // 渠道咨询服务协议
                                console.log(this.files4)
                            }else if(this.files[i].fileType == 5){            // 5战略
                                this.files3.push({"picUrl":this.files[i].picUrl,"picName":this.files[i].picName})
                                console.log(this.files3)
                            }
                        }
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
        components: {
            VueFileUpload,
            Modal
        },
        created() {
            this.initPage();
        },

        computed: {

        },
        mounted: function() {
            this.initpage();
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
    .contract_box{
        margin: 20px 0px;
        width: 100%;
        overflow: hidden;
    }
    #dataupload {
        padding: 0px 30px;
        position: relative;
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
            img{
                width: 200px;
            }
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
                    left:0;
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
                }
                .downLoad0,.downLoad1,.downLoad2,.downLoad3,.downLoad4{
                    img {
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        right: 5px;
                        top: 5px;
                        z-index:20;
                    }
                }
                .close {
                    font-size: 24px;
                    font-weight: bolder;
                    position: absolute;
                    right: 0;
                    top: 0;
                    cursor: pointer;
                }
            }
        }
    }
</style>