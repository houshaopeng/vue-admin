<template>
	<el-form  label-position="left" label-width="100px" class="demo-ruleForm login-container " align="center" justify="center">
		<h3 class="title">修改密码</h3>
		<form action="#" class= "form">
			<div class="label_box">
			    <label >新密码:</label>
			    <input ref="ipt2" type="password" v-model="newPassWord" placeholder="请输入新密码" class="input" @keyup="newCode()"  @blur="checkNew()" :maxlength='16'/><i class="fa eye" @click="changeEye":class="{'fa-eye':eyeTogg , 'fa-eye-slash':!eyeTogg}" ></i>
			    <p class="check_tit" :class="{show :newPassTogg}" ref="new_tit">请输入新密码</p>
		    </div>
		    <div class="label_box">
				<label >确认新密码:</label>
				<input ref="ipt3" type="password" v-model="againNewPassWord" placeholder="请再次输入密码" class="input" @keyup="againCode()" @blur="checkAgain()" :maxlength='16'/>
				<p class="check_tit" :class="{show :surePassTogg}" ref="again_tit">请再次输入新密码</p>
			</div>
			<el-button type="primary"  @click="sureChangePassword">确认修改</el-button>
		</form>
	</el-form>
</template>
<script>
import md5 from 'js-md5'                                        // md5加密
	export default{
		name: "changepassword",
		data() {
	      return {
	      	newPassWord: "",                                   //  新密码
	      	againNewPassWord: "",                              //  再次新密码
	        labelPosition: 'right',
	        eyeTogg:false,
	        newPassTogg:false,
	        surePassTogg:false,
	      };
	    },
	    methods:{
	    	//限制汉字输入
        	newCode(){ 
        		this.newPassWord = this.newPassWord.replace(/[\u4E00-\u9FA5]/g,'');
        	},
        	//限制汉字输入
        	againCode(){        		
        		this.againNewPassWord = this.againNewPassWord.replace(/[\u4E00-\u9FA5]/g,'');
        	},
	    	//小眼睛切换
	    	changeEye(){
	    		this.eyeTogg =!this.eyeTogg;
	    		this.initInputType();
	    	},

	    	// 验证新密码是否为空  且是否符合规则
	    	checkNew(){
	    		//数字+字母+特殊符号
	    		if(this.newPassWord.length>0 && this.newPassWord.length<=16){
	    			this.newPassTogg=false;
	    			var reg =/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*(),_\-+=/\\|])[a-z\d#@!~%^&*(),_\-+=/\\|]{6,16}/i;
	    			if(reg.test(this.newPassWord)){
	    				this.$refs.new_tit.innerHTML="请输入新密码";
	    			}else{
	    				this.newPassTogg=true;
	    				this.$refs.new_tit.innerHTML="密码必须为6-16位数字字母符号组合";
	    			}
	    		}else if(this.newPassWord.length==0){
	    			this.$refs.new_tit.innerHTML="请输入新密码";
	    			this.newPassTogg=true;
	    		}else{
	    			this.$refs.new_tit.innerHTML="密码必须为6-16位数字字母符号组合";
	    			this.newPassTogg=true;
	    		}
	    	},
	    	// 验证确认新密码是否为空
	    	checkAgain(){
	    		if(this.againNewPassWord.length==0){
	    			this.$refs.again_tit.innerHTML="请再次输入新密码";
	    			this.surePassTogg=true;
	    		}else if(this.againNewPassWord.length>0 && this.againNewPassWord===this.newPassWord){
	    			this.$refs.again_tit.innerHTML="请再次输入密码";
	    			this.surePassTogg=false;
	    		}else if(this.againNewPassWord.length>0 && !(this.againNewPassWord===this.newPassWord)){
	    			this.$refs.again_tit.innerHTML="两次密码输入不一致";
	    			this.surePassTogg=true;
	    		}
	    	},
	    	// 确认修改密码
	    	sureChangePassword(){
	    		// 判断密码规则
	    		if( !this.newPassTogg && !this.surePassTogg &&  this.newPassWord && this.againNewPassWord){
	    			if(this.newPassWord==this.againNewPassWord){	    				
	    				this.$http({
		            		method:'POST',
							url:process.env.API+"/password/updatePassword",
							body:{
								"password":md5(this.againNewPassWord),           // 新密码
							},
							headers: {
								"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
				       		}
						}).then((res)=>{
							if(res.data.code =="000000"){
								this.$message({
                                    message: '密码已修改成功',
                                    type: 'success'
                                });
								this.$router.push ({path:"/login"})
							}else{
								this.$message({
								  message: res.data.messages,
								  type: 'error'
								});
							}
						},(response)=>{
                        	this.$message({
                                message: response.data.messages,
                                type: 'error'
                            });
                        })
		    			
	    			} 
	    		}else if(this.newPassWord.length==0 && this.againNewPassWord.length==0){
	    			  this.$message({
	    			  message: "密码为空,请重新输入",
	    			  type: 'error'
	    			})
	    		}else if(this.newPassWord.length<6 && this.againNewPassWord.length<6){
	    			this.$message({
	    			  message: "密码长度小于6位，请重新输入",
	    			  type: 'error'
	    			})
	    		}else{
                    this.newPassWord = "";
                    this.againNewPassWord = "";
	    			this.$message({
	    			  message: "输入不符合规则，请重新输入",
	    			  type: 'error'
	    			})
	    		}
	    	},
	    	initInputType(){
	    		this.$refs.ipt2.setAttribute('type',!this.eyeTogg?"password":"input");
	    		this.$refs.ipt3.setAttribute('type',!this.eyeTogg?"password":"input");
	    	}
	    },
	    watch:{
	    	// 确认新密码是否为空  且是否符合规则   是否相等
	    	againNewPassWord:function(){
	    		if(this.againNewPassWord.length>0 && this.againNewPassWord===this.newPassWord){
	    			this.$refs.again_tit.innerHTML="请再次输入新密码";
	    			this.surePassTogg=false;
	    			return true;
	    		}else if(this.againNewPassWord.length>0 && !(this.againNewPassWord===this.newPassWord)){
	    			this.$refs.again_tit.innerHTML="两次密码输入不一致";
	    			this.surePassTogg=true;
	    		}
	    	}
	    },
	    created(){

	    },
	    mounted: function(){
//	    	this.initInputType();
	    }

	}
