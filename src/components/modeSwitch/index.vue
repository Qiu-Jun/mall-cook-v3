<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-28 16:02:59
 * @LastEditors: June
 * @LastEditTime: 2023-01-28 16:08:06
-->
<template>
    <div class="wrap">
        <div class="wrap-label">{{ mValue ? trueLabel : falseLabel }}</div>
        <el-checkbox v-model="mValue"></el-checkbox>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
    value: {
        type: Boolean,
        default: false,
    },
    trueLabel: {
        type: String,
        default: '显示',
    },
    falseLabel: {
        type: String,
        default: '不显示',
    },
});

const emits = defineEmits(['input']);

const mValue = ref(false);

watch(
    () => props.value,
    (newVal) => {
        mValue.value = newVal;
    },
);
watch(
    () => mValue,
    (newVal) => {
        emits('input', newVal);
    },
);
</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 25px; /*no*/

    .wrap-label {
        font-size: 14px; /*no*/
        line-height: 32px; /*no*/
    }
}
</style>
