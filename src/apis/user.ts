/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 15:50:22
 * @LastEditors: June
 * @LastEditTime: 2023-01-18 14:45:09
 */
import service from '@/lib/service';

/**
 * @desc 登录
 * @param loginForm
 */
export function userLogin(loginForm: { username: string; password: string }) {
    return service({
        url: '/login',
        method: 'post',
        data: loginForm,
    });
}

/**
 * @desc 注册
 * @param registerForm
 */
export function userRegister(registerForm: {
    username: string;
    password: string;
    userName: string;
}) {
    return service({
        url: '/register',
        method: 'post',
        data: registerForm,
    });
}
