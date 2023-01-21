<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-19 22:26:19
 * @LastEditors: June
 * @LastEditTime: 2023-01-21 22:12:47
-->
<template>
    <div class="body">
        <div class="content">
            <el-button size="small" @click="addPage">新建页面</el-button>

            <!-- 头部 -->
            <div class="content-head">
                <img
                    class="w45 h45 mr10 radius"
                    src="https://img.yzcdn.cn/public_files/2016/05/13/8f9c442de8666f82abaf7dd71574e997.png!small.webp"
                    alt=""
                />
                <div class="flex-column">
                    <div class="flex col-center mb10">
                        <span class="mr8 f15 f-bold">{{ homePage.name }}</span>
                        <div class="p4 r3 bg-theme f13 f-white">首页</div>
                    </div>
                    <span
                        class="f14 f-theme pointer"
                        @click="editPage(homePage)"
                        >编辑</span
                    >
                </div>
            </div>

            <!-- 表格 -->
            <div class="mt30">
                <el-table
                    :data="project.pages"
                    style="width: 100%"
                    :header-cell-style="{
                        background: '#f7f8fa',
                        color: '#323233',
                        fontWeight: 500,
                    }"
                >
                    <el-table-column prop="name" label="标题">
                        <template #default="scope">
                            <img
                                v-show="scope.row.home"
                                class="h16 w16 mr5"
                                src="https://b.yzcdn.cn/channel-icon/h5-mobile.png"
                                alt=""
                            />
                            <input v-model="scope.row.name" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="状态">
                        <span>已创建</span>
                    </el-table-column>
                    <el-table-column prop="remote" label="备注">
                        <template #default="scope">
                            <input v-model="scope.row.remote" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <span
                                class="mr5 f-theme pointer"
                                @click="editPage(scope.row.id)"
                                >编辑</span
                            >
                            <span
                                class="ml5 mr5 f-theme pointer"
                                @click="setHomePage(scope.row)"
                                >设为主页</span
                            >
                            <span
                                class="ml5 mr5 f-theme pointer"
                                @click="copyPage(scope.row)"
                                >复制</span
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { debounce, cloneDeep } from 'lodash-es';
import { useRouter } from 'vue-router';
import useProject from '@/store/modules/project';
import { getRandomCode } from '@/utils/global';

const projectStore = useProject();
const project = computed(() => projectStore.project);
const homePage = computed(() =>
    project.value?.pages.find((page: any) => page.home),
);

const router = useRouter();

const addPage = debounce(function () {
    const page = {
        id: getRandomCode(4),
        name: '新增页面',
        componentList: [],
        home: false,
    };
    projectStore.project.pages.push(page);
}, 300);

const editPage = debounce(function (id: string) {
    console.log('编辑页面');
    console.log(projectStore.project.pages);
    // console.log(JSON.stringify(data));
    console.log(id);

    const page = projectStore.project.pages.find((page: any) => page.id === id);
    console.log(page);
    projectStore.setCurPage(page);
    router.push({ name: 'PageBuild' });
}, 300);

// 设置主页
const setHomePage = debounce(function (data: any) {
    projectStore.project.pages.forEach((page: any) => (page.home = false));
    data.home = true;
}, 300);

// 复制页面
const copyPage = debounce(function (data: any) {
    const page = cloneDeep(data);
    page.id = getRandomCode(4);
    page.home = false;
    projectStore.project.pages.push(page);
}, 300);
</script>

<style lang="scss" scoped>
input {
    border: 0;
    font-size: 13px; /*no*/
}

.body {
    padding: 15px; /*no*/

    .content {
        width: 100%; /*no*/
        height: 700px; /*no*/
        padding: 40px 20px; /*no*/
        background: #fff;

        .content-head {
            display: flex;
            align-items: flex-start;
            padding: 20px 30px; /*no*/
            margin-top: 15px;
            background: #f7f8fa;
        }
    }
}
</style>
