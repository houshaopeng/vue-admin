<template>
	<section>
		<el-row :gutter="20">
		  <el-col :span="6">
		  	<el-form label-width="80px">
			  <el-form-item label="订单类型:">
			     <el-select v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			  </el-form-item>
			</el-form>
		  </el-col>
		  <el-col :span="6">
		  	<el-form ref="form" :model="form" label-width="80px">
			    <el-form-item label="订单编号:">
			        <el-input v-model="form.orderNum" placeholder="请输入订单编号"></el-input>
			    </el-form-item>
			</el-form>
		  </el-col>
		  <el-col :span="6">
		  	 <el-form ref="form" :model="form" label-width="80px">
			    <el-form-item label="手机号:">
			        <el-input v-model="form.phoneNum" placeholder="请输入手机号"></el-input>
			    </el-form-item>
			 </el-form>
		  </el-col>
		</el-row>
		<el-row :gutter="20">
		  <el-col :span="6">
		  	<el-form  ref="form" :model="form" label-width="80px">
			    <el-form-item label="身份证号:">
			        <el-input v-model="form.phoneNum" placeholder="请输入身份证号"></el-input>
			    </el-form-item>
			 </el-form>
		  </div></el-col>
		  <el-col :span="6">
		  	<el-form label-width="80px">
			  <el-form-item label="接单公司:">
			     <el-select v-model="value" placeholder="善林商务">   <!-- TODO -->
				    <el-option
				      v-for="item in options1"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			  </el-form-item>
			</el-form>		  
		  </el-col> 
		 <el-col :span="8"><el-button type="primary">查询</el-button></el-col>
		</el-row>
		<template>
			<el-table :data="tableData"
					  ref="singleTable"
					  highlight-current-row
					  @current-change="handleStore"
					  :row-class-name="tableRowClassName"  height="400">
				<el-table-column  style=" text-align:center; "
					prop="orderNo"
					label="订单编号">
				</el-table-column>
				<el-table-column
					prop="name"
					label="姓名">
				</el-table-column>
				<el-table-column
					prop="idCardNum"
					label="身份证号"  width="200">
				</el-table-column>
				<el-table-column
					prop="phoneNum"
					label="手机号">
				</el-table-column>
				<el-table-column
					prop="applicationTime"
					label="申请时间">
				</el-table-column>
				<el-table-column
					prop="orderCompany"
					label="接单公司">
				</el-table-column>
				<el-table-column
					prop="productName"
					label="产品名称">
				</el-table-column>
				<el-table-column
					prop="processingState"
					label="处理状态">
				</el-table-column>
			</el-table>
		</template>
		<div id="clearButton" style="text-align:center;">

			<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total"
						   layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes"
						   @size-change="sizeChange" @current-change="pageIndexChange">
			</el-pagination>
		</div>
	</section>
</template>


<script>
export default {
    data() {
	    return {
		   options: [{
	          value: '选项1',
	          label: 'A订单'
	        },{
	          value: '选项2',
	          label: 'B订单'
	        }],
	        value: '选项1',
			options1: [{
			  value: '选项1',
			  label: '公司1'
			},{
			  value: '选项2',
			  label: '公司2'
			}],
			value: '选项1',
	        form: {
	          orderNum: '',
	          phoneNum:''
	        },
	        tableData: [{
            orderNo: 'JK00001',
            name: '李四',
            idCardNum: '411528199109073759',
            phoneNum:'13460306050',
            applicationTime:'2018-03-02',
            orderCompany:'管理有限公司',
            productName:'终端机',
            processingState:'已派单' 
          },
          {
			orderNo: 'JK00001',
			name: '李四',
			idCardNum: '411528199109073759',
			phoneNum:'13460306050',
			applicationTime:'2017-05-02',
			orderCompany:'管理有限公司',
			productName:'终端机',
			processingState:'待接单' 
		  }],
            pageSize: 30,    // 每一页展示数据条数
            pageIndex: 0,
            total: 0,
            pageSizes: [10, 20, 50, 100]
		}

    },
    methods:{
    	tableRowClassName(row, index) {
	       if (index === 1) {
	         return 'info-row';
	       } else if (index === 3) {
	         return 'positive-row';
	       }
	       return '';
	     },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },

        handleStore(row){
            this.storeCode=row.storeCode;
            this.createTime = row.createTime;
            console.log(row);
        },
        // 分页请求查询
        handleCurrentChange(val) {
            this.currentPageNum = val;
            this.fetchData();
        },
        sizeChange: function (pageSize) {
            this.pageSize = pageSize;
            this.fetchData();
        },
        pageIndexChange: function (pageIndex) {
            this.pageIndex = pageIndex;
            this.fetchData();
        }
    }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  } 
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-table .info-row {
     background: #e84e40;
   }
</style>