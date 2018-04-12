<template>
	<!--设备跟踪-->
	<div id="add_channel" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
		<el-button type="primary" @click="backPage">返回上一页</el-button>
		<p class="title">渠道基本信息<span>申请编号<i>{{channelNum}}</i></span></p>
		<el-form label-width="100px">
			<el-col :span="24">
				<template :span="10">
					<span class="label_title">*渠道合同类型:</span>
					<el-radio class="radio" v-model="contractTypes" label="0">标准合同</el-radio>
					<el-radio class="radio" v-model="contractTypes" label="1">非标准合同</el-radio>
				</template>
				<span class="label_title" style="margin-left: 50px;">*渠道名称:</span>
				<el-select v-model="outsideChannel" placeholder="请选择渠道">
					<!-- TODO -->
					<el-option v-for="item in channels" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

				<el-form-item label="" :span="6" style="display: inline-block;">
					<el-input :maxlength="30" v-model="channelName" :placeholder="channelTip" @keyup.native="checkText0"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<template :span="10">
					<span style="margin-left: 28px;margin-right: 20px;">*渠道类型:</span>
					<el-radio class="radio" v-model="channelType" label="0">个人</el-radio>
					<el-radio class="radio" v-model="channelType" label="1" style="margin-left: 42px;">企业</el-radio>
				</template>

				<span style="margin-left: 90px;margin-right: 20px;">*所属区域:</span>
				<el-select v-model="belongRegion" placeholder="请选择区域">
					<!-- TODO -->
					<el-option v-for="item in region" :key="item.value" :label="item.regionName" :value="item.regionNo">
					</el-option>
				</el-select>

				<el-form-item label="* 渠道联系人:" :span="6" style="display: inline-block;">
					<el-input :maxlength="20" v-model="channelContacts" placeholder="请输入渠道联系人" @keyup.native="checkText"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="16">
				<el-form-item label="* 联系地址:">
					<el-row>
						<el-col :span="12">
							<address-picker :opts="obj" v-model="address" id="address-picker"></address-picker>
						</el-col>
						<el-col :span="9">
							<el-input :maxlength="30" v-model="contactsAddress" placeholder="请输入具体地址"></el-input>
						</el-col>
					</el-row>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="*联系电话:" :span="8" style="display: inline-block;">
					<el-input :maxlength="11" v-model="contactsMobile" placeholder="请输入联系电话" @blur="checkMobile"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<span style="margin: 0 20px 0 24px;">*资料上传：</span>
				<vue-file-upload url="/terminal-oper/file/upload" ref="vueFileUploader" v-bind:events='cbEvents' v-bind:filters="filters" v-bind:request-options="reqopts" v-on:onAdd="onAddItem" :channelNum="channelNum">
				</vue-file-upload>
				<span v-if="!files.length">未选择任何文件</span>
				<span v-else>一共选择{{files.length}}个文件</span>
				<input type="button" value="清空图片" @click="clearAll" class="clear_buttton"/>
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
					<div v-if="channelType=='0'" v-show="files.length<1" id="no_img1">
						<span>身份证正面</span>
					</div>
					<div v-else v-show="files.length<1" id="no_img1">
						<span>企业组织结构代码证</span>
					</div>
					<div v-if="channelType=='0'" v-show="files.length<2" id="no_img1">
						<span>身份证反面</span>
					</div>
					<div v-else v-show="files.length<2" id="no_img1">
						<span>税务登记证</span>
					</div>
					<div v-if="channelType=='0'" v-show="files.length<3" id="no_img1">
						<span>房产证/租赁合同</span>
					</div>
					<div v-else v-show="files.length<3" id="no_img1">
						<span>营业执照</span>
					</div>
					<div v-if="channelType=='0'" v-show="files.length<4" id="no_img1">
						<span>终端机申请表扫描件</span>
					</div>
					<div v-else v-show="files.length<4" id="no_img1">
						<span>租房合同</span>
					</div>
					<div v-if="channelType=='0'" v-show="false" id="no_img1">

					</div>
					<div v-else v-show="files.length<5" id="no_img1">
						<span>法人身份证正面</span>
					</div>
					<div v-if="channelType=='0'" v-show="false" id="no_img1">

					</div>
					<div v-else="channelType=='1'" v-show="files.length<6" id="no_img1">
						<span>法人身份证反面</span>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<el-form-item label="*备注:" style="width:1180px; margin-left: 20px;">
					<el-input type="textarea" :maxlength="400" v-model="remarks" placeholder="请输入备注内容" :rows="5"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24" style="text-align: center;">
				<el-button type="primary" style="width: 160px;" @click="submit()">提交</el-button>
			</el-col>
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
				channelNum: '',
				contractTypes: '0',
				channels: [{
					value: 'false',
					label: '内部渠道'
				}, {
					value: 'true',
					label: '外部渠道'
				}],
				belongRegion: "",
				channelContacts: '',
				channelType: '0',
				region: [],
				channelName: '',
				outsideChannel: '',
				// 三级联动数据
				contactsAddress: '',
				contactsMobile: '',
				files: [],
				routerTogg: 0,
				routerJump: false, // 路由跳转判断
				//过滤器回调
				filters: [{
					name: "imageFilter",
					fn(file) {
						if(/^[A-Z]+$/.test(file.name.split(".")[1])){
							return false;
						}else{
							var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
						return '|jpg|png|jpeg|bmp|gif|pdf|vnd.openxmlformats-officedocument.wordprocessingml.document|msword|'.indexOf(type) !== -1;
						}
						
					}
				}],
				//事件回调
				cbEvents: {
					onCompleteUpload: (file, response, status, header) => {
						this.routerTogg++;
						if(this.routerTogg == this.files.length && this.routerJump) {
							this.fullscreenLoading = false;
							this.$router.push({
								path: '/channelOffering'
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
				srcArr: [],
				index: "",
				channelTip: '请选择具体渠道', //选择渠道提示
				fullscreenLoading: false, //全屏loading
			}
		},
		methods: {
			backPage(){
				this.$router.push({ path: '/channelOffering' });	
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
			upperPage() {
				var data = this.files.slice(0, 5);
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
				var data = this.files.slice(0, 5);
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
			getChannelNum() {
				this.$http.post(process.env.API + "/sysGeneratorseq/getCode", {
					"seqType": "QD"
				}).then((res) => {
					if(res.data.code == '000000') {
						this.channelNum = res.data.data.seqId;
						this.reqopts.formData.applicationNo = this.channelNum;
					} else {}
				}, (res) => {
					this.$message({
						message: res.data.messages,
						type: 'error'
					})
				})
			},
			//   提交操作
			submit() {
				if(this.files.length != 0) {
					if((this.channelNum != "") && (this.contractTypes != "") && (this.channelName != "") && (this.channelType != "") && (this.belongRegion != "") && (this.address.province != "请选择") && (this.address.city != "请选择") && (this.address.district != "请选择") && (this.contactsMobile != "") && (this.files != "") && (this.remarks != "") && (this.channelContacts != "")) {
						this.fullscreenLoading = true;
						this.$http.post(
							process.env.API + "/channel/add", {
								"applicationNo": this.channelNum,
								"belongRegion": this.belongRegion,
								"channelContacts": this.channelContacts,
								"channelName": this.channelName,
								"channelType": this.channelType,
								"contactsAddress": this.contactsAddress,
								"contactsProvince": this.address.province,
								"contactsCity": this.address.city,
								"contactsArea": this.address.district,
								"contactsMobile": this.contactsMobile,
								"contractTypes": this.contractTypes,
								"outsideChannel": this.outsideChannel,
								"remarks": this.remarks
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
					this.$message.error('图片未上传！');
				}
			},
			checkText() {
				this.channelContacts = this.channelContacts.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
			},
			checkText0() {
				this.channelName = this.channelName.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
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

		},
		components: {
			VueFileUpload,
			Modal
		},
		watch: {
			outsideChannel: function() {
				if(this.outsideChannel == 'false') {
					this.channelTip = "请选择内部渠道";
				} else {
					this.channelTip = "请选择外部渠道";
				}
			},
			channelType: function() {
				this.$refs.vueFileUploader.clearAll();
			}
		},
		created() {},
		computed: {

		},
		mounted: function() {
			this.getChannelNum();
			this.getChanneRange();
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
	}
	
	.img_box {
		overflew: hidden;
		width: 100%;
		#no_img1 {
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