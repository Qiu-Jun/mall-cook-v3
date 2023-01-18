/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 13:20:38
 * @LastEditors: June
 * @LastEditTime: 2023-01-18 15:18:45
 */
import { defineStore } from 'pinia';
import { userLogin, userRegister } from '@/apis/user';
import { ElMessage, ElNotification } from 'element-plus';
import router from '@/router';
import {
    setAuthToken,
    getAuthToken,
    setAuthUserInfo,
    getAuthUserInfo,
} from '@/utils/auth';

const useUser = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            token: getAuthToken(),
            userInfo: getAuthUserInfo(),
        };
    },
    actions: {
        async doLogin(loginForm: { username: string; password: string }) {
            const { status, message, userInfo, token } = await userLogin(
                loginForm,
            );
            if (status === '10000') {
                ElNotification({
                    title: '登陆成功',
                    message: '快去体验可视化给构建商城吧！',
                    type: 'success',
                });
                this.userInfo = userInfo;
                this.token = token;
                setAuthToken(token);
                setAuthUserInfo(userInfo);
                router.push({
                    path: '/',
                });
            } else {
                return ElMessage.error(message);
            }
        },
        async doRegister(
            registerForm: {
                username: string;
                password: string;
                userName: string;
            },
            cb: any,
        ) {
            const { status, message } = await userRegister(registerForm);
            if (status === '10000') {
                ElNotification({
                    title: '注册成功',
                    message: '账户已注册成功，快去登录使用吧',
                    type: 'success',
                });
                cb && typeof cb === 'function' && cb();
            } else {
                return ElMessage.error(message);
            }
        },
    },
});

export default useUser;
