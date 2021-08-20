/**
 * axios解决跨域问题
 * @Author: zhangzf
 * @Date: 2019-08-01
 */
import axios from "axios";
import store from "@/store";
import Cookies from "js-cookie";

const TokenKey = "Authorization";

// console.log("/weatherserver")
const service = axios.create({
	baseURL: "http://114.112.161.155:8090",//
	timeout: 5000 // request timeout
});

service.interceptors.request.use(
	config => {
		// Do something before request is sent
		// 让每个请求携带authorization-- ['authorization']为自定义key 请根据实际情况自行修改
		config.headers["authorization"] = Cookies.get("Authorization");
		config.headers["X-Requested-With"] = "XMLHttpRequest";
		return config;
	},
	error => {
		// Do something with request error
		console.log(error); // for debug
		Promise.reject(error);
	}
);

service.interceptors.response.use(
	response => {
		return response;
	}, error => {
		if (error.response.status == '403') {//获取用户信息异常，
			if (error.response.headers.contextpath) {
				Cookies.remove("Authorization");
				window.location.href = error.response.headers.contextpath;
			}
		}
		return Promise.reject(error);
	}
)

export default service;
