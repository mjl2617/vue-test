import axios from "axios";
import {
	Message,
	MessageBox
} from "element-ui";
import store from "store";
// import { baseURL } from "@/config";
const baseURL = store.get("apiHost");
// const token = store.get("token") || '';
const api = axios.create({
	timeout: 500000,
	baseURL: baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(opt) => {
		// opt.method = "POST";
		const USERINFO = store.get("USERINFO") || "";
		if (!USERINFO) {
			window.location.href = "/#/base/login"
		}
		opt.headers = {
			Authorization: USERINFO || "",
		};
		return opt;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		// debugger
		if (response.data.errorCode === 0) {
			return response.data;
		} else {
			Message({
				// showClose: true,
				message: response.data.errorMessage,
				type: "error",
			});
		}
		return Promise.reject(response.data.errorMessage);
	},
	(error) => {

		if (error.response.status == 401) {
			MessageBox({
				title: '系统提示',
				message: "登录失效，是否重新登录?",
				type: "error",
				showCancelButton: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				showClose: true,
				callback: function(action, instance) {
					if (action === 'confirm') {
						window.location.href = "/#/base/login"
					} else {}
				}

			});
		}


		return Promise.reject(error);
	}
);

export const request = api;
