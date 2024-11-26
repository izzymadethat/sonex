/* 
This file is used to create an axios instance with the baseURL set to /api. This way, we can use the axios instance to make requests to the backend without having to specify the baseURL in each request.

All state actions will be fetched using this file.
*/
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		// Set Content-Type header for non-GET requests
		if (config.method && config.method.toUpperCase() !== 'GET') {
			config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";
			config.headers["XSRF-Token"] = Cookies.get('XSRF-TOKEN'); // Set CSRF token from cookie
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
