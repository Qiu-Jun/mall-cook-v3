<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 12:19:28
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 20:13:39
-->
<template>
    <sideBar :groups="groups"></sideBar>
</template>

<script lang="ts" setup>
import sideBar from '@/components/sideBar/index.vue';

const groups: any[any] = [
    {
        label: '个性装修',
        list: [
            {
                name: '商城导航',
                path: '/mall/store/navigationTpl',
            },
        ],
    },
    {
        label: '系统页面',
        list: [
            {
                name: '列表模板',
                path: '/mall/store/listTpl',
            },
            {
                name: '分类模板',
                path: '/mall/store/categoryTpl',
            },
            {
                name: '搜索页',
                path: '/mall/store/searchTpl',
            },
        ],
    },
];
</script>
