<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-18 17:26:19
 * @LastEditors: June
 * @LastEditTime: 2023-01-20 13:05:15
-->
<template>
    <img
        src="https://i.niupic.com/images/2022/11/02/aaa1.png"
        @click="handleToGit"
    />
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es';

const handleToGit = debounce(function () {
    window.open('https://github.com/QJune/mall-cook-v3', '_blank');
}, 300);
</script>

<style lang="scss" scoped>
img {
    width: 30px;
    margin-right: 15px;
    cursor: pointer;
}
</style>
