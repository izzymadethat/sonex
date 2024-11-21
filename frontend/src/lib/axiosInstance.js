/* 
This file is used to handle generating and retrieving CSRF token for the application. The csrfFetch function fetches as normal, except it also adds the CSRF token to the headers of the request.

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
