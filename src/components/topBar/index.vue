<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-19 22:40:27
 * @LastEditors: June
 * @LastEditTime: 2023-01-19 22:45:52
-->
<template>
    <div class="topBar">
        <!-- 左侧内容 -->
        <span class="f14 pointer" @click="handleBack">切换商城</span>

        <!-- 右侧内容 -->
        <div>
            <git-control />
            <el-button size="small" @click="toSchema">schema 生成器</el-button>

            <el-button size="small ml10" @click="viewQr">商城二维码</el-button>

            <el-button size="small ml10" @click="show = true"
                >实时预览</el-button
            >

            <el-button size="small f-white bg-theme" @click="handleSave"
                >保存</el-button
            >

            <el-button size="small ml10" @click="onLogout">退出</el-button>
        </div>
    </div>

    <!-- <real-timeView v-model:show="show"></real-timeView>

    <save-dialog ref="save"></save-dialog>

    <qr-dialog ref="qr"></qr-dialog> -->
</template>

<script setup>
import { debounce } from 'lodash-es';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleBack = debounce(function () {
    router.push({
        path: '/home',
    });
}, 300);

const handleSave = debounce(function () {
    console.log('1');
}, 300);
</script>

<style lang="scss" scoped>
.topBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    width: 100%;
    padding: 0 20px;
    background: #fff;
    border-bottom: 1px solid #ebedf0;
}
</style>
