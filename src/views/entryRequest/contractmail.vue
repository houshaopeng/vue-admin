<template>
	<div id='channelOffering'>
		<!-- 表单查询start -->
		<el-form v-if="activeName =='first'?false:true" label-width="90px" :model="order">
			<el-row>
				<el-col :span="8">
					<el-form-item label="订单编号:">
						<el-input v-model="order.applicationNo" placeholder="请输入订单编号" :maxlength="12"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="网点联系人:">
						<el-input v-model="order.networkContacts" placeholder="请输入申请人姓名" :maxlength="20"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="网点名称:">
						<el-input v-model="order.networkName" placeholder="请输入网点名称" :maxlength="16"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="推荐渠道:">
						<el-select v-model="outsideChannel" placeholder="请选择推荐渠道" @change="changeChannel()">
							<el-option v-for="item in channel" :key="item.value" :label="item.channelName" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8" v-if="ChannelNameshow">
					<el-form label-width="">
						<el-form-item label="">
							<el-select v-model="outsideChannelName" placeholder="请选择渠道名称">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="item in channels" :key="item.value" :label="item.channelName" :value="item.channelName">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form-item label="渠道联系人:">
						<el-input v-model="order.channelContacts" placeholder="请输入渠道联系人" :maxlength="20"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="渠道名称:">
						<el-input v-model="order.channelName" placeholder="请输入渠道名称" :maxlength="15"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" v-if="activeName == 'second'? true:false">
					<el-form label-width="120px">
						<el-form-item label="邮寄状态:">
							<el-select v-model="mailStatusValue" placeholder="全部">
								<!-- TODO -->
								<el-option v-for="item in mailStatus" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8" v-if="sendNumber">
					<el-form-item label="寄回单号:">
						<el-input v-model="order.sentBackExpressNo" placeholder="请输入单号" @keyup.native="textNum" :maxlength="20"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" v-if="activeName == 'third'? true:false">
					<el-form label-width="120px">
						<el-form-item label="邮寄状态:">
							<el-select v-model="mailStatusValue" placeholder="全部">
								<!-- TODO -->
								<el-option v-for="item in mailStatus1" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8" v-if="singleNumber">
					<el-form-item label="寄出单号:">
						<el-input v-model="order.sentOutExpressNo" placeholder="请输入单号" @keyup.native="textNum" :maxlength="20"></el-input>
					</el-form-item>
				</el-col>
				<!-- <el-col :span="6">
                    <el-form-item label="联系电话:">
                        <el-input  v-model="order.contactsMobile" placeholder="请输入申请人电话"  onKeypress="if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"  @blur="yanzhengtel" :maxlength="11"></el-input>
                        <el-input  v-model="order.contactsMobile" placeholder="请输入申请人电话"  @keyup.native="testtel" :maxlength="11"></el-input>

                    </el-form-item>
                </el-col> -->
			</el-row>
			<!-- 查询相关按钮 -->
			<el-row class="marginbottom">
				<el-col :span='3'>
					<el-button type="primary" @click="query">查询</el-button>
				</el-col>
				<el-col :span='4'>
					<el-button v-if="activeName =='second'?true:false" type="primary" @click="contractMailing1">寄回合同</el-button>

					<el-dialog title="合同邮寄" :visible.sync="contractMailing" :show-close="false">
						<el-form class="form" :model="form">
							<el-form-item v-if="qudaoshow" label="购销合同编号" :label-width="formLabelWidth">
								<el-input v-model="form.buyContractNo" @keyup.native="testhetongcode" auto-complete="off" placeholder="请输入购销合同编号" :maxlength="16"></el-input>
							</el-form-item>
							<el-form-item v-if="qudaoshow" label="租赁合同编号" :label-width="formLabelWidth">
								<el-input v-model="form.rentContractNo" @keyup.native="testhetongcode" auto-complete="off" placeholder="请输入租赁合同编号" :maxlength="16"></el-input>
							</el-form-item>
							<el-form-item label="咨询服务协议编号" :label-width="formLabelWidth">
								<el-input v-model="form.consultingAgreementNo" @keyup.native="testhetongcode" auto-complete="off" placeholder="请输入咨询服务协议编号" :maxlength="16"></el-input>
							</el-form-item>
							<el-form-item v-if="wangdianshow" label="战略合作框架协议" :label-width="formLabelWidth">
								<el-input v-model="form.strategicCooperationNo" @keyup.native="testhetongcode" auto-complete="off" placeholder="请输入编号" :maxlength="30"></el-input>
							</el-form-item>
							<el-form-item class="float" label="快递公司" :label-width="formLabelWidth">
								<el-select v-model="form.expressCompanyName" placeholder="请选择快递公司">
									<el-option v-for="item in ExpressCompany" :key="item.expressCompanyCode" :lable="item.id" :value="item.expressCompanyName">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item class="float kuaidi" label="快递单编号" :label-width="formLabelWidth">
								<el-input v-model="form.expressNo" placeholder="请输入快递单号" @keyup.native="textNum" :maxlength="20"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="cancel">取 消</el-button>
							<el-button type="primary" @click="contractMailingconfirm">确 定</el-button>
						</div>
					</el-dialog>

				</el-col>
				<el-col :span='4'>
					<el-button v-if="activeName =='third'?true:false" type="primary" @click="sureFile">确认留档</el-button>
				</el-col>
				<el-col :span='4'>
					<el-button type="primary" @click="exportData">导出</el-button>
				</el-col>
			</el-row>
		</el-form>
		<!-- 表单查询end -->
		<template>
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="打印合同" name="first">
					<template>
						<el-form ref="form" :model="form1" label-width="80px">
							<el-row :span="24">
								选择要打印的合同：
							</el-row>
							<el-row>
								<el-form-item label="">
									<el-radio-group v-model="resource">
										<el-col :span="6">
											<el-radio style="margin-top:30px;" label="渠道协议"></el-radio>
										</el-col>
										<el-col :span="6">
											<el-checkbox-group v-model="Channelagreemen">
												<el-checkbox class="margintop" label="咨询服务协议" name="Channelagreemen"></el-checkbox>
												<el-checkbox class="margintop" label="战略合作框架协议" name="Channelagreemen"></el-checkbox>
											</el-checkbox-group>
										</el-col>
										<el-col :span="6">
											<el-radio style="margin-top:30px;" label="网点协议"></el-radio>
										</el-col>
										<el-col :span="4">
											<el-checkbox-group v-model="Dotprotocol">
												<el-checkbox label="购销合同" name="Dotprotocol"></el-checkbox>
												<el-checkbox class="margintop" label="租赁合同" name="Dotprotocol"></el-checkbox>
												<el-checkbox class="margintop" label="咨询服务协议" name="Dotprotocol"></el-checkbox>
											</el-checkbox-group>
										</el-col>
									</el-radio-group>
								</el-form-item>
							</el-row>
							<el-row :span="24">
								请选择渠道或网点区域信息：
							</el-row>

							<el-col :span="6">
								<span>*所属区域:</span>
								<el-select v-model="form1.region" placeholder="请选择区域">
									<el-option label="" value="华北区"></el-option>
									<el-option label="" value="华东区"></el-option>
									<el-option label="" value="华南区"></el-option>
									<el-option label="" value="东北区"></el-option>
									<el-option label="" value="华中区"></el-option>
									<el-option label="" value="西南区"></el-option>
									<el-option label="" value="西北区"></el-option>
									<el-option label="" value="港澳台"></el-option>
								</el-select>
							</el-col>
							<el-col :span="14">
								<span style="margin-left: 30px;margin-right: 20px; float:left;">*联系地址:</span>
								<address-picker :opts="obj" v-model="address" id="address-picker2"></address-picker>
							</el-col>
							<el-col :span='24' style="text-align:center;margin-left:-100px;margin-top: 50px;">
								<el-button type="primary" @click="startPrint">开始打印合同</el-button>
							</el-col>
						</el-form>
					</template>
				</el-tab-pane>
				<el-tab-pane label="寄回合同" name="second">
					<template>
						<el-table :data="tableData1" height="350" border style="width: 100%" highlight-current-row @current-change="handoverOrder">
							<el-table-column prop="applicationNo" label="订单编号" width="">
							</el-table-column>
							<el-table-column prop="channelName" label="渠道名称" width="">
							</el-table-column>
							<el-table-column prop="channelContacts" label="渠道联系人">
							</el-table-column>
							<el-table-column prop="networkName" label="网点名称">
							</el-table-column>
							<el-table-column prop="networkContacts" label="网点联系人">
							</el-table-column>
							<el-table-column prop="soureName" label="推荐渠道">
							</el-table-column>
							<el-table-column prop="userName" label="申请人">
							</el-table-column>
							<el-table-column prop="contractTypes" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" label="申请时间">
							</el-table-column>
							<el-table-column prop="mailStatus" label="邮寄状态">
							</el-table-column>
							<el-table-column prop="expressCompanyName" label="快递公司">
							</el-table-column>
							<el-table-column prop="sentBackExpressNo" label="寄回单号">
							</el-table-column>
							<el-table-column prop="mailTime" label="邮寄时间">
							</el-table-column>
							<el-table-column label="操作" width="">
								<template scope="scope" v-show="queryExpress">
									<el-button type="text" @click="sentBackExpress(scope.$index, scope.row)">查询快递</el-button>

									<el-dialog style="text-align:center;" size="small" title="快递信息" :visible.sync="dialogTableVisible" :show-close="false">
										<iframe :src="expressURL">
                                          </iframe>
										<div>
											<el-button type="primary" @click="ok">确认</el-button>
										</div>
									</el-dialog>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<div id="clearButton" style="text-align:center;">
						<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageIndexChange">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="寄出合同" name="third">
					<template>
						<el-table :data="tableData2" height="350" border style="width: 100%" highlight-current-row @current-change="handoverOrder">
							<el-table-column prop="applicationNo" label="订单编号">
							</el-table-column>
							<el-table-column prop="channelName" label="渠道名称">
							</el-table-column>
							<el-table-column prop="channelContacts" label="渠道联系人">
							</el-table-column>
							<el-table-column prop="networkName" label="网点名称">
							</el-table-column>
							<el-table-column prop="networkContacts" label="网点联系人">
							</el-table-column>
							<el-table-column prop="soureName" label="推荐渠道">
							</el-table-column>
							<el-table-column prop="userName" label="申请人">
							</el-table-column>
							<el-table-column prop="contractTypes" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" label="申请时间">
							</el-table-column>
							<el-table-column prop="mailStatus" label="邮寄状态">
							</el-table-column>
							<el-table-column prop="expressCompanyName" label="快递公司">
							</el-table-column>
							<el-table-column prop="sentOutExpressNo" label="寄出单号">
							</el-table-column>
							<el-table-column prop="mailTime" label="邮寄时间">
							</el-table-column>
							<el-table-column label="操作" width="">
								<template scope="scope">
									<el-button type="text" @click="sentOutExpress(scope.$index, scope.row)">查询快递</el-button>

									<el-dialog style="text-align:center;" size="small" title="快递信息" :visible.sync="dialogTableVisible" :show-close="false">
										<iframe :src="expressURL">
                                          </iframe>
										<div>
											<el-button type="primary" @click="ok">确认</el-button>
										</div>
									</el-dialog>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<div id="clearButton" style="text-align:center;">
						<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageIndexChange">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="合同留档" name="fourth">
					<template>
						<el-table :data="tableData3" height="350" border style="width: 100%" highlight-current-row>
							<el-table-column prop="applicationNo" label="订单编号" width="">
							</el-table-column>
							<el-table-column prop="channelName" label="渠道名称" width="">
							</el-table-column>
							<el-table-column prop="channelContacts" label="渠道联系人">
							</el-table-column>
							<el-table-column prop="networkName" label="网点名称">
							</el-table-column>
							<el-table-column prop="networkContacts" label="网点联系人">
							</el-table-column>
							<el-table-column prop="soureName" label="推荐渠道">
							</el-table-column>
							<el-table-column prop="userName" label="申请人">
							</el-table-column>
							<el-table-column prop="contractTypes" label="合同类型">
							</el-table-column>
							<el-table-column prop="applicationTime" label="申请时间">
							</el-table-column>
							<el-table-column prop="sentBackExpressNo" label="寄回单号">
							</el-table-column>
							<el-table-column prop="sentOutExpressNo" label="寄出单号">
							</el-table-column>
							<el-table-column label="操作" width="">
								<template scope="scope">
									<el-button @click="ViewContract(scope.$index, scope.row)" type="text">查看合同</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<div id="clearButton" style="text-align:center;">
						<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageIndexChange">
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
		</template>
		<div id="noticeBox" :class="[start,end]" v-if="activeName =='first'?true:false" v-show="shownoticeBox">
			<h2> 最新通知<span class="close" @click="closenoticeBox">X</span></h2>
			<p class="noticCode"><span class="text">您申请的</span><span class="noticelist" v-for="item in noticelist">订单编号:{{item}}、</span></p>
			<p class="tongguo">已经审核通过，请将合同整理完毕后，寄回到公司。</p>
			<p class="currentTime">{{currentTime}}</p>
		</div>
	</div>
