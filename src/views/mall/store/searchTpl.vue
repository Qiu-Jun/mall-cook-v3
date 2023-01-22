<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 14:38:27
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 22:56:41
-->
<template>
    <div class="wrap">
        <!-- 搜索展示 -->
        <div style="padding-right: 360px">
            <phone-ctn>
                <search-bar></search-bar>
            </phone-ctn>
        </div>

        <!-- 搜索配置 -->
        <config-ctn title="搜索页设置">
            <config-wrap>
                <div class="mb15 f13">搜索热词</div>
                <div class="nav">
                    <div class="mt10 mb15 f12 f-grey">
                        最多配置 5 个精选热词
                    </div>
                    <draggable :list="project.config.hotList" item-key="value">
                        <template #item="{ element, index }">
                            <div class="nav-item">
                                <div
                                    class="nav-delete"
                                    @click="
                                        project.config.hotList.splice(index, 1)
                                    "
                                >
                                    <i class="f12 icon icon-cha-"></i>
                                </div>
                                <el-input
                                    v-model="element.value"
                                    size="small"
                                ></el-input>
                            </div>
                        </template>
                    </draggable>
                    <div
                        v-if="project.config.hotList.length < 5"
                        class="nav-add"
                        @click="handleAdd"
                    >
                        新增
                    </div>
                </div>
            </config-wrap>
        </config-ctn>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import searchBar from '@/components/searchBar/index.vue';
import useProject from '@/store/modules/project';
import { debounce } from 'lodash-es';

const projectStore = useProject();
const project = computed(() => projectStore.project);

const handleAdd = debounce(function () {
    project.value.config.hotList.push({ value: '' });
}, 300);
</script>

<style lang="scss" scoped>
.nav-item {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
