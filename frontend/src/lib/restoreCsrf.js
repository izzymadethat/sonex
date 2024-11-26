import axiosInstance from "./axiosInstance";

export const restoreCsrfToken = async () => {
    await axiosInstance("/csrf/restore")
    return
}