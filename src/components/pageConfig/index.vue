<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-25 22:01:18
 * @LastEditors: June
 * @LastEditTime: 2023-01-25 22:02:29
-->
<template>
    <div class="p10">
        <config-item label="背景色">
            <config-color-picker
                v-model="project.config.backgroundColor"
            ></config-color-picker>
        </config-item>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useProject from '@/store/modules/project';

const projectStore = useProject();
const project = computed(() => projectStore.project);
</script>
