import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // request interceptor
        axiosSecure.interceptors.request.use(config => {
            const token = `Bearer ${localStorage.getItem("access-token")}`;
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        })

        // response interceptor
        axiosSecure.interceptors.response.use(response => response, async (error) => {
            if (error.response && error.response.status === 401 && error.response.status === 403) {
                await logOut();
                navigate("/login");
            }
        })
    }, [logOut, navigate]);
    return [axiosSecure];
};

export default useAxiosSecure;