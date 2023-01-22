<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 14:37:46
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 22:28:43
-->
<template>
    <div class="categoryTpl m20 p20 bg-white">
        <div class="mb20 f14 f-bold" style="color: #595961">列表设置</div>
        <div class="p10 r10" style="background: #f2f2f6">
            <div class="categoryTpl-body">
                <!-- 展示图 -->
                <img class="categoryTpl-body-left" :src="getImage()" />

                <!-- 配置项 -->
                <div class="categoryTpl-body-right">
                    <el-form label-width="80px">
                        <el-form-item label="默认样式">
                            <el-radio
                                v-model="categoryTpl.advertising"
                                :label="true"
                                >开启</el-radio
                            >
                            <el-radio
                                v-model="categoryTpl.advertising"
                                :label="false"
                                >关闭</el-radio
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
const categoryTpl = computed(() => projectStore.project.config.categoryTpl);

const getImage = () => {
    const path = categoryTpl.value.advertising
        ? '../../../assets/image/pc-template-category-advert.jpg'
        : '../../../assets/image/pc-template-category-base.jpg';
    return new URL(path, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.categoryTpl {
    .categoryTpl-body {
        display: flex;
        padding: 10px 30px;

        .categoryTpl-body-left {
            width: 375px;
            margin-right: 30px;
        }

        .categoryTpl-body-right {
            padding-top: 10px;
        }
    }
}
</style>
