<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 12:18:18
 * @LastEditors: June
 * @LastEditTime: 2023-01-23 18:34:23
-->
<template>
    <sideBar :groups="groups"></sideBar>
</template>

<script lang="ts" setup>
import sideBar from '@/components/sideBar/index.vue';

const groups: any[any] = [
    {
        label: '模拟商品',
        list: [
            {
                name: '全部商品',
                path: '/mall/goods/goodsManager',
            },
            {
                name: '全部分类',
                path: '/mall/goods/groupManager',
            },
        ],
    },
];
</script>
