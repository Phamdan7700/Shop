import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default axiosClient;
