export default [
	// 概览
	{
		path: "/",
		component: () => import("../pages/Withdrawal.vue"),
	},
	// 提现记录
	{
		path: "/Withdrawal",
		component: () => import("../pages/Withdrawal.vue"),
	},
	// 会员升级记录
	{
		path: "/UserUpgrade",
		component: () => import("../pages/UserUpgrade.vue"),
	},
	// 团队查询
	{
		path: "/TeamFind",
		component: () => import("../pages/TeamFind.vue"),
	},
	// 用户管理
	{
		path: "/UserList/UserList",
		component: () => import("../pages/UserList/UserList.vue"),
	},
	// 我的商品库
	// {
	// 	path: "/myGoods/MyGoods",
	// 	component: () => import("../pages/myGoods/MyGoods.vue"),
	// },
	{
		path: "/myGoods/Library",
		component: () => import("../pages/myGoods/Library.vue"),
	},
	
	{
		path: "/myGoods/localGoods",
		component: () => import("../pages/myGoods/localGoods.vue"),
	},
	// 本地生活商品信息
	{
		path: "/myGoods/information",
		component: () => import("../pages/myGoods/information.vue"),
	},
	
	
	//我的商品库-分类管理
	{
		path: "/myGoods/Type",
		component: () => import("../pages/myGoods/Type.vue"),
	},
	
	
	// 团购商品管理
	{
		path: "/TeamBuyGoods",
		component: () => import("../pages/TeamBuyGoods/TeamBuyGoods.vue"),
	},

	// 订单管理-拼团订单
	{
		path: "/OrderList/GroupList",
		component: () => import("../pages/OrderList/GroupList.vue"),
	},
	// 订单管理-单独购买订单
	{
		path: "/OrderList/OneBuyList",
		component: () => import("../pages/OrderList/OneBuyList.vue"),
	},
	// 订单管理-兑换订单
	{
		path: "/OrderList/ExchangeList",
		component: () => import("../pages/OrderList/ExchangeList.vue"),
	},
	// 任务管理-任务设置
	{
		path: "/TaskList/SetTask",
		component: () => import("../pages/TaskList/SetTask.vue"),
	},
	// 任务管理-任务设置-视频专区设置
	{
		path: "/TaskList/SetTask/VideoSet",
		component: () => import("../pages/TaskList/VideoSet.vue"),
	},
	// 任务管理-签到设置
	{
		path: "/TaskList/SetSign",
		component: () => import("../pages/TaskList/SetSign.vue"),
	},
	// 公告管理
	{
		path: "/Notice",
		component: () => import("../pages/Notice.vue"),
	},
	// 规则基础规则设置
	{
		path: "/RuleList/SetBaseRule",
		component: () => import("../pages/RuleList/SetBaseRule.vue"),
	},
	// 规则提现规则设置
	{
		path: "/RuleList/SetWtihdrawRule",
		component: () => import("../pages/RuleList/SetWtihdrawRule.vue"),
	},
	// 规则奖励规则设置
	{
		path: "/RuleList/SetProfitRule",
		component: () => import("../pages/RuleList/SetProfitRule.vue"),
	},
	// 兑换商品列表
	{
		path: "/ConvertGoods/ConvertGoodsList",
		component: () => import("../pages/ConvertGoods/ConvertGoodsList.vue"),
	},
	// 兑换商品详情
	{
		path: "/ConvertGoods/ConvertGoods",
		component: () => import("../pages/ConvertGoods/ConvertGoods.vue"),
	},
	
	// 快乐倍增计划
	{
		path: "/DoublingPlan/List",
		component: () => import("../pages/DoublingPlan/List.vue"),
	},
	// 快乐倍增计划
	{
		path: "/DoublingPlan/UserList",
		component: () => import("../pages/DoublingPlan/UserList.vue"),
	},
	// 快乐倍增计划
	{
		path: "/DoublingPlan/UserDetail/",
		component: () => import("../pages/DoublingPlan/UserDetail.vue"),
		children:[
			{
				//
				path: "/DoublingPlan/UserDetail",
				component: () => import("../pages/userModel/b1.vue"),
			},
			{
				//
				path: "/DoublingPlan/UserDetail/b2",
				component: () => import("../pages/userModel/b2.vue"),
			},
			{
				//
				path: "/DoublingPlan/UserDetail/b3",
				component: () => import("../pages/userModel/b3.vue"),
			},
			{
				//
				path: "/DoublingPlan/UserDetail/b4",
				component: () => import("../pages/userModel/b4.vue"),
			},
			{
				//
				path: "/DoublingPlan/UserDetail/b5",
				component: () => import("../pages/userModel/b5.vue"),
			}
			]
	},
	// 新增快乐倍增计划
	{
		path: "/DoublingPlan/AddPlan",
		component: () => import("../pages/DoublingPlan/AddPlan.vue"),
	},
	// 详情快乐倍增计划
	{
		path: "/DoublingPlan/PlanDetail",
		component: () => import("../pages/DoublingPlan/PlanDetail.vue"),
	},
	// 详情快乐倍增计划
	{
		path: "/DoublingPlan/set",
		component: () => import("../pages/DoublingPlan/set.vue"),
	},
	// 团购商品管理-详情
	{
		path: "/TeamBuyGoodsDetail",
		component: () => import("../pages/TeamBuyGoods/TeamBuyGoodsDetail.vue"),
	},
	// 用户列表-用户详情
	{
		path: "/UserList/UserDetail/",
		component: () => import("../pages/UserList/UserDetail.vue"),
		children:[
			{
				//
				path: "/UserList/UserDetail",
				component: () => import("../pages/userModel/m1.vue"),
			},
			{
				//
				path: "/UserList/UserDetail/m2",
				component: () => import("../pages/userModel/m2.vue"),
			},
			{
				//
				path: "/UserList/UserDetail/m2s",
				component: () => import("../pages/userModel/m2s.vue"),
			},
			{
				//
				path: "/UserList/UserDetail/m3",
				component: () => import("../pages/userModel/m3.vue"),
			},
			{
				//
				path: "/UserList/UserDetail/m4",
				component: () => import("../pages/userModel/m4.vue"),
			},
			{
				//
				path: "/UserList/UserDetail/m4s",
				component: () => import("../pages/userModel/m4s.vue"),
			},
			{
				//
				path: "/UserList/UserDetail/m5",
				component: () => import("../pages/userModel/m5.vue"),
			},
			{
				//
				path: "/UserList/UserDetail/m6",
				component: () => import("../pages/userModel/m6.vue"),
			},
			{
				//
				path: "/UserList/UserDetail/m7",
				component: () => import("../pages/userModel/m7.vue"),
			},
			{
				//
				path: "/UserList/UserDetail/m8",
				component: () => import("../pages/userModel/m8.vue"),
			},
		]
	},
];
