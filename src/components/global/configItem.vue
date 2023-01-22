<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-22 17:49:11
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 17:54:27
-->
<template>
    <div class="flex p10 bg-white">
        <div class="w70 f13 f-grey pt10">{{ props.label }}</div>
        <div class="flex-1">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
});
</script>
