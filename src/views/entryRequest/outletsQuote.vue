<template>
	<div id='channelOffering'>
		<el-form label-width="90px" :model="order">
			<el-row>
				<el-col :span="6">
					<el-form-item label="订单编号:">
						<el-input v-model="order.number" placeholder="请输入订单编号" :maxlength="14"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="网点联系人:">
						<el-input v-model="order.contacts" placeholder="请输入申请人姓名" :maxlength="20"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="推荐渠道:">
						<el-select v-model="outsideChannels" placeholder="请选择推荐渠道">
							<!-- TODO -->
							<el-option v-for="item in channelstotal" :key="item.value" :label="item.channelName" :value="item.applicationNo">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6" v-if="channelShow == true">
					<el-select v-model="channelsValue" placeholder="请选择推荐渠道" style="margin-left: 10px;">
						<el-option label="全部" value="">全部</el-option>
						<el-option v-for="item in channels" :key="item.value" :label="item.channelName" :value="item.applicationNo">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="业务员:">
						<el-input v-model="applicationUserNo" placeholder="请输入业务员名字"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="网点名称:">
						<el-input v-model="order.idCardNum" placeholder="请输入网点名称" :maxlength="20"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="申请时间:">
						<el-date-picker v-model="dateValue" type="daterange" placeholder="选择日期范围" :picker-options="pickerOptions2">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6" v-show="AuditStatus">
					<el-form-item label="审核状态:">
						<el-select v-model="resultsValue" placeholder="审核结果">
							<!-- TODO -->
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='24'>
					<el-button type="primary" @click="query">查询</el-button>

					<el-button type="primary" @click="addDot" style="margin-left: 70px;">新增网点</el-button>

					<el-button type="primary" @click="reviewedDot">审核网点</el-button>

					<el-button type="primary" @click="exportData">导出</el-button>
				</el-col>
			</el-row>
		</el-form>
		<template>
			<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
				<el-tab-pane label="全部申请" name="first">
					<template>
						<el-table :data="users" highlight-current-row v-loading="listLoading" @row-dblclick="details()" @row-click="handleRowHandle" style="width: 100%;">
							<el-table-column prop="applicationNo" label="订单编号">
							</el-table-column>
							<el-table-column prop="networkName" label="网点名称">
							</el-table-column>
							<el-table-column prop="networkContacts" label="网点联系人">
							</el-table-column>
							<el-table-column prop="recommendChannelName" label="推荐渠道">
							</el-table-column>
							<el-table-column prop="applicationUserName" label="业务员">
							</el-table-column>
							<el-table-column prop="contractTypesString" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" :formatter="changeTime" label="申请时间">
							</el-table-column>
							<el-table-column prop="verifyStatusString" label="审核状态">
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
					<el-dialog title="审核流" v-model="auditFlow" :close-on-click-modal="false">
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
				<!--批量审核弹出框-->
				<el-dialog title="批量审核意见" :visible.sync="batchReview" :show-close="false">
					<el-form :model="batchForm" label-width="90px">
						<el-form-item label="* 审核结果">
							<el-radio-group v-model="batchFormisAgree">
								<el-radio label="2" name="isAgree" value="2">同意</el-radio>
								<el-radio label="3" name="isAgree" value="3">拒绝</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="*网点等级归属:" v-if="verifyShow">
							<el-select v-model="verifyLevelValue" placeholder="请选择推荐渠道">
								<!-- TODO -->
								<el-option v-for="item in  verifyLevel" :key="item.id" :label="item.networkLevelName" :value="item.networkLevelNo">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="* 审核备注">
							<el-input type="textarea" v-model="batchForm.remarks" placeholder="请输入备注内容" class="textarea_style"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="cancel()">取 消</el-button>
						<el-button type="primary" @click="sendReview" :loading="sendloading">确 定</el-button>
					</div>
				</el-dialog>

				<el-tab-pane label="待审核" name="second" :disabled="isShow">
					<template>
						<el-table :data="users2" highlight-current-row v-loading="listLoading" style="width: 100%;" @selection-change="handleSelectionChange" @row-dblclick="details()" @row-click="handleRowHandle">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column prop="applicationNo" label="订单编号">
							</el-table-column>
							<el-table-column prop="networkName" label="网点名称">
							</el-table-column>
							<el-table-column prop="networkContacts" label="网点联系人">
							</el-table-column>
							<el-table-column prop="recommendChannelName" label="推荐渠道">
							</el-table-column>
							<el-table-column prop="applicationUserName" label="业务员">
							</el-table-column>
							<el-table-column prop="contractTypesString" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" :formatter="changeTime" label="申请时间">
							</el-table-column>
							<el-table-column prop="verifyStatusString" label="审核状态">
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
						<el-table :data="users3" highlight-current-row v-loading="listLoading" style="width: 100%;" @selection-change="handleSelectionChange" @row-dblclick="details()" @row-click="handleRowHandle">
							<el-table-column prop="applicationNo" label="订单编号">
							</el-table-column>
							<el-table-column prop="networkName" label="网点名称">
							</el-table-column>
							<el-table-column prop="networkContacts" label="网点联系人">
							</el-table-column>
							<el-table-column prop="recommendChannelName" label="推荐渠道">
							</el-table-column>
							<el-table-column prop="applicationUserName" label="业务员">
							</el-table-column>
							<el-table-column prop="contractTypesString" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" :formatter="changeTime" label="申请时间">
							</el-table-column>
							<el-table-column prop="verifyStatusString" label="审核状态">
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
						<el-table :data="users4" highlight-current-row v-loading="listLoading" @row-dblclick="details()" @row-click="handleRowHandle" style="width: 100%;">
							<el-table-column prop="applicationNo" label="订单编号">
							</el-table-column>
							<el-table-column prop="networkName" label="网点名称">
							</el-table-column>
							<el-table-column prop="networkContacts" label="网点联系人">
							</el-table-column>
							<el-table-column prop="recommendChannelName" label="推荐渠道">
							</el-table-column>
							<el-table-column prop="applicationUserName" label="业务员">
							</el-table-column>
							<el-table-column prop="contractTypesString" label="合同类型">
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
				order: {
					number: '',
					contacts: '',
					idCardNum: '',
				},
				applicationUserNo: '',
				batchReview: false,
				batchForm: {
					result: '',
					remarks: '',
				},
				batchFormisAgree: '2',
				verifyLevel: [], //网点等级归属
				verifyLevelValue: '',
				channels: [],
				channels1: [{
					channelName: "全部",
					applicationNo: ''
				}],
				outsideChannels: "",
				channelsValue: "",
				channelstotal: [{
						channelName: '全部',
						applicationNo: ''
					},
					{
						channelName: '外部渠道',
						applicationNo: '1'
					},
					{
						channelName: '内部渠道',
						applicationNo: '0'
					},
					{
						channelName: '无',
						applicationNo: '-1'
					}
				], //推荐渠道
				options: [{
					value: '0',
					label: '全部'
				}, {
					value: '1',
					label: '待审核'
				}, {
					value: '2',
					label: '审核通过'
				}, {
					value: '3',
					label: '审核拒绝'
				}, ],
				resultsValue: '0',

				//      日期选择组件
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
				dateValue: [],

				// TAB切换
				activeName2: 'first',
				pageSize: null, // 每一页展示数据条数
				pageIndex: 0,
				total: 0,
				pageSizes: [20, 30, 50, ],
				users: [],
				users2: [],
				users3: [],
				users4: [],
				reviewList: [],
				listLoading: false,
				auditFlow: false, //审核流操作弹出框是否显示
				statusClick: 0,
				userRoleName: '',
				toggUserRoleName: false,
				lists: [], // 要审核的订单集合
				userNo: '',
				reSubmitPop: false, //重新提交弹出框
				ReSubmitData: '', //重新提交数据
				currentOrder: '',
				AuditStatus: true, // 判断审核状态是否显示
				paramsList: [], // 批量审核的内容
				verifyShow: true, //网点等级是否显示
				isShow: true, //待审核页面是否可编辑
				reSubShow: false, //重新提交按钮是否显示
				rowVerify: "", //点击某一行数据的审核状态
				sendloading: false, //加载中
				channelShow: false, //具体渠道名称
			}
		},
		methods: {
			// 获取渠道名字
			getChannelName() {
				this.$http.post(process.env.API + "/channel/getChannelName", {
					"type": this.outsideChannels,
				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						this.channels = res.data.data;
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
			query() { //从后台获取数据
				this.listLoading = true;
				if(this.dateValue[0] && this.dateValue[1]) {
					var startTime = this.timeChange(this.dateValue[0]);
					var endTime = this.timeChange(this.dateValue[1]);
				} else {
					var startTime = '';
					var endTime = '';
				}

				this.$http.post(process.env.API + "/network/search", {
					"applicationNo": this.order.number, //订单编号
					"networkContacts": this.order.contacts, //网点联系人
					"outsideChannel": this.outsideChannels,
					"recommendChannelId": this.channelsValue, //推荐渠道
					"applicationUserName": this.applicationUserNo, //业务员
					"networkName": this.order.idCardNum, //网点名称
					"verifyStatus": this.resultsValue, //审核状态
					"applicationStartTime": startTime, //开始时间
					"applicationEndTime": endTime, //结束时间
					"pageNum": this.pageNum, // 页码
					"pageSize": this.pageSize, //每页数量
					"tabTag": this.statusClick //  0   代表查询全部     1 待审核 2 审核通过 3 审核拒绝
				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
                    this.listLoading = false;
					if(res.data.code == '000000') {
						if(this.statusClick == 0) {
							this.users = res.data.data.list;
						} else if(this.statusClick == 1) {
							this.users2 = res.data.data.list;
						} else if(this.statusClick == 2) {
							this.users3 = res.data.data.list;
						} else if(this.statusClick == 3) {
							this.users4 = res.data.data.list;

						}
						this.userRoleName = res.data.data.userRoleName;
						this.userNo = res.data.data.userNo;
						if(res.data.pageInfo == "undefined") {

						} else {
							this.total = res.data.pageInfo.total;
							this.pages = res.data.pageInfo.pages;
							this.pageNum = res.data.pageInfo.pageNum;
						}
						if(this.userRoleName == "网点业务员") {
							this.reSubShow = true;
						} else {
							this.reSubShow = false;
						}
						if(this.userRoleName == "渠道业务员" || this.userRoleName == "网点业务员") {
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
			//			标准时间转时间戳
			timeStrap(val) {
				var str = new Date(val).getFullYear() + '-' + (new Date(val).getMonth() + 1) + '-' + new Date(val).getDate();
				return str;
			},
			addDot() {
				if(this.userRoleName == "网点业务员" || this.userRoleName == "渠道业务员") {
					this.$router.push({
						path: '/addOutlets'
					});
				} else {
					this.$message({
						message: '当前角色无添加权限',
						type: 'error'
					});
				}
			},
			// 网点审核
			reviewedDot() {
				//  首先提示清选择要审核的网点   再弹出框
				if(this.userRoleName == "网点业务员" || this.userRoleName == "渠道业务员") {
					this.$message({
						message: '当前无操作权限',
						type: 'error'
					});
				} else if(!this.lists.length) {
					this.$message({
						message: '请选择要审核的网点',
						type: 'error'
					});
				} else {
					this.batchReview = true;
					if(this.userRoleName == "市场部") {
						this.verifyShow = true;
					} else {
						this.verifyShow = false;
						this.verifyLevelValue = '';
					}
				}

			},
			exportData() {
				if(this.dateValue != "") {
					var startTime = this.timeChange(this.dateValue[0]);
					var endTime = this.timeChange(this.dateValue[1]);
				} else {
					var startTime = '';
					var endTime = '';
				}
				if(this.userRoleName == "网点业务员" || this.userRoleName == "渠道业务员") {
					this.$message({
						message: '当前无操作权限',
						type: 'error'
					});
				} else {

					window.location.href = process.env.API + "/network/export?applicationNo=" + this.order.number + "&networkContacts=" + this.order.contacts + "&recommendChannelId=" + this.channelsValue + "&applicationUserNo=" + this.applicationUserNo + "&userNo=" + this.userNo + "&networkName=" + this.order.idCardNum + "&verifyStatus=" + this.resultsValue + "&tabTag=" + this.statusClick + "&applicationStartTime=" + startTime + "&applicationEndTime=" + endTime + "&pageNum=" + this.pageNum + "&pageSize=" + this.pageSize;
					var a = window.location.href;
				}
				// TODO  所有的参数拼接到里面
			},
			//			获取网点等级归属
			getVerifyLevel() {
				this.$http.post(
					process.env.API + "/network/findNeworkLevel",
					"", {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}
				).then((res) => {
					if(res.data.code == "000000") {
						this.verifyLevel = res.data.data;
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
			handleClick(tab, event) {
				this.statusClick = tab.index;

				this.AuditStatus = tab.index == 0 ? true : false;
				if((tab.index == 1 && this.userRoleName == "网点业务员") || (tab.index == 1 && this.userRoleName == "渠道业务员")) {
					this.$message({
						message: '当前无操作权限',
						type: 'error'
					});
					this.users2 = [];
				} else if(this.statusClick > 0) {
					this.resultsValue = this.statusClick + ""; // TODO
					this.query();
				} else {
					this.resultsValue = "0"; // TODO
					this.query();
				}
			},
			//点击审核流查看审核数据
			seeOutlete: function(index, row) {
				this.auditFlow = true;
				this.$http.post(process.env.API + "/network/verify/hostory", {
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
			//			申请拒绝之后重新提交请求
			againSubmit() {
				this.$http.post(process.env.API + "/network/update", {
					"applicationNo": this.outletNum, //订单编号
				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {} else {
						this.$message({
							message: '查询失败！',
							type: 'warning'
						});
					}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				})
			},
			//			分页查询
			pageQuery() { // TODO
				this.listLoading = true;
				if(this.dateValue != "") {
					var startTime = this.timeChange(this.dateValue[0]);
					var endTime = this.timeChange(this.dateValue[1]);
				}
				this.$http.post(process.env.API + "/network/search", {
					"applicationNo": this.order.number, //订单编号
					"networkContacts": this.order.contacts, //网点联系人
					"recommendChannelId": this.channelsValue, //推荐渠道
					"applicationUserNo": this.applicationUserNo, //业务员
					"networkName": this.order.idCardNum, //网点名称
					"verifyStatus": this.resultsValue, //审核状态
					"applicationStartTime": startTime, //开始时间
					"applicationEndTime": endTime, //结束时间
					"pageNum": this.pageNum, // 页码
					"pageSize": this.pageSize, //每页数量
					"tabTag": this.statusClick

				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
                    this.listLoading = false;
					if(res.data.code == '000000') {
						if(this.statusClick == 0) {
							this.users = res.data.data.list;
						} else if(this.statusClick == 1) {
							this.users2 = res.data.data.dataList;
						} else if(this.statusClick == 2) {
							this.users3 = res.data.data.dataList;
						} else {
							this.users4 = res.data.data.dataList;
						}
						if(res.data.data.userRoleName == "业务部") {
							this.userRoleName = res.data.data.userRoleName;
							this.toggUserRoleName = false; //  TODO 若是业务部门   没有待审核
						}
						this.userRoleName = res.data.data.userRoleName;

						this.total = res.data.pageInfo.total;
						this.pages = res.data.pageInfo.pages;
						this.pageNum = res.data.pageInfo.pageNum;

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
			toggleSelection(rows) {
				if(rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.lists = val;
			},
			sendReview() { //批量审核意见
				this.paramsList = [];
				for(var i = 0; i < this.lists.length; i++) {
					this.paramsList.push({
						'applicationNo': this.lists[i].applicationNo, // 订单编号list
						'remarks': this.batchForm.remarks, // 备注
						'verifyLevel': this.verifyLevelValue, // 	划分等级
						'verifyStatus': this.batchFormisAgree, //  审核结果
					})
				}
				if(this.batchForm.remarks && this.lists) {
					this.sendloading = true;
					this.$http.post(process.env.API + "/network/verify", {
						'list': this.paramsList, //   TODO   list为一个数组 里面传需要审核的条目
					}, {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}).then((res) => {
                        this.sendloading = false;
						if(res.data.code == '000000') {

							this.batchReview = false;
							this.batchForm.remarks = "";
							this.verifyLevelValue = "";
							this.batchFormisAgree = "";
							this.query();
						} else {
							this.$message({
								message: res.data.messages,
								type: 'error'
							})
						}
					}, (res) => {
						this.sendloading = false;
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					})
				} else {
					this.$message({
						message: '请填写审核信息后确认',
						type: 'error'
					});
				}
			},
			cancel() {
				this.batchReview = false;
				this.paramsList = [];
			},
			//			init待审核页面数据
			noExamine() {
				this.listLoading = false;
			},
			checkMobile() {
				if(!this.applicationUserNo) {
					this.$message({
						message: '手机号码不能为空！',
						type: 'warning'
					});
					return false;
				}
				var re = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
				if(!re.test(this.applicationUserNo)) {
					this.applicationUserNo = '';
					this.$message({
						message: '手机号码格式有误！',
						type: 'warning'
					});
				} else {
					return this.applicationUserNo;
				}

			},
			reSubmit(index, row) { //重新提交
				if(this.userRoleName == "渠道业务员" || this.userRoleName == "网点业务员") {
					this.ReSubmitData = row.applicationNo;
					this.reSubmitPop = true;
				} else {
					this.$message({
						message: "当前角色无重新提交权限",
						type: 'error'
					})
				}

			},
			sureReSubmit() {
				this.reSubmitPop = false;
				this.$router.push({
					name: '网点重新提交',
					params: {
						netCurrentOrder: this.ReSubmitData
					}
				});
			},
			handleRowHandle(row, column) {
				this.currentOrder = row.applicationNo; // 点击选中的一行
				this.rowVerify = row.verifyStatusString;
			},
			// 双击查看
			details(row) {
				if(this.rowVerify == "待审核" && this.userRoleName != "网点业务员" && this.userRoleName != "渠道业务员") {
					this.$router.push({
						name: '网点审核',
						params: {
							currentOrder: this.currentOrder
						}
					});
				} else {
					this.$router.push({
						name: '网点详情',
						params: {
							currentOrder: this.currentOrder
						}
					});
				}

			}
		},
		watch: {
			batchFormisAgree: function() {
				if(this.userRoleName == "市场部" && this.batchFormisAgree == '2') {
					this.verifyShow = true;
				} else {
					this.verifyShow = false;
					this.verifyLevelValue = '';
				}
			},
			outsideChannels: function() {
				if(this.outsideChannels == "1" || this.outsideChannels == "0") {
					this.channelShow = true;
				} else {
					this.channelShow = false;
					this.channelsValue = "";
				}
				this.getChannelName();
			}
		},
		created() {
			this.$nextTick(() => {
				this.getChannelName();
			})

		},
		mounted() {
			this.pageSize = 20;
			this.query();
			this.getVerifyLevel();
			this.noExamine();
		}

	}
</script>
<style scoped lang='scss'>
	.textarea_style textarea {
		width: 100%;
		height: 100px;
		resize: none;
	}
	
	.el-date-editor--daterange.el-input {
		width: 100%;
	}
</style>