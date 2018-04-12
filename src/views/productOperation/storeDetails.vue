<template>
	<!--门店详情-->
	<div id="equipment_details">
		<el-form label-width="120px" ref="addForm" :model="storeDetail">
			<el-row :span="24" class="store_num">
				<label>门店编码:</label>
				<input type="text" v-model="storeCode" :readonly="true" class="store_num_input" /><i class="el-icon-circle-close close_btn" @click="backDeviceTracking"></i>
			</el-row>
			<el-row :span="24" class="store_num width">
				<label>门店信息</label>
			</el-row>
			<el-row :span="24">
				<el-col :span="8">
					<el-form-item label="网点名称:">
						<el-input v-model="storeDetail.networkName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="申请人:">
						<el-input v-model="storeDetail.networkPerson"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="联系电话:" :maxlength="11">
						<el-input v-model="storeDetail.networkTel"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item label="推荐渠道:">
						<el-select v-model="channelName">
							<el-option v-for="item in channel" :key="item.value" :label="item.channelName" :value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="storeDetail.channelDetails" v-if="channelNameshow">
							<el-option v-for="item in specificChannel" :key="item.value" :label="item.channelName" :value="item.channelName">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="身份证号:" :maxlength="18">
						<el-input v-model="storeDetail.idCode"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :span="24">
				<el-col>
					<el-form-item label="网点地址:">
						<el-select placeholder="请选择省份" :span="8" v-model="value2" @change="getCity">
							<el-option v-for="item in province" :key="item.value" :label="item.provinceName" :value="item.provinceId">

							</el-option>
						</el-select>
						<el-select ref="cityInput" placeholder="请选择城市" :span="8" v-model="value3" @change="getArea">
							<el-option v-for="item in city" :key="item.value" :label="item.cityName" :value="item.cityId">
							</el-option>
						</el-select>
						<el-select ref="areaInput" placeholder="请选择区县" :span="8" v-model="value4">
							<el-option v-for="item in area" :key="item.value" :label="item.regionName" :value="item.regionId">
							</el-option>
						</el-select>

					</el-form-item>
				</el-col>
			</el-row>
			<el-row :span="16">
				<el-form-item>
					<el-input v-model="storeDetail.networkAddress" placeholder="请输入详细地址"></el-input>
				</el-form-item>
			</el-row>

			<el-row :span="24">
				<el-col :span="24">
					<el-form-item label="机器型号:">
						<el-row>
							<el-col :span="6" v-for="machine in machines" :key="machine.value" style="margin-right: 10px;">
								<el-form-item label="">
									<el-input v-model="machine.deviceType" disabled></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :span="24" v-for="item in productCode" :key="item.value">
				<el-col :span="8">
					<el-form-item label="资产编码:">
						<el-input v-model="item.assetCode" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="硬件编码:">
						<el-input v-model="item.deviceCode" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-button type="primary" @click="updateStoreMessage" style="display:block;margin: 30px auto;width:100px;">修改</el-button>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				storeCode: "", //门店编码
				storeDetail: {
					networkName: "", //网点名称
					networkPerson: "", //申请人
					networkTel: "", //联系电话
					channelTotal: "", //推荐渠道
					channelDetails: "", //渠道详情
					idCode: "", //身份证号
					networkAddress: "", //网店地址 详细地址
				},
				channelName:'',
				channelNameshow:false,
				channel: [{
						channelName: '全部',
						value: ''
					},
					{
						channelName: '外部渠道',
						value: 1
					},
					{
						channelName: '内部渠道',
						value: 0
					},
					{
						channelName: '无',
						value: -1
					}],
				specificChannel:[],
				value1: '',
				province: [],
				value2: '',
				city: [],
				value3: '',
				area: [],
				value4: '',
				machines:[{
					machineType:"",
				},{
					machineType:"",
				},{
					machineType:"",
				}],
				productCode:[{
					assetCode:"",
					hardwareCode:""
				},{
					assetCode:"",
					hardwareCode:""
				},{
					assetCode:"",
					hardwareCode:""
				}]
			}
		},
		methods: {
			initPage() {
				// this.getStoreInfo();
				 // this.getChannel();
				this.getProvice();

			},
			//查询门店详情 .
			findStoreDetail(){
				this.$http({
					method:"POST",
					url:process.env.API+'/storeuser/findStoreDetail',
					headers:{
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken
					},
					body:{
						"storeCode":this.$route.params.storeId
					}
				}).then((res)=>{
					if(res.data.code=='000000'){

						this.storeDetail={
							networkName: res.data.data.storeName, //网点名称
							networkPerson:res.data.data.chargeName, //申请人
							networkTel:res.data.data.mobilePhone, //联系电话
							channelTotal: res.data.data.outsideChannel, //推荐渠道
							channelDetails: res.data.data.sourceName, //渠道详情
							idCode:res.data.data.userCard, //身份证号
							networkAddress: res.data.data.storeAddress, //网店地址 详细地址
						}
							this.channelName = res.data.data.outsideChannel;
							this.value2 =	res.data.data.provinceId*1
							this.value3 =	res.data.data.cityId*1
							this.value4 =	res.data.data.regionId*1
							this.machines = res.data.data.devices
							this.productCode = res.data.data.devices

					}else{
						this.$message({
							type:'error',
							messages:res.data.messages
						})
					}

				},(res)=>{
					this.$message({
						type:'error',
						messages:res.data.messages
					})
				})
			},
			// 获取省份
			getProvice() {
				this.$http.post(
					process.env.API + "/getProvince",
					"", {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.province = res.data.data;
						this.value2 = this.province[0].provinceId;
						return true;
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				})
			},
			//获得城市数据
			getCity() {
				//获得城市数据
				this.$http.post(
					process.env.API + "/getCity", {
						"provinceId": this.value2,
					}, {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.city = res.data.data;
						this.value3 = this.city[0].cityId;
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				})
			},
			// 获取区数据
			getArea() {
				// 获取区数据
				this.$http.post(
					process.env.API + "/getRegion", {
						"cityId": this.value3,
					}, {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.area = res.data.data;
						this.value4 = this.area[0].regionId;
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				})
			},
			// 获取门店编码
			getStoreInfo() {
				this.$http.post(
					process.env.API + "/storeuser/getStoreCode",
					"", {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.storeCode = res.data.data;
						return true;
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				})
			},
			//获取渠道
			getChannel() {
				// 请求推荐渠道
				this.$http.post(
					process.env.API + "/storeSource/querySource",
					"", {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						console.log(res.data.data)
						// this.companys = res.data.data;
						// this.value1 = this.companys[0].id;
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				})
			},

			updateStoreMessage() {
				this.$http.post(
					process.env.API + "/storeuser/updateStoreMessage", {
						"chargeName": this.storeDetail.networkPerson,
						"mobilePhone": this.storeDetail.networkTel,
						"provinceId": this.value2.toString(),
						"cityId": this.value3.toString(),
						"regionId": this.value4.toString(),
						"outsideChannel": this.storeDetail.channelTotal,
						"sourceName": this.storeDetail.channelDetails,
						"storeAddress": this.storeDetail.networkAddress,
						"storeCode": this.storeCode,
						"storeName": this.storeDetail.networkName,
						"userCard": this.storeDetail.idCode,
					}, {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.$message({
							message: "修改门店信息成功",
							type: 'success'
						});
						setTimeout(() => {
							this.$router.push({
								path: '/deviceTracking'
							});
						}, 1000)
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				})

			},
			// 返回设备详情页面
			backDeviceTracking() {
				this.$router.push({
					path: '/deviceTracking'
				});
			}
		},
		computed: {

		},
		watch: {
			channelName:function(){
				this.storeDetail.channelTotal = this.channelName;
				if(this.channelName === '') {
					this.channelNameshow = false;
				} else if(this.channelName == 0) {
					this.channelNameshow = true;
				} else if(this.channelName == 1) {
					this.channelNameshow = true;
				} else if(this.channelName == -1) {
					this.channelNameshow = false;
				}
			}
		},
		created: function() {
			this.initPage();
		},
		mounted: function() {
			this.findStoreDetail();
			this.storeCode = this.$route.params.storeId;
		}
	}
</script>

<style scoped lang='scss'>
	.store_num {
		width: 100%;
		border-bottom: 1px solid #bbbbbb;
		padding: 10px;
		margin: 0;
		.store_num_input {
			border: 0;
			border: none;
			outline: none;
		}
		.close_btn {
			float: right;
			font-size: 25px;
		}
	}

	.width {
		width: 80px;
		margin-bottom: 20px;
	}
</style>