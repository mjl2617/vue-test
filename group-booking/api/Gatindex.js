import {
	request
} from "@/common/index.js";
// 概览
export const GetIndex = async (datas) => {
	const data = await request({
		url: "/Admin/GetIndex",
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






