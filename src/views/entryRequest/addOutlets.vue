<template>
	<!--新增网点   点击网点提报的新增网点按钮进入新增网点页面-->
	<div class="addOutlets" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
		<el-button type="primary" @click="backPage">返回上一页</el-button>
		<div style="text-align: right;">网点编号: {{outletNum}}</div>
		<el-form ref="ruleForm" label-width="140px" class="demo-ruleForm" id="myform">
			<!--网点基本信息 start-->
			<h1>网点基本信息</h1>
			<el-row>
				<el-col :span="8">
					<el-form-item label="* 网点合同类型:">
						<el-radio-group v-model="ruleForm.contractType">
							<el-radio :label="0">标准合同</el-radio>
							<el-radio :label="1">非标合同</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 网点名称:">
						<el-input v-model="ruleForm.outletName" placeholder="请输入网点名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 网点联系人:">
						<el-input v-model="ruleForm.networkContact" placeholder="请输入网点联系人"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="6">
					<el-form-item label="* 网点类型:">
						<el-radio-group v-model="ruleForm.outletsType">
							<el-radio :label="0">个人</el-radio>
							<el-radio :label="1">企业</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="* 所属区域:">
						<el-select v-model="ruleForm.networkArea" placeholder="请选择区域">
							<el-option v-for="item in region" :key="item.value" :label="item.regionName" :value="item.regionNo">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="推荐渠道:">
						<el-select v-model="recommendChannelId" placeholder="请选择推荐渠道">
							<el-option v-for="item in channels" :key="item.value" :label="item.channelName" :value="item.applicationNo">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6" v-if="networkShow">
					<el-form-item label="">
						<el-select v-model="networkWay2" placeholder="渠道具体人员">
							<el-option v-for="item in insides" :key="item.value" :label="item.channelName" :value="item.applicationNo">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="16">
					<el-form-item label="* 联系地址:">
						<el-row>
							<el-col :span="12">
								<address-picker :opts="obj" v-model="address" id="address-picker"></address-picker>
							</el-col>
							<el-col :span="9">
								<el-input v-model="ruleForm.contactsAddress" placeholder="具体地址"></el-input>
							</el-col>
						</el-row>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 联系电话:">
						<el-input :maxlength="11" v-model="contactsMobile" placeholder="请输入手机号" @blur="checkMobile"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<!--网点基本信息 end-->

			<!--周边金融业信息 start-->
			<el-row>
				<h1 style="float: left;">周边金融业信息</h1> <span style="float: left;margin-top: 25px; ">正规金融机构与民间金融均可列入</span>
			</el-row>
			<div class="company" style="position: relative;">
				<el-row v-for="company in companys" :key="company.id">
					<el-col :span="8">
						<el-form-item label="名称:">
							<el-input v-model="company.aroundFinanceName" placeholder="请输入公司名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="离店距离:">
							<el-input @keyup.native="checkNum" @blur="checkNum" v-model="company.aroundFinanceVlaue" placeholder="请输入离店距离">
								<template slot="append">米</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-button type="primary" @click="addOne" style="display:block;position: absolute;bottom:22px;left:70%;"> 添加一行 </el-button>
			</div>
			<!--周边金融业信息 end-->

			<!--申请人经营信息 start-->
			<el-row>
				<h1 style="float: left;">申请人经营信息</h1>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="* 成立时间:">
						<el-date-picker v-model="ruleForm.buildTime" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 开业时间:">
						<el-date-picker v-model="ruleForm.startTime" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 是否品牌加盟店:">
						<el-radio-group v-model="ruleForm.isAdd">
							<el-radio name="isAdd" :label="0">是</el-radio>
							<el-radio name="isAdd" :label="1">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="16">
					<el-form-item label="* 注册地址:">
						<el-checkbox-group v-model="addAddr">
							<el-checkbox label="与联系地址相同" name="type1"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 邮政编码:">
						<el-input @keyup.native="checkCode" :maxlength="6" v-model="ruleForm.zipCode" placeholder="请输入邮政编码"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="16">
					<el-form-item label="">
						<el-row>
							<el-col :span="12">
								<address-picker :opts="obj2" v-model="address2" id="address-picker1"></address-picker>
							</el-col>
							<el-col :span="9">
								<el-input v-model="ruleForm.addAddr_detail" placeholder="具体地址"></el-input>
							</el-col>
						</el-row>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="* 法人姓名:">
						<el-input v-model="ruleForm.legalName" placeholder="请输入姓名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 法人电话:">
						<el-input :maxlength="11" v-model="corporationMobile" placeholder="请输入手机号" @blur="checkMobile2"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 法人身份证号:">
						<el-input v-model="ruleForm.legalId" :maxlength="18" placeholder="请输入身份证号" @blur="checkId"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="近三月平均营业额:">
						<el-input @keyup.native="checkNum2" v-model="ruleForm.threeMoney" placeholder="请输入营业金额">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="去年全年营业额:">
						<el-input @keyup.native="checkNum3" v-model="ruleForm.lastYearM" placeholder="请输入营业金额">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="* 主营商品1:">
						<el-input v-model="ruleForm.res1" placeholder="请输入商品名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 均价:">
						<el-input @keyup.native="checkNum4" v-model="ruleForm.resMoney1" placeholder="请输入商品价格">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="主营商品2:">
						<el-input v-model="ruleForm.res2" placeholder="请输入商品名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="均价:">
						<el-input @keyup.native="checkNum5" v-model="ruleForm.resMoney2" placeholder="请输入商品价格">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="主营商品3:">
						<el-input v-model="ruleForm.res3" placeholder="请输入商品名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="均价:">
						<el-input @keyup.native="checkNum6" v-model="ruleForm.resMoney3" placeholder="请输入商品价格">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="店铺日均人流量:">
						<el-input @keyup.native="checkNum7" v-model="ruleForm.shopDaily" placeholder="请输入店铺日均人流量"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<h1 style="float: left;">入驻终端机网络优势</h1>
			</el-row>
			<el-row>
				<el-col :span="16">
					<el-checkbox-group v-model="ruleForm.goodPoint">
						<el-checkbox label="地理位置好" name="type">地理位置好</el-checkbox>
						<el-checkbox label="客户资源丰富" name="type">客户资源丰富</el-checkbox>
						<el-checkbox label="经营模式独特" name="type">经营模式独特</el-checkbox>
						<el-checkbox label="商品质量优异" name="type">商品质量优异</el-checkbox>
						<el-checkbox label="品牌知名度高" name="type">品牌知名度高</el-checkbox>
						<el-checkbox label="其他" name="type">其他</el-checkbox>
					</el-checkbox-group>
				</el-col>
				<el-col :span="6">
					<el-input v-model="ruleForm.knowAbout" placeholder="对产品了解"></el-input>
				</el-col>
			</el-row>
			<!--申请人经营信息 end-->

			<!--影像上传 start-->
			<el-row>
				<h1 style="float: left;">影像上传</h1>
				<el-col :span="24">
					<span style="margin: 0 20px 0 24px;">*资料上传：</span>
					<vue-file-upload url="/terminal-oper/file/upload" ref="vueFileUploader" v-bind:events='cbEvents' v-bind:filters="filters" v-bind:request-options="reqopts" v-on:onAdd="onAddItem">
					</vue-file-upload>
					<span v-if="!files.length">未选择任何文件</span>
					<span v-else>一共选择{{files.length}}张图片</span>
					<input type="button" value="清空图片" @click="clearAll" class="clear_buttton" />
				</el-col>
				<el-col :span="24">
					<div class="img_box">
						<div class="img_item_box" v-for='(file,index) in files' @click="getIndex(index)" style="float: left">
							<img :src='onPreview(file)' alt="" @click="showModal(onPreview(file))" style="width: 200px;">
							<span class="img_name" v-html="file.name"></span>

							<img src="~STATIC/image/word.png" alt="" class="imgType" v-show="file.name.slice(file.name.length-4,file.name.length).indexOf('doc')>=0">
							<img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.name.slice(file.name.length-3,file.name.length)=='pdf'">

							<span class="close" @click="deleteItem(file)"> × </span>
						</div>
						<!--当渠道类型为个人的时候提示-->
						<div v-if="ruleForm.outletsType=='0'" v-show="files.length<1" id="no_img">
							<span>身份证正面</span>
						</div>
						<div v-else v-show="files.length<1" id="no_img">
							<span>企业组织结构代码证</span>
						</div>
						<div v-if="ruleForm.outletsType=='0'" v-show="files.length<2" id="no_img">
							<span>身份证反面</span>
						</div>
						<div v-else v-show="files.length<2" id="no_img">
							<span>税务登记证</span>
						</div>
						<div v-if="ruleForm.outletsType=='0'" v-show="files.length<3" id="no_img">
							<span>房产证/租赁合同</span>
						</div>
						<div v-else v-show="files.length<3" id="no_img">
							<span>营业执照</span>
						</div>
						<div v-if="ruleForm.outletsType=='0'" v-show="files.length<4" id="no_img">
							<span>终端机申请表扫描件</span>
						</div>
						<div v-else v-show="files.length<4" id="no_img">
							<span>租房合同</span>
						</div>
						<div v-if="ruleForm.outletsType=='0'" v-show="files.length<5" id="no_img">
							<span>店面内部图片</span>
						</div>
						<div v-else v-show="files.length<5" id="no_img">
							<span>法人身份证正面</span>
						</div>
						<div v-if="ruleForm.outletsType=='0'" v-show="files.length<6" id="no_img">
							<span>店面外部环境图片</span>
						</div>
						<div v-else v-show="files.length<6" id="no_img">
							<span>法人身份证反面</span>
						</div>
						<div v-if="ruleForm.outletsType=='0'" v-show="files.length<7" id="no_img">
							<span>机器摆放位置示意图</span>
						</div>
						<div v-else v-show="files.length<7" id="no_img">
							<span>终端机申请表扫描件</span>
						</div>

						<div v-if="ruleForm.outletsType=='0'" v-show="false" id="no_img">

						</div>
						<div v-else v-show="files.length<8" id="no_img">
							<span>店面内部照片</span>
						</div>
						<div v-if="ruleForm.outletsType==''" v-show="false" id="no_img">

						</div>
						<div v-else v-show="files.length<9" id="no_img">
							<span>店面外部环境图片</span>
						</div>
						<div v-if="ruleForm.outletsType=='0'" v-show="false" id="no_img">

						</div>
						<div v-else v-show="files.length<10" id="no_img">
							<span>机器摆放位置示意图</span>
						</div>
					</div>
				</el-col>
			</el-row>
			<!--影像上传 end-->

			<!--其他 start-->
			<el-row>
				<h1>其他</h1>
				<el-col :span="1">
					<span>备注:</span>
				</el-col>
				<el-col :span="21">
					<el-input type="textarea" :maxlength="400" :rows="5" v-model="remarks" placeholder="请输入备注内容"></el-input>
				</el-col>

			</el-row>
			<!--其他 end-->

			<el-row>
				<el-button type="button" @click="onSubmit" id="sub" style="display:block;margin: 0 auto; " name="submit">提交</el-button>
			</el-row>
		</el-form>
		<Modal :modelTogg="modelTogg" :imgSrc="imgSrc" @closeModal="closeModal" @upperPage="upperPage" @nextPage="nextPage"></Modal>
	</div>
