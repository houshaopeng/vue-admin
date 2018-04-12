<template>
	<!--系统更新-->
	<div id="po_system_update">
		<el-form ref="po_suform" :model="po_suform" label-width="120px">
			<!--1-->
			<el-form-item label="升级范围">
				<el-radio-group v-model="po_suform.po_uprange">
					<el-radio label="全国地区"></el-radio>
					<el-radio label="部分地区"></el-radio>
				</el-radio-group>
				<el-select v-model="po_suform.po_areas" multiple placeholder="请选择">
					<el-option v-for="item in area_options"  :key = "item.id" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<!--2-->
			<el-row>
				<el-col :span="6">
					<el-form-item label="版本号">
						<el-input v-model="po_suform.po_vernum_input" placeholder="请输入新版本号" class="verNum"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否强制升级">
						<el-radio-group v-model="po_suform.po_upgrade">
							<el-radio label="强制升级"></el-radio>
							<el-radio label="非强制升级"></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
			<!--3-->
			<el-form-item label="更新说明">
				<el-input type="textarea" class="po_relNotes_textarea" v-model="po_suform.po_relNotes"></el-input>
			</el-form-item>

			<!--4-->
			<el-form-item label="更新包上传">
				<input type="file" />
				<el-button type="primary">上传</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="po_tableData" border style="width: 80%" max-height="250">
			<el-table-column prop="index" label="序号" width="72">
			</el-table-column>
			<el-table-column prop="versionNumber" label="版本号" width="120">
			</el-table-column>
			<el-table-column prop="releaseNotes" label="更新说明" width="120">
			</el-table-column>
			<el-table-column prop="updatAddress" label="更新地址" width="300">
			</el-table-column>
			<el-table-column prop="isMandatory" label="是否强制" width="120">
			</el-table-column>
			<el-table-column prop="operatingTime" label="操作时间" width="180">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
						修改
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	//import NProgress from 'nprogress'
	//	import util from '../../common/js/util'
	//	import { getFoodList, getFoodListPage, batchRemoveFood, removeFood } from '../../api/api';
	export default {
		data() {
			return {
				area_options: [{
					value: 'beijing',
					label: '北京'
				}, {
					value: 'shanghai',
					label: '上海'
				}, {
					value: 'guangzhou',
					label: '广州'
				}, {
					value: 'chongqing',
					label: '重庆'
				}, {
					value: 'guangxi',
					label: '广西'
				}],
				po_suform: {
					po_uprange: '',
					po_upgrade: '',
					po_vernum_input: '',
					po_relNotes: '',
					po_areas: []
				},
				po_tableData: [{
					index: 1,
					versionNumber: '1.1.2',
					releaseNotes: '补丁升级',
					updatAddress: 'http://www.baidu.com.apk',
					isMandatory: '是',
					operatingTime: '2017-4-5 18:21:23',
					zip: 200333
				}, {
					index: 2,
					versionNumber: '1.1.2',
					releaseNotes: '补丁升级',
					updatAddress: 'http://www.baidu.com.apk',
					isMandatory: '是',
					operatingTime: '2017-4-5 18:21:23',
					zip: 200333
				}, {
					index: 3,
					versionNumber: '1.1.2',
					releaseNotes: '补丁升级',
					updatAddress: 'http://www.baidu.com.apk',
					isMandatory: '是',
					operatingTime: '2017-4-5 18:21:23',
					zip: 200333
				}, {
					index: 4,
					versionNumber: '1.1.2',
					releaseNotes: '补丁升级',
					updatAddress: 'http://www.baidu.com.apk',
					isMandatory: '是',
					operatingTime: '2017-4-5 18:21:23',
					zip: 200333
				}, {
					index: 5,
					versionNumber: '1.1.2',
					releaseNotes: '补丁升级',
					updatAddress: 'http://www.baidu.com.apk',
					isMandatory: '是',
					operatingTime: '2017-4-5 18:21:23',
					zip: 200333
				}, {
					index: 6,
					versionNumber: '1.1.2',
					releaseNotes: '补丁升级',
					updatAddress: 'http://www.baidu.com.apk',
					isMandatory: '是',
					operatingTime: '2017-4-5 18:21:23',
					zip: 200333
				}, {
					index: 7,
					versionNumber: '1.1.2',
					releaseNotes: '补丁升级',
					updatAddress: 'http://www.baidu.com.apk',
					isMandatory: '是',
					operatingTime: '2017-4-5 18:21:23',
					zip: 200333
				}]

			}
		},

		methods: {

		}
	};
</script>

<style lang='scss' scoped>
	#po_system_update {
		.po_relNotes_textarea {
			width: 600px;
		}
	}
</style>