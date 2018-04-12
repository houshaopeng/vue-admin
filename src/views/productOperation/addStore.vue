<template>
	<div id="equipment_details">
		<el-form label-width="120px" ref="addForm" :model="storeForm">
			<el-row :span="24" class="store_num">
				<label>门店编码:</label>
				<input type="text" v-model="storeCode" :readonly="true" class="store_num_input" /><i class="el-icon-circle-close close_btn" @click="backDeviceTracking"></i>
			</el-row>
			<el-row :span="24" class="store_num width">
				<label>门店信息</label>
			</el-row>
			<el-row :span="24">
				<el-col :span="8">
					<el-form-item label="网点订单编号:">
						<el-input @keyup.native="checkStr" :maxlength="12" v-model="networkNumber"></el-input>
					</el-form-item>
				</el-col>
				<el-button type="primary" @click="getNetworkMsg" style="margin-left: 20px;">获取网点信息</el-button>
			</el-row>
			<el-row :span="24">
				<el-col :span="8">
					<el-form-item label="网点名称:">
						<el-input :disabled="disable" v-model="storeForm.storeName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="申请人:">
						<el-input :disabled="disable" v-model="storeForm.chargeName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="联系电话:" :maxlength="11">
						<el-input :disabled="disable" v-model="storeForm.mobilePhone"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item label="推荐渠道:">
						<el-select :disabled="disable" v-model="storeForm.outsideChannel">
							<el-option v-for="item in outsideChannelList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-select :disabled="disable" v-model="storeForm.sourceName">
							<el-option v-for="item in companys" :key="item.value" :label="item.soureName" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="身份证号:">
						<el-input :disabled="disable" v-model="storeForm.userCard" :maxlength="18"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :span="24">
				<el-col>
					<el-form-item label="网点地址:">
						<el-select :disabled="disable" placeholder="请选择省份" :span="8" v-model="storeForm.provinceId" @change="getCity">
							<el-option v-for="item in province" :key="item.value" :label="item.provinceName" :value="item.provinceId">

							</el-option>
						</el-select>
						<el-select :disabled="disable" ref="cityInput" placeholder="请选择城市" :span="8" v-model="storeForm.cityId" @change="getArea">
							<el-option v-for="item in city" :key="item.value" :label="item.cityName" :value="item.cityId">
							</el-option>
						</el-select>
						<el-select :disabled="disable" ref="areaInput" placeholder="请选择区县" :span="8" v-model="storeForm.regionId">
							<el-option v-for="item in area" :key="item.value" :label="item.regionName" :value="item.regionId">
							</el-option>
						</el-select>

					</el-form-item>
				</el-col>
			</el-row>
			<el-row :span="16">
				<el-form-item>
					<el-input :disabled="disable" v-model="storeForm.storeAddress" placeholder="请输入详细地址"></el-input>
				</el-form-item>
			</el-row>

			<el-row :span="24">
				<el-col :span="24">
					<el-form-item label="机器型号:">
						<el-row>
							<el-col :span="6" v-for="(key,index) in storeForm.devices" :key="key" style="margin-right: 10px;">
								<el-form-item label="">
									<el-input :disabled="disable" v-model="storeForm.devices[index]"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-button type="primary" @click="saveInfo" style="display:block;margin: 30px auto;width:100px;">保存</el-button>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				storeCode: "", //门店编码
				networkNumber: "", //网点订单编号
				storeForm: {
					storeName: "", //网点名称
					chargeName: "", //联系人
					mobilePhone: "", //联系人电话
					outsideChannel: "", //推荐渠道
					sourceName: "", //渠道详情
					userCard: "", //身份证号
					provinceId: "",
					cityId: "",
					regionId: "",
					storeAddress: "", //网点地址  详细地址
					devices: [""], //机器型号
				},
				outsideChannelList: [{
					label: "内部渠道",
					value: 0
				}, {
					label: "外部渠道",
					value: 1
				}, {
					label: "无",
					value: -1
				}],
				companys: [], // 渠道   省 市 县    selected下来框
				province: [],
				city: [],
				area: [],
				disable:true,
			}
		},
		methods: {
			initPage() {
				this.getStoreInfo();
				this.getChannel();
				this.getProvice();
			},
			checkStr(){
				this.networkNumber = this.networkNumber.replace(/[^\w\.\/]/ig,'');
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
						this.storeForm.provinceId = this.province[0].provinceId;
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
						"provinceId": this.storeForm.provinceId,
					}, {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.city = res.data.data;
						this.storeForm.cityId = this.city[0].cityId;
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
						"cityId": this.storeForm.cityId,
					}, {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.area = res.data.data;
						this.storeForm.regionId = this.area[0].regionId;
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
						this.companys = res.data.data;
						this.storeForm.sourceName = this.companys[0].id;
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				})
			},
			//获取网点信息
			getNetworkMsg() {
				if(this.networkNumber) {
					this.$http({
						method: "POST",
						url: process.env.API + "/storeuser/queryStoreByAppNo",
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						},
						body: {
							"applicationNo": this.networkNumber
						}
					}).then((res) => {
						if(res.data.code == "000000") {
							var data = res.data.data;
							this.storeForm = {
								applicationNo:data.applicationNo,
								storeName: data.storeName,
								chargeName: data.chargeName,
								mobilePhone: data.mobilePhone,
								outsideChannel: data.outsideChannel,
								sourceName: data.sourceName,
								userCard: data.userCard,
								provinceId: data.provinceId * 1,
								cityId: data.cityId * 1,
								regionId: data.regionId * 1,
								storeAddress: data.storeAddress,
								devices: data.devices,
							}
						} else {
							this.$message({
								type: "error",
								message: res.data.messages
							})
						}
					}, (res) => {
						this.$message({
							type: "error",
							message: res.data.messages
						})
					})
				} else {
					this.$message({
						type: "error",
						message: "请输入网点订单编号"
					})
				}
			},
			//保存
			saveInfo() {
				if(this.storeForm.storeName && this.networkNumber == this.storeForm.applicationNo) {
					this.storeForm.storeCode = this.storeCode;
					this.$http({
						method: "POST",
						url: process.env.API + "/storeuser/saveStoreMessage",
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						},
						body: this.storeForm
					}).then((res) => {
						if(res.data.code == "000000") {
							this.$message({
								type: "success",
								message: "门店信息保存成功"
							})
							this.$router.push({
								path: '/deviceTracking'
							});
						} else {
							this.$message({
								type: "error",
								message: res.data.messages
							})
						}
					}, (res) => {
						this.$message({
							type: "error",
							message: res.data.messages
						})
					})
				} else {
					this.$message({
						type: "error",
						message: "请输入正确的订单编号与网点信息"
					})
				}

			},
			// 返回设备详情页面
			backDeviceTracking() {
				this.$router.push({
					path: '/deviceTracking'
				});
			},
		},
		computed: {

		},
		watch: {

		},
		created: function() {
			this.initPage();
		},
		mounted: function() {

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