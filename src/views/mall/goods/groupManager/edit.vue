<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-27 22:07:11
 * @LastEditors: June
 * @LastEditTime: 2023-01-27 22:16:34
-->
<template>
    <div>edit</div>
</template>

<script lang="ts" setup>
const open = (level: number, data: any) => {
    console.log(level, data);
};

defineExpose({ open });
</script>
