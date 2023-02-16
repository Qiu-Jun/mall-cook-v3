<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-17 12:46:35
 * @LastEditors: June
 * @LastEditTime: 2023-02-16 14:35:15
-->
<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
const locale = zhCn;
</script>
