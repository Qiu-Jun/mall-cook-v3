<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-23 18:48:56
 * @LastEditors: June
 * @LastEditTime: 2023-01-23 18:51:45
-->
<template>
    <div class="control">
        <control-widgets />

        <control-panel />

        <control-config />
    </div>
</template>

<script lang="ts" setup>
import controlWidgets from './controlWidgets.vue';
import controlPanel from './controlPanel.vue';
import controlConfig from './controlConfig.vue';
</script>

<style lang="scss">
.control {
    position: relative;
    height: calc(100% - 56px); /*no*/
    overflow: hidden;
}
</style>
