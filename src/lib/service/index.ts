/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 13:31:07
 * @LastEditors: June
 * @LastEditTime: 2023-01-18 15:28:28
 */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import store from '@/store';
import { get } from 'lodash-es';

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
        console.log(`err${error}`); // for debug
        const status = get(error, 'response.status');
        switch (status) {
            case 400:
                error.message = '请求错误';
                break;
            case 401:
                error.message = '未授权，请登录';
                break;
            case 403:
                // token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
                location.reload();
                break;
            case 404:
                error.message = '请求地址出错';
                break;
            case 408:
                error.message = '请求超时';
                break;
            case 500:
                error.message = '服务器内部错误';
                break;
            case 501:
                error.message = '服务未实现';
                break;
            case 502:
                error.message = '网关错误';
                break;
            case 503:
                error.message = '服务不可用';
                break;
            case 504:
                error.message = '网关超时';
                break;
            case 505:
                error.message = 'HTTP版本不受支持';
                break;
            default:
                break;
        }
        ElMessage.error(error.message);
        return Promise.reject(error);
    },
);

export default service;