</template>
<script>
	import vue from "vue"
	export default {
		name: '',
		data() {
			return {
				address: {},
				obj: {
					label: {
						province: '',
						city: '',
						district: ''
					},
					default: {
						province: '北京',
						city: '北京',
						district: '东城区'
					},
					noLabel: true
				},
				start: '',
				end: '',
				ChannelNameshow: false,
				queryExpress: true,
				sendNumber: true,
				singleNumber: true,
				shownoticeBox: true,
				qudaoshow: false,
				wangdianshow: true,
				userNo: '',
				noticelist: [], //订单审核完成通知数据
				currentTime: "",
				gridData: [],
				tel: '',
				contractMailing: false, //合同邮寄数据
				Contractinformation: '', //查看合同返回信息
				expressURL: '', //快递URL
				form: {
					buyContractNo: '', //购销合同编号
					rentContractNo: '', //租赁合同编号
					consultingAgreementNo: '', //咨询服务协议
					strategicCooperationNo: '', //战略合作框架协议
					expressCompanyName: '',
					expressNo: '',
				},
				Channelagreemen: [],
				Dotprotocol: [],
				resource: '', //网点或渠道
				form1: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					Channelagreemen: [], //渠道协议
					Dotprotocol: [], //网点协议
					resource: '',
					desc: ''
				},
				formLabelWidth: '130px',
				outsideChannel: '',
				outsideChannelName: '',
				mailStatusValue: '', //选择邮寄状态
				order: {
					applicationNo: '',
					networkContacts: '',
					outsideChannel: '',
					outsideChannelName: '',
					contactsMobile: '',
					networkName: '',
					channelContacts: '',
					channelName: '',
					sentBackExpressNo: '',
					sentOutExpressNo: '',
					verifyStatus: '',
					mailStatus: '',
				},
				order1: {
					applicationNo: '',
					networkContacts: '',
					outsideChannel: '',
					outsideChannelName: '',
					contactsMobile: '',
					networkName: '',
					channelContacts: '',
					channelName: '',
					sentBackExpressNo: '',
					sentOutExpressNo: '',
					verifyStatus: '1',
					mailStatus: '',
				},
				order2: {
					applicationNo: '',
					networkContacts: '',
					outsideChannel: '',
					outsideChannelName: '',
					contactsMobile: '',
					networkName: '',
					channelContacts: '',
					channelName: '',
					sentBackExpressNo: '',
					sentOutExpressNo: '',
					verifyStatus: '2',
					mailStatus: '',
				},
				order3: {
					applicationNo: '',
					networkContacts: '',
					outsideChannel: '',
					outsideChannelName: '',
					contactsMobile: '',
					networkName: '',
					channelContacts: '',
					channelName: '',
					sentBackExpressNo: '',
					sentOutExpressNo: '',
					verifyStatus: '3',
					mailStatus: '',
				},
				currentOrder: '', //当前选中订单编号
				currentType: '', //当前选中订单类型
				ExpressCompany: '', // 查询快递公司数据
				dialogTableVisible: false, //快递信息展示
				kuaidiDetail: '', //快递详情
				mailStatus: [{
						value: '全部',
						lable: ''
					},
					{
						value: '已寄回',
						lable: ''
					},
					{
						value: '未寄回',
						lable: ''
					},
				],
				mailStatus1: [{
						value: '全部',
						lable: ''
					},
					{
						value: '已寄出',
						lable: ''
					},
					{
						value: '未寄出',
						lable: ''
					},
				],
				channel: [{
						channelName: '全部',
						value: ''
					},
					{
						channelName: '外部渠道',
						value: '1'
					},
					{
						channelName: '内部渠道',
						value: '0'
					},
					{
						channelName: '无',
						value: '-1'
					}
				],
				channels: [{
					channelName: '',
					label: ''
				}, {
					channelName: '',
					label: ''
				}, {
					channelName: '',
					label: ''
				}, {
					channelName: '',
					label: ''
				}, ],

				// TAB切换
				activeName: 'first', //tab切换
				tableData0: [{
					applicationNo: '', //订单编号
					channelName: '', //渠道名称
					dotName: '', //渠道联系人
					contacts: '', //网点名称
					networkName: '', //网点联系人
					soureName: '', //推荐渠道
					userName: '', //申请人
					contractTypes: '', //合同类型
					applicationTime: '' //申请时间
				}],
				tableData1: [{
					applicationNo: '', //订单编号
					channelName: '', //渠道名称
					dotName: '', //渠道联系人
					contacts: '', //网点名称
					networkName: '', //网点联系人
					soureName: '', //推荐渠道
					userName: '', //申请人
					contractTypes: '', //合同类型
					applicationTime: '', //申请时间
					mailStatus: '', //邮寄状态
				}],
				tableData2: [{
					applicationNo: '', //订单编号
					channelName: '', //渠道名称
					dotName: '', //渠道联系人
					contacts: '', //网点名称
					networkName: '', //网点联系人
					soureName: '', //推荐渠道
					userName: '', //申请人
					contractTypes: '', //合同类型
					applicationTime: '', //申请时间
					mailStatus: '', //邮寄状态
				}],
				tableData3: [{
					applicationNo: '', //订单编号
					channelName: '', //渠道名称
					dotName: '', //渠道联系人
					contacts: '', //网点名称
					networkName: '', //网点联系人
					soureName: '', //推荐渠道
					userName: '', //申请人
					contractTypes: '', //合同类型
					applicationTime: '' //申请时间
				}],
				pageSize: 20, // 每一页展示数据条数
				pageIndex: 1,
				total: 0, //总页数
				pageSizes: [20, 30, 50], //切换每页展示数据条数
				pendingContract: "",
			}

		},
		methods: {
			closenoticeBox() {
				this.end = "end"
			},
			getInside() { //获取渠道下拉框
				this.$http.post(process.env.API + "/channel/getChannelName", {
					"type": this.outsideChannel
				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						this.channels = res.data.data

					} else {
						this.$message({
							type: 'error',
							message: res.data.messages,
						});
					}
				}, (res) => {
					this.$message({
						type: 'error',
						message: res.data.messages,
					});
				}) //获取渠道连动框         //推荐渠道关联下拉框
			},
			textNum() { //快递单号验证输入数字
				if(this.order.sentBackExpressNo) {
					this.order.sentBackExpressNo = this.order.sentBackExpressNo.replace(/\D/g, '');
				}
				if(this.order.sentOutExpressNo) {
					this.order.sentOutExpressNo = this.order.sentOutExpressNo.replace(/\D/g, '');

				}
				this.form.expressNo = this.form.expressNo.replace(/\D/g, '');
			},
			changeChannel() {

			},
			getNowFormatDate() { //当前时间
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				this.currentTime = year + seperator1 + month + seperator1 + strDate;
			},
			notice() { //订单审核完成通知接口
				this.$http({
					method: "POST",
					url: process.env.API + "/contract/notice",
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == "000000") {

						this.noticelist = res.data.data;
						this.start = "start"
					} else if(res.data.code == "100006") {
						this.shownoticeBox = false;
					}
				}, (error) => {
					this.$message({
						type: 'error',
						message: res.data.messages,
					});
				})
			},
			cancel() {
				this.contractMailing = false;
				this.form.buyContractNo = '';
				this.form.rentContractNo = '';
				this.form.consultingAgreementNo = '';
				this.form.strategicCooperationNo = '';
				this.form.expressCompanyName = '';
				this.form.expressNo = '';
			},

			startPrint() { //开始打印合同
				var cityName = this.address.city
				var type;
				if(this.Channelagreemen.length > 0) {
					for(var i = 0; i < this.Channelagreemen.length; i++) {
						switch(this.Channelagreemen[i]) {
							case "咨询服务协议":
								type = 3
								break;
							case "战略合作框架协议":
								type = 4
								break;
						}
					}
				} else if(this.Dotprotocol.length > 0) {
					for(var i = 0; i < this.Dotprotocol.length; i++) {
						switch(this.Dotprotocol[i]) {
							case "购销合同":
								type = 1
								break;
							case "租赁合同":
								type = 0
								break;
							case "咨询服务协议":
								type = 2
								break;
						}
					}
				}

				if(this.Channelagreemen.length == 0 && this.Dotprotocol.length == 0) {
					this.$message({
						type: 'error',
						message: "请选择一种合同"
					})
				} else if(this.form1.region == "") {
					this.$message({
						type: 'warning',
						message: "请选择所属区域"
					})
				} else if(this.Channelagreemen.length > 1) {
					this.$message({
						message: '一次只能下载打印一个协议或合同',
						type: 'warning'
					})
				} else if(this.Dotprotocol.length > 1) {
					this.$message({
						message: '一次只能下载打印一个协议或合同',
						type: 'warning'
					})
				} else {
					window.location.href = process.env.API + "/contract/contractPrint?area=" + this.form1.region +
						"&city=" + cityName +
						"&type=" + type
				}

			},
			testtel() {
				this.order.contactsMobile = this.order.contactsMobile.replace(/\D/, '')

			},
			testhetongcode() {
				this.form.consultingAgreementNo = this.form.consultingAgreementNo.replace(/[a-z+_*&^%$#@!\u4e00-\u9fa5]*/, '')
				this.form.buyContractNo = this.form.buyContractNo.replace(/[a-z+_*&^%$#@!\u4e00-\u9fa5]*/, '')
				this.form.rentContractNo = this.form.rentContractNo.replace(/[a-z+_*&^%$#@!\u4e00-\u9fa5]*/, '')
				this.form.strategicCooperationNo = this.form.strategicCooperationNo.replace(/[a-z+_*&^%$#@!\u4e00-\u9fa5]*/, '')
			},
			handoverOrder(row) {
				if(row) {
					this.currentOrder = row.applicationNo; //点击选中当前行 并拿到当前行订单编号
					this.pendingContract = row;
					this.currentType = row.contractTypes;
				};

			},
			contractMailing1() { // 寄回合同
				if(this.currentOrder == "") {
					this.$message({
						type: 'info',
						message: "请先选择订单"
					});
				} else if(this.pendingContract.mailStatus == "已寄回") {
					this.$message({
						type: 'warning',
						message: "该合同已经寄回"
					});
				} else {
					if(this.pendingContract.applicationNo.slice(0, 2) == "WD") {
						this.qudaoshow = true;
						this.wangdianshow = false;
					} else {
						this.qudaoshow = false;
						this.wangdianshow = true;
					}
					this.contractMailing = true;
				}
			},
			contractMailingconfirm() { //寄回合同确认
				if(!this.form.consultingAgreementNo) {
					this.$message({
						message: "咨询服务协议编号不能为空",
						type: 'error'
					});
					return false;
				}
				if(this.qudaoshow) {

					if(!this.form.buyContractNo) {
						this.$message({
							message: "购销合同编号不能为空",
							type: 'error'
						});
						return false;
					}
					if(!this.form.rentContractNo) {
						this.$message({
							message: "租赁合同编号不能为空",
							type: 'error'
						});
						return false;
					}
				} else {
					if(!this.form.strategicCooperationNo) {
						this.$message({
							message: "战略合作框架协议不能为空",
							type: 'error'
						});
						return false;
					}

				}

				//首先确认合同编号
				this.$http({
					method: 'POST',
					url: process.env.API + "/contract/matchContractNo",
					body: {
						"applicationNo": this.pendingContract.applicationNo,
						"buySaleContractNo": this.form.buyContractNo,
						"consultationServiceNo": this.form.consultingAgreementNo,
						"leaseContractNo": this.form.rentContractNo,
						"strategicCooperationNo": this.form.strategicCooperationNo
					},
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == "000000") {

						this.form.buyContractNo,

							this.form.consultingAgreementNo,
							this.form.rentContractNo,
							this.form.strategicCooperationNo
						//  上传合同编号到store
						this.$store.commit('CONTRACT_NUMBER', this.form);
						this.$http.post(
							process.env.API + "/contract/mail", {
								"applicationNo": this.currentOrder,
								"buyContractNo": this.form.buyContractNo,
								"consultingAgreementNo": this.form.consultingAgreementNo,
								"expressCompanyName": this.form.expressCompanyName,
								"expressNo": this.form.expressNo,
								"rentContractNo": this.form.rentContractNo,
								"strategicCooperationFrameworkNo":this.form.strategicCooperationNo
							}, {
								headers: {
									"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
								}
							}
						).then((res) => {
							if(res.data.code == "000000") {
								this.$message({
									type: 'success',
									message: "寄回合同成功"
								});

								this.contractMailing = false;
								this.activeName = "third"

								this.$http({
									method: 'POST',
									url: process.env.API + "/contract/search",
									body: JSON.stringify(this.order2),
									headers: {
										"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
									}
								}).then((res) => {
									if(res.data.code == "000000") {
										this.tableData2 = res.data.data;
										this.pageSize = res.data.pageInfo.pageSize;
										this.total = res.data.pageInfo.total;
										this.pageIndex = res.data.pageInfo.pageNum;
										for(var i = 0; i < this.tableData2.length; i++) {
											this.tableData2[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
											if(res.data.data[i].mailStatus == "2") {
												this.tableData2[i].mailStatus = "未寄出"
											} else if(res.data.data[i].mailStatus == "3") {
												this.tableData2[i].mailStatus = "已寄出"
											}

											if(res.data.data[i].contractTypes == "0") {
												this.tableData2[i].contractTypes = "标准合同"
											} else if(res.data.data[i].contractTypes == "1") {
												this.tableData2[i].contractTypes = "非标准合同"
											}
										}
									}

								}, (res) => {
									this.$message({
										message: "网络请求错误",
										type: 'error'
									})
								})

							} else {
								this.$message({
									message: res.data.messages,
									type: 'error'
								})
							}
						})
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}
				})
			},
			sentBackExpress(index, row) { //寄回快递查询
				if(row) {
					this.currentOrder = row.applicationNo; //点击选中当前行 并拿到当前行订单编号
					this.pendingContract = row;
					this.currentType = row.contractTypes;
				};
				if(!this.pendingContract) {
					this.$message({
						message: "请先选择订单",
						type: 'warning'
					})
				} else if(!this.pendingContract.sentBackExpressNo) {
					this.$message({
						message: "合同未寄回，暂无快递信息",
						type: 'warning'
					})
				} else {
					var expressType;
					switch(this.pendingContract.expressCompanyName) {
						case "顺丰":
							expressType = "shunfeng"
							break;
						case "申通":
							expressType = "shentong"
							break;
						case "天天快递":
							expressType = "tiantian"
							break;
						case "韵达快运":
							expressType = "yunda"
							break;
						case "圆通速递":
							expressType = "yuantong"
							break;
						case "宅急送":
							expressType = "zhaijisong"
							break;
						case "中通速递":
							expressType = "zhongtong"
							break;
						case "国通快递":
							expressType = "guotongkuaidi"
							break;
						case "德邦物流":
							expressType = "debangwuliu"
							break;
						case "EMS":
							expressType = "ems"
							break;
					}
					this.$http({
						method: 'POST',
						url: process.env.API + "/contract/searchExpress",
						body: {
							"expressNo": this.pendingContract.sentBackExpressNo,
							"expressType": expressType
						},
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken
						}
					}).then((res) => {
						if(res.data.code == "000000") {
							this.expressURL = res.data.data
							this.dialogTableVisible = true;
						} else {
							this.$message({
								type: 'error',
								message: res.data.messages,
							});
						}
					}, (res) => {
						this.$message({
							message: "网络请求错误",
							type: 'error'
						})
					})
				}

			},
			sentOutExpress(index, row) { //寄出快递查询
				if(row) {
					this.currentOrder = row.applicationNo; //点击选中当前行 并拿到当前行订单编号
					this.pendingContract = row;
					this.currentType = row.contractTypes;
				};
				if(!this.pendingContract) {
					this.$message({
						message: "请先选择订单",
						type: 'warning'
					})
				} else if(!this.pendingContract.sentOutExpressNo) {
					this.$message({
						message: "合同未寄出，暂无快递信息",
						type: 'warning'
					})
				} else {
					var expressType;
					switch(this.pendingContract.expressCompanyName) {
						case "顺丰":
							expressType = "shunfeng"
							break;
						case "申通":
							expressType = "shentong"
							break;
						case "天天快递":
							expressType = "tiantian"
							break;
						case "韵达快运":
							expressType = "yunda"
							break;
						case "圆通速递":
							expressType = "yuantong"
							break;
						case "宅急送":
							expressType = "zhaijisong"
							break;
						case "中通速递":
							expressType = "zhongtong"
							break;
						case "国通快递":
							expressType = "guotongkuaidi"
							break;
						case "德邦物流":
							expressType = "debangwuliu"
							break;
						case "EMS":
							expressType = "ems"
							break;
					}
					this.$http({
						method: 'POST',
						url: process.env.API + "/contract/searchExpress",
						body: {
							"expressNo": this.pendingContract.sentOutExpressNo,
							"expressType": expressType
						},
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken
						}
					}).then((res) => {
						if(res.data.code == "000000") {
							this.expressURL = res.data.data
							this.dialogTableVisible = true;
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
				}
			},
			ok() {
				this.dialogTableVisible = false;
			},
			sureFile() { // 确认留档
				if(this.pendingContract != "" && this.pendingContract.mailStatus == "未寄出") {

					this.$store.commit('PENDING_CONTRACT', this.pendingContract);
					//路由传参 合同编号传过去
					var messages = this.form;
					messages.pendingContract = this.pendingContract;
					this.$router.push({
						name: '合同留档',
						params: {
							formCode: messages
						}
					})
					this.activeName = "fourth"
				} else if(this.pendingContract.mailStatus == "已寄出") {
					this.$message({
						type: 'info',
						message: "该合同已经寄出"
					});
				} else {
					this.$message({
						message: "请先选择订单",
						type: 'info'
					})
				}
			},
			exportData() { // 导出数据

				this.userNo = JSON.parse(sessionStorage.getItem('userInfo')).sysUserName;
				if(this.mailStatusValue == "未寄出") {
					this.order.mailStatus = "2"
				} else if(this.mailStatusValue == "已寄出") {
					this.order.mailStatus = "3"
				} else if(this.mailStatusValue == "未寄回") {
					this.order.mailStatus = "0"
				} else if(this.mailStatusValue == "已寄回") {
					this.order.mailStatus = "1"
				}else{
					this.order.mailStatus = ""
				}

				if(this.activeName == "first") {} else if(this.activeName == "second") {
					this.order.verifyStatus = "1"
				} else if(this.activeName == "third") {
					this.order.verifyStatus = "2"
				} else if(this.activeName == "fourth") {
					this.order.verifyStatus = "3"
				}
				this.$http({
					method: 'GET',
					url: process.env.API + "/contract/export",
					params: {
						"applicationNo": this.order.applicationNo,
						"networkContacts": this.order.networkContacts,
						"outsideChannel": this.outsideChannel,
						"outsideChannelName": this.outsideChannelName,
						"contactsMobile": this.order.contactsMobile,
						"networkName": this.order.networkName,
						"channelContacts": this.order.channelContacts,
						"channelName": this.order.channelName,
						"sentBackExpressNo": this.order.sentBackExpressNo,
						"sentOutExpressNo": this.order.sentOutExpressNo,
						"verifyStatus": this.order.verifyStatus,
						"mailStatus": this.order.mailStatus,
						"userNo": this.userNo,
					},
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == "100018") {
						this.$message({
							type: 'error',
							message: "无操作权限"
						});
					} else {
						window.location.href = process.env.API + "/contract/export?applicationNo=" + this.order.applicationNo +
							"&networkContacts=" + this.order.networkContacts +
							"&outsideChannel=" + this.outsideChannel +
							"&outsideChannelName=" + this.outsideChannelName +
							"&contactsMobile=" + this.order.contactsMobile +
							"&networkName=" + this.order.networkName +
							"&channelContacts=" + this.order.channelContacts +
							"&channelName=" + this.order.channelName +
							"&sentBackExpressNo=" + this.order.sentBackExpressNo +
							"&sentOutExpressNo=" + this.order.sentOutExpressNo +
							"&verifyStatus=" + this.order.verifyStatus +
							"&mailStatus=" + this.order.mailStatus +
							"&userNo=" + this.userNo
					}
				}, (res) => {
					this.$message({
						type: 'error',
						message: res.data.messages,
					});
				})

			},
			ViewContract(index, row) {
				if(row) {
					this.currentOrder = row.applicationNo; //点击选中当前行 并拿到当前行订单编号
					this.pendingContract = row;
					this.currentType = row.contractTypes;
				}; //查看合同
				if(this.pendingContract == "") {
					this.$message({
						type: 'info',
						message: "请先选择订单"
					});
				} else {
					this.$store.commit('PENDING_CONTRACT', this.pendingContract);
					// TODO  路由携带参数  跳转后请求
					this.$router.push({
						name: '查看合同',
						params: {
							currentOrder: this.currentOrder
						}
					});
				}
			},
			handleClick(tab, event) {
				//清空输入框
				// this.clearInput();
				
			},
			query() { //查询

				if(this.outsideChannel == "" || this.outsideChannel == -1) { // 推荐渠道
					this.outsideChannelName = "";
				}
				this.order.outsideChannel = this.outsideChannel;
				this.order.outsideChannelName = this.outsideChannelName;
				if(this.mailStatusValue == "未寄出") {
					this.order.mailStatus = "2"
				} else if(this.mailStatusValue == "已寄出") {
					this.order.mailStatus = "3"
				} else if(this.mailStatusValue == "未寄回") {
					this.order.mailStatus = "0"
				} else if(this.mailStatusValue == "已寄回") {
					this.order.mailStatus = "1"
				}else{
					this.order.mailStatus = ""
				}
				var body = null;
				if(this.activeName == "first") {

				} else if(this.activeName == "second") {
					this.order1 = this.order;
					this.order1.verifyStatus = "1"
					body = this.order1;
				} else if(this.activeName == "third") {
					this.order2 = this.order;
					this.order2.verifyStatus = "2"
					body = this.order2;
				} else if(this.activeName == "fourth") {
					this.order3 = this.order;
					this.order3.verifyStatus = "3"
					body = this.order3;
				}
				if(body) {
					this.$http({
						method: 'POST',
						url: process.env.API + "/contract/search",
						body: JSON.stringify(body),
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}).then((res) => {
						if(res.data.code == "000000") {
							if(this.activeName == "first") {

							} else if(this.activeName == "second") {
								this.tableData1 = res.data.data;
								if(res.data.pageInfo) {
									this.pageSize = res.data.pageInfo.pageSize;
									this.total = res.data.pageInfo.total;
									this.pageIndex = res.data.pageInfo.pageNum;
									for(var i = 0; i < this.tableData1.length; i++) {
										this.tableData1[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
										if(res.data.data[i].mailStatus == "0") {
											this.tableData1[i].mailStatus = "未寄回"
											this.queryExpress = false;
										} else if(res.data.data[i].mailStatus == "1") {
											this.tableData1[i].mailStatus = "已寄回"
										}

										if(res.data.data[i].contractTypes == "0") {
											this.tableData1[i].contractTypes = "标准合同"
										} else if(res.data.data[i].contractTypes == "1") {
											this.tableData1[i].contractTypes = "非标准合同"
										}
									}

								}
							} else if(this.activeName == "third") {
								this.tableData2 = res.data.data;
								if(res.data.pageInfo) {
									this.pageSize = res.data.pageInfo.pageSize;
									this.total = res.data.pageInfo.total;
									this.pageIndex = res.data.pageInfo.pageNum;
									for(var i = 0; i < this.tableData2.length; i++) {
										this.tableData2[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
										if(res.data.data[i].mailStatus == "2") {
											this.tableData2[i].mailStatus = "未寄出"
											this.queryExpress = false;
										} else if(res.data.data[i].mailStatus == "3") {
											this.tableData2[i].mailStatus = "已寄出"
										}

										if(res.data.data[i].contractTypes == "0") {
											this.tableData2[i].contractTypes = "标准合同"
										} else if(res.data.data[i].contractTypes == "1") {
											this.tableData2[i].contractTypes = "非标准合同"
										}
									}
								}
							} else if(this.activeName == "fourth") {
								this.tableData3 = res.data.data;
								if(res.data.pageInfo) {
									this.pageSize = res.data.pageInfo.pageSize;
									this.total = res.data.pageInfo.total;
									this.pageIndex = res.data.pageInfo.pageNum;
									for(var i = 0; i < this.tableData3.length; i++) {
										this.tableData3[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
										if(res.data.data[i].contractTypes == "0") {
											this.tableData3[i].contractTypes = "标准合同"
										} else if(res.data.data[i].contractTypes == "1") {
											this.tableData3[i].contractTypes = "非标准合同"
										}

									}
								}
							}
							// this.clearInput();
						} else {
							this.tableData0 = [];
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
				}
			},
			searchInfo() {
				// TODO
				this.order.outsideChannel = this.outsideChannel;
				this.order.outsideChannelName = this.outsideChannelName;
				this.order.pageNum = this.pageIndex;
				this.order.pageSize = this.pageSize;

				if(this.mailStatusValue == "未寄出") {
					this.order.mailStatus = "2"
				} else if(this.mailStatusValue == "已寄出") {
					this.order.mailStatus = "3"
				} else if(this.mailStatusValue == "未寄回") {
					this.order.mailStatus = "0"
				} else if(this.mailStatusValue == "已寄回") {
					this.order.mailStatus = "1"
				}else{
					this.order.mailStatus = ""
				}
				var body = null;
				if(this.activeName == "first") {

				} else if(this.activeName == "second") {
					this.order1 = this.order;
					this.order1.verifyStatus = "1"
					body = this.order1;
				} else if(this.activeName == "third") {
					this.order2 = this.order;
					this.order2.verifyStatus = "2"
					body = this.order2;
				} else if(this.activeName == "fourth") {
					this.order3 = this.order;
					this.order3.verifyStatus = "3"
					body = this.order3;
				}
				if(body) {
					this.$http({
						method: 'POST',
						url: process.env.API + "/contract/search",
						body: JSON.stringify(body),
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}).then((res) => {
						if(res.data.code == "000000") {
							if(this.activeName == "first") {

							} else if(this.activeName == "second") {
								this.tableData1 = res.data.data;
								if(res.data.pageInfo) {
									this.pageSize = res.data.pageInfo.pageSize;
									this.total = res.data.pageInfo.total;
									this.pageIndex = res.data.pageInfo.pageNum;
									for(var i = 0; i < this.tableData1.length; i++) {
										this.tableData1[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
										if(res.data.data[i].mailStatus == "0") {
											this.tableData1[i].mailStatus = "未寄回"
											this.queryExpress = false;
										} else if(res.data.data[i].mailStatus == "1") {
											this.tableData1[i].mailStatus = "已寄回"
										}

										if(res.data.data[i].contractTypes == "0") {
											this.tableData1[i].contractTypes = "标准合同"
										} else if(res.data.data[i].contractTypes == "1") {
											this.tableData1[i].contractTypes = "非标准合同"
										}
									}

								}
							} else if(this.activeName == "third") {
								this.tableData2 = res.data.data;
								if(res.data.pageInfo) {
									this.pageSize = res.data.pageInfo.pageSize;
									this.total = res.data.pageInfo.total;
									this.pageIndex = res.data.pageInfo.pageNum;
									for(var i = 0; i < this.tableData2.length; i++) {
										this.tableData2[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
										if(res.data.data[i].mailStatus == "2") {
											this.tableData2[i].mailStatus = "未寄出"
											this.queryExpress = false;
										} else if(res.data.data[i].mailStatus == "3") {
											this.tableData2[i].mailStatus = "已寄出"
										}

										if(res.data.data[i].contractTypes == "0") {
											this.tableData2[i].contractTypes = "标准合同"
										} else if(res.data.data[i].contractTypes == "1") {
											this.tableData2[i].contractTypes = "非标准合同"
										}
									}
								}
							} else if(this.activeName == "fourth") {
								this.tableData3 = res.data.data;
								if(res.data.pageInfo) {
									this.pageSize = res.data.pageInfo.pageSize;
									this.total = res.data.pageInfo.total;
									this.pageIndex = res.data.pageInfo.pageNum;
									for(var i = 0; i < this.tableData3.length; i++) {
										this.tableData3[i].applicationTime = new Date(res.data.data[i].applicationTime).toLocaleDateString().replace(/\//g, '-');
										if(res.data.data[i].contractTypes == "0") {
											this.tableData3[i].contractTypes = "标准合同"
										} else if(res.data.data[i].contractTypes == "1") {
											this.tableData3[i].contractTypes = "非标准合同"
										}

									}
								}
							}
						}
					}, (res) => {

					})
				} //分页请求查询
			},
			searchExpressCompany() { //查询快递公司
				this.$http({
					method: 'POST',
					url: process.env.API + "/contract/searchAllExpress",
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}

				}).then((res) => {
					if(res.data.code == "000000") {
						this.ExpressCompany = res.data.data;
					} else {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					}

				}, (res) => {
					this.$message({
						type: 'error',
						message: res.data.messages,
					});
				})
			},
			clearInput() {
				this.outsideChannel = '';
				this.mailStatusValue = '';
				this.outsideChannelName = '';
				this.order = {
					applicationNo: '',
					networkContacts: '',
					outsideChannel: '',
					outsideChannelName: '',
					contactsMobile: '',
					networkName: '',
					channelContacts: '',
					channelName: '',
					sentBackExpressNo: '',
					sentOutExpressNo: '',
					verifyStatus: '',
					mailStatus: '',
				}

				this.order1 = {
					applicationNo: '',
					networkContacts: '',
					outsideChannel: '',
					outsideChannelName: '',
					contactsMobile: '',
					networkName: '',
					channelContacts: '',
					channelName: '',
					sentBackExpressNo: '',
					sentOutExpressNo: '',
					verifyStatus: '1',
					mailStatus: '',
				}
				this.order2 = {
					applicationNo: '',
					networkContacts: '',
					outsideChannel: '',
					outsideChannelName: '',
					contactsMobile: '',
					networkName: '',
					channelContacts: '',
					channelName: '',
					sentBackExpressNo: '',
					sentOutExpressNo: '',
					verifyStatus: '2',
					mailStatus: '',
				}
				this.order3 = {
					applicationNo: '',
					networkContacts: '',
					outsideChannel: '',
					outsideChannelName: '',
					contactsMobile: '',
					networkName: '',
					channelContacts: '',
					channelName: '',
					sentBackExpressNo: '',
					sentOutExpressNo: '',
					verifyStatus: '3',
					mailStatus: '',
				}
			},
			sizeChange: function(pageSize) {
				this.pageSize = pageSize;
				this.searchInfo();
			},
			pageIndexChange: function(pageIndex) {

				this.pageIndex = pageIndex;

				this.searchInfo();
			}
		},
		watch: {
			outsideChannel: function() {
				this.getInside();

				if(this.outsideChannel === '') {
					this.ChannelNameshow = false;
				} else if(this.outsideChannel == 0) {
					this.ChannelNameshow = true;
				} else if(this.outsideChannel == 1) {
					this.ChannelNameshow = true;
				} else if(this.outsideChannel == -1) {
					this.ChannelNameshow = false;
				}
			},
			Channelagreemen: function() {
				if(this.Channelagreemen.length > 0) {

					this.resource = "渠道协议"
				}
				if(this.Channelagreemen.length > 0 && this.Dotprotocol.length > 0) {
					this.$message({
						message: '单次仅能打印一种合同类型',
						type: 'warning'
					})
					this.Dotprotocol = [];

				}

			},
			Dotprotocol: function() {
				if(this.Dotprotocol.length > 0) {
					this.resource = "网点协议"
				}
				if(this.Dotprotocol.length > 0 && this.Channelagreemen.length > 0) {
					this.$message({
						message: '单次仅能打印一种合同类型',
						type: 'warning'
					})
					this.Channelagreemen = [];
				}
			},
			resource: function() {
				if(this.resource == "网点协议" && this.Channelagreemen.length > 0) {
					this.resource = "网点协议";
					this.Channelagreemen = [];
					this.$message({
						message: '单次仅能打印一种合同类型',
						type: 'warning'
					})
				}
				if(this.resource == "渠道协议" && this.Dotprotocol.length > 0) {
					this.resource = "渠道协议";
					this.Dotprotocol = [];
					this.$message({
						message: '单次仅能打印一种合同类型',
						type: 'warning'
					})
				}
			}
		},
		created() {

		},
		mounted: function() {
			// this.searchExpressCompany();
			// this.query();
			// this.notice();
			this.getNowFormatDate();
		}
	}
</script>
<style lang='scss'>
	.query {
		float: right;
		margin-right: -200px;
	}

	.float {
		position: absolute;
		top: 0;
		right: -100%;
	}

	.kuaidi {
		top: 60px;
	}

	.form {
		width: 50%;
		position: relative;
	}

	.close {
		position: absolute;
		top: 5px;
		right: 20px;
		color: rgb(32, 106, 255);
		width: 20px;
		height: 20px;
		cursor: pointer;
		font-size: 26px;
	}

	.dialog {
		text-align: center;
		box-sizing: content-box;
		width: 600px;
	}
	.el-dialog{
		position: fixed;
	}
	.el-checkbox {
		margin-left: 0;
	}

	.margintop {
		margin-top: 10px;
		margin-left: 0px;
	}

	iframe {
		width: 550px;
		height: 350px;
		display: inline-block;
	}

	.el-row {
		margin-bottom: 0;
	}

	.marginbottom {
		margin-bottom: 10px;
	}

	#noticeBox {
		position: absolute;
		right: 20px;
		bottom: -220px;
		width: 350px;
		height: 220px;
		border: 1px solid rgb(32, 106, 255);
		border-radius: 20px;
		text-align: center;
		transition: all 2s;
		h2 {
			margin-top: 5px;
		}
		.currentTime {
			position: absolute;
			bottom: 0px;
			right: 20px;
		}
	}

	.start {
		transform: translateY(-220px);
	}

	.end {
		transform: translateY(0px);
	}

	.el-table .cell,
	.el-table th>div {
		padding: 0 4px 0 5px;
	}

	#address-picker2 {
		display: inline-block;
		float: left;
		font-size: 24px;
		height: 36px;
		select {
			min-width: 80px;
			margin: 0 10px;
			height: 36px;
			border-radius: 5px;
			border: 1px solid #bfcbd9;
			outline: none;
		}
	}

	.el-checkbox+.el-checkbox {
		margin-left: 0;
	}

	.noticCode {
		position: relative;
		max-height: 100px;
		overflow-y: auto;
	}

	.tongguo {
		margin: 0;
		margin-bottom: 20px;
	}

	.noticelist {
		display: block;
	}

	.text {
		position: absolute;
		top: 0;
		left: 10px;
	}
</style>