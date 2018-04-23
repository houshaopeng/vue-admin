<template>
    <div id='role'>
        <el-form  label-width="90px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="角色编号:">
                        <el-input v-model="rNumber" type = "text" @keyup.native="checkNumber()" placeholder="单行输入" :maxlength = "15"></el-input>
                   		<!--<div class="userChange"><input  type="number"  v-model="rNumber" placeholder="单行输入" maxlength="15" oninput="if(value.length>6)value=value.slice(0,20)"  onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" /></div>-->                   
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="角色名称:">
                        <el-input v-model="rName" @keyup.native="queryName()"  placeholder="单行输入" :maxlength = "20"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span='5'>
                    <el-button type="primary" @click ="fetchRole">查询</el-button>
                </el-col>
                <el-col :span='5'>
                    <el-button type="primary" @click = "addRole">添加角色</el-button>
                </el-col>
                <el-col :span='5'>
                    <el-button type="primary" @click = "deleteRole">删除角色</el-button>
                </el-col>
            </el-row>
        </el-form>

        <template>
            <el-table
                    :data="roleMain"
                    border
                    highlight-current-row
                    @current-change="delRole"
                    v-loading="listLoading"
                    @cell-click = "aa"
                    :row-class-name="tableRowClassName"
                    style="width: 100%" height="400">
                <!--<el-table-column type="selection" width="55"></el-table-column>-->
                <el-table-column type="index"  label = "序号" width="100"></el-table-column>
                <el-table-column prop="roleNo"  label="角色编号" >
                </el-table-column>
                <el-table-column prop="roleName"  label="角色名称">
                </el-table-column>
                <el-table-column prop="roleDesc"  label="角色描述" >
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间">
                </el-table-column>
                <el-table-column prop="roleStatus" label="状态"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
							 <span>
		 	                    <el-button type="info" size="small" @click="handleEdit(scope.row)">编辑</el-button>
		 	                </span>
                    </template>
                </el-table-column>
            </el-table>            
			<div id="clearButton" style="text-align:center;">
				<el-pagination v-bind:current-Page="pageIndex" :page-size="pageSize" :total="total"
							   layout="total,sizes,prev,pager,next,jumper" :page-sizes="pageSizes"
							   @size-change="sizeChange" @current-change="pageIndexChange">
				</el-pagination>
			</div>
        </template>
		<!--添加新角色-->
        <el-dialog title="添加角色" :visible.sync="dialogFormVisible" :show-close="false">
            <el-form :model="addForm"  label-width="90px">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="*角色编号:">
                            <el-input v-model="seqId"  :disabled="true"   placeholder="自动生成编号，初始0001" :maxlength = "15"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="*角色名称:">
                           <el-select v-model="addRoleValue" @change="changeRole" placeholder="请选择角色名称">
                                <el-option
                                        v-for="item in rList"
                                        :key="item.levelNo"
                                        :label="item.levelName"
                                        :value="item.levelName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="12">
                        <el-col :span="24">
                            <el-form-item label="*状态:" label-width="90px">
                            	<el-radio-group v-model="stateRole">
	                                <el-radio :label="0">启用</el-radio>
	                                <el-radio :label="1">停用</el-radio>
	                            </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="22">
                        <el-form-item label="*备注:">
                            <el-input type="textarea" v-model="addForm.desc" class="textarea_style" placeholder="仅限200字" :maxlength = "200" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="22">
                        <el-form-item label="*角色描述:">
                            <el-input type="textarea" v-model="addForm.roleDesc"  class="textarea_style" placeholder="请输入角色描述，限80字" :maxlength = "80"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelRole">取 消</el-button>
                <el-button type="primary" @click="roleSure">确 定</el-button>
            </div>
            <el-row >
                <h1>权限菜单配置</h1>
            </el-row>
            <el-tree
              	:data="addDataTree"
                show-checkbox
                node-key="menuNo"
                ref="tree"
              	:props="defaultProps"
              	:default-checked-keys='checkedId'
                :expand-on-click-node = false
                :show-checkbox  = true
				highlight-current
				@check-change="addChange"
                >
            </el-tree>
        </el-dialog>

        <!--编辑角色-->
        <el-dialog title="编辑角色" :visible.sync="editFormVisible" :show-close="false">

            <el-form :model="editRole"  label-width="90px">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="*角色编号:">
                            <el-input v-model="seqIdone" :disabled="true" placeholder="自动生成编号，初始0001" :maxlength = "15"></el-input>
                        </el-form-item>
                    </el-col>
          
                    <el-col :span="12">
                        <el-form-item label="*角色名称:">
                            <el-select v-model="roleValue" @change="changeRole" placeholder="请选择角色名称">
                                <el-option
                                        v-for="item in EList"
                                        :key="item.levelNo"
                                        :label="item.levelName"
                                        :value="item.levelName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="12">
                        <el-col :span="24">
                            <el-form-item label="*状态:" label-width="90px">
                                <el-radio-group v-model="stateAdd">
	                                <el-radio :label="0">启用</el-radio>
	                                <el-radio :label="1">停用</el-radio>
	                            </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="22">
                        <el-form-item label="*备注:">
                            <el-input type="textarea" v-model="editRole.desc" class="textarea_style" placeholder="仅限200字" :maxlength = "200"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="22">
                        <el-form-item label="*角色描述:">
                            <el-input type="textarea" v-model="editRole.editDesc" class="textarea_style" placeholder="请输入角色描述，限80字" :maxlength = "80"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="roleEdit">确 定</el-button>
            </div>
            <el-row >
                <h1>权限菜单配置</h1>
            </el-row>
            <el-tree :data="dataTree"
                    :props="defaultProps"
                     :default-checked-keys='checkedId'
                    node-key="menuNo"
  					ref="tree1"
  					accordion
                    show-checkbox
                    @check-change="editChange"
                    >
            </el-tree>
        </el-dialog>


    </div>
