/* 
This file is used to create an axios instance with the baseURL set to /api. This way, we can use the axios instance to make requests to the backend without having to specify the baseURL in each request.

All state actions will be fetched using this file.
*/
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
