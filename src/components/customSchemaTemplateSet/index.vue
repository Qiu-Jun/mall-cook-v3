<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-18 23:57:11
 * @LastEditors: June
 * @LastEditTime: 2023-01-29 22:40:59
-->
<template>
    <div class="schema">
        <ul class="schema-head">
            <li>schema 生成器</li>
            <li>
                <el-button size="small" @click="resetSchema"
                    >重置 schema</el-button
                >
                <el-button
                    size="small"
                    class="f-white bg-theme"
                    @click="exportSchema"
                    >导出 schema</el-button
                >
            </li>
        </ul>
        <div class="schema-body">
            <schema-content></schema-content>
        </div>

        <schema-export ref="exportRef"></schema-export>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, provide } from 'vue';
import schemaContent from './components/schemaContent.vue';
import schemaExport from './components/schemaExport.vue';
import { debounce } from 'lodash-es';

const state = reactive({
    model: {
        label: '新增组件',
        icon: 'icon-zujian',
        componentList: [],
    },
    curComponent: null,
});

const exportRef = ref<any>(null);

provide('content', state);

const exportSchema = debounce(function () {
    exportRef.value?.open();
}, 300);

const resetSchema = debounce(function () {
    state.model = {
        label: '新增组件',
        icon: 'icon-zujian',
        componentList: [],
    };
    state.curComponent = null;
}, 300);
</script>

<style lang="scss" scoped>
.schema {
    .schema-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        width: 100%;
        padding: 0 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        font-size: 16px;
    }

    .schema-body {
        height: calc(100vh - 56px); /*no*/
    }
}
</style>
