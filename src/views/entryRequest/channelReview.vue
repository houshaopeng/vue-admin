<template>
	<!--渠道审核编辑-->
	<div id="add_channel">
		<el-button type="primary" @click="toHome">返回上一页</el-button>
		<!--<div><img src="../../assets/back.png" alt="back" @click="toHome" /></div>-->
		<p class="title">渠道基本信息<span>申请编号<i>{{channelNum}}</i></span></p>
		<el-form label-width="90px">
			<el-col :span="24">
				<template :span="10">
					<span class="label_title">*渠道合同类型:</span>
					<el-radio :disabled="isDo" class="radio" v-model="contractTypes" label="0">标准合同</el-radio>
					<el-radio :disabled="isDo" class="radio" v-model="contractTypes" label="1">非标准合同</el-radio>
				</template>

				<span class="label_title" style="margin-left: 50px;">*渠道名称:</span>
				<el-select :disabled="isDo" v-model="outsideChannel" placeholder="请选择渠道">
					<!-- TODO -->
					<el-option v-for="item in channels" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

				<el-form-item label="" :span="6" style="display: inline-block;">
					<el-input :disabled="isDo" :maxlength="30" v-model="channelName" placeholder="单行输入"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<template :span="10">
					<span style="margin-left: 28px;margin-right: 20px;">*渠道类型:</span>
					<el-radio :disabled="isDo" class="radio" v-model="channelType" label="0">个人</el-radio>
					<el-radio :disabled="isDo" class="radio" v-model="channelType" label="1" style="margin-left: 42px;">企业</el-radio>
				</template>

				<span style="margin-left: 90px;margin-right: 20px;">*所属区域:</span>
				<el-select :disabled="isDo" v-model="belongRegion" placeholder="请选择区域">
					<!-- TODO -->
					<el-option v-for="item in region" :key="item.regionNo" :label="item.regionName" :value="item.regionNo">
					</el-option>
				</el-select>

				<el-form-item label="渠道联系人:" :span="6" style="display: inline-block; margin-left: 90px;">
					<el-input :disabled="isDo" :maxlength="20" v-model="channelContacts" placeholder="单行输入"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="13">
				<el-form-item label="* 联系地址:">
					<el-row>
						<el-col :span="14">
							<Chinaddress :opts="obj" v-model="address" id="address-picker"></Chinaddress>
						</el-col>
						<el-col :span="8">
							<el-input :maxlength="30" v-model="contactsAddress" placeholder="请输入具体地址" :disabled="isDo"></el-input>
						</el-col>
					</el-row>
				</el-form-item>
			</el-col>
			<el-col :span="7">
				<el-form-item label="*联系电话:" :span="4" style="display: inline-block; margin-left: 55px;">
					<el-input :disabled="isDo" v-model="contactsMobile" placeholder="单行输入" @blur="checkMobile"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<span style="margin: 0 20px 0 24px;">*资料上传：</span>
				<vue-file-upload url="/terminal-oper/file/upload" ref="vueFileUploader" v-bind:events='cbEvents' v-bind:filters="filters" v-bind:request-options="reqopts" v-on:onAdd="onAddItem" :channelNum="channelNum">
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
			<el-col :span="24">
				<el-form-item label="*备注:" style="width:1180px; margin-left: 20px;">
					<el-input :disabled="isDo" type="textarea" :maxlength="400" v-model="remarks" placeholder="请输入备注内容" :rows="5"></el-input>
				</el-form-item>
			</el-col>

			<!--审核弹出框-->
			<el-dialog title="审核意见" :visible.sync="batchReview" :show-close="false">
				<el-form :model="batchForm" label-width="120px">
					<el-form-item label="* 审核结果">
						<el-radio-group v-model="batchForm.isAgree">
							<el-radio label="2" name="isAgree">同意</el-radio>
							<el-radio label="3" name="isAgree">拒绝</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="* 审核备注">
						<el-input type="textarea" v-model="batchForm.remarks" placeholder="请输入备注内容"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="batchReview = false">取 消</el-button>
					<el-button type="primary" @click="sendReview" :loading="sendloading">确 定</el-button>
				</div>
			</el-dialog>

			<el-table :data="reviewList" highlight-current-row style="width: 100%;">
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

			<el-col :span="24" style="text-align: center;">
				<el-button type="primary" style="width: 160px;" @click="submit()"> 审 核 </el-button>
			</el-col>

		</el-form>
		<Modal :modelTogg="modelTogg" :imgSrc="imgSrc" @closeModal="closeModal" :files="files" @upperPage="upperPage" @nextPage="nextPage"></Modal>

	</div>
</template>

