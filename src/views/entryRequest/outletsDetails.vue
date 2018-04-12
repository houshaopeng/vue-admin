<template>
	<!--网点详情   点击网点提报的待审核数据  双击任一数据进入网点审核页面-->
	<div class="networkReview">
		<el-button type="primary" @click="toHome">返回上一页</el-button>
		<!--<div><img src="../../assets/back.png" alt="back" @click="toHome" /></div>-->
		<el-form ref="ruleForm" label-width="140px" class="demo-ruleForm">
			<!--网点基本信息 start-->
			<h1>网点基本信息</h1>
			<el-row>
				<el-col :span="8">
					<el-form-item label="* 网点合同类型:">
						<el-radio-group :disabled="true" v-model="ruleForm.outType">
							<el-radio :label="0">标准合同</el-radio>
							<el-radio :label="1">非标合同</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 网点名称:">
						<el-input :disabled="true" v-model="ruleForm.networkName" placeholder="李万山"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 网点联系人:">
						<el-input :disabled="true" v-model="ruleForm.networkContacts" placeholder="李万山"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="* 网点类型:">
						<el-radio-group :disabled="true" v-model="ruleForm.outletsType">
							<el-radio :label="0">个人</el-radio>
							<el-radio :label="1">企业</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="* 所属区域:">
						<el-select :disabled="true" v-model="ruleForm.belongRegion" placeholder="请选择所属区域">
							<!-- TODO -->
							<el-option v-for="item in region" :key="item.value" :label="item.regionName" :value="item.regionNo">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="推荐渠道:">
						<el-select :disabled="true" v-model="recommendChannelId" placeholder="请选择推荐渠道">
							<!-- TODO -->
							<el-option v-for="item in channels" :key="item.value" :label="item.channelName" :value="item.applicationNo">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6" v-if="networkShow">
					<el-form-item>
						<el-select :disabled="true" v-model="networkWay2" placeholder="请选择推荐渠道">
							<!-- TODO -->
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
								<Chinaddress :opts="obj" v-model="address" id="address-picker"></Chinaddress>
							</el-col>
							<el-col :span="9">
								<el-input :disabled="true" v-model="ruleForm.contactsAddress" placeholder="具体地址"></el-input>
							</el-col>
						</el-row>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 联系电话:">
						<el-input :disabled="true" v-model="ruleForm.networkTel" placeholder=""></el-input>
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
							<el-input :disabled="true" v-model="company.aroundFinanceName" placeholder=""></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="离店距离:">
							<el-input :disabled="true" @keyup.native="" v-model="company.aroundFinanceVlaue" placeholder="">
								<template slot="append">米</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<!--周边金融业信息 end-->

			<!--申请人经营信息 start-->
			<el-row>
				<h1 style="float: left;">申请人经营信息</h1>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="* 成立时间:">
						<el-date-picker :disabled="true" v-model="ruleForm.buildTime" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 开业时间:">
						<el-date-picker :disabled="true" v-model="ruleForm.startTime" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 是否品牌加盟店:">
						<el-radio-group :disabled="true" v-model="ruleForm.isAdd">
							<el-radio name="isAdd" :label="0">是</el-radio>
							<el-radio name="isAdd" :label="1">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="16">
					<el-form-item label="* 注册地址:">
						<el-row>
							<el-col :span="12">
								<Chinaddress :opts="obj2" v-model="address2" id="address-picker1"></Chinaddress>
							</el-col>
							<el-col :span="9">
								<el-input :disabled="true" v-model="ruleForm.addAddr_detail" placeholder="请输入详细地址"></el-input>
							</el-col>
						</el-row>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 邮政编码:">
						<el-input :disabled="true" v-model="ruleForm.zipCode" placeholder="请输入邮政编码"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="* 法人姓名:">
						<el-input :disabled="true" v-model="ruleForm.legalName" placeholder="请输入法人姓名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 法人电话:">
						<el-input :disabled="true" v-model="corporationMobile" placeholder="请输入法人电话"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 法人身份证号:">
						<el-input :disabled="true" v-model="ruleForm.legalId" placeholder="请输入法人身份证号"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="近三月平均营业额:">
						<el-input :disabled="true" v-model="ruleForm.threeMoney" placeholder="请输入近三月平均营业额">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="去年全年营业额:">
						<el-input :disabled="true" v-model="ruleForm.lastYearM" placeholder="请输入去年全年营业额">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="* 主营商品1:">
						<el-input :disabled="true" v-model="ruleForm.res1" placeholder="请输入商品名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="* 均价:">
						<el-input :disabled="true" v-model="ruleForm.resMoney1" placeholder="请输入商品价格">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="主营商品2:">
						<el-input :disabled="true" v-model="ruleForm.res2" placeholder="请输入商品名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="均价:">
						<el-input :disabled="true" v-model="ruleForm.resMoney2" placeholder="请输入商品价格">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="主营商品3:">
						<el-input :disabled="true" v-model="ruleForm.res3" placeholder="请输入商品名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="均价:">
						<el-input :disabled="true" v-model="ruleForm.resMoney3" placeholder="请输入商品价格">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="店铺日均人流量:">
						<el-input :disabled="true" v-model="ruleForm.shopDaily" placeholder="请输入店铺日均人流量"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<h1 style="float: left;">入驻终端机网络优势</h1>
			</el-row>
			<el-row>
				<el-col :span="16">
					<el-checkbox-group v-model="ruleForm.goodPoint">
						<el-checkbox :disabled="true" label="地理位置好" name="type"></el-checkbox>
						<el-checkbox :disabled="true" label="客户资源丰富" name="type"></el-checkbox>
						<el-checkbox :disabled="true" label="经营模式独特" name="type"></el-checkbox>
						<el-checkbox :disabled="true" label="商品质量优异" name="type"></el-checkbox>
						<el-checkbox :disabled="true" label="品牌知名度高" name="type"></el-checkbox>
						<el-checkbox :disabled="true" label="其他" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-col>
				<el-col :span="6">
					<el-input :disabled="true" v-model="ruleForm.knowAbout" placeholder="对产品了解"></el-input>
				</el-col>
			</el-row>
			<!--申请人经营信息 end-->

			<!--影像上传 start-->
			<el-row>
				<h1>影像上传</h1>
				<el-col :span="24">
					<span style="margin: 0 20px 0 24px;">*资料上传：</span>
					<vue-file-upload :disabled="true" url="/terminal-oper/file/upload" ref="vueFileUploader" v-bind:events='cbEvents' v-bind:filters="filters" v-bind:request-options="reqopts" v-on:onAdd="onAddItem">
					</vue-file-upload>
					<span v-if="!files.length">未上传任何文件</span>
					<span v-else>一共上传{{files.length}}张图片</span>
				</el-col>
				<el-col :span="24">
					<div class="img_box">
						<div class="img_item_box" v-for='(file,index) in files' @click="getIndex(index)">
							<img :src='file.picUrl' alt="" @click="showModal(file.picUrl)">
							<span class="img_name" v-html="file.picName"></span>
							<img src="~STATIC/image/word.png" alt="" class="imgType" v-show="file.picUrl.slice(file.picUrl.length-4,file.picUrl.length).indexOf('doc')>=0">
							<img src="~STATIC/image/pdf.png" alt="" class="imgType" v-show="file.picUrl.slice(file.picUrl.length-3,file.picUrl.length)=='pdf'">
							<a href="" class="downLoad0" @click="downLoad(file.picUrl,index)"><img src="../../../static/image/down.png" alt=""></a>
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
					<el-input type="textarea" :disabled="true" :rows="5" v-model="remarks" placeholder="请输入备注内容"></el-input>
				</el-col>
			</el-row>
			<!--其他 end-->

			<!--审核记录 start-->
			<hr />
			<el-row>
				<h1 style="float: left;">审核记录</h1>
			</el-row>
			<el-row>
				<el-table :data="reviewList" highlight-current-row style="width: 100%;">
					<el-table-column prop="userName" label="审核人">
					</el-table-column>
					<el-table-column prop="roleName" label="审核人角色">
					</el-table-column>
					<el-table-column prop="updatedBy" :formatter="changeTime2" label="操作时间">
					</el-table-column>
					<el-table-column prop="verifyStatString" label="审核结果">
					</el-table-column>
					<el-table-column prop="verifyLevelName" label="等级归属">
					</el-table-column>
					<el-table-column prop="remarks" label="备注">
					</el-table-column>
				</el-table>
			</el-row>
			<!--审核记录 end-->

			<!--审核弹出框-->
			<el-dialog title="审核意见" :visible.sync="batchReview" :show-close="false">
				<el-form :model="batchForm" label-width="120px">
					<el-form-item label="* 审核结果">
						<el-radio-group v-model="batchForm.isAgree">
							<el-radio label="1" name="isAgree">同意</el-radio>
							<el-radio label="2" name="isAgree">拒绝</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="*网点等级归属:">
						<el-select v-model="verifyLevelValue" placeholder="请选择推荐渠道">
							<!-- TODO -->
							<el-option v-for="item in  verifyLevel" :key="item.id" :label="item.networkLevelName" :value="item.networkLevelNo">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="* 审核备注">
						<el-input type="textarea" v-model="batchForm.remarks" placeholder="请输入备注内容"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="batchReview = false">取 消</el-button>
					<el-button type="primary" @click="sendReview">确 定</el-button>
				</div>
			</el-dialog>

			<!--<el-row>
				<el-button type="primary" @click="onSubmit" style="display:block;margin: 0 auto;"> 审 核 </el-button>
			</el-row>-->

			<Modal :modelTogg="modelTogg" :imgSrc="imgSrc" :files="files" @closeModal="closeModal" @upperPage="upperPage" @nextPage="nextPage"></Modal>
		</el-form>
	</div>
