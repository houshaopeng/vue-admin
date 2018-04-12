<template>
	<div id='channelOffering'>
		<el-form label-width="90px" :model="entryInfo">
			<el-row>
				<el-col :span="8">
					<el-form-item label="申请编号:">
						<el-input max-length="12" v-model="entryInfo.number" placeholder="请输入申请编号" :maxlength="20"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="渠道名称:">
						<el-input max-length="30" v-model="entryInfo.name" placeholder="请输入渠道名称" :maxlength="20"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="手机号:">
						<el-input :maxlength="11" v-model="contactsMobile" placeholder="请输入负责人手机号" @blur="checkMobile"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="90px">
						<el-form-item label="所属区域:">
							<el-select v-model="value" placeholder="请选择区域">
								<!-- TODO -->
								<el-option v-for="item in options11" :key="item.value" :label="item.regionName" :value="item.regionNo">
								</el-option>
								<el-option v-for="item in options1" :key="item.value" :label="item.regionName" :value="item.regionNo">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8" v-if="verifyShow">
					<el-form label-width="90px">
						<el-form-item label="审核状态:">
							<el-select v-model="verifyStatus" placeholder="审核结果">
								<!-- TODO -->
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="90px">
						<el-form-item label="申请时间:">
							<el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2">
							</el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='24'>
					<el-button type="primary" @click="query">查询</el-button>
				
					<el-button type="primary" @click="addChannel" style="margin-left: 70px;">新增渠道</el-button>
				
					<el-button type="primary" @click="reviewedChannel">审核渠道</el-button>
				
					<el-button type="primary" @click="exportData">导出</el-button>
				</el-col>
			</el-row>
		</el-form>
		<template>
			<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
				<el-tab-pane label="全部申请" name="first">
					<template>
						<el-table :data="users" highlight-current-row v-loading="listLoading" @row-click='handleRowHandle' @row-dblclick="details()" style="width: 100%;">
							<el-table-column prop="applicationNo" label="订单编号">
							</el-table-column>
							<el-table-column prop="channelName" label="渠道名称">
							</el-table-column>
							<el-table-column prop="channelContacts" label="渠道联系人">
							</el-table-column>
							<el-table-column prop="userName" label="申请人">
							</el-table-column>
							<el-table-column prop="contrTypes" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" :formatter="changeTime" label="申请时间">
							</el-table-column>
							<el-table-column prop="verifyStat" label="审核状态">
							</el-table-column>
							<el-table-column label="操作" width="150">
								<template scope="scope">
									<el-button type="primary" size="small" @click="seeOutlete(scope.$index, scope.row)">审核流</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageIndexChange">
						</el-pagination>
					</el-col>

					<!--编辑界面-->
					<el-dialog title="审核流" v-model="auditFlow" :visible.sync="auditFlow">
						<el-table :data="reviewList" highlight-current-row v-loading="listLoading" style="width: 100%;">

							<el-table-column prop="userName" label="操作人">
							</el-table-column>
							<el-table-column prop="roleName" label="操作人角色">
							</el-table-column>
							<el-table-column prop="updatedBy" :formatter="changeTime2" label="操作时间">
							</el-table-column>
							<el-table-column prop="verifyStatString" label="状态">
							</el-table-column>
							<el-table-column prop="remarks" label="备注">
							</el-table-column>
						</el-table>
					</el-dialog>
				</el-tab-pane>
				<el-tab-pane label="待审核" name="second" :disabled="isShow">
					<template>
						<el-table :data="users2" highlight-current-row v-loading="listLoading" style="width: 100%;" @row-click='handleRowHandle' @row-dblclick="details()">
							<el-table-column prop="applicationNo" label="订单编号">
							</el-table-column>
							<el-table-column prop="channelName" label="渠道名称">
							</el-table-column>
							<el-table-column prop="channelContacts" label="渠道联系人">
							</el-table-column>
							<el-table-column prop="userName" label="申请人">
							</el-table-column>
							<el-table-column prop="contrTypes" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" :formatter="changeTime" label="申请时间">
							</el-table-column>
						</el-table>
					</template>
					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageIndexChange">
						</el-pagination>
					</el-col>
				</el-tab-pane>
				<el-tab-pane label="申请通过" name="third">
					<template>
						<el-table :data="users3" highlight-current-row v-loading="listLoading" style="width: 100%;" @row-click='handleRowHandle' @row-dblclick="details()">
							<el-table-column prop="applicationNo" label="订单编号">
							</el-table-column>
							<el-table-column prop="channelName" label="渠道名称">
							</el-table-column>
							<el-table-column prop="channelContacts" label="渠道联系人">
							</el-table-column>
							<el-table-column prop="userName" label="申请人">
							</el-table-column>
							<el-table-column prop="contrTypes" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" :formatter="changeTime" label="申请时间">
							</el-table-column>
						</el-table>
					</template>
					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageIndexChange">
						</el-pagination>
					</el-col>
				</el-tab-pane>
				<el-tab-pane label="申请拒绝" name="fourth">
					<template>
						<el-table :data="users4" highlight-current-row v-loading="listLoading" @row-click='handleRowHandle' @row-dblclick="details()" style="width: 100%;">
							<el-table-column prop="applicationNo" label="订单编号">
							</el-table-column>
							<el-table-column prop="channelName" label="渠道名称">
							</el-table-column>
							<el-table-column prop="channelContacts" label="渠道联系人">
							</el-table-column>
							<el-table-column prop="userName" label="申请人">
							</el-table-column>
							<el-table-column prop="contrTypes" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" :formatter="changeTime" label="申请时间">
							</el-table-column>
							<el-table-column label="操作" width="150" v-if="reSubShow">
								<template scope="scope">
									<el-button type="primary" size="small" @click="reSubmit(scope.$index, scope.row)">重新提交</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageIndexChange">
						</el-pagination>
					</el-col>
				</el-tab-pane>
				<!--渠道审核弹出框-->
				<el-dialog title="渠道审核意见" v-model="batchReview" :show-close="false">
					<el-form :model="batchForm" label-width="90px">
						<el-form-item label="* 审核结果">
							<el-radio-group v-model="batchForm.isAgree">
								<el-radio label="2" name="isAgree" value="2">同意</el-radio>
								<el-radio label="3" name="isAgree" value="3">拒绝</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="* 审核备注">
							<el-input type="textarea" v-model="batchForm.remarks" placeholder="请输入备注内容"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="cancel()">取 消</el-button>
						<el-button type="primary" @click="sendReview" :loading="sendloading">确 定</el-button>
					</div>
				</el-dialog>

				<!--重新提交弹出框-->
				<el-dialog title="重新提交" v-model="reSubmitPop" :show-close="false" size="tiny">
					<span>申请已被拒绝，是否重新提交</span>
					<span slot="footer" class="dialog-footer">
    <el-button @click="reSubmitPop = false">取 消</el-button>
    <el-button type="primary" @click="sureReSubmit">确 定</el-button>
  </span>
				</el-dialog>
				</el-tab-pane>
			</el-tabs>
		</template>
	</div>
