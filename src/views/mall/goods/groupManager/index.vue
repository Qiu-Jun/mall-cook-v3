<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 14:28:33
 * @LastEditors: June
 * @LastEditTime: 2023-01-23 18:46:18
-->
<template>
    <div class="m20 p20 bg-white">
        <div class="mt10 mb20">
            <span class="mr20 f14">商品分组</span>
            <span class="f12 f-grey">拖拽可调整分组顺序，保存生效</span>
        </div>

        <div class="p10 bg-grey">
            <!-- 按钮栏 -->
            <div class="flex row-between p15 r8 bg-white">
                <div>
                    <el-button class="mr10" size="small" @click="allUnFold"
                        >展开全部</el-button
                    >
                    <el-button size="small" @click="allFold"
                        >折叠全部</el-button
                    >
                </div>
                <el-button size="small" @click="addGroup"
                    >新增一级分组</el-button
                >
            </div>

            <!-- 分组拖拽列表 -->
            <draggable :list="project.config.goodsGroups" item-key="type">
                <template #item="{ element }">
                    <div class="group mt10 p10 bg-white">
                        <!-- 分组头部 -->
                        <div class="group-head flex row-between col-center p15">
                            <div>
                                <i
                                    v-if="!element.fold"
                                    class="el-icon-arrow-right f14 mr10 pointer"
                                    @click="fold(element)"
                                ></i>
                                <i
                                    v-else
                                    class="el-icon-arrow-down f14 mr10 pointer"
                                    @click="fold(element)"
                                ></i>
                                <span class="f12">{{ element.name }}</span>
                            </div>
                            <div class="f-theme f12">
                                <span class="mr10 pointer" @click="addType"
                                    >新增二级分组</span
                                >
                                <span
                                    class="mr10 pointer"
                                    @click="editGroup(element)"
                                    >编辑</span
                                >
                                <span
                                    class="mr10 pointer"
                                    @click="delGroup(element.type)"
                                    >删除</span
                                >
                            </div>
                        </div>

                        <!-- 分组内容 -->
                        <ul
                            v-if="element.child.length && element.fold"
                            class="group-body"
                        >
                            <li
                                v-for="item in element.child"
                                :key="item.type"
                                class="group-body-item"
                            >
                                <div class="flex-center">
                                    <img
                                        class="w35 h35 mr15"
                                        :src="item.image"
                                    />
                                    <span>{{ item.name }}</span>
                                </div>
                                <div class="f-theme f12">
                                    <span
                                        class="mr10 pointer"
                                        @click="editType(item)"
                                        >编辑</span
                                    >
                                    <span class="pointer" @click="delType(item)"
                                        >删除</span
                                    >
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
            </draggable>
        </div>

        <!-- <edit ref="edit"></edit> -->
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useProject from '@/store/modules/project';
import { debounce } from 'lodash-es';
import { futimes } from 'fs';
const projectStore = useProject();
const project = computed(() => projectStore.project);

const allUnFold = debounce(function (item: any) {
    console.log('ss');
}, 300);

const allFold = debounce(function (item: any) {
    console.log('ss');
}, 300);

const fold = debounce(function (item: any) {
    console.log('ss');
}, 300);

const addType = debounce(function (item: any) {
    console.log('ss');
}, 300);

const delGroup = debounce(function (item: any) {
    console.log(item);
}, 300);

const editGroup = debounce(function (item: any) {
    console.log('ss');
}, 300);

const addGroup = debounce(function (item: any) {
    console.log('ss');
}, 300);

const editType = debounce(function (item: any) {
    console.log('ss');
}, 300);

const delType = debounce(function (item: any) {
    console.log('ss');
}, 300);
</script>

<style lang="scss" scoped>
.group {
    .group-head {
        border: 1px solid #e3e2e5;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .group-body {
        padding: 5px 15px 5px 50px;
        border-left: 1px solid #e3e2e5;
        border-right: 1px solid #e3e2e5;
        border-bottom: 1px solid #e3e2e5;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        font-size: 13px;

        .group-body-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 10px 10px 0;
            border-bottom: 1px solid #e3e2e5;

            &:last-child {
                border: 0;
            }
        }
    }
}
</style>
