import API from "Helper/api";
import axiosClient from "./AxiosClient";

export default function getCsrfCookies() {
    return axiosClient.get( "http://127.0.0.1:8000/sanctum/csrf-cookie");
}