</template>
<script>
	export default {
		name: '',
		data() {
			return {
				entryInfo: {
					number: '',
					name: '',
				},
				contactsMobile: '',
				options1: [],
				value: "",
				options: [{
					value: '0',
					label: '全部'
				}, {
					value: '1',
					label: '审核中'
				}, {
					value: '2',
					label: '审核通过'
				}, {
					value: '3',
					label: '审核拒绝'
				}, ],
				verifyStatus: '0',
				options11: [{
					regionName: "全部",
					regionNo: ""
				}],
				//                日期选择组件
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				value6: '',
				value7: '',

				// TAB切换
				activeName2: 'first',
				pageSize: 20, // 每一页展示数据条数
				pageIndex: 0,
				total: 0,
				pageSizes: [20, 30, 50],
				statusClick: 0, //第几个tab被点击
				users: [],
				users2: [],
				users3: [],
				users4: [],
				listLoading: false, //列表加载图标是否显示
				auditFlow: false, //审核流弹窗
				reviewList: [], //审核流数据
				reSubmitPop: false, //重新提交弹出框
				userNo: '',
				ReSubmitData: '', //重新提交数据

				batchReview: false, // 审核意见弹出框
				batchForm: { // 审核结果
					result: '',
					remarks: '',
					isAgree: '',
				},
				currentOrder: "", // 选中的当订单编号
				currentOrder2: "", // 选中的当订单编号
				roleName: '', //角色名
				isShow: true, //待审核是否显示
				reSubShow: false, //重新提交按钮是否显示
				ReSubmitData1: '', //重新提交数据
				rowVerify: "", //点击某一行数据的审核状态
				verifyShow:true,
				sendloading: false, //加载中
			}
		},
		methods: {
			details() {
				if(this.rowVerify == "审核中" && this.roleName != "网点业务员" && this.roleName != "渠道业务员") {
					this.$router.push({
						name: '渠道审核',
						params: {
							currentOrder: this.currentOrder
						}
					});
				} else {
					this.$router.push({
						name: '渠道详情',
						params: {
							currentOrder: this.currentOrder
						}
					});
				}

			},
			sizeChange: function(pageSize) {
				this.pageSize = pageSize;
				this.query();
			},
			pageIndexChange: function(pageIndex) {
				this.pageIndex = pageIndex;
				this.pageNum = pageIndex;
				this.query();
			},
			changeTime: function(row, column) { //审核状态数据转换
				var backTime = new Date(row.applicationTime)
				var y = backTime.getFullYear();
				var m = backTime.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				var d = backTime.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			changeTime2: function(row, column) { //审核状态数据转换
				if(row.updatedBy == null) {
					return '';
				} else {
					var backTime = new Date(row.updatedBy)
					var y = backTime.getFullYear();
					var m = backTime.getMonth() + 1;
					m = m < 10 ? '0' + m : m;
					var d = backTime.getDate();
					d = d < 10 ? ('0' + d) : d;
					return y + '-' + m + '-' + d;
				}

			},
			timeChange: function(date) { //开始时间，结束时间格式转换
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			handleClick(tab, event) {
				this.statusClick = tab.index;
				this.verifyStatus = tab.index;
				if((tab.index == 1 && this.roleName == "网点业务员") || (tab.index == 1 && this.roleName == "渠道业务员")) {
					this.$message({
						message: '当前无操作权限',
						type: 'error'
					});
					this.users2 = [];
				} else {
					this.query();
				}
				if(tab.index > 0){
					this.verifyShow = false;
				}else{
					this.verifyShow = true;
				}
			},
			handleRowHandle(row, column) {
				this.rowVerify = row.verifyStat;
				if(this.rowVerify == "审核中" && this.roleName != "渠道业务员"){
					this.currentOrder2 = row.applicationNo;
				}else{
					this.currentOrder2 = '';
				}
				this.currentOrder = row.applicationNo; // 点击选中的一行
			},
			getChanneRange() {
				this.$http.post(process.env.API + "/network/getAllRegion", "", {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						this.options1 = res.data.data; //  渲染区域
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
			query() { //从后台获取数据

				if(this.value7[0] && this.value7[1]) {
					var startTime = this.timeChange(this.value7[0]);
					var endTime = this.timeChange(this.value7[1]);
				} else {
					var startTime = '';
					var endTime = '';
				}
                this.listLoading = true;
				this.$http.post(process.env.API + "/channel/search", {
					"applicationNo": this.entryInfo.number, //订单编号
					"applicationStartTime": startTime,
					"applicationEndTime": endTime,
					"belongRegion": this.value,
					"channelName": this.entryInfo.name,
					"contactsMobile": this.contactsMobile,
					"verifyStatus": this.verifyStatus,
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"tabTag": this.statusClick

				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,

					}
				}).then((res) => {
                    this.listLoading = false;
					if(res.data.code == '000000') {
						if(this.statusClick == '0') {
							this.users = res.data.data.channelData;
						} else if(this.statusClick == '1') {
							this.users2 = res.data.data.channelData;
						} else if(this.statusClick == '2') {
							this.users3 = res.data.data.channelData;
						} else {
							this.users4 = res.data.data.channelData;
						};
						this.roleName = res.data.data.roleName;
						this.userNo = res.data.data.userNo;
						if(!res.data.pageInfo) {

						} else {
							this.total = res.data.pageInfo.total;
							this.pages = res.data.pageInfo.pages;
							this.pageNum = res.data.pageInfo.pageNum;
						}
						if(this.roleName == "渠道业务员"){
							this.reSubShow = true;
						} else {
							this.reSubShow = false;
						}
						if(this.roleName == "渠道业务员" || this.roleName == "网点业务员") {
							this.isShow = true;
						} else {
							this.isShow = false;
						}

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
			seeOutlete: function(index, row) { //点击审核流查看审核数据
				this.auditFlow = true;
				this.$http.post(process.env.API + "/channel/verifyLog", {
					"applicationNo": row.applicationNo, //订单编号
				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						this.reviewList = res.data.data;

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
			addChannel() {
				if(this.roleName == "渠道业务员" || this.roleName == "网点业务员") {
					this.$router.push({
						path: '/addChannel'
					})
				} else {
					this.$message({
						message: '当前角色无添加权限！',
						type: 'error'
					});
				}
			},
			reviewedChannel() {
				// 点击审核 渠道  先判断身份是否是业务员   业务员无审核权限   是否选择渠道   然后再弹出审核页面   最后确定  审核
				if(this.roleName == "渠道业务员"){
					this.$message({
						type: 'error',
						message: "无审核权限"
					});
					return false;
				}else if(!this.currentOrder2) {
					this.$message({
						type: 'error',
						message: "请先选择需要审核的待审核订单"
					});
					return false;
				} else {
					this.batchReview = true;
				}
			},
			exportData() {
				if(this.value7 != "") {
					var startTime = this.timeChange(this.value7[0]);
					var endTime = this.timeChange(this.value7[1]);
				} else {
					var startTime = '';
					var endTime = '';
				}
				if(this.roleName == "渠道业务员") {
					this.$message({
						message: '业务员没有此权限！',
						type: 'error'
					});
				} else {
					window.location.href = process.env.API + "/channel/export?applicationNo=" + this.entryInfo.number + "&userNo=" + this.userNo + "&channelName=" + this.entryInfo.name + "&verifyStatus=" + this.verifyStatus + "&belongRegion=" + this.value + "&applicationStartTime=" + startTime + "&applicationEndTime=" + endTime + "&contactsMobile=" + this.contactsMobile;
				}
			},
			checkMobile() {
				var re = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
				if(this.contactsMobile && !re.test(this.contactsMobile)) {
					this.contactsMobile = '';
					this.$message({
						message: '手机号码格式有误！',
						type: 'warning'
					});
				}else {
					return this.contactsMobile;
				}
			},
			reSubmit(index, row) { //重新提交
				if(this.roleName == "渠道业务员" || this.roleName == "网点业务员") {
					this.ReSubmitData1 = row.applicationNo;
					this.reSubmitPop = true;
				} else {
					this.$message({
						message: "当前角色无重新提交权限",
						type: 'error'
					})
				}
			},
			// 弹出层的  确认审核
			sendReview() { //批量审核意见
				if(this.batchForm.isAgree && this.batchForm.remarks) {
					this.sendloading = true;
					this.$http.post(
						process.env.API + "/channel/verify", {
							'applicationNo': this.currentOrder,
							'remarks': this.batchForm.remarks, // 备注
							'verifyStep': this.batchForm.isAgree
						}, {
							headers: {
								"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
							}
						}
					).then((response) => {
                        this.sendloading = false;
						if(response.data.code == "000000") {
							this.currentOrder = "";
							this.batchForm.remarks = ""; // 备注
							this.batchForm.isAgree = "";

							this.batchReview = false;
						} else {
							this.$message({
								message: response.data.messages,
								type: 'error'
							})
						}
					})
				} else {
					this.$message({
						type: 'error',
						message: "请完善信息再确认提交审核"
					});
					return false;
				}
			},
			// 取消
			cancel() {
				this.batchReview = false;
				this.paramsList = [];
			},
			sureReSubmit() {
				this.reSubmitPop = false;
				this.$router.push({
					name: '渠道重新提交',
					params: {
						chanCurrentOrder: this.ReSubmitData1
					}
				});
			}
		},
		watch: {

		},
		mounted() {
			this.query();
			this.getChanneRange();
		}
	}
</script>
<style scoped lang='scss'>

</style>