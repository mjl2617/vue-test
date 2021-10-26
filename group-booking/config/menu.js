const config = [
	// {
	// 	icon: "el-icon-s-home",
	// 	title: "概览",
	// 	path: "/"
	// },
	{
		icon: "el-icon-s-finance",
		title: "提现记录",
		path: "/Withdrawal"
	},
	// {
	// 	icon: "el-icon-s-custom",
	// 	title: "会员升级记录",
	// 	path: "/UserUpgrade"
	// },
	{
		icon: "el-icon-s-help",
		title: "团队查询",
		path: "/TeamFind"
	},
	{
		icon: "el-icon-user-solid",
		title: "用户管理",
		path: "/UserList/UserList"
	},
	{
		icon: "el-icon-s-shop",
		title: "我的商品库",
		path: "/myGoods",
		children: [
			{
				title: "本地生活库",
				path: "/myGoods/localGoods",
			},
			// {
			// 	title: "我的商品库",
			// 	path: "/myGoods/MyGoods",
			// },
			
			{
				title: "线上商品库",
				path: "/myGoods/Library",
			},
			{
				title: "分类管理",
				path: "/myGoods/Type",
			}
		]
	},





	{
		icon: "el-icon-s-goods",
		title: "团购商品管理",
		path: "/TeamBuyGoods"
	},
	{
		icon: "el-icon-star-on",
		title: "兑换商品管理",
		path: "/ConvertGoods/ConvertGoodsList"
	},
	{
		icon: "el-icon-s-order",
		title: "订单管理",
		path: "/OrderList",
		children: [{
				title: "拼团订单",
				path: "/OrderList/GroupList",
			},
			{
				title: "单独购买订单",
				path: "/OrderList/OneBuyList",
			},
			{
				title: "兑换订单",
				path: "/OrderList/ExchangeList",
			}
		]
	},
	{
		icon: "el-icon-s-flag",
		title: "任务管理",
		path: "/TaskList",
		children: [{
				title: "任务设置",
				path: "/TaskList/SetTask",
			},
			{
				title: "签到设置",
				path: "/TaskList/SetSign",
			}
		]
	},
	{
		icon: "el-icon-s-platform",
		title: "公告管理",
		path: "/base/Notice/List"
	},
	{
		icon: "el-icon-warning",
		title: "用户反馈",
		path: "/base/UserAdvise"
	},
	{
		icon: "el-icon-message-solid",
		title: "规则设置",
		path: "/RuleList",
		children: [{
				title: "基础设置",
				path: "/RuleList/SetBaseRule",
			},
			{
				title: "提现设置",
				path: "/RuleList/SetWtihdrawRule",
			},
			{
				title: "奖励设置",
				path: "/RuleList/SetProfitRule",
			}
		]
	},
	{
		icon: "el-icon-place",
		title: "快乐倍增计划",
		path: "/DoublingPlan",
		children: [
				{
				title: "倍增计划列表",
				path: "/DoublingPlan/List",
			},
			{
				title: "快乐倍增配置",
				path: "/DoublingPlan/set",
			},
			{
				title: "快乐倍增用户管理",
				path: "/DoublingPlan/UserList",
			}
		]
	},
	{
		icon: "el-icon-s-tools",
		title: "系统设置",
		path: "/SystemList",
		children: [
			// 	{
			// 	title: "管理员账号管理",
			// 	path: "/base/SystemList/SetAdmin",
			// },
			// {
			// 	title: "角色管理",
			// 	path: "/base/SystemList/SetUser",
			// },
			{
				title: "操作日志",
				path: "/base/SystemList/SetOperation",
			}
		]
	}
];

export default config;