</script>
<style lang='scss' scoped>

.login-container {
	.label_box{
		height: 60px;
		position: relative;
		.check_tit{
			position: absolute;
			top: 24px;
			left:135px;
			font-size: 12px;
			color: red;
			display: none;
		}
		.show{
			display: block;
		}
	}
	border-radius: 5px;
	background-clip: padding-box;
	margin: 180px auto;
	width: 350px;
	padding: 35px 35px 15px 35px;
	background: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;
	.form{
		width: 100%;
		position: relative;
		label{
			width: 85px;
			text-align: right;
			display: inline-block;
			color: #5f5f5f;
			font-size: 16px;
		}
		.input{
			border:none;
			outline:medium;
			color: #acacac;
			border-bottom: 1px solid #cdcdcd;
			margin: 15px 0;
			padding-left: 5px;
		}
		button{
			width: 100px;
			height: 30px;
			margin-top: 15px;
			margin-right: 0!important;
			background: #4db3ff;
			border:0;
			border:none;
			border-radius: 5px;
			color: #ffffff;
		}
		button:active{
			border:none;
			background: #1d90e6;
		}
		.eye{
			position: absolute;
			right: 50px;
			opacity: 0.6;
			top: 15px;
		}
	}

	.sure_btn{

	}
	.title{
		font-size: 30px;
		color: #4f8cf1;
		margin:0 0 20px;
	}
  }

</style>