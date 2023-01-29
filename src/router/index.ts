/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 13:21:40
 * @LastEditors: June
 * @LastEditTime: 2023-01-29 19:58:58
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
        path: '/schema',
        name: 'Schema',
        component: () => import('@/views/schema/index.vue'),
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
            {
                path: 'pageBuild',
                name: 'PageBuild',
                component: () => import('@/views/mall/pageBuild.vue'),
            },
            {
                path: 'goods',
                name: 'Goods',
                component: () => import('@/views/mall/goods/index.vue'),
                redirect: '/mall/goods/goodsManager',
                children: [
                    {
                        path: 'goodsManager',
                        name: 'GoodsManager',
                        component: () =>
                            import('@/views/mall/goods/goodsManager/index.vue'),
                    },
                    {
                        path: 'goodsEdit',
                        name: 'GoodsEdit',
                        component: () =>
                            import(
                                '@/views/mall/goods/goodsManager/editGoods.vue'
                            ),
                    },
                    {
                        path: 'groupManager',
                        name: 'GroupManager',
                        component: () =>
                            import('@/views/mall/goods/groupManager/index.vue'),
                    },
                ],
            },

            {
                path: 'store',
                name: 'store',
                component: () => import('@/views/mall/store/index.vue'),
                redirect: '/mall/store/navigationTpl',
                children: [
                    {
                        path: 'navigationTpl',
                        name: 'NavigationTpl',
                        component: () =>
                            import('@/views/mall/store/navigationTpl.vue'),
                    },
                    {
                        path: 'searchTpl',
                        name: 'SearchTpl',
                        component: () =>
                            import('@/views/mall/store/searchTpl.vue'),
                    },
                    {
                        path: 'categoryTpl',
                        name: 'CategoryTpl',
                        component: () =>
                            import('@/views/mall/store/categoryTpl.vue'),
                    },
                    {
                        path: 'listTpl',
                        name: 'ListTpl',
                        component: () =>
                            import('@/views/mall/store/listTpl.vue'),
                    },
                ],
            },

            {
                path: 'modelManage',
                name: 'ModelManage',
                component: () => import('@/views/mall/modelManage.vue'),
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
