<template>
	<div id="po_commission_set">
		<el-row>
			<el-button>贷款推荐奖励</el-button>
			<el-button>理财推荐奖励</el-button>
		</el-row>
		<el-row class="marginT">
			<el-button type="primary">添加产品</el-button>
			<el-button type="primary">修改产品</el-button>
			<el-button type="primary">置为失效</el-button>
		</el-row>
		<el-collapse accordion class="po_cs_collapse">
			<el-collapse-item>
				<template slot="title">
					善信租赁
				</template>
				<el-row class="textA">
					<el-col :span="12">每月贷款发放金额（Y 单位：万元）</el-col>
					<el-col :span="12">网店提成佣金（年华）</el-col>
				</el-row>
				<el-row class="textA">
					<el-col :span="12">0 ≤ Y ≤ 10</el-col>
					<el-col :span="12">1.20%</el-col>
				</el-row>
				<el-row class="textA">
					<el-col :span="12">10 ≤ Y ≤ 20</el-col>
					<el-col :span="12">1.60%</el-col>
				</el-row>
				<el-row class="textA">
					<el-col :span="12">20 ≤ Y ≤ 30</el-col>
					<el-col :span="12">2.00%</el-col>
				</el-row>
				<el-row class="textA">
					<el-col :span="12">30 ≤ Y ≤ 50</el-col>
					<el-col :span="12">2.40%</el-col>
				</el-row>
				<el-row class="textA">
					<el-col :span="12">50 ≤ Y ≤ 100</el-col>
					<el-col :span="12">2.60%</el-col>
				</el-row>
			</el-collapse-item>
			<el-collapse-item title="雪橙金服">
				<el-row class="textA">
					<el-col :span="12"></el-col>
					<el-col :span="12"></el-col>
				</el-row>
			</el-collapse-item>
			<el-collapse-item title="效率 Efficiency">
				<div>简化流程：设计简洁直观的操作流程；</div>
				<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
				<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
			</el-collapse-item>
			<el-collapse-item title="可控 Controllability">
				<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
				<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
</script>

<style lang='scss' scoped>
	#po_commission_set {
		.marginT {
			margin-top: 10px;
		}
		.po_cs_collapse{
			margin-top: 30px;
			width:800px;
		}
		.textA{
			text-align: center;
		}
	}
</style>