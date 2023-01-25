<!--
 * @Author: June
 * @Description: 面板
 * @Date: 2023-01-23 18:49:53
 * @LastEditors: June
 * @LastEditTime: 2023-01-25 23:07:23
-->
<template>
    <div class="panel">
        <phone-ctn>
            <div class="page"></div>
            <!-- 页面设置 -->
            <el-tooltip effect="light" content="页面设置" placement="bottom">
                <div
                    class="panel-set flex-center"
                    @click="control.curWidget = undefined"
                >
                    <i class="el-icon-setting"></i>
                </div>
            </el-tooltip>
        </phone-ctn>
    </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

const control: any = inject('controlState');
</script>

<style lang="scss" scoped>
.panel {
    position: absolute;
    left: 176px; /*no*/
    right: 360px; /*no*/
    height: calc(100% - 56px); /*no*/
    overflow: auto;

    &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

    .panel-set {
        position: absolute;
        top: 10px;
        left: -70px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        cursor: pointer;

        i {
            font-size: 22px;
            color: #b0afb2;
        }
    }

    .page {
        position: relative;
        font-size: 0;

        .page-iframe {
            position: relative;
            width: 100%;
            z-index: 10;
        }

        .page-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 667px;
            // background: cornflowerblue;

            .page-layer-widget {
                width: 100%;
                z-index: 99999;
            }
        }
    }
}
</style>
