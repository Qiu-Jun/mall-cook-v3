<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-25 22:06:47
 * @LastEditors: June
 * @LastEditTime: 2023-01-25 22:49:27
-->
<template>
    <div class="flex row-right" style="width: calc(100% - 24px)">
        <el-color-picker
            v-model="state.mValue"
            :predefine="state.predefineColors"
            show-alpha
        ></el-color-picker>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch, watchEffect } from 'vue';

const props = defineProps({
    value: {
        type: String,
        default: '',
    },
});
const emits = defineEmits(['input', 'change']);

const state = reactive({
    mValue: '',
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

watchEffect(() => {
    state.mValue = props.value;
});

watch(
    () => state.mValue,
    (newVal) => {
        emits('input', newVal);
        emits('change', newVal);
    },
);
</script>
