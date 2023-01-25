<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-23 18:48:56
 * @LastEditors: June
 * @LastEditTime: 2023-01-25 22:00:22
-->
<template>
    <div class="control">
        <control-widgets />

        <control-panel />

        <control-config />
    </div>
</template>

<script lang="ts" setup>
import { reactive, computed, provide } from 'vue';
import controlWidgets from './controlWidgets.vue';
import controlPanel from './controlPanel.vue';
import controlConfig from './controlConfig.vue';
import useProject from '@/store/modules/project';

const projectStore = useProject();
const curPage = computed(() => projectStore.curPage);
const controlState = reactive({
    dragstatus: false,
    curWidget: null,
    dragWidget: null,
});
provide('controlState', controlState);
</script>

<style lang="scss">
.control {
    position: relative;
    height: calc(100% - 56px); /*no*/
    overflow: hidden;
}
</style>
