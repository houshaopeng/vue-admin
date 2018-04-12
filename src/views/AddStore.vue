<template>
	<div id="equipment_details">
		<el-form  label-width="90px" :rules="addRules" ref="addForm" :model = "storeDetail">
			<el-row  :span="24" class="store_num">
			  <label  >门店编码:</label>
			  <input type="text" v-model = "this.storeCode"  :readonly = "true" class = "store_num_input"/><i class="el-icon-circle-close close_btn" @click="backDeviceTracking"></i>
			</el-row>
			<el-row  :span="24"  class="store_num width">
			  <label  >门店信息</label>
			</el-row>
			<el-row :span="24">
				<el-col :span="6">
					<el-form-item label="申请人:"  prop="chargeName">
						<el-input v-model = "storeDetail.chargeName" :maxlength = "16"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="联系电话:" prop="mobilePhone" :maxlength = "11">
						<el-input   v-model = "storeDetail.mobilePhone" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="推荐渠道:">
					  <el-select v-model="value1" >
					    <el-option
					      v-for="item in companys"
					      :key="item.value"
					      :label="item.soureName"
					      :value="item.id">
					    </el-option>
					  </el-select>
					</el-form-item> 
				</el-col>
			</el-row>
			<el-row :span="24">
				<el-col :span="10">
					<el-form-item label="身份证号:" prop="userCard" :maxlength = "18">
						<el-input v-model = "storeDetail.userCard" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :span="24">
				<el-col>
					<el-form-item label="门店地址:" >
						<el-select  placeholder="请选择省份" :span="8"  v-model="value2" @change="getCity"  >
						    <el-option
    					      v-for="item in province"
    					      :key="item.value"
    					      :label="item.provinceName"
    					      :value="item.provinceId">
    					     
    					    </el-option>
						</el-select>
						<el-select  ref="cityInput" placeholder="请选择城市" :span="8" v-model="value3" @change="getArea"  >
						    <el-option
    					      v-for="item in city"
    					      :key="item.value"
    					      :label="item.cityName"
    					      :value="item.cityId">
    					    </el-option>
						</el-select>
						<el-select ref="areaInput" placeholder="请选择区县" :span="8" v-model="value4"  >
						    <el-option
    					      v-for="item in area"
    					      :key="item.value"
    					      :label="item.regionName"
    					      :value="item.regionId">
    					    </el-option>
						</el-select>
						
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :span="16">
				<el-form-item  prop="storeAddress">
					<el-input v-model = "storeDetail.storeAddress"  placeholder="请输入门店地址"></el-input>
				</el-form-item>
			</el-row>

			<el-row :span="24">
				<el-col :span="10">
					<el-form-item label="门店名称:"  prop="storeName">
						<el-input v-model = "storeDetail.storeName"  :maxlength = "10"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-button type="primary" @click = "saveInfo">保存</el-button>



	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	      storeCode:"", 			//门店编码
	      storeDetail:{
	      	chargeName:"",          // 门店基本信息   申请人  电话  身份证号   店铺地址  店铺名字 
	      	mobilePhone:"",
	      	userCard:"",
	      	storeAddress:"",
	      	storeName:"",
	      },
	      
	      companys: [],            // 渠道   省 市 县    selected下来框   
          value1:0,
  	      province: [],
          value2: 0,
	      city: [],
          value3: 0,
  	      area: [],
          value4: 0,
          // 验证规则
          addRules:{
          	chargeName: [
          	  { required: true, message: '请输入申请人姓名', trigger: 'blur'},
          	],
          	mobilePhone: [
          	  { required: true, message: '请输入联系电话', trigger: 'blur'},
          	],
          	userCard: [
          	  { required: true, message: '请输入身份证号', trigger: 'blur'},
          	],
          	storeAddress: [
          	  { required: true, message: '请输入门店地址', trigger: 'blur'},
          	],
          	storeName: [
          	  { required: true, message: '请输入门店名称', trigger: 'blur'},
          	],
          }
	    }
	  },
	  methods:{
	  	initPage(){
	  		this.getStoreInfo();
	  		this.getChannel();
	  		this.getProvice();
	  	},
	  	// 获取省份
	  	getProvice(){
	       	this.$http.post(
				process.env.API+"/getProvince", 
				"",
				{
					headers: {
                        "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}
			).then((res)=>{
				if(res.data.code =="000000"){
					this.province = res.data.data;
					this.value2 = this.province[0].provinceId; 
					return true;
				}else{
					this.$message({
    					message: res.data.messages,
    					type: 'error'
					})
				}
			}) 
	  	},
	  	//获得城市数据
	  	getCity(){
	       	//获得城市数据
	       	this.$http.post(
				process.env.API+"/getCity", 
				{
					"provinceId":this.value2,
				},
				{
					headers: {
                        "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}
			).then((res)=>{
				if(res.data.code =="000000"){
					this.city = res.data.data;
					this.value3=this.city[0].cityId;
				}else{
					this.$message({
    					message: res.data.messages,
    					type: 'error'
					})
				}
			})      	
	  	},
	  	// 获取区数据
	  	getArea(){
	       	// 获取区数据
	       	this.$http.post(
				process.env.API+"/getRegion", 
				{
					"cityId":this.value3,
				},
				{
					headers: {
                        "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}
			).then((res)=>{
				if(res.data.code =="000000"){
					this.area = res.data.data;
					console.log();
					this.value4=this.area[0].regionId;
				}else{
					this.$message({
    					message: res.data.messages,
    					type: 'error'
					})
				}
			})  	
	  	},
	  	// 获取门店编码
	  	getStoreInfo(){
	       	this.$http.post(
				process.env.API+"/storeuser/getStoreCode", 
				"",
				{
					headers: {
                        "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}
			).then((res)=>{
				if(res.data.code =="000000"){

					this.storeCode  = res.data.data;
					return true;
				}else{
					this.$message({
    					message: res.data.messages,
    					type: 'error'
					})
				}
			}) 
	  	},
	  	//获取渠道
	  	getChannel(){
			// 请求推荐渠道
	       	this.$http.post(
				process.env.API+"/storeSource/querySource", 
				"",
				{
					headers: {
                        "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}
			).then((res)=>{
				if(res.data.code =="000000"){
					this.companys = res.data.data;
					this.value1 = this.companys[0].id;
				}else{
					this.$message({
    					message: res.data.messages,
    					type: 'error'
					})
				}
			}) 
	  	},
	  	
	  	saveInfo(){
	  		this.$refs.addForm.validate((valid)=>{
	  			console.log(this.value1);
	  			if (valid && this.value1 && this.value2 && this.value3 && this.value4) {
	 		       	this.$http.post(
	 					process.env.API+"/storeuser/saveStoreMessage", 
	 					{
	 						"chargeName": this.storeDetail.chargeName,
	 						"cityId":this.value3,
	 						"mobilePhone":this.storeDetail.mobilePhone,
	 						"provinceId":this.value2,
	 						"regionId":this.value4,
	 						"sourceId":this.value1,
	 						"storeAddress":this.storeDetail.storeAddress,
	 						"storeCode":this.storeCode,
	 						"storeName":this.storeDetail.storeName,
	 						"userCard":this.storeDetail.userCard,
	 					},
	 					{
	 						headers: {
                                "x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
	 						}
	 					}
	 				).then((res)=>{
	 					if(res.data.code =="000000"){
	 						this.$message({
	 	    					message: "添加门店成功",
	 	    					type: 'success'
	 						});
	 						setTimeout(()=>{
	 							this.$router.push({  path: '/deviceTracking'  });
	 						},1000)
	 					}else{
	 						this.$message({
	 	    					message: res.data.messages,
	 	    					type: 'error'
	 						})
	 					}
	 				}) 
	  			}else{
					this.$message({
    					message: "请填写全部店铺信息",
    					type: 'error'
					})
	  			}
	  		})
	       	
	  	},
	  	// 返回设备详情页面
	  	backDeviceTracking(){
	  		this.$router.push({ path: '/deviceTracking' });
	  	}
	  },
	  computed:{
	  	
	  },
	  watch:{

	  },
	  created: function(){
	  	this.initPage();
	  },
	  mounted: function(){
	  	
	  }
	}
</script>

<style scoped lang= 'scss'>
	.store_num{
		width: 100%;
		border-bottom:1px solid #bbbbbb;
		padding: 10px ;
		margin: 0;
		.store_num_input{
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

</style>