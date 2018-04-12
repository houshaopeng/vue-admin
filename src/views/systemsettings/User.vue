<template>
	<div id='user'>
		<el-form label-width="90px" :model="user">
			<el-row>
				<el-col :span="8">
					<el-form-item label="工号:">
						<el-input v-model="user.jobNumber" type="text" placeholder="单行输入" :maxlength="30" @keyup.native="numTest()"></el-input>
						<!--<div class="userChange"><input  type="number"   v-model="user.jobNumber" placeholder="单行输入" maxlength="30" oninput="if(value.length>6)value=value.slice(0,30)"  onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"/></div>-->
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="姓名:">
						<el-input v-model="user.Name" placeholder="单行输入" :maxlength="20"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="电话:">
						<el-input v-model="user.phone" @blur="checkPhone()" @keyup.native="phoneTest()" type="text" placeholder="单行输入" :maxlength="11"></el-input>
						<!--<div class="userChange"><input  type="number"   v-model="user.phone" @blur="checkPhone()" placeholder="单行输入" maxlength="11" oninput="if(value.length>6)value=value.slice(0,11)"  onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"/></div>-->
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<!--<el-form-item label="角色名称:">
                        <el-input v-model="user.roleName" placeholder="单行输入" :maxlength = "15"></el-input>
                    </el-form-item>-->
					<el-form-item label="角色名称:">

						<el-select v-model="roleValue" @change="changeRole" placeholder="请选择角色名称">
							<el-option label="全部" value="">
							</el-option>
							<el-option v-for="item in rList" :key="item.value" :label="item.levelName" :value="item.levelName">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="状态:">
						<el-select v-model="stateValue" @change="changeState" placeholder="全部" class="userValue">
							<!-- TODO -->
							<el-option v-for="item in states" :key="item.state" :label="item.label" :value="item.state">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='5'>
					<el-button type="primary" @click="query">查询</el-button>
				</el-col>
				<el-col :span='5'>
					<el-button type="primary" @click="addUser">添加用户</el-button>
				</el-col>
				<el-col :span='5'>
					<el-button type="primary" @click="reset">重置密码</el-button>
				</el-col>
			</el-row>
		</el-form>

		<template>
			<el-table :data="manifests" border highlight-current-row @current-change="rePassword" v-loading="listLoading" style="width: 100%" height="400">
				<el-table-column type="index" label="序号" width="100"></el-table-column>
				<el-table-column prop="userNo" label="账号">
				</el-table-column>
				<el-table-column prop="userName" label="姓名">
				</el-table-column>
				<el-table-column prop="mobileNo" label="电话">
				</el-table-column>
				<el-table-column prop="roleName" label="角色名称">
				</el-table-column>
				<el-table-column prop="userMail" label="邮箱">
				</el-table-column>
				<el-table-column prop="userStatus" label="状态"></el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<span>
		 	                    <el-button type="info" size="small" @click="handleEdit(scope.row)">编辑</el-button>
		 	                </span>
					</template>
				</el-table-column>
			</el-table>

			<!--分页-->
			<!--<el-col :span="24" class="toolbar"> 
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
				</el-pagination>
			</el-col>-->
			<div id="clearButton" style="text-align:center;">
				<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageIndexChange">
				</el-pagination>
			</div>

		</template>
		<!-----------------------------新添加用户----------------------->
		<el-dialog title="添加用户" :visible.sync="dialogFormVisible" :show-close="false">
			<el-form :model="newForm" label-width="90px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="*工号:">
							<el-input v-model="newForm.jobNumber" @keyup.native="addNum()" type="text" placeholder="请输入员工工号" :maxlength="30"></el-input>
							<!--<div class="userChange"><input  type="number"   v-model="newForm.jobNumber" placeholder="请输入员工工号" maxlength="30" oninput="if(value.length>6)value=value.slice(0,30)"  onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"/></div>-->
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="*姓名:">
							<el-input v-model="newForm.name" placeholder="请输入员工姓名" :maxlength="20"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="*电话:">
							<el-input v-model="newForm.phone" @blur="checkNew()" @keyup.native="addPhone()" type="text" placeholder="请输入员工电话号码" :maxlength="11"></el-input>
							<!--<div class="userChange"><input  type="number"   v-model="newForm.phone" @blur="checkNew()" placeholder="请输入员工电话号码" maxlength="11" oninput="if(value.length>6)value=value.slice(0,11)"  onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" /></div>-->
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="*邮箱地址:">
							<el-input v-model="newForm.maile" @blur="newMile()" placeholder="请输入员工邮箱地址" :maxlength="50"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="*角色:">
							<el-select v-model="value1" @change="changeValue" placeholder="请选择角色">
								<!-- TODO -->
								<el-option v-for="item in roleList" :key="item.roleNo" :label="item.roleName" :value="item.roleNo">
									<span style="float: left">{{ item.roleName }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.roleNo}}</span>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="*状态:">
							<el-radio-group v-model="checkList">
								<el-radio :label="0">启用</el-radio>
								<el-radio :label="1">停用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-show="showExam">
					<el-col :span="24">
						<el-form-item label="*是否加入审核流:" label-width="200px">
							<el-radio-group v-model="reviewed">
								<el-radio :label="0">是</el-radio>
								<el-radio :label="1">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>


				<el-row v-show="showChief" class="demo-autocomplete">
					<el-col :span="12">
						<el-form-item label="*上级总监:">
							<!--模糊搜索input框-->
							<el-autocomplete popper-class="my-autocomplete" v-model="value2" :fetch-suggestions="querySearch" custom-item="my-item-zh" placeholder="请输入总监名称或编号" @select="handleSelect" icon="edit" :on-icon-click="handleIconClick"></el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelUser">取 消</el-button>
				<el-button type="primary" @click="userSure">确 定</el-button>
			</div>
		</el-dialog>

		<!------------------------------------------编辑更改用户---------------------------->
		<el-dialog title="编辑用户" :visible.sync="editFormVisible" :show-close="false">
			<el-form :model="editForm" label-width="90px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="*工号:">
							<el-input v-model="editForm.jobNumber" :disabled="true" placeholder="请输入员工工号" :maxlength="15"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="*姓名:">
							<el-input v-model="editForm.name" placeholder="请输入员工姓名" :maxlength="15"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="*电话:">
							<el-input v-model="editForm.phone" @blur="checkEdit()" @keyup.native="editPhone()" type="text" placeholder="请输入员工电话号码" :maxlength="11"></el-input>
							<!--<div class="userChange"><input  type="number"   v-model="editForm.phone" @blur="checkEdit()" placeholder="请输入员工电话号码" maxlength="11" oninput="if(value.length>6)value=value.slice(0,11)"  onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"/></div>-->
						</el-form-item>

					</el-col>
					<el-col :span="12">
						<el-form-item label="*邮箱地址:">
							<el-input v-model="editForm.maile" @blur="editMile()" placeholder="请输入员工邮箱地址" :maxlength="50"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="*角色:">
							<el-select v-model="editValue1" @change="changeValue" placeholder="请选择角色">
								<!-- TODO -->
								<el-option v-for="item in roleList" :key="item.roleNo" :label="item.roleName" :value="item.roleNo">
									<span style="float: left">{{ item.roleName }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.roleNo}}</span>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="*状态:">
							<el-radio-group v-model="editCheckList">
								<el-radio :label="0">启用</el-radio>
								<el-radio :label="1">停用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-show="showExam">
					<el-col :span="24">
						<el-form-item label="*是否加入审核流:" label-width="200px">
							<el-radio-group v-model="editReviewed">
								<el-radio :label="0">是</el-radio>
								<el-radio :label="1">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-show="showChief">
					<el-col :span="12">
						<el-form-item label="*上级总监:">
							<el-select v-model="editValue2" @change="changeChief" placeholder="请选择">
								<el-option v-for="item in userList" :key="item.userNo" :label="item.userName" :value="item.userNo">
									<span style="float: left">{{ item.userName }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.userNo}}</span>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
                
                 <!--<el-row v-show = "showChief">
                    <el-col :span="12">
                        <el-form-item label="*上级总监:">
                            <el-select v-model="editValue2"  @change="changeChief" placeholder="请选择">   &lt;!&ndash; TODO &ndash;&gt;
                                <el-option
                                        v-for="item in userList"
                                        :key="item.userNo"
                                        :label="item.userName"
                                        :value="item.userNo">
                                        <span style="float: left">{{ item.userName }}</span>
      									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.userNo}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>           
                </el-row>-->
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEidt">取 消</el-button>
                <el-button type="primary" @click="userEdit" :loading="loadingTogg">确 定</el-button>
            </div>
        </el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	Vue.component('my-item-zh', {
		functional: true,
		render: function(h, ctx) {
			var item = ctx.props.item;
			return h('li', ctx.data, [
				h('b', {
					attrs: {
						class: 'name'
					}
				}, [item.userName]),
				h('span', {
					attrs: {
						class: 'addr'
					}
				}, [item.userNo])
			]);
		},
		props: {
			item: {
				type: Object,
				required: true
			}
		}
	});
	export default {
		name: 'user',
		data() {
			return {
                loadingTogg: false,
				user: {
					jobNumber: '', //工号
					Name: '', //姓名
					phone: '', //电话                    
				},
				states: [ //状态
					{
						state: '',
						label: '全部'
					},
					{
						state: 0,
						label: '启用'
					},
					{
						state: 1,
						label: '停用'
					}
				],
				stateValue: '', //状态初始化
				manifests: [], //用户数据集合
				rList: [{ //角色等级
					levelNo: '',
					levelName: ''
				}],
				rList1: [{ //角色等级
					levelName: "全部",
					levelNo: ""
				}],
				roleValue: '',
				//              manifests:[{   //用户数据集合
				//              	index:'',
				//              	userNo:'',
				//              	userName:'',
				//              	mobileNo:'',
				//              	roleName:'',
				//              	userMail:'',
				//              	userStatus:''               	
				//              }], 
				newForm: { //添加用户
					jobNumber: '',
					name: '',
					phone: '',
					maile: ''
				},
				editForm: { //编辑用户
					jobNumber: '',
					name: '',
					phone: '',
					maile: ''
				},
				checkList: 0, //用户状态（0启用，1停用）
				editCheckList: 0,
				reviewed: 1, //是否有审批权限（0是，1否）
				editReviewed: 1, //是否有审批权限（0是，1否）
				roleList: [], //角色select
				userList: [], //上级总监select
				roleNo1: '',
				userNo: '', //上级总监编号
				value1: '', //角色初始化
				value2: '', //上级总监初始化
				editValue1: '',
				editValue2: '',
				editValue: '',
				editVal: '',
				editRoleNo: '',
				editUserNo: '',
				editRoleNo1: '',
				editUserNo1: '',
				dialogFormVisible: false, //添加用户弹框
				editFormVisible: false, //编辑用户弹框
				formLabelWidth: '120px',
				listLoading: false, //加载
				resetOrder: '', //重置密码工号
				showExam: false, //审核流
				showChief: false, //总监 
				pageSize: 30, // 每一页展示数据条数
				pageIndex: 0,
				total: 0,
				pageSizes: [20, 30, 50],
				roleNo: '',
				roleName: '',
				roleTogg: '',
				dataList2: '',
				datastep: false,
			}
		},
		methods: {
			//      	checkNumber(){
			//      		var rule = /^[0-9]*$/;
			//  			if((!rule.test(this.user.jobNumber)&&this.user.jobNumber!=""&&this.user.jobNumber!=null)){ 
			//  				this.$message({
			//					  message: '工号只能数字',
			//					  type: 'warning'
			//					});	
			//					this.user.jobNumber = '';
			//  			}  
			//      	},
			querySearch(queryString, cb) {
				this.$http({
					method: 'POST',
					url: process.env.API + "/user/queryDirector",
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					},
					body: {
						"directorFlag": this.roleTogg,
						"directorValue": queryString
					}
				}).then((res) => {
					if(res.data.code == "000000") {
						this.dataList2 = res.data.data;
						cb(this.dataList2);
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
					});
				});
				                                 
			},
			handleIconClick(ev) {
				this.value2 = "";
			},
			handleSelect(item) {
				this.userNo = item.userNo;
			},
			//新增用户工号判断
			addNum() {
				this.newForm.jobNumber = this.newForm.jobNumber.replace(/[^\d]/g, '');
			},
			//新增用户手机号判断
			addPhone() {
				this.newForm.phone = this.newForm.phone.replace(/[^\d]/g, '');
			},
			//查询手机号
			checkPhone() {
				var rule = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
				if((!rule.test(this.user.phone) && this.user.phone != '' && this.user.phone != null)) {
					this.$message({
						message: '手机号输入错误',
						type: 'error'
					});
				}
			},
			//新增用户手机号
			checkNew() {
				var rule = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
				if(!rule.test(this.newForm.phone) && this.newForm.phone != "" && this.newForm.phone != null) {
					this.$message({
						message: '手机号输入错误',
						type: 'error'
					});
				}
			},
			//编辑用户手机号
			checkEdit() {
				var rule = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
				if(!rule.test(this.editForm.phone) && this.editForm.phone != "" && this.editForm.phone != null) {
					this.$message({
						message: '手机号输入错误',
						type: 'error'
					});
				}
			},
			//编辑用户手机号
			editPhone() {
				this.editForm.phone = this.editForm.phone.replace(/[^\d]/g, '');
			},
			// 查询手机号码判断
			phoneTest() {
				this.user.phone = this.user.phone.replace(/[^\d]/g, '');
			},
			//查询工号判断
			numTest() {
				this.user.jobNumber = this.user.jobNumber.replace(/[^\d]/g, '');
			},
			//添加
			newMile() {
				var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				//				var reg =  /^[a-zA-Z0-9][\w.-]*@[a-zA-Z0-9][\w-]*\.(?:com|cn)$/;
				if(!reg.test(this.newForm.maile) && this.newForm.maile != '' && this.newForm.maile != null) {
					this.$message({
						message: '邮箱格式不正确',
						type: 'error'
					});
				}
			},
			//编辑
			editMile() {
				//              var reg =  /^[a-zA-Z0-9][\w.-]*@[a-zA-Z0-9][\w-]*\.(?:com|cn)$/;
				var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				if(!reg.test(this.editForm.maile) && this.editForm.maile != '' && this.editForm.maile != null) {
					this.$message({
						message: '邮箱格式不正确',
						type: 'error'
					});
				};
			},
			check() {
				//查找角色	
				this.$http({
					method: 'POST',
					url: process.env.API + "/role/queryRoleAll",
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == "000000") {
						this.roleList = res.data.data;
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
					});
				});
				this.getChief();
				//获取所有角色等级
				this.$http({
					method: 'POST',
					url: process.env.API + "/role/level",
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == "000000") {
						this.rList = res.data.data;
					} else {
						this.$message({
							message: "网络请求错误",
							type: 'error'
						})
					}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					});
				});
			},
			getChief() {
				// 查找上级总监
				this.$http({
					method: 'POST',
					url: process.env.API + "/user/queryDirector",
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					},
					body: {
						"directorFlag": this.roleTogg,
						"directorValue": ""
					}
				}).then((res) => {
					if(res.data.code == "000000") {
						this.userList = res.data.data;
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
					});
				});
			},
			//分页
			sizeChange: function(pageSize) {
				this.pageSize = pageSize;
				//	            this.query();
				this.showQuery();
			},
			handleCurrentChange(val) {
				this.page = val;
				//				this.query();
				this.showQuery();
			},
			pageIndexChange: function(pageIndex) {
				this.pageIndex = pageIndex;
				//	            this.query();
				this.showQuery();
			},
			//状态
			changeState(value) {
				this.states.state = value;
			},
			changeRole(value) {

				this.levelName = value;
			},
			//用户查询
			query() {
				var rule = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
				if(!rule.test(this.user.phone) && this.user.phone != "") {
					this.$message({
						message: '手机号输入错误',
						type: 'error'
					});
				} else {
					this.queryRole();
				}
			},
			queryRole() {
				this.$http({
					method: 'POST',
					url: process.env.API + "/user/combinationQuery",
					body: {
						"mobileNo": this.user.phone, // 手机号
						"pageNum": this.pageIndex, //当前页
						"pageSize": this.pageSize, //页大小
						"roleName": this.roleValue, // 角色名称
						"userName": this.user.Name, // 姓名
						"userNo": this.user.jobNumber, // 工号（账号）
						"userStatus": this.states.state, // 用户状态（0启用，1停用）
					},
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
                    this.listLoading = false;
					if(res.data.code == "000000") {
						this.manifests = res.data.data;
						this.pageIndex = res.data.pageInfo.pageNum;
						this.total = res.data.pageInfo.total;
						this.pageSize = res.data.pageInfo.pageSize;
						if(this.manifests) {
							for(var i = 0; i < this.manifests.length; i++) {
								(this.manifests[i].userStatus) == 0 ? this.manifests[i].userStatus = '启用' : this.manifests[i].userStatus = '停用';
							}
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
					});
				})
			},
			//页面初始化显示用户查询列表
			showQuery() {
				this.listLoading = true;
				this.$http({
					method: 'POST',
					url: process.env.API + "/user/combinationQuery",
					body: {
						"mobileNo": this.user.phone, // 手机号
						"pageNum": this.pageIndex, //当前页
						"pageSize": this.pageSize, //页大小
						"roleName": this.roleValue, // 角色名称
						"userName": this.user.Name, // 姓名
						"userNo": this.user.jobNumber, // 工号（账号）
						"userStatus": this.states.state, // 用户状态（0启用，1停用）
					},
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
                    this.listLoading = false;
					if(res.data.code == "000000") {
						this.manifests = res.data.data;
						this.pageIndex = res.data.pageInfo.pageNum;
						this.total = res.data.pageInfo.total;
						this.pageSize = res.data.pageInfo.pageSize;

						if(this.manifests) {
							for(var i = 0; i < this.manifests.length; i++) {
								(this.manifests[i].userStatus) == 0 ? this.manifests[i].userStatus = '启用' : this.manifests[i].userStatus = '停用';
							}
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
					});
				})

			},
			//角色下拉点击
			changeValue(value) {
				if(!isNaN(value)) {
					this.roleNo = value;
					if(this.roleNo) {
						let obj = {};
						obj = this.roleList.find((item) => {
							return item.roleNo === value;
						});
						this.roleList.roleName = obj.roleName;
						if(this.roleList.roleName == '渠道业务员' || this.roleList.roleName == '网点业务员') {
							if(this.roleList.roleName == '网点业务员') {
								this.roleTogg = "outlets"
							} else if(this.roleList.roleName == '渠道业务员') {
								this.roleTogg = ""
							}
							this.check();
							this.showExam = false;
							this.showChief = true;
						} else {
							this.showExam = true;
							this.showChief = false;
						}
					}
				}
			},
			changeChief(value) {
				if(value) {
					this.userNo = value;
				}
			},
			userSure() { //添加页面   确认添加用户
				if(this.newForm.jobNumber == "" || this.newForm.name == "" || this.newForm.phone == "" || this.newForm.maile == "" || ((this.value2 == "" || this.value2 == null) && this.showChief == true && this.showExam == false) || this.newForm.jobNumber == null || this.newForm.name == null || this.newForm.phone == null || this.newForm.maile == null) {
					this.$message({
						type: 'error',
						message: "请输入完整信息"
					});
				} else {
					var rule = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
					if(!rule.test(this.newForm.phone)) {
						this.$message({
							message: '手机号输入错误',
							type: 'error'
						});

					};
					var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
					//					var reg =  /^[a-zA-Z0-9][\w.-]*@[a-zA-Z0-9][\w-]*\.(?:com|cn)$/;
					if(!reg.test(this.newForm.maile)) {
						this.$message({
							message: '邮箱格式不正确',
							type: 'error'
						});
					};
					if(rule.test(this.newForm.phone) && reg.test(this.newForm.maile)) {
						this.$http({
							method: 'POST',
							url: process.env.API + "/user/addUser",
							body: {
								"mobileNo": this.newForm.phone, // 手机号
								"roleNo": this.roleNo, // 角色编号
								"superOfficer": this.userNo, // 上级总监（编号）
								"userMail": this.newForm.maile, // 邮箱
								"userName": this.newForm.name, // 姓名
								"userNo": this.newForm.jobNumber, //工号
								"userStatus": this.checkList, //用户状态（0启用，1停用）
								"verifyRole": this.reviewed //是否有审批权限（0是，1否）
							},
							headers: {
								"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
							}
						}).then((res) => {
							if(res.data.code == "000000") {
								this.showQuery();
								this.dialogFormVisible = false;
								this.newForm = {
									jobNumber: '',
									name: '',
									phone: '',
									maile: ''
								};
								this.value1 = '';
								this.value2 = '';
								this.checkList = 0;
								this.showExam = false;
								this.showChief = false;
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
							});
						})
					}
				}

			},
			//取消时清空
			cancelUser() {
				this.dialogFormVisible = false;
				this.newForm = {
					jobNumber: '',
					name: '',
					phone: '',
					maile: ''
				};
				this.value1 = '';
				this.value2 = '';
				this.checkList = 0;
				this.showExam = false;
				this.showChief = false;
			},
			//显示编辑界面
			handleEdit(row) {

				this.editFormVisible = true;
				this.editForm.jobNumber = row.userNo;
				this.editValue = row.roleName;
				this.editVal = row.suserName;
				this.editValue1 = this.editValue;
				this.editValue2 = this.editVal;
				this.editForm.name = row.userName;
				this.editForm.phone = row.mobileNo;
				this.editForm.maile = row.userMail;
				this.editCheckList = row.userStatus;
				this.editRoleNo = row.roleNo;
				this.editUserNo = row.superOfficer;
				this.editReviewed = row.verifyRole;
				if(this.editReviewed == true) {
					this.editReviewed = 1;
				} else {
					this.editReviewed = 0;
				}
				if(this.editCheckList == "启用") {
					this.editCheckList = 0;
				} else {
					this.editCheckList = 1;
				};
				if(this.editValue1 == '渠道业务员' || this.editValue1 == '网点业务员') {
					this.showExam = false;
					this.showChief = true;
					if(this.editValue1 == '网点业务员') {
						this.roleTogg = "outlets"
					} else if(this.editValue1 == '渠道业务员') {
						this.roleTogg = ""
					}
					this.getChief()
				} else {
					this.showExam = true;
					this.showChief = false;
				}
			},
			userEdit() { //编辑页面确认更改用户
				if(this.editForm.name == "" || this.editForm.phone == "" || this.editForm.maile == "" || ((this.editValue2 == "" || this.editValue2 == null) && this.showChief == true && this.showExam == false) || this.editForm.name == null || this.editForm.phone == null || this.editForm.maile == null) {
					this.$message({
						type: 'warning',
						message: "请输入完整信息"
					});
				} else {
					var rule = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
					if(!rule.test(this.editForm.phone)) {
						this.$message({
							message: '手机号输入错误',
							type: 'error'
						});
					};
					var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
					if(!reg.test(this.editForm.maile)) {
						this.$message({
							message: '邮箱格式不正确',
							type: 'error'
						});
					};
					if(rule.test(this.editForm.phone) && reg.test(this.editForm.maile)) {
						if(this.editValue1 == this.editValue) {
							this.roleNo1 = this.editRoleNo;
						} else {
							this.roleNo1 = this.roleNo;
						};

						if(this.showExam){
                            this.userNo1 = "";
						}else{
                            this.userNo1 = this.editValue2;
						}
                        this.loadingTogg = true;
						this.$http({
							method: 'POST',
							url: process.env.API + "/user/editUser",
							body: {
								"mobileNo": this.editForm.phone, // 手机号
								"roleNo": this.roleNo1, // 角色编号
								"superOfficer": this.userNo1, // 上级总监（编号）
								"userMail": this.editForm.maile, // 邮箱
								"userName": this.editForm.name, // 姓名
								"userNo": this.editForm.jobNumber, //工号
								"userStatus": this.editCheckList, //用户状态（0启用，1停用）
								"verifyRole": this.editReviewed //是否有审批权限（0是，1否）
							},
							headers: {
								"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
							}
						}).then((res) => {
                            this.loadingTogg = false;
							if(res.data.code == "000000") {
								this.showQuery();
								this.editFormVisible = false;
								//								this.editValue1 ='';
								//								this.editValue2 = '';
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
							});
						})
					}
				}
			},
			//编辑取消清空
			cancelEidt() {
				this.editFormVisible = false;
				this.editValue1 = "";
				this.showExam = false;
				this.showChief = false;
			},
			//添加用户弹框
			addUser() {
				this.dialogFormVisible = true;
			},
			rePassword(row) {
				if(row) {
					this.resetOrder = row.userNo; //点击选中当前行 并拿到当前行编号
				}
			},
			reset() {
				//重置密码
				if(this.resetOrder == "") {
					this.$message({
						type: 'info',
						message: "请先选择重置密码行"
					});
				} else {
					this.$http({
						method: 'POST',
						url: process.env.API + "/password/reset",
						body: {
							"userNo": this.resetOrder, // 角色编号
						},
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}).then((res) => {
						if(res.data.code == "000000") {
							this.$message({
								message: '密码重置成功',
								type: 'success'
							});
							this.resetOrder = "";
						} else {
							this.$message({
								message: res.data.messages,
								type: 'error'
							});
							this.resetOrder = "";
						}
					}, (res) => {
						this.$message({
							message: res.data.messages,
							type: 'error'
						});
					})
				}
			}
		},
		created: function() {
			this.check();
			this.showQuery();
		},
		mounted: function() {

		}
	}
</script>
<style lang='scss'>
	.my-autocomplete {
		li {
			line-height: normal;
			padding: 7px;
			.name {
				text-overflow: ellipsis;
				width: 60%;
				display: inline-block;
				overflow: hidden;
			}
			.addr {
				text-overflow: ellipsis;
				text-align: right;
				float: right;
				line-height: 18px;
				display: inline-block;
				width: 40%;
				font-size: 12px;
				color: #b4b4b4;
			}
			.highlighted .addr {
				color: #ddd;
			}
		}
	}
	
	.warp_box {
		width: 100%;
		height: 200px;
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-right: 1px solid #d1dbe5;
	}
</style>