<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-29 18:19:52
 * @LastEditors: June
 * @LastEditTime: 2023-01-31 16:17:20
-->
<template>
    <el-dialog v-model="state.show" title="导出" width="40%">
        <div>
            <template v-if="state.isComplete">
                <h3 class="mb20 f13 f-grey">
                    组件配置项schema，放在组件包下 schema.json
                    配置文件中，若不满足可手动修改
                </h3>
                <json-viewer
                    v-model="state.config"
                    :expand-depth="6"
                    :copyable="{
                        copyText: '复制JSON',
                        copiedText: '已复制',
                        timeout: 1000,
                    }"
                    boxed
                ></json-viewer>
            </template>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, inject, watch } from 'vue';
import jsonViewer from 'vue-json-viewer';
import 'vue-json-viewer/style.css';

const state = reactive<any>({
    show: false,
    isComplete: false,
    config: {},
    initializing: {},
});

const content: any = inject('content');

watch(
    () => state.show,
    (newVal) => {
        if (!newVal) {
            state.config = {};
            state.isComplete = false;
        }
    },
);

const initFields = (config: any, fields: any) => {
    let { property, label, type, child, value, data, options } = config;
    let target: any = (fields[property] = ['object', 'array'].includes(type)
        ? { label, type }
        : { label, type, value });

    data && (target.data = data);
    options && (target.options = options);

    if (child) {
        target.child = {};
        child.map((c: any) => initFields(c, target.child));
    }
};

const init = () => {
    state.config = {
        label: content.model.label,
        icon: content.model.icon,
        fields: {},
    };
    state.content.model.componentList.map((cmp: any) => {
        initFields(cmp, state.config.fields);
    });
    state.isComplete = true;
};

const open = () => {
    state.show = true;
    init();
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
:deep(.jv-button) {
    margin-top: 10px;
    color: $color-theme !important;
}

textarea {
    display: inline-block;
    width: 100%;
    height: 500px;
    margin: 0 auto;
    padding: 20px;
    border: solid 1px #c0c0c0;
}
</style>
