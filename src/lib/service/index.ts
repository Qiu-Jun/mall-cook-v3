/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 13:31:07
 * @LastEditors: June
 * @LastEditTime: 2023-01-19 18:25:17
 */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import store from '@/store';

const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    withCredentials: true,
    timeout: 5000,
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.headers = {
            Authorization: store.state.value.user.token,
            'Content-Type': 'application/json',
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

service.interceptors.response.use(
    (response) => {
        const { status, data: resData } = response;
        if (status !== 200) return Promise.reject(new Error('请求失败'));
        return new Promise((resolve, reject) => {
            resolve(resData);
        });
    },
    (error: any) => {
        ElMessage.error(error);
        return Promise.reject(error);
    },
);

export default service;
