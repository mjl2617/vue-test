export default [{
		path: "/base",
		component: () => import("../pages/index.vue"),
	},
	// 登录
	{
		path: "/base/login",
		component: () => import("../pages/login.vue"),
	},
	// 艺趣 登录
	{
		path: "/base/yqLogin",
		component: () => import("../pages/yqLogin.vue"),
	},
	// 公告列表
	{
		path: "/base/Notice/List",
		component: () => import("../pages/Notice/List.vue"),
	},
	// 公告详情
	{
		path: "/base/Notice/Detail",
		component: () => import("../pages/Notice/Detail.vue"),
	},
	// 用户反馈
	{
		path: "/base/UserAdvise",
		component: () => import("../pages/UserAdvise.vue"),
	},
	// 管理员账号管理
	{
		path: "/base/SystemList/SetAdmin",
		component: () => import("../pages/SystemList/SetAdmin.vue"),
	},
	// 角色管理
	{
		path: "/base/SystemList/SetUser",
		component: () => import("../pages/SystemList/SetUser.vue"),
	},
	// 操作日志
	{
		path: "/base/SystemList/SetOperation",
		component: () => import("../pages/SystemList/SetOperation.vue"),
	},
];