<script>
	import Chinaddress from '../../components/Chinaddress.vue'
	import VueFileUpload from '../../components/vue-file-upload0.vue'
	import Modal from '../../components/modal.vue'
	export default {
		data() {
			return {
				initIndex: 0,
				channelNum: 'wd0334922953',
				contractTypes: 0,
				channels: [{
					value: false,
					label: '内部渠道'
				}, {
					value: true,
					label: '外部渠道'
				}],
				belongRegion: "",
				channelContacts: '',
				channelType: 0,
				region: [],
				channelName: '',
				outsideChannel: '',
				// 三级联动数据
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
					disable: true,
					noLabel: true
				},
				contactsAddress: '',
				contactsMobile: '',
				files: [],
				routerTogg: 0,
				//过滤器回调
				filters: [{
					name: "imageFilter",
					fn(file) {
						var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
						return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
					}
				}],
				//事件回调
				cbEvents: {
					onCompleteUpload: (file, response, status, header) => {
						this.routerTogg++;
						if(this.routerTogg == this.files.length) {
							this.$router.push({
								path: 'channelOffering'
							});
						}
					},
					onAddFileSuccess: (file) => {}
				},
				reqopts: {
					formData: {
						'applicationNo': this.channelNum,
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
					isAgree: '2',
				},
				isDo: true,
				reviewList: [], // 最下面审核流数据集合
				sendloading: false, //加载中
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
			// 初始化下面审核流获取
			seeOutlete: function() { //点击审核流查看审核数据
				this.$http.post(process.env.API + "/channel/verifyLog", {
					"applicationNo": this.channelNum, //订单编号
				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						this.reviewList = res.data.data;
					}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				})
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
			toHome() {
				this.$router.push({
					path: '/channelOffering'
				})
			},
			onStatus(file) {
				if(file.isSuccess) {
					return "上传成功";
				} else if(file.isError) {
					return "上传失败";
				} else if(file.isUploading) {
					return "正在上传";
				} else {
					return "待上传";
				}
			},
			onPreview(file) {
				var src = window.URL.createObjectURL(file.file);
				return src;
			},
			onAddItem(files) {
				this.files = files;
			},
			uploadItem(file) {
				file.upload();
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
			getChanneRange() {
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
			getChannelDetail() {
				this.$http.post(process.env.API + "/channel/detail", {
					"applicationNo": this.channelNum,
				}, {
					headers: {
						"x-sljr-session-token": JSON.parse(sessionStorage.getItem("userInfo")).userToken,
					}
				}).then((res) => {
					if(res.data.code == '000000') {
						if(res.data.data.channelType == 1) {
							this.channelType = '1';
						} else {
							this.channelType = '0';
						}
						if(res.data.data.contractTypes == 1) {
							this.contractTypes = '1';
						} else {
							this.contractTypes = '0';
						}
						this.channelNum = res.data.data.applicationNo;
						this.belongRegion = res.data.data.belongRegion;
						this.channelContacts = res.data.data.channelContacts;
						this.channelName = res.data.data.channelName;
						this.contactsAddress = res.data.data.contactsAddress;
						this.contactsMobile = res.data.data.contactsMobile;
						this.outsideChannel = res.data.data.outsideChannel;
						this.remarks = res.data.data.remarks;
						this.files = res.data.data.picLog; // 返回的图片数组

						//  返回地址渲染
						this.obj.default.province = res.data.data.contactsProvince;
						this.obj.default.city = res.data.data.contactsCity;
						this.obj.default.district = res.data.data.contactsArea;
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
			sendReview() {
				if(this.batchForm.isAgree && this.batchForm.remarks) {
					this.sendloading = true;
					this.$http.post(
						process.env.API + "/channel/verify", {
							'applicationNo': this.channelNum,
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

							this.batchReview = false;
							this.$router.push({
								path: '/channelOffering'
							});
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
			//   提交操作
			submit() {
				this.batchReview = true;
			},
			checkMobile() {
				var re = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
				if(!re.test(this.contactsMobile)) {
					this.$message({
						message: '手机号码格式有误！',
						type: 'warning'
					});
				} else {
					return this.contactsMobile;
				}

			},
		},
		components: {
			VueFileUpload,
			Modal,
			Chinaddress
		},
		created: function() {
			this.channelNum = this.$route.params.currentOrder;
		},
		mounted: function() {
			this.getChannelDetail();
			this.getChanneRange();
			this.seeOutlete();
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
	
	#add_channel {
		padding: 0px 30px;
		position: relative;
		.title {
			font-size: 24px;
			width: 100%;
			span {
				float: right;
				font-size: 14px;
				margin-right: 60px;
			}
		}
		.label_title {
			margin-right: 20px;
		}
		.img_box {
			margin: 20px 0;
			overflew: hidden;
			.no_img {
				width: 100%;
				overflew: hidden;
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
				height:200px;
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
						z-index: 40;
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
					z-index: 40;
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
	}
	
	#address-picker {
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