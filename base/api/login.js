import {
	request
} from "@/common/index.js";
// 后台管理员登录
export const AdminLogin = async (datas) => {
	const data = await request({
		url: "/base/Login/AdminLogin",
		method: "post",
		data: datas || {}
	});
	return data;
};
// 艺趣登录
export const yqAdminLogin = async (datas) => {
	const data = await request({
		url: "/basic/Account/AdminLogin",
		method: "post",
		data: datas || {}
	});
	return data;
};

export const LineChartStatistics = async (datas) => {
	const data = await request({
		url: "/AdminProject/LineChartStatistics",
		method: "post",
		data: datas || {}
	});
	return data;
};

export const GetProjectInviteRecordInfo = async (datas) => {
	const data = await request({
		url: "/Admin/GetProjectInviteRecordInfo",
		method: "post",
		params: datas || {}
	});
	return data;
};
