<template>
  <el-form :model="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" >
    <div class="title">
      <h3>后台管理系统登录</h3>
    </div>
    <div class="input_container">
      <el-form-item prop="account"  style="width: 300px;margin:20px auto 0">
        <div class="userName">
          <label >用户名:</label>
          <input  type="text"  v-model="ruleForm2.account" auto-complete="off" placeholder="请输入用户名" :maxlength='10' @blur="testUserName()"/>
          <p class="check_tit" :class="{show:userTogg}">用户名不能为空</p>
        </div>
        <div class="userPassword">
          <label >&nbsp;&nbsp;&nbsp;密码:</label>
          <input type="password" v-model="ruleForm2.checkPass"  auto-complete="off" placeholder="请输入密码"  @blur="testPassWord()" @keyup.enter="handleSubmit" @keydown="detectCapsLock($event)" :maxlength='16'/>
          <p class="check_tit" :class="{show:passWordTogg}">密码不能为空</p>
          <p class="capital_tit" v-show="capitalTogg">大写字母已经锁定</p>
        </div>
        <!--<el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" :maxlength='10' style="background: red"></el-input>-->
      </el-form-item>
      <el-row v-show="loginErrorTime>=2? true:false" style="width:300px;margin-left:25px;">
        <el-col  :span="10">
          <div>
            <el-input type="text" v-model ="localVerificationCode" auto-complete="off" placeholder="请输入验证码" style="display:inline-block"  @keyup.enter.native="handleSubmit" :maxlength='4'></el-input>
          </div>
        </el-col>
        <el-col :span="8" style="width:80px">
           <div >
             <img :src="verificationImg" style="margin-left:10px">
           </div>
        </el-col>
        <el-col :span="6">
          <div >
          <el-button type="text" class="button" @click="nextVerification" style="text-align:left">看不清，换一张</el-button>
          </div>
        </el-col>
      </el-row>
      <br>
      <el-form-item style="margin:0 auto 20px">
        <el-button type="primary"   @click.native.prevent="handleSubmit" :loading="logining" class="button">立即登录</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>

  // import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'                         // 进度条插件
  import md5 from 'js-md5'                                    // md5加密
  export default {
    data() {
      return {
        logining: false,                                     // loading 切换
        userInfo:{                                           // 用户信息

        },
        loginErrorTime:0,                                    // 本地控制错误次数
        verificationImg: "",                                 // 验证码图片url
        verificationCode: "",                                // 验证码
        localVerificationCode:"",                            //本地验证码
        ruleForm2: {
          account:'admin',
          checkPass:'123456'
        },
        logininfofrom:'input', // 'input','local'
        capitalTogg: false,    // 大写键盘提示
        userTogg:false,
        passWordTogg:false,
      };
    },
    methods: {
      testUserName(){
          if(!this.ruleForm2.account){
              this.userTogg=true;
          }else{
              this.userTogg=false;
          }
      },
      testPassWord(){
          if(!this.ruleForm2.checkPass){
              this.passWordTogg=true;
          }else{
              this.passWordTogg=false;
          }
      },
      handleSubmit() {
        console.log(process.env)
        sessionStorage.setItem('userInfo', JSON.stringify({userToken:'1234567890',sysUserName:'admin'}));
        this.$router.push({ path:'/orderCenter' });
        // if(this.ruleForm2.account  && this.ruleForm2.checkPass){
        //     this.logining = true;
        //     //不需要验证验证码
        //     if(this.loginErrorTime<2){
        //         var dynamic = md5(this.ruleForm2.checkPass);
        //         this.$http.post(
        //             process.env.API+"/login/login",
        //             {
        //                 "userNo":this.ruleForm2.account,
        //                 "passWord": dynamic
        //             },
        //         ).then((response)=>{
        //             this.logining = false;
        //             if(response.data.code == "000000"){
        //                 this.userInfo =response.data;
        //                 // 头部token使用session保存出来
        //                 sessionStorage.setItem('userInfo', JSON.stringify({userToken:response.data.data.token,sysUserName:this.ruleForm2.account}));
        //                 if(!this.userInfo.data.isUpdate){
        //                     this.$router.push({ path: '/changepassword' });
        //                 }else {
        //                     this.$router.push({ path: '/blankPage' });
        //                 }
        //             } else  {
        //                 this.loginErrorTime++;
        //                 this.$message({
        //                     message: response.data.messages,
        //                     type: 'error'
        //                 })
        //             }
        //         })
        //     }else {
        //         //需要验证验证码    TODO
        //         if(this.localVerificationCode ===this.verificationCode){
        //             this.logining = true;
        //             var dynamic = md5(this.ruleForm2.checkPass);
        //             this.$http.post(
        //                 process.env.API+"/login/login",
        //                 {
        //                     "id":this.id,    // TODO
        //                     "userNo":this.ruleForm2.account,
        //                     "passWord": dynamic,
        //                     "verifCode" :  this.verificationCode  // TODO
        //                 },
        //             ).then((response)=>{
        //                 this.logining = false;
        //                 if(response.data.code == "000000"){
        //                     sessionStorage.setItem('userInfo', JSON.stringify({userToken:response.data.data.token,sysUserName:this.ruleForm2.account}));
        //                     if(response.data.isUpdate){
        //                         this.$router.push({ path: '/changepassword' });
        //                     }else {
        //                         this.$router.push({ path: '/blankPage' });
        //                     }
        //                 }else {
        //                     this.loginErrorTime++;
        //                     this.$message({
        //                         message: response.data.messages,
        //                         type: 'error'
        //                     })
        //                 }
        //             })
        //         }else{
        //             this.logining = false;
        //             this.$message({
        //                 message: "验证码错误请重新输入",
        //                 type: 'error'
        //             })
        //         }
        //     }
        // } else {
        //     this.$message({
        //         message: "用户名和密码不能为空",
        //         type: 'error'
        //     })
        //     return false;
        // }
      },
      //换下一张
      nextVerification(){
        this.initGetVerification();
      },

      // 初始化获得验证码
      initGetVerification(){
        this.$http.post(
         process.env.API+"/login/getVerification",
        ).then((res)=>{
          if(res.data.code=="000000"){
            this.id =  res.data.data.id;    // TODO
            this.verificationImg = res.data.data.verificationImg;
            this.verificationCode = res.data.data.verificationCode;
          }
        },(res)=>{
          this.$message({
            message: "网络请求出错",
            type: 'error'
          })
        })
      },
      //  大写字母是否锁定
      detectCapsLock(ev){
        var e = ev ||window.event;
        var reg=/^[A-Z]+$/;
        if(reg.test(e.key)){
          this.capitalTogg=true;
          this.passWordTogg=false;
        }else{
          this.capitalTogg=false;
        }
      },
    },
    computed:{

    },

    mounted:function(){
      // this.initGetVerification();
    }
  }