</template>

<script>
	import Chinaddress from '../../components/Chinaddress.vue'
	import VueFileUpload from '../../components/vue-file-upload0.vue'
	import Modal from '../../components/modal0.vue'
	export default {
		data() {
			return {
				outletNum: '', //网点编号
				ruleForm: {
					networkName: '', //网点名称
					networkContacts: '',
					belongRegion: '', //所属区域
					networkTel: '', //联系电话
					contactsAddress: '', //具体地址
					outType: 0, //网点合同类型
					outletsType: 0, //网点类型
					buildTime: '', //成立时间
					startTime: '', //开业时间
					isAdd: 0, //是否品牌加盟店
					addAddr: '', //注册地址
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
					lastYearM: '' //去年全年营业额
				},
				address: {},
				obj: {
					label: {
						province: '',
						city: '',
						district: ''
					},
					default: {
						province: '',
						city: '',
						district: ''
					},
					disable: true,
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
						province: '',
						city: '',
						district: ''
					},
					disable: true,
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
				corporationMobile: '',
				recommendChannelId: '', //推荐渠道
				recommendUser: '', //渠道推荐人
				networkWay2: '', //内部渠道具体人员
				region: [],
				channels: [{
						channelName: '全部',
						applicationNo: ''
					},
					{
						channelName: '外部渠道',
						applicationNo: 1
					},
					{
						channelName: '内部渠道',
						applicationNo: 0
					},
					{
						channelName: '无',
						applicationNo: -1
					}
				], //推荐渠道
				insides: [],
				pickerOptions0: {},
				reviewList: [],
				files: [],
				filters: [{ //过滤器回调
					name: "imageFilter",
					fn(file) {
						var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
						return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
					}
				}],
				cbEvents: { //事件回调
					onCompleteUpload: (file, response, status, header) => {

					},
					onAddFileSuccess: (file) => {

					}
				},
				reqopts: {
					formData: {
						tokens: 'tttttttttttttt'
					},
					responseType: 'json',
					withCredentials: false
				},
				remarks: '',
				modelTogg: false,
				imgSrc: '',
				srcArr: [],
				index: "",
				batchReview: false, //审核弹出框是否显示
				batchForm: {
					result: '',
					remarks: '',
					isAgree: '1',
				},
				verifyLevelValue: '',
				verifyLevel: [],
				paramsList: [], // 批量审核的内容
				initIndex: 0,
				networkShow: false,
			}
		},
		methods: {
			//判断浏览器类型
			myBrowser() {
				var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
				var isOpera = userAgent.indexOf("Opera") > -1;
				if(isOpera) {
					return "Opera"
				}; //判断是否Opera浏览器
				if(userAgent.indexOf("Firefox") > -1) {
					return "FF";
				} //判断是否Firefox浏览器
				if(userAgent.indexOf("Chrome") > -1) {
					return "Chrome";
				}
				if(userAgent.indexOf("Safari") > -1) {
					return "Safari";
				} //判断是否Safari浏览器
				if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
					return "IE";
				}; //判断是否IE浏览器
				if(userAgent.indexOf("Trident") > -1) {
					return "Edge";
				} //判断是否Edge浏览器
			},
			SaveAs5(imgURL) {
				var oPop = window.open(imgURL, "", "width=1, height=1, top=5000, left=5000");
				for(; oPop.document.readyState != "complete";) {
					if(oPop.document.readyState == "complete") break;
				}
				oPop.document.execCommand("SaveAs");
				oPop.close();
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
			downLoad(src, index) {
				var odownLoad = document.getElementsByClassName("downLoad0")[index];
				this.myBrowser();
				if(this.myBrowser() === "IE" || this.myBrowser() === "Edge") {
					//IE
					odownLoad.href = "#";
					var oImg = document.createElement("img");
					oImg.src = src;
					oImg.id = "downImg";
					var odown = document.getElementById("down");
					odown.appendChild(oImg);
					this.SaveAs5(document.getElementById('downImg').src)
				} else {
					odownLoad.href = src;
					odownLoad.download = "";
				}
			},
			backTime: function(date) { //时间字符串转换成时间
				var timestamp = new Date(date);
				return timestamp;
			},
			toHome() {
				this.$router.push({
					path: '/outletsQuote'
				})
			},
			onPreview(file) {

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
			upperPage(val) {
				if(this.initIndex == 0) {
					this.initIndex = val.length;
				}
				this.initIndex--;
				this.imgSrc = val[this.initIndex].picUrl;
			},
			nextPage(val) {
				this.initIndex++;
				if(this.initIndex == val.length) {
					this.initIndex = 0;
				}
				this.imgSrc = val[this.initIndex].picUrl;
			},
			getDetail() {
				this.$http.post(process.env.API + "/network/detail", {
					"applicationNo": this.outletNum, //订单编号

				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {

						var listData = res.data.data.getNetworkResponse;
						this.ruleForm.outType = listData.networkResponse.contractTypes;
						this.ruleForm.networkName = listData.networkResponse.networkName;
						this.ruleForm.networkContacts = listData.networkResponse.networkContacts;
						this.ruleForm.belongRegion = listData.networkResponse.belongRegion;
						this.recommendChannelId = listData.networkResponse.outsideChannel;
						this.networkWay2 = listData.networkResponse.recommendChannelName;
						this.ruleForm.outletsType = listData.networkResponse.networkType * 1;
						this.ruleForm.contactsAddress = listData.networkResponse.contactsAddress;
						this.ruleForm.networkTel = listData.networkResponse.contactsMobile;
						this.companys = listData.aroundFinanceResponse;
						this.ruleForm.addAddr_detail = listData.shopInfoResponse.contactsAddress; // 具体地址
						this.ruleForm.legalId = listData.shopInfoResponse.corporationIdCard; // 法人身份证
						this.corporationMobile = listData.shopInfoResponse.corporationMobile; // 法人电话
						this.ruleForm.legalName = listData.shopInfoResponse.corporationUser; // 	法人姓名
						this.ruleForm.buildTime = this.backTime(listData.shopInfoResponse.createdShopTime); // 成立时间
						this.ruleForm.lastYearM = listData.shopInfoResponse.lastYearBusinessVolume; // 去年营业额
						this.ruleForm.zipCode = listData.shopInfoResponse.postalcode; // 邮政编码
						this.ruleForm.goodPoint = listData.shopInfoResponse.shopAdvantage.split("&&")[0].split(","); //  网络优势      
						this.ruleForm.knowAbout = listData.shopInfoResponse.shopAdvantage.split("&&")[1];
						this.ruleForm.shopDaily = listData.shopInfoResponse.shopDayVisitors; // 店铺日均人流量
						this.ruleForm.res1 = listData.shopInfoResponse.shopOne; // 商品一名称
						this.ruleForm.resMoney1 = listData.shopInfoResponse.shopOneValue; // 商品一均价
						this.ruleForm.resMoney3 = listData.shopInfoResponse.shopThreeValue; // 商品三均价
						this.ruleForm.res2 = listData.shopInfoResponse.shopTwo; // 商品二名称
						this.ruleForm.resMoney2 = listData.shopInfoResponse.shopTwoValue; //商品二均价
						this.ruleForm.startTime = this.backTime(listData.shopInfoResponse.startShopTime); // 开业时间
						this.ruleForm.threeMoney = listData.shopInfoResponse.threeBusinessVolume; //   近三个月营业额
						this.remarks = listData.networkResponse.remarks;

						this.files = listData.picUrls; // 返回图片渲染
						this.obj.default.province = listData.networkResponse.contactsProvince; // 网点基本信息三级联动渲染
						this.obj.default.city = listData.networkResponse.contactsCity;
						this.obj.default.district = listData.networkResponse.contactsArea;

						this.obj2.default.province = listData.shopInfoResponse.contactsProvince; // 周边金融三级联动渲染
						this.obj2.default.city = listData.shopInfoResponse.contactsCity;
						this.obj2.default.district = listData.shopInfoResponse.contactsArea;

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
			seeOutlete() {
				this.$http.post(process.env.API + "/network/verify/hostory", {
					"applicationNo": this.outletNum, //订单编号

				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						this.reviewList = res.data.data;
					} else {}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				})
			},
			//获取网点等级归属
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
			getChanelName() {
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
			onSubmit() {
				this.batchReview = true;
			},
			sendReview() {
				this.paramsList.push({
					'applicationNo': this.outletNum, // 订单编号list
					'remarks': this.batchForm.remarks, // 备注
					'verifyLevel': this.verifyLevelValue, // 	划分等级
					'verifyStatus': this.batchForm.isAgree, //  审核结果
				})

				if(this.batchForm.remarks && this.verifyLevelValue) {
					this.$http.post(process.env.API + "/network/verify", {
						'list': this.paramsList, //   TODO   list为一个数组 里面传需要审核的条目
					}, {
						headers: {
							"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
						}
					}).then((res) => {
						if(res.data.code == '000000') {
							this.batchReview = false;
							this.$router.push({
								path: '/outletsQuote'
							});
						}
					}, (res) => {
						this.$message({
							message: res.data.messages,
							type: 'error'
						})
					})
				} else {
					this.$message({
						message: '请填写审核信息后确认',
						type: 'warning'
					});
				}
			},
		},
		components: {
			VueFileUpload,
			Modal,
			Chinaddress
		},
		created() {
			this.outletNum = this.$route.params.currentOrder; // 上传过来的currentOrder
		},
		watch: {
			recommendChannelId: function() {
				if(this.recommendChannelId == "1" || this.recommendChannelId == "0") {
					this.networkShow = true;
				} else {
					this.networkShow = false;
					this.networkWay2 = "";
				}
				this.getChanelName();
			},
			networkWay2: function() {
				if(this.insides) {
					for(var i = 0; i < this.insides.length; i++) {
						if(this.networkWay2 == this.insides[i].applicationNo) {
							this.recommendUser = this.insides[i].userName
						}
					}
				}

			}
		},
		mounted() {
			this.initPage();
			this.getChanelName();
			this.getDetail();
			this.seeOutlete();
			this.getVerifyLevel();
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
	
	.img_box {
		margin: 20px 0;
		overflew: hidden;
		.no_img {
			width: 100%;
			div {
				width: 200px;
				height: 200px;
				display: inline-block;
				margin: 0 20px;
				background: #e5e5e5 url("~STATIC/image/pic.png") no-repeat center;
				background-size: 10%;
				span {
					float: left;
					line-height: 200px;
					color: #ababab;
				}
			}
		}
		.img_item_box {
			width: 200px;
			height: 200px;
			background: #e5e5e5;
			position: relative;
			display: inline-block;
			overflow: hidden;
			margin: 0 20px;
			.downLoad0 {
				img {
					width: 20px;
					position: absolute;
					right: 5px;
					top: 5px;
					z-index: 100;
				}
			}
			img {
				width: 100%;
			}
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
				z-index: 100;
			}
			.close {
				font-size: 24px;
				font-weight: bolder;
				position: absolute;
				right: 0;
				top: 0;
				cursor: pointer;
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