</template>
<script>
    export default{
        name: 'role',
        data(){
            return {
            	rNumber:'',  //输入角色编号
            	rName:'',    //输入角色名称
            	roleMain:[],  //角色数据集合
				addForm:{  //添加角色
					desc:'',
					roleDesc:''
				},
				editRole:{  //编辑角色
					desc:'',
					editDesc:''
				},
				stateRole:0,
				stateAdd:0,
            	rList:[{  //角色等级
        			levelNo:'',
        			levelName:''
            	}], 
            	EList:[{  //编辑时角色等级
        			levelNo:'',
        			levelName:''
            	}],
            	roleValue:'',
                addRoleValue:'', // 添加角色 角色选择
            	roleMenu:[], //查询到的权限菜单
                jobNumber:'',
                listLoading: false,  //加载
                roleNumber:'',     //角色编号
                rName:'',          //输入名字
                roleName:'',
                dialogFormVisible:false,  //添加角色弹框
                editFormVisible:false,    //编辑角色弹框
                formLabelWidth: '120px',
                createdAt:'',
                role:{
                    Number:'',
                    name:''
                },
                dataTree:[],  // 树状图  层级数据
                addDataTree:[],   // 添加角色数据
                defaultProps: {
		          children: 'children',
		          label: 'name'
		        },
                radio:'yes',
                currentOrder:'',
                seqId:'', //添加 角色编号
                editOrder:'',
                seqIdone:'',  //角色编号
                pageSize: null,    // 每一页展示数据条数
	            pageIndex: 0,
	            total: 0,
	            pageSizes: [20, 30, 50],
	            menuNo:[],            // 添加时选中的权限菜单
                accessRole:[],              //  添加时候的角色
                accessRoleId:[],           //  添加时候的权限菜单
                editNo:[],                  //编辑时权限菜单
                editPart:[],              //  编辑时的角色
                editPartId:[],           //  编辑时候的权限菜单
                checkedId:[]
            }
        },
        methods: { 
            aa(row, column, cell, event){
//              console.log(row)
            },
            tableRowClassName(row, index){
                if (index === 1) {
                    return 'info-row';
                }
            },
        	//角色编号校验
        	checkNumber(){  
    			this.rNumber = this.rNumber.replace(/[^\d]/g,'');
	    	},
	    	//角色名称校验
	    	queryName(){
	    		this.rName = this.rName.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'');
	    	},
        	//权限菜单选项
        	handleNodeClick(data,node,str) {

//      		let ids = [];
//      		if (node.checked == true) {
//      			ids.push(data.menuNo);
//      		}
//      		this.menuNo=ids;
//      		console.log(this.menuNo)
        	},
        	//select下拉
        	changeRole(value){
				this.levelName = value;
			},
            getCheckedNodes() {
                this.accessRole = this.$refs.tree.getCheckedNodes();
//              console.log(this.accessRole)
                let len = this.accessRole.length;
                for(var i =0;i<len;i++){
                    this.accessRoleId.push(this.accessRole[i].menuNo)
                }
            },
            //置空权限菜单
            addChange(obj,pNode,Cnode){ 
            	if (pNode==false) {
            		this.accessRoleId=[];          		
            	}
            },
        	roleSure(){
        	    this.getCheckedNodes();        	   
        		//添加页面    确认添加角色
            	this.$http({
					method:'POST',
					url:process.env.API+"/role/addRole",
					body:{
						"remarks":this.addForm.desc,           // 备注
						"roleDesc":this.addForm.roleDesc,    // 角色描述
						"roleName":this.addRoleValue,  // 角色名称
						"roleNo":this.seqId,        // 角色编号
						"roleStatus":this.stateRole,     //角色状态（0启用，1停用)
                        "roleMenu" : this.accessRoleId     // 添加权限菜单
					},
					headers: {
						"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
		       		}
				}).then((res)=>{
					if(res.data.code =="000000"){
						this.showRole();
						this.dialogFormVisible = false;
						this.autoNum();
						this.addRoleValue = '';
						this.addForm = {
							desc:'', 
							roleDesc:''
						};
						this.stateRole = 0;
					}else{
						this.$message({
						  message: res.data.messages,
						  type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  	message: res.data.messages,
					  	type: 'error'
					});
				})

            },
            //取消
            cancelRole(){  
            	this.$refs.tree.setCheckedKeys([]);
            	this.dialogFormVisible = false;
            	this.addRoleValue = '';
				this.addForm = {
					desc:'', 
					roleDesc:''
				};		
				this.stateRole = 0;				
            },
			
            //渲染编辑页面
        	handleEdit(row){

        		this.editOrder = row.roleNo; //点击选中当前行 并拿到当前行编号
				
        		this.$http({
            		method:'POST',
					url:process.env.API+"/role/queryCurrentRole", //查询当前编辑角色信息
					body:{
						"roleNo":this.editOrder,           // 角色编号
					},
					headers: {
						"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
		       		}
				}).then((res)=>{
					if(res.data.code =="000000"){
						
						this.editFormVisible = true;
						this.seqIdone = res.data.data.roleNo;
						this.editRole.desc = res.data.data.remarks;
						this.editRole.editDesc = res.data.data.roleDesc;
						this.roleValue = res.data.data.roleName;
						this.stateAdd = res.data.data.roleStatus;
						this.roleMenu = res.data.data.roleMenu;
							this.checkedId = this.roleMenu;
							this.$nextTick(() =>{
							    this.$refs.tree1.setCheckedKeys(this.checkedId);
							})
						if (this.stateAdd == false) {
							this.stateAdd=0;
						} else{
							this.stateAdd=1;
						}
					}else{
						this.$message({
						  message: res.data.messages,
						  type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  	message: res.data.messages,
					  	type: 'error'
					});
				})
	  		},
	  		setCheckedKeys(){
	  			this.$refs.tree1.setCheckedKeys(this.checkedId)
	  		},
            getCheckedNodes1() {
                this.editPart = this.$refs.tree1.getCheckedNodes();
                let len = this.editPart.length;
                for(var i =0;i<len;i++){
                    this.editPartId.push(this.editPart[i].menuNo)
                }
//              console.log(this.editPartId)
            },
            //置空权限菜单
            editChange(obj,pNode,Cnode){ 
            	if (pNode==false) {
            		this.editPartId=[];          		
            	}
            },
            roleEdit(){
                this.getCheckedNodes1();
//                先判断权限范围
        		//编辑页面确认编辑角色
        		this.$http({
            		method:'POST',
					url:process.env.API+"/role/editRole",
					body:{
						"remarks":this.editRole.desc,           // 备注
						"roleDesc":this.editRole.editDesc,    // 角色描述
						"roleMenu":this.editPartId,       	// 权限菜单
						"roleName":this.roleValue,            // 角色名称
						"roleNo":this.seqIdone,        // 角色编号
						"roleStatus":this.stateAdd     //角色状态（0启用，1停用)
					},
					headers: {
						"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
		       		}
				}).then((res)=>{
//					alert(res.data.code)
					if(res.data.code =="000000"){
						this.showRole();
						this.editFormVisible = false;
//						console.log(res.data.messages);
					}else{
						this.$message({
						  message: res.data.messages,
						  type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  	message: res.data.messages,
					  	type: 'error'
					});
				})

           },
           cancelEdit(){
           		this.$refs.tree1.setCheckedKeys([]);
            	this.editFormVisible = false;
            },
            //分页
            handleCurrentChange(val) {
				this.page = val;
				this.showRole();
			},
			//分页
			sizeChange: function (pageSize) {
	            this.pageSize = pageSize;
	            this.showRole();
	       },
			 pageIndexChange: function (pageIndex) {
	            this.pageIndex = pageIndex;
	            this.showRole();
	       },
	       //查询按钮
            fetchRole(){  
            	this. queryRole();
//  			var rel = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");
//  			if((!rel.test(this.rName)&&this.rName!=""&&this.rName!=null)){ 
//  				this.$message({
//					  message: '角色名称只能输入中文、英文、数字',
//					  type: 'error'
//					});	 
//					return false;
//  			}else{
//  				this. queryRole();
//  			} 				 				 
            },
            queryRole(){
            	//条件查询角色
				this.listLoading = true;
				this.$http({
            		method:'POST',
					url:process.env.API+"/role/queryRoleByPage",
					body:{
						"pageNum":this.pageIndex,           // 当前页
						"pageSize":this.pageSize,    // 页大小
						"roleName":this.rName,            // 角色名称
						"roleNo":this.rNumber,        // 角色编号
					},
					headers: {
						"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
		       		}
				}).then((res)=>{
                    this.listLoading = false;
					if(res.data.code =="000000"){
//                      console.log(res.data.data.slPageInfo)
						this.roleMain = res.data.data.queryRoleResponses;
						this.pageIndex = res.data.data.slPageInfo.pageNum;
						this.total = res.data.data.slPageInfo.total;

						this.pageSize = res.data.data.slPageInfo.pageSize;

						if (this.roleMain) {
							for (var i=0;i<this.roleMain.length;i++) {
								(this.roleMain[i].roleStatus) == 0?this.roleMain[i].roleStatus='启用':this.roleMain[i].roleStatus='停用';
							}
						}


					}else{
						this.$message({
						  message: res.data.messages,
						  type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  	message: res.data.messages,
					  	type: 'error'
					});
				})
           },
            //用于页面初始化渲染列表
            showRole(){
				//条件查询角色
				this.listLoading = true;
				this.$http({
            		method:'POST',
					url:process.env.API+"/role/queryRoleByPage",
					body:{
						"pageNum":this.pageIndex,           // 当前页
						"pageSize":this.pageSize,    // 页大小
						"roleName":'',            // 角色名称
						"roleNo":'',        // 角色编号
					},
					headers: {
						"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
		       		}
				}).then((res)=>{
                    this.listLoading = false;
					if(res.data.code =="000000"){
						this.roleMain = res.data.data.queryRoleResponses;
						this.pageIndex = res.data.data.slPageInfo.pageNum;
						this.total = res.data.data.slPageInfo.total;
						this.pageSize = res.data.data.slPageInfo.pageSize;

						if (this.roleMain) {
							for (var i=0;i<this.roleMain.length;i++) {
								(this.roleMain[i].roleStatus) == 0?this.roleMain[i].roleStatus='启用':this.roleMain[i].roleStatus='停用';
							}
						}
					}else{
						this.$message({
						  message: res.data.messages,
						  type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  	message: res.data.messages,
					  	type: 'error'
					});
				})
            },
            addRole(){
                this.dialogFormVisible=true;   //添加角色弹出框
                this.$refs.tree.setCheckedKeys([]);
            },
            power(){
            	//查询所有权限菜单
            	this.$http({
            		method:'POST',
					url:process.env.API+"/role/queryAllMenu",
					headers: {
						"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
		       		}
				}).then((res)=>{
					if(res.data.code =="000000"){

						this.dataTree = res.data.data;
                        this.addDataTree = res.data.data;
					}else{
						this.$message({
						  message: res.data.messages,
						  type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  	message: res.data.messages,
					  	type: 'error'
					});
				});
				//获取所有角色等级
				this.$http({
            		method:'POST',
					url:process.env.API+"/role/level",
					headers: {
						"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
		       		}
				}).then((res)=>{
					if(res.data.code =="000000"){
						this.rList = res.data.data;
						this.EList = res.data.data;
					}else{
						this.$message({
						  message: "网络请求错误",
						  type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  	message: res.data.messages,
					  	type: 'error'
					});
				});
            },
            autoNum(){
            	//自动生成角色编号
				this.$http({
            		method:'POST',
					url:process.env.API+"/sysGeneratorseq/getCode",
					body:{
						"seqType":'JS',           // 角色编号
					},
					headers: {
						"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
		       		}
				}).then((res)=>{
					if(res.data.code =="000000"){
						this.seqId = res.data.data.seqId;
					}else{
						this.$message({
						  message: res.data.messages,
						  type: 'error'
						})
					}
				},(res)=>{
					this.$message({
					  	message: res.data.messages,
					  	type: 'error'
					});
				})
            },
            delRole(row,currentRow, oldCurrentRow){
            	if (row) {
            		 this.currentOrder = row.roleNo; //点击选中当前行 并拿到当前行编号
            	} 
            },
            deleteRole(){   //删除角色
            	if(this.currentOrder==""){
                    this.$message({
                      type: 'info',
                      message:"请先选择删除角色行"
                    });
               }else{
               	this.$http({
            		method:'POST',
					url:process.env.API+"/role/deleteRole",
					body:{
						"roleNo":this.currentOrder,           // 角色编号
					},
					headers: {
						"x-sljr-session-token":JSON.parse(sessionStorage.getItem("userInfo")).userToken,
		       		}
				}).then((res)=>{
						if(res.data.code =="000000"){
							this.$message({
							  message: "角色已删除成功！",
							  type: 'success'
							});
							this.showRole();
							this.currentOrder="";
						}else{
							this.$message({
							  message: res.data.messages,
							  type: 'error'
							});
							this.currentOrder="";
						}
					},(res)=>{
						this.$message({
						  	message: res.data.messages,
						  	type: 'error'
						});
					})
				}

            },
        },
        created:function(){ 
	       // this.power();
	       // this.pageSize = 20;
	       // this.showRole();
	       // this.autoNum();
	   }
    }
</script>
<style  lang='scss'>
    .el-table .info-row {
        background: #fff;
    }
    .textarea_style textarea{
        width: 100%;
        height:100px;
        resize:none;
    }  
</style>