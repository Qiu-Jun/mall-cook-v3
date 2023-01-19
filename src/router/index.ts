/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 13:21:40
 * @LastEditors: June
 * @LastEditTime: 2023-01-19 22:46:36
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
import useUser from '@/store/modules/user';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/mall',
        name: 'Mall',
        component: () => import('@/views/mall/index.vue'),
        redirect: '/mall/pagesManage',
        children: [
            {
                path: 'pagesManage',
                name: 'PagesManage',
                component: () => import('@/views/mall/pagesManage.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 全局路由守卫鉴权
router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
        next();
    } else {
        const userStore = useUser(store);
        if (!userStore.token) {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;
