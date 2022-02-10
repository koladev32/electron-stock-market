import axios from "axios";
import { API_URL } from "./api";

const axiosService = axios.create({
    baseURL: API_URL
});

export function fetcher(url, params) {
    return axiosService.get(`${url}${params}&function=TIME_SERIES_DAILY&outputsize=compact&apikey=9PRDFA9QWXCAP88V`).then((res) => res.data);
}

export default axiosService;