</script>

<style lang='scss' scoped>
  .login-container {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    text-align: center;
    background-size:100%;
    border-radius: 5px;
    .capital_tit{
      position: absolute;
      top: 25px;
      left: 90px;
      font-size: 12px;
      color: red;
    }
    .title{
        display: block;
        border-radius: 5px;
        width: 100%;
        height: 150px;
        font-size: 24px;
        font-weight: bloder;
        line-height: 150px;
        color: #ffffff;
        background: url("~STATIC/image/login_bg.jpg") center;
        background-size: 100% 300px;
        margin:0 0 20px;
        h3{
          margin: 0;
        }
      }
    .input_container{
      width: 350px;

      .userName,.userPassword{
        position: relative;
        height: 45px;
        margin: 10px 0;
        .check_tit{
          position: absolute;
          top: 24px;
          left:135px;
          font-size: 12px;
          color: red;
          left:90px;
          display:none;
        }
        input{
          outline: none;
          border: 0;
          border-bottom: 1px solid #cdcdcd;
        }
        p{
          margin: 0;
          height:30px;
        }
        .show{
          display: block;
        }
      }
    }
    .button{
      width: 120px;
      margin-right: 0!important;
      margin-top:  10px;
    }
    .rember_password{
      margin-bottom: 0;
    }


  }
</style>
