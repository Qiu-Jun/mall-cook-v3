<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-22 17:49:32
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 17:50:52
-->
<template>
    <div class="wrap">
        <div v-show="props.title" class="wrap-title">
            <span>{{ props.title }}</span>
        </div>

        <div class="wrap-body">
            <slot></slot>

            <div v-show="props.line" class="wrap-line"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    line: {
        type: Boolean,
        default: false,
    },
});
</script>

<style lang="scss" scoped>
.wrap {
    .wrap-title {
        padding: 10px 12px; /*no*/
        background: #e8f0fb40;
        font-size: 14px; /*no*/
        color: #323233;

        span {
            &::before {
                content: '.';
                width: 3px; /*no*/
                height: 10px; /*no*/
                margin-right: 8px; /*no*/
                background: $color-theme;
            }
        }
    }

    .wrap-body {
        padding: 20px 20px 10px 20px; /*no*/

        .wrap-line {
            margin-top: 30px;
            height: 1px;
            background: #ebedf0;
        }
    }
}
</style>
