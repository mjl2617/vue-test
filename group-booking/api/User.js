import {
	request
} from "@/common/index.js";
// 用户列表
export const GetUserList = async (datas) => {
	const data = await request({
		url: "/base/Admin/Base_GetUserList",
		method: "post",
		data: datas || {}
	});
	return data;
};

// export const GetProjectInviteRecordInfo = async (datas) => {
// 	const data = await request({
// 		url: "/Admin/GetProjectInviteRecordInfo",
// 		method: "post",
// 		params: datas || {}
// 	});
// 	return data;
// };