</template>

<script>
	import VueFileUpload from '../../components/vue-file-upload.vue'
	import Modal from '../../components/modal.vue'
	export default {
		data() {
			return {
				outletNum: '', //网点编号
				contactsMobile: '', //联系电话
				recommendChannelId: '', //推荐渠道
				recommendUser: '', //渠道推荐人
				networkWay2: '', //内部渠道具体人员
				addAddr: '', //注册地址
				ruleForm: {
					outletName: '', //网点名称
					networkContact: '', //网点联系人
					networkName: '', //网点申请人
					networkArea: '', //所属区域
					contactsAddress: '', //具体地址
					contractType: 0, //网点合同类型
					buildTime: '', //成立时间
					startTime: '', //开业时间
					isAdd: 0, //是否品牌加盟店
					zipCode: '', //邮政编码
					addAddr_detail: '', //详细地址
					legalName: '', //法人姓名
					legalId: '', //法人身份证号
					res1: '', //主营商品1
					res2: '', //主营商品2
					res3: '', //主营商品3
					resMoney1: '', //商品价格1
					resMoney2: '', //商品价格2
					resMoney3: '', //商品价格3
					shopDaily: '', //店铺日均人流量
					goodPoint: [], //优势
					knowAbout: '', //产品了解
					threeMoney: '', //近三月平均营业额
					lastYearM: '', //去年全年营业额
					outletsType: 0 //网点类型
				},
				pickerOptions0: {},
				corporationMobile: '', //法人电话
				channels: [{
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
				region: [],
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
				address2: {},
				obj2: {
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
				companys: [{
						applicationNo: this.outletNum,
						aroundFinanceName: '',
						aroundFinanceVlaue: ''
					},
					{
						applicationNo: this.outletNum,
						aroundFinanceName: '',
						aroundFinanceVlaue: ''
					},
					{
						applicationNo: this.outletNum,
						aroundFinanceName: '',
						aroundFinanceVlaue: ''
					}
				],
				files: [],
				filters: [{ //过滤器回调
					name: "imageFilter",
					fn(file) {
						if(/^[A-Z]+$/.test(file.name.split(".")[1])) {
							return false;
						} else {
							var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
							return '|jpg|png|jpeg|bmp|gif|pdf|vnd.openxmlformats-officedocument.wordprocessingml.document|msword|'.indexOf(type) !== -1;
						}
					}
				}],
				cbEvents: { //事件回调
					onCompleteUpload: (file, response, status, header) => {
						this.routerTogg++;
						if(this.routerTogg == this.files.length && this.routerJump) {
							this.fullscreenLoading = false;
							if(!this.fullscreenLoading) {
								this.$router.push({
									path: '/outletsQuote'
								});
							}

						}
					},
					onAddFileSuccess: (file) => {

					}
				},
				reqopts: {
					formData: {
						applicationNo: this.outletNum,
						//						type: ""
					},
					responseType: 'json',
					withCredentials: false
				},
				remarks: '',
				modelTogg: false,
				imgSrc: '',
				srcArr: [],
				index: "",
				insides: "", // 内部渠道人
				routerTogg: 0,
				routerJump: false, // 路由跳转判断
				fullscreenLoading: false, //全屏loading
				networkShow: false,
			}
		},
		methods: {
			//返回上一页
			backPage() {
				this.$router.push({
					path: '/outletsQuote'
				});
			},
			onPreview(file) {
				var src = window.URL.createObjectURL(file.file);
				return src;
			},
			onAddItem(files) {
				this.files = files;
			},
			deleteItem(file) {
				file.remove();
			},
			uploadAll() {
				this.$refs.vueFileUploader.uploadAll();
			},
			clearAll() {
				this.$refs.vueFileUploader.clearAll();
			},
			showModal(val) {
				this.imgSrc = val;
				this.modelTogg = true;
			},
			closeModal() {
				this.modelTogg = false;
			},
			getIndex(val) {
				this.index = val;
			},
			upperPage() {
				var data = this.files;
				this.srcArr = [];
				for(var i = 0; i < data.length; i++) {
					this.srcArr.push(window.URL.createObjectURL(data[i].file));
				}
				this.index--;
				if(this.index == -1) {
					this.index = this.srcArr.length - 1;
				}
				this.imgSrc = this.srcArr[this.index];
			},
			nextPage() {
				var data = this.files;
				this.srcArr = [];
				for(var i = 0; i < data.length; i++) {
					this.srcArr.push(window.URL.createObjectURL(data[i].file));
				}
				this.index++;
				if(this.index == this.srcArr.length) {
					this.index = 0;
				}
				this.imgSrc = this.srcArr[this.index];
			},
			timeChange: function(date) { //开始时间，结束时间格式转换
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},

			onSubmit() {

				if(this.ruleForm.startTime != "") {
					var startShopTime = this.timeChange(this.ruleForm.startTime);
				} else {
					var startShopTime = "";
				}
				if(this.ruleForm.buildTime != "") {
					var createdShopTime = this.timeChange(this.ruleForm.buildTime);
				} else {
					var createdShopTime = "";
				}
				if(this.files.length != 0) {
					if((this.recommendChannelId == "1" && this.networkWay2 != "") || (this.recommendChannelId == "0" && this.networkWay2 != "") || (this.recommendChannelId == "-1" && this.networkWay2 == "")) {
						if(((this.ruleForm.goodPoint.toString().indexOf("其他") > -1) && (this.ruleForm.knowAbout != "")) || (this.ruleForm.goodPoint.toString().indexOf("其他") == -1)) {

							if((this.outletNum != "") && (this.ruleForm.outletName != "") && (this.ruleForm.networkContact != "") && (this.ruleForm.networkArea != "") && (this.address.province != "请选择") && (this.address.city != "请选择") && (this.address.district != "请选择") && (this.contactsMobile != "") && (createdShopTime != "") && (startShopTime != "") && (this.address2.province != "请选择") && (this.address2.city != "请选择") && (this.address2.district != "请选择") && (this.ruleForm.zipCode != "") && (this.ruleForm.legalName != "") && (this.corporationMobile != "") && (this.ruleForm.legalId != "") && (this.ruleForm.res1 != "") && (this.ruleForm.resMoney1 != "") && (this.files != "")) {
								this.fullscreenLoading = true;
								this.$http.post(process.env.API + "/network/addNetworkBasic", {
									'aroundFinanceInfoRequest': this.companys,
									'networkApplicationRequest': {
										'applicationNo': this.outletNum, // 网点编号
										'belongRegion': this.ruleForm.networkArea, // 所属区域ID
										'contactsAddress': this.ruleForm.contactsAddress, // 具体地址
										'contactsArea': this.address.district, // 区
										'contactsCity': this.address.city, // 市
										'contactsMobile': this.contactsMobile, // 联系电话
										'contactsProvince': this.address.province, //  省份
										'contractTypes': this.ruleForm.contractType, // 合同类型 0 标准合同 ，1 非标准   TODO
										'networkContacts': this.ruleForm.networkContact, // 	网点联系人
										'networkName': this.ruleForm.outletName, // 网点名称
										'networkType': this.ruleForm.outletsType, //网点类型
										"outsideChannel": this.recommendChannelId,
										'recommendChannelId': this.networkWay2, // 推荐渠道编号
										'recommendUser': this.recommendUser, //  内部渠道具体人员    TODO
										'remarks': this.remarks, // 备注
									},
									'shopInfoRequest': {
										'applicationNo': this.outletNum, // 网点编号
										'brandJoin': this.ruleForm.isAdd, // 是否为品牌加盟店      TODO
										'contactsAddress': this.ruleForm.contactsAddress, // 具体地址
										'contactsArea': this.address2.district, // 区
										'contactsCity': this.address2.city, // 市
										'contactsProvince': this.address2.province, // 省
										'corporationIdCard': this.ruleForm.legalId, // 法人身份证
										'corporationMobile': this.corporationMobile, // 法人电话
										'corporationUser': this.ruleForm.legalName, // 	法人姓名
										'createdShopTime': createdShopTime, // 成立时间
										'lastYearBusinessVolume': this.ruleForm.lastYearM, // 去年营业额
										'postalcode': this.ruleForm.zipCode, // 邮政编码
										'shopAdvantage': this.ruleForm.goodPoint.toString() + "&&" + this.ruleForm.knowAbout, //  网络优势      TODO
										'shopDayVisitors': this.ruleForm.shopDaily, // 店铺日均人流量
										'shopOne': this.ruleForm.res1, // 商品一名称
										'shopOneValue': this.ruleForm.resMoney1, // 商品一均价
										'shopThree': this.ruleForm.res3, // 商品三名称
										'shopThreeValue': this.ruleForm.resMoney3, // 商品三均价
										'shopTwo': this.ruleForm.res2, // 商品二名称
										'shopTwoValue': this.ruleForm.resMoney2, //商品二均价
										'startShopTime': startShopTime, // 开业时间
										'threeBusinessVolume': this.ruleForm.threeMoney, //   近三个月营业额
									}
								}, {
									headers: {
										"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,

									}
								}).then((res) => {
									if(res.data.code == "000000") {
										this.routerJump = true;
										this.$refs.vueFileUploader.uploadAll();
									} else {
										this.fullscreenLoading = false;
										this.$message({
											message: res.data.messages,
											type: 'error'
										})
									}
								}, (res) => {
									this.fullscreenLoading = false;
									this.$message({
										message: res.data.messages,
										type: 'error'
									})
								})
							} else {
								this.$message.error('带 * 为必填项！！');
							}
						} else {
							this.$message.error('请填写入驻终端机网络优势其他的信息！');
						}
					} else {
						this.$message.error('具体渠道不能为空！');
					}

				} else {
					this.$message.error('图片未上传！');
				}
			},
			addOne() {
				this.companys.push({
					applicationNo: this.outletNum,
					aroundFinanceName: '',
					aroundFinanceVlaue: ''
				});
			},

			//			初始化时候获取网点编号
			getOutletNum() {
				this.$http.post(process.env.API + "/sysGeneratorseq/getCode", {
					"seqType": "WD"
				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						this.outletNum = res.data.data.seqId;
						for(var i = 0; i < this.companys.length; i++) {
							this.companys[i].applicationNo = this.outletNum;
						}
						this.reqopts.formData.applicationNo = this.outletNum;
					} else {}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				})
			},
			//			获取内部渠道人员列表
			getInside() {
				this.$http.post(process.env.API + "/channel/getChannelName", {
					"type": this.recommendChannelId
				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						this.insides = res.data.data;
					} else {}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				})
			},
			initPage() {
				//获取所属区域
				this.$http.post(process.env.API + "/network/getAllRegion", "", {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						this.region = res.data.data; //  渲染区域
					} else {}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				})
			},
			checkNum() {
				var str = event.target.value;
				var reg = /[^\d]/;
				if(reg.test(str)) {
					return event.target.value = '';
				} else {
					return event.target.value;
				}
			},
			checkNum2() {
				var reg = /[^\d]/;
				if(reg.test(this.ruleForm.threeMoney)) {
					return this.ruleForm.threeMoney = '';
				} else {
					return this.ruleForm.threeMoney;
				}
			},
			checkNum3() {
				var reg = /[^\d]/;
				if(reg.test(this.ruleForm.lastYearM)) {
					return this.ruleForm.lastYearM = '';
				} else {
					return this.ruleForm.lastYearM;
				}
			},
			checkNum4() {
				var reg = /[^\d]/;
				if(reg.test(this.ruleForm.resMoney1)) {
					return this.ruleForm.resMoney1 = '';
				} else {
					return this.ruleForm.resMoney1;
				}
			},
			checkNum5() {
				var reg = /[^\d]/;
				if(reg.test(this.ruleForm.resMoney2)) {
					return this.ruleForm.resMoney2 = '';
				} else {
					return this.ruleForm.resMoney2;
				}
			},
			checkNum6() {
				var reg = /[^\d]/;
				if(reg.test(this.ruleForm.resMoney3)) {
					return this.ruleForm.resMoney3 = '';
				} else {
					return this.ruleForm.resMoney3;
				}
			},
			checkNum7() {
				var reg = /[^\d]/;
				if(reg.test(this.ruleForm.shopDaily)) {
					return this.ruleForm.shopDaily = '';
				} else {
					return this.ruleForm.shopDaily;
				}
			},
			checkCode() {
				var reg = /[^\d]/;
				if(reg.test(this.ruleForm.zipCode)) {
					return this.ruleForm.zipCode = '';
				} else {
					return this.ruleForm.zipCode;
				}
			},
			checkMobile() {
				var re = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
				if(!re.test(this.contactsMobile)) {
					this.contactsMobile = "";
					this.$message({
						message: '手机号码格式有误！',
						type: 'warning'
					});
				} else {
					return this.contactsMobile;
				}

			},
			checkMobile2() {
				var re = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
				if(!re.test(this.corporationMobile)) {
					this.corporationMobile = "";
					this.$message({
						message: '手机号码格式有误！',
						type: 'warning'
					});
				} else {
					return this.corporationMobile;
				}
			},
			checkId() {
				var re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(!re.test(this.ruleForm.legalId)) {
					this.ruleForm.legalId = "";
					this.$message({
						message: '身份证号输入有误！',
						type: 'warning'
					});
				} else {
					return this.ruleForm.legalId;
				}
			}
		},
		components: {
			VueFileUpload,
			Modal
		},
		created() {
			this.getOutletNum();
		},
		watch: {
			recommendChannelId: function() {
				if(this.recommendChannelId == "1" || this.recommendChannelId == "0") {
					this.networkShow = true;
				} else {
					this.networkShow = false;
					this.networkWay2 = "";
				}
				this.getInside();
			},
			networkWay2: function() {
				for(var i = 0; i < this.insides.length; i++) {
					if(this.networkWay2 == this.insides[i].applicationNo) {
						this.recommendUser = this.insides[i].userName
					}
				}
			},
			addAddr: function() {
				if(this.addAddr) {
					this.obj2.default.province = this.address.province;
					this.obj2.default.city = this.address.city;
					this.obj2.default.district = this.address.district;
					this.ruleForm.addAddr_detail = this.ruleForm.contactsAddress;
				} else {
					this.obj2.default.province = "北京";
					this.obj2.default.city = "北京";
					this.obj2.default.district = "东城区";
					this.ruleForm.addAddr_detail = "";
				}
			}
		},
		computed: {

		},
		mounted() {
			this.initPage();
			this.getInside();
		}
	}
