/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 13:21:40
 * @LastEditors: June
 * @LastEditTime: 2023-01-18 16:11:58
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getAuthToken } from '@/utils/auth';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            keepAlive: true,
            requireAuth: false,
        },
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true,
        },
        component: () => import('@/views/home/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 全局路由守卫鉴权
router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
        next();
    } else {
        const token = getAuthToken();
        if (!token) {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;
