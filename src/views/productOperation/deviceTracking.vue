<template>
	<!--门店设备 主页-->
	<div id="po_device_tracking">
		<el-form ref="po_dtform" :model="storeInfo" label-width="90px">
			<el-row>
				<el-col :span="8">
					<el-form-item label="出厂编号:">
						<el-input v-model="storeInfo.serialNumber" placeholder="请输入出厂编号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="机器型号:">
						<el-input v-model="storeInfo.machineType" placeholder="请输入机器型号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="负责人:">
						<el-input v-model="storeInfo.chargePerson" placeholder="请输入负责人姓名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="负责人电话:">
						<el-input v-model="storeInfo.chargeTel" @keyup.native="checkNum" @blur="checkTel" placeholder="请输入正确的手机号" :maxlength="11"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="门店编码:">
						<el-input v-model="storeInfo.storeCode" placeholder="请输入门店编码"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row style="margin-bottom: 30px;">
				<el-col :span='24'>
					<el-button type="primary" @click="fetchData">查询</el-button>
					<el-button type="primary" @click="addStore" style="margin-left: 80px;">添加</el-button>
					<el-button type="primary" @click="resetPassword">重置密码</el-button>
				</el-col>
			</el-row>
			<hr /><br />
		</el-form>

		<template>
			<el-table :data="manifests" highlight-current-row @row-click='handleStore' style="width: 100%;" height="400">
				<el-table-column type="index" label="序号" width="70"></el-table-column>
				<el-table-column prop="storeCode" label="门店编码">
				</el-table-column>
				<el-table-column label="机器地址">
					<template scope="scope">
						<span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.regionName}}{{ scope.row.storeAddress }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" :formatter="timeFormat" label="创建时间">
				</el-table-column>
				<el-table-column prop="chargeName" label="负责人">
				</el-table-column>
				<el-table-column prop="mobilePhone" label="负责人电话"></el-table-column>
				<el-table-column label="操作" width="70">
					<template scope="scope">
						<span>
	 	                	<el-button type="info" size="small" @click="handleEdit(scope.row)">详情</el-button>
						</span>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<div id="clearButton" style="text-align:center;">
			<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageIndexChange">
			</el-pagination>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				multipleSelection: [],//多选
				storeInfo: {
					serialNumber: '', //出厂编号
					machineType: '', //机器型号
					chargePerson: '', //负责人
					chargeTel: '', //负责人电话
					storeCode: '', //门店编码
				},
				storeCode2: '',
				createTime2: '',
				manifests: [],

				showOperateManifest: false, // 是否显示数据
				// 分页数据处理
				pageIndex: 0,
				pageSize: 20, // 每一页展示数据条数
				pageSizes: [20, 30, 50],
				total: 0,
				//				currentPageNum: 1,
				resetStoreCode: "",
			}
		},
		methods: {
			timeFormat: function(row, column) {
				var oDate = new Date(row.createTime);
				return oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate() + ' ' + oDate.getHours() + ':' + oDate.getMinutes() + ':' + oDate.getSeconds();
			},
			sizeChange: function(pageSize) {
				this.pageSize = pageSize;
				this.fetchData();
			},
			pageIndexChange: function(pageIndex) {
				this.pageIndex = pageIndex;
				// this.pageNum = pageIndex;
				this.fetchData();
			},
			handleStore(row) {
				this.storeCode2 = row.storeCode;
				this.createTime2 = row.createTime;

			},
			checkNum() {
				this.storeInfo.chargeTel = this.storeInfo.chargeTel.replace(/\D/g, '');
			},
			checkTel() {
				if(this.storeInfo.chargeTel && !/^1[0-9]{10}$/.test(this.storeInfo.chargeTel)) {
					this.storeInfo.chargeTel = "";
					this.$message({
						message: "请输入正确的手机号",
						type: 'error'
					})
				}

			},
			addStore() {
				this.$router.push({
					path: '/addstore2'
				});
			},
			// 重置密码请求
			resetPassword(row) {
				this.$http.post(
					process.env.API + "/storeuser/resetStorePassword", {
						"storeCode": this.storeCode2, // 门店编号
					}, {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.$message({
							message: "重置密码成功",
							type: 'success'
						})
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				}, (res) => {

				})
			},
			// 获得门店详情id
			handleEdit(row) {
				// console.log(row)
				this.$router.push({
					name: '门店详情',
					params: {
						storeId: row.storeCode
					}
				});
			},
			onSubmit() {
				console.log('submit!');
			},

			// 分页请求查询
			handleCurrentChange(val) {
				this.currentPageNum = val;
				this.fetchData();
			},
			fetchData() {
				this.$http.post(
					process.env.API + "/storeuser/queryStore", {
						"chargeName": this.storeInfo.chargePerson, // 负责人名称
						"mobilePhone": this.storeInfo.chargeTel, // 手机号
						"deviceType": this.storeInfo.machineType, // 机器型号
						"storeCode": this.storeInfo.storeCode, // 门店编码
						"assetCode": this.storeInfo.serialNumber, // 出厂编号
						"pageNum": this.pageIndex,
						"pageSize": this.pageSize,
					}, {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.manifests = res.data.data.dataList;
						this.total = res.data.data.total;
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				})
			},
			// 获得所有省份id接口
			getProvince() {
				this.$http.post(
					process.env.API + "/getProvince",
					"", {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						console.log(res.data);
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				})
			},
		},

		mounted: function() {
			this.fetchData();
		}
	}
</script>

<style lang='scss' scoped>
	#po_device_tracking {
		.po_dtTable {
			margin-top: 30px;
		}
	}
	
	#clearButton .el-pagination .btn-prev button {
		margin-right: 0px!important;
	}
</style>