<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-25 22:05:58
 * @LastEditors: June
 * @LastEditTime: 2023-01-25 22:31:01
-->
<template>
    <div>2</div>
    <!-- <config-item :label="label">
        <div class="flex row-right" style="width: calc(100% - 24px)">
            <el-color-picker
                v-model="mValue"
                :predefine="predefineColors"
                v-bind="mOptions"
                show-alpha
            ></el-color-picker>
        </div>
    </config-item> -->
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import configColorPicker from './configColorPicker.vue';

const state = reactive({
    predefineColors: [
        '#ffffff',
        '#f5f5f5f5',
        '#F2F2F2',
        '#FF4444',
        '#FFCD00',
        '#3FBC87',
        '#5197FF',
        '#BADCFF',
        '#000000',
    ],
});
</script>
