<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-22 17:48:53
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 17:53:11
-->
<template>
    <div class="decorate">
        <div class="decorate-head">
            {{ props.title }}
        </div>

        <div class="decorate-body">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
});
</script>

<style lang="scss" scoped>
.decorate {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 360px; /*no*/
    background: #fff;

    .decorate-head {
        height: 70px; /*no*/
        line-height: 70px; /*no*/
        padding-left: 12px; /*no*/
        border-bottom: 1px solid #f2f4f6;
        font-size: 18px;
        font-weight: 600;
        color: #323233;
        text-align: left;
    }

    .decorate-body {
        height: calc(100% - 70px); /*no */
        overflow: auto;
        padding-top: 20px;

        &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }
    }
}
</style>
