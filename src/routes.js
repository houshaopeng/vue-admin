let routes = [{
		path: '/login',
		//component: Login,
		name: '登录页面',
		hidden: true,
        component : resolve => require(['COMPONENT/noLogin/Login.vue'], resolve)
	},

	{
		path: '/changepassword',
		//component: ChangePassword,
		name: '重置修改密码',
		hidden: true,
        component : resolve => require(['COMPONENT/noLogin/ChangePassword.vue'], resolve)
	},

	{
		path: '/404',
		// component: NotFound,
		name: '404页面',
		hidden: true,
        component : resolve => require(['COMPONENT/404.vue'], resolve)
	},
	{
		path: '/',
		//component: Home,
        component : resolve => require(['COMPONENT/Home.vue'], resolve),
		name: '订单查询',
		iconCls: 'fa fa-truck', //图标样式class
		children: [{
				path: '/orderCenter',
				//component: orderCenter,

                component : resolve => require(['COMPONENT/order/orderCenter.vue'], resolve),
				name: '订单中心',
				hidden: false
			},
			{
				path: '/orderDetail',
				// component: orderDetail,
                component : resolve => require(['COMPONENT/order/orderDetail.vue'], resolve),
				name: '订单详情',
				hidden: false
			},
			{
				path: '/table',
				// component: Table,
                component : resolve => require(['COMPONENT/nav1/Table.vue'], resolve),
				name: '客户列表',
				hidden: true
			},

		]
	},
	{
		path: '/',
		// component: Home,
        component : resolve => require(['COMPONENT/Home.vue'], resolve),
		name: '产品录入',
		iconCls: 'fa fa-podcast',
		children: [{
				path: '/loanProduct',
				// component: loanProduct,
                component : resolve => require(['COMPONENT/productInput/loanProduct.vue'], resolve),
				name: '产品1录入',
				hidden: false
			},
			{
				path: '/wealthProduct',
				// component: wealthProduct,
                component : resolve => require(['COMPONENT/productInput/wealthProduct.vue'], resolve),
				name: '产品2录入',
				hidden: false
			},
		]
	},
	{
		path: '/',
		// component: Home,
        component : resolve => require(['COMPONENT/Home.vue'], resolve),
		name: '产品运营',
		iconCls: 'fa fa-table',
		children: [{
				path: '/deviceTracking',
				// component: deviceTracking,
                component : resolve => require(['COMPONENT/productOperation/deviceTracking.vue'], resolve),
				name: '设备跟踪',
			},
			{
				path: '/addstore',
				// component: AddStore,
                component : resolve => require(['COMPONENT/AddStore.vue'], resolve),
				name: '添加门店',
			},
			{
				path: '/addstore2',
				// component: AddStore,
                component : resolve => require(['COMPONENT/productOperation/addStore.vue'], resolve),
				name: '添加门店2',
				hidden: true
			},
			{
				path: '/storeDetails/:storeId',
				// component: AddStore,
                component : resolve => require(['COMPONENT/productOperation/storeDetails.vue'], resolve),
				name: '门店详情',
				hidden: true
			},
			{
				path: '/dataDetails/:storeId',
				// component: dataDetails,
                component : resolve => require(['COMPONENT/nav1/dataDetails.vue'], resolve),
				name: '设备详情',
				hidden: true
			},
			{
				path: '/systemUpdate',
				// component: systemUpdate,
                component : resolve => require(['COMPONENT/productOperation/systemUpdate.vue'], resolve),
				name: '系统更新设置',
				hidden: true
			},
			{
				path: '/commissionSet',
				// component: commissionSet,
                component : resolve => require(['COMPONENT/productOperation/commissionSet.vue'], resolve),
				name: '佣金设置(贷款)',
				hidden: true
			},
		]
	},
	{
	    path: '/',
	    name: '图表分析',
	    component : resolve => require(['COMPONENT/Home.vue'], resolve),
	    iconCls: 'fa fa-bar-chart',
	    // children: [
	    //     {path: '/echarts', component: echarts, name: '人员分析'}
	    // ]
	},
	{
		path: '/',
		// component: Home,
        component : resolve => require(['COMPONENT/Home.vue'], resolve),
		name: '进件申请',
		iconCls: 'fa fa-check-square-o',
		children: [{
				path: '/channelOffering',
				// component: channelOffering,
                component : resolve => require(['COMPONENT/entryRequest/channelOffering.vue'], resolve),
				name: '渠道提报'
			},
			{
				path: '/outletsQuote',
				// component: outletsQuote,
                component : resolve => require(['COMPONENT/entryRequest/outletsQuote.vue'], resolve),
				name: '网点提报'
			},
			{
				path: '/contractMailing',
				// component: contractMailing,
                component : resolve => require(['COMPONENT/entryRequest/contractMailing.vue'], resolve),
				name: '合同邮寄一期',
				hidden: true
			},
			{
				path: '/contractmail',
				// component: contractmail,
                component : resolve => require(['COMPONENT/entryRequest/contractmail.vue'], resolve),
				name: '合同邮寄'
			},
			{
				path: '/Contractretention/:formCode',
				// component: Contractretention,
                component : resolve => require(['COMPONENT/entryRequest/Contractretention.vue'], resolve),
				hidden: true,
				name: '合同留档'
			},
			{
				path: '/viewContract/:currentOrder',
				// component: viewContract,
                component : resolve => require(['COMPONENT/entryRequest/viewContract.vue'], resolve),
				hidden: true,
				name: '查看合同'
			},
			{
				path: '/addChannel',
				// component: addChannel,
                component : resolve => require(['COMPONENT/entryRequest/addChannel.vue'], resolve),
				hidden: true,
				name: '添加渠道'
			},
			{
				path: '/reSubmitChannel/:chanCurrentOrder',
				// component: reSubmitChannel,

                component : resolve => require(['COMPONENT/entryRequest/reSubmitChannel.vue'], resolve),
				hidden: true,
				name: '渠道重新提交'
			},
			{
				path: '/reSubmitOutlets/:netCurrentOrder',
				// component: reSubmitOutlets,
                component : resolve => require(['COMPONENT/entryRequest/reSubmitOutlets.vue'], resolve),
				hidden: true,
				name: '网点重新提交'
			},
			{
				path: '/networkReview/:currentOrder',
				// component: networkReview,
                component : resolve => require(['COMPONENT/entryRequest/networkReview.vue'], resolve),
				name: '网点审核',
				hidden: true
			},
			{
				path: '/channelReview/:currentOrder',
				// component: channelReview,
                component : resolve => require(['COMPONENT/entryRequest/channelReview.vue'], resolve),
				name: '渠道审核',
				hidden: true
			},
			{
				path: '/addOutlets',
				// component: addOutlets,
                component : resolve => require(['COMPONENT/entryRequest/addOutlets.vue'], resolve),
				hidden: true,
				name: "新增网点"
			},
			{
				path: '/outletsDetails/:currentOrder',
				// component: outletsDetails,
                component : resolve => require(['COMPONENT/entryRequest/outletsDetails.vue'], resolve),
				hidden: true,
				name: "网点详情"
			},
			{
				path: '/channelDetails/:currentOrder',
				// component: channelDetails,
                component : resolve => require(['COMPONENT/entryRequest/channelDetails.vue'], resolve),
				hidden: true,
				name: "渠道详情"
			}
		]
	},
	{
		path: '/',
		// component: Home,
        component : resolve => require(['COMPONENT/Home.vue'], resolve),
		name: '系统设置',
		iconCls: 'fa fa-cog',
		children: [{
				path: '/User',
				// component: User,
                component : resolve => require(['COMPONENT/systemsettings/User.vue'], resolve),
				name: '用户管理'
			},
			{
				path: '/Role',
				// component: Role,
                component : resolve => require(['COMPONENT/systemsettings/Role.vue'], resolve),
				name: '角色管理'
			},
			{
				path: '/modifyPassword',
				// component: modifyPassword,
                component : resolve => require(['COMPONENT/systemsettings/modifyPassword.vue'], resolve),
				name: '修改密码'
			},
			{
			    path: '/blankPage',
			    hidden:true,
			    component : resolve => require(['COMPONENT/systemsettings/blankPage.vue'], resolve),
			    name: '空白页面'
			},
		]
	},
	{
		path: '*',
		hidden: true,
		redirect: {
			path: '/404'
		}
	}
];
export default routes;