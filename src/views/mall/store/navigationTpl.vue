<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 14:37:25
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 20:17:15
-->
<template>
    <div class="wrap">
        <!-- 导航展示 -->
        <div style="padding-right: 360px">
            <phone-ctn>
                <div class="edit">
                    <nav-bar
                        v-bind="project.config.navigation"
                        :disabled="true"
                    ></nav-bar>
                </div>
            </phone-ctn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useProject from '@/store/modules/project';
import navBar from '@/components/navBar/index.vue';

const projectStore = useProject();
const project = computed(() => projectStore.project);
</script>

<style lang="scss" scoped>
.edit {
    display: flex;
    align-items: flex-end;
    width: 100%;
    min-height: 603px /*no*/;
    background: #f7f8fa;
}
</style>
