<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 14:38:04
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 22:05:16
-->
<template>
    <div class="listTpl m20 p20 bg-white">
        <div class="mb20 f14 f-bold" style="color: #595961">列表设置</div>
        <div class="p10 r10" style="background: #f2f2f6">
            <div class="listTpl-body">
                <!-- 展示图 -->
                <img class="listTpl-body-left" :src="getImage()" />

                <!-- 配置项 -->
                <div class="listTpl-body-right">
                    <el-form label-width="80px">
                        <el-form-item label="默认样式">
                            <el-radio v-model="listTpl.model" label="one"
                                >单列</el-radio
                            >
                            <el-radio v-model="listTpl.model" label="two"
                                >双列</el-radio
                            >
                        </el-form-item>
                        <el-form-item label="购物车">
                            <el-radio v-model="listTpl.addIcon" label="cart"
                                >样式一</el-radio
                            >
                            <el-radio v-model="listTpl.addIcon" label="add"
                                >样式二</el-radio
                            >
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useProject from '@/store/modules/project';

const projectStore = useProject();
const listTpl = computed(() => projectStore.project.config.listTpl);

const getImage = () => {
    const imgUrl = `pc-list-${listTpl.value.model}-${listTpl.value.addIcon}.jpg`;
    return new URL(`../../../assets/image/${imgUrl}`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.listTpl {
    .listTpl-body {
        display: flex;
        padding: 10px 30px;

        .listTpl-body-left {
            width: 375px;
            margin-right: 30px;
        }

        .listTpl-body-right {
            padding-top: 10px;
        }
    }
}
</style>
