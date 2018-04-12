<template>
	<div id="equipment_details">
		<el-form ref="po_dtform"  label-width="90px">
			<el-row  :span="24" class="store_num">
			  <label for="old_password" >门店编码:</label>
			  <input type="text" v-model = "storeDetail.storeCode"  :readonly = "btnText" class = "store_num_input"/><i class="el-icon-circle-close close_btn" @click="backDeviceTracking" ></i>
			</el-row>
			<el-row  :span="24"  class="store_num width">
			  <label  >门店信息</label>
			</el-row>
			<el-row :span="24">
				<el-col :span="6">
					<el-form-item label="申请人:">
						<el-input  :disabled = "btnText" v-model = "storeDetail.chargeName" :maxlength = "10"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="联系电话:">
						<el-input  :disabled = "btnText" v-model = "storeDetail.mobilePhone" :maxlength = "11"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="推荐渠道:">
					  <el-select v-model="value1" :disabled = "btnText" placeholder="请选择渠道">
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
					<el-form-item label="身份证号:" :maxlength = "18">
						<el-input v-model = "storeDetail.userCard" :disabled = "btnText"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

				<el-row :span="24">
					<el-col>
						<el-form-item label="门店地址:">
							<el-select  placeholder="请选择省份" :span="8" v-model="value2" @change="getCity"  :disabled = "btnText" >
							    <el-option
	    					      v-for="item in province"
	    					      :key="item.provinceId"
	    					      :label="item.provinceName"
	    					      :value="item.provinceId">
	    					    </el-option>
							</el-select>
							<el-select  ref="cityInput" placeholder="请选择城市" :span="8" v-model="value3"  :disabled = "btnText" @change="getArea"  >
							    <el-option
	    					      v-for="item in city"
	    					      :key="item.cityId"
	    					      :label="item.cityName"
	    					      :value="item.cityId">

	    					    </el-option>
							</el-select>
							<el-select ref="areaInput" placeholder="请选择区县" :span="8" v-model="value4" :disabled = "btnText" >
							    <el-option
	    					      v-for="item in area"
	    					      :key="item.regionId"
	    					      :label="item.regionName"
	    					      :value="item.regionId">
	    					    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			<el-row >
				<el-input v-model = "storeDetail.storeAddress"  :disabled = "btnText"></el-input>
			</el-row>
			<el-row :span="24">
				<el-col :span="10">
					<el-form-item label="门店名称:" :maxlength = "10">
						<el-input v-model = "storeDetail.storeName"  :disabled = "btnText"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-button type="primary" @click = "changeInfo">{{btnText?"修改":"确认"}}</el-button>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	      btnText:true,

	      storeDetail:{

	      },
	      companys: [],
          value1: 0,
  	      province: [],
          value2: 0,
	      city: [],
          value3: 0,


  	      area: [],
	        value4: '',
	        value2Id:"",
	        value3Id:"",
	        value4Id:"",
	    }
	  },
	  methods:{

	  	initPage(){
	  		// 门店信息查询
	       	this.$http.post(
				process.env.API+"/storeuser/queryStoreDetail",
				{
					"id":this.$route.params.storeId,
				},
				{
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}
			).then((res)=>{
				if(res.data.code =="000000"){
					this.storeDetail = res.data.data;
					this.value2Id =this.storeDetail.provinceId;
					this.value3Id=this.storeDetail.cityId;
					this.value4Id =this.storeDetail.regionId;
					this.sourceId = this.storeDetail.sourceId;
					// 请求推荐渠道
			       	this.$http.post(
						process.env.API+"/storeSource/querySource",
						"",
						{
							headers: {
								"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken
							}
						}
					).then((res)=>{
						if(res.data.code =="000000"){
								this.companys = res.data.data;
								this.value1= parseInt(this.sourceId);
						}else{
							this.$message({
		    					message: res.data.messages,
		    					type: 'error'
							})
						}
					})
					this.getProvice();
				}else{
					this.$message({
    					message: res.data.messages,
    					type: 'error'
					})
				}
			})

	  	},
	  	// 点击修改信息  更新门店请求
	  	changeInfo(){
	  		this.btnText =!this.btnText;
	  		if(this.btnText){
		  		// 更新门店信息
		  		if((this.storeDetail.chargeName == "")||(this.value3 == "")||(this.storeDetail.mobilePhone == "")||(this.value2 == "")||(this.value4 == "")||(this.value1 == "")||(this.storeDetail.storeAddress == "")||(this.storeDetail.storeCode == "")||(this.storeDetail.storeName == "")||(this.storeDetail.userCard == "")){
						this.$message({
						  message: "请完善页面中全部数据！",
						  type: 'error'
						})
	  				this.btnText =!this.btnText;

		  		}else{

		       	this.$http.post(
					process.env.API+"/storeuser/updateStoreMessage",
					{
						"id":this.$route.params.storeId,
						"chargeName": this.storeDetail.chargeName,
						"cityId":this.value3,
						"mobilePhone":this.storeDetail.mobilePhone,
						"provinceId":this.value2,
						"regionId":this.value4,
						"sourceId":this.value1,
						"storeAddress":this.storeDetail.storeAddress,
						"storeCode":this.storeDetail.storeCode,
						"storeName":this.storeDetail.storeName,
						"userCard":this.storeDetail.userCard,
					},
					{
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken
						}
					}
				).then((res)=>{
					if(res.data.code =="000000"){
						this.$message({
	    					message: "信息更新成功",
	    					type: 'success'
						});
						setTimeout(()=>{
							this.$router.push({  path: '/deviceTracking'  });
						},1000)
					}else{
						this.$message({
	    					message: "信息更新失败",
	    					type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  message: "网络请求错误",
					  type: 'error'
					})
				})
	  		}
		  		}

	  	},
	  	getProvice(){
	  		// 请求省份
	       	this.$http.post(
				process.env.API+"/getProvince",
				"",
				{
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken
					}
				}
			).then((res)=>{
				if(res.data.code =="000000"){
					this.province = res.data.data;
					var len = this.province.length;
					for(var i =0;i <len;i++){
						if(this.value2Id==this.province[i].provinceId){
							this.value2 =this.province[i].provinceId ;
						}
					};

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
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken
						}
					}
				).then((res)=>{
					if(res.data.code =="000000"){
						this.city = res.data.data;
						console.log(this.city);
						var len = this.city.length;
						for(var i =0;i <len;i++){
							if(this.value3Id==this.city[i].cityId){
								this.value3 =this.city[i].cityId;
							}else {
								this.value3 =this.city[0].cityId;
							}
						}
					}else{
						this.$message({
	    					message: res.data.messages,
	    					type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  message: "网络请求错误",
					  type: 'error'
					})
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
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken
					}
				}
			).then((res)=>{
				if(res.data.code =="000000"){
					this.area = res.data.data;
					var len = this.area.length;
					for(var i =0;i <len;i++){
						if(this.value4Id==this.area[i].regionId){
							this.value4 =this.area[i].regionId;
						}else{
							this.value4 =this.area[0].regionId;
						}
					}
				}else{
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				}
			},(res)=>{
				this.$message({
				  message: "网络请求错误",
				  type: 'error'
				})
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