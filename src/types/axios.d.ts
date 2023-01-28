/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 13:40:21
 * @LastEditors: June
 * @LastEditTime: 2023-01-28 19:56:31
 */
import * as axios from 'axios';

declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>;
    }
}