</script>

<style lang='scss'>
	.imgType {
		width: 100%;
		width: 200px;
		display: block;
		height: 200px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 15;
	}
	
	#sub {
		position: relative;
		i {
			display: inline-block;
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
		}
	}
	
	.clear_buttton {
		border: none;
		outline: none;
		position: relative;
		overflow: hidden;
		display: inline-block;
		color: #fff;
		padding: 6px 12px;
		background-color: #5cb85c;
		border-color: #4cae4c;
		margin: 0;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.42857143;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		cursor: pointer;
	}
	
	.img_box {
		overflew: hidden;
		width: 100%;
		#no_img {
			display: inline-block;
			width: 200px;
			height: 200px;
			text-align: center;
			margin: 10px 20px;
			background: #e5e5e5 url("~STATIC/image/pic.png") no-repeat center;
			background-size: 10%;
			span {
				width: 100%;
				line-height: 200px;
				color: #ababab;
			}
		}
		.img_item_box {
			width: 200px;
			height: 200px;
			background: #e5e5e5;
			position: relative;
			display: inline-block;
			overflow: hidden;
			margin: 10px 20px;
			.img_name {
				position: absolute;
				bottom: 0;
				display: block;
				text-align: center;
				width: 100%;
				background: rgba(0, 0, 0, 0.5);
				color: #ffffff;
				height: 20px;
				overflow: hidden;
				white-space: nowrap;
				/*文字不换行*/
				text-overflow: ellipsis;
				/*超出则...代替*/
				-o-text-overflow: ellipsis;
				/*opera*/
				z-index: 30;
				img {
					width: 100%;
				}
				.close {
					font-size: 24px;
					font-weight: bolder;
					position: absolute;
					right: 0;
					top: 0;
					cursor: pointer;
					z-index: 25;
				}
			}
			.close {
				font-size: 24px;
				font-weight: bolder;
				position: absolute;
				right: 0;
				top: 0;
				cursor: pointer;
				z-index: 25;
			}
		}
	}
	
	#address-picker,
	#address-picker1 {
		display: inline-block;
		float: left;
		font-size: 24px;
		height: 36px;
		select {
			min-width: 0px;
			width: 28%;
			margin: 0 1%;
			height: 36px;
			border-radius: 5px;
			border: 1px solid #bfcbd9;
			outline: none;
		}
	}
</style>