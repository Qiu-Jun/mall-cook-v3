<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-29 18:29:51
 * @LastEditors: June
 * @LastEditTime: 2023-01-29 22:51:17
-->
<template>
    <div class="canvas">
        <!-- centet -->
        <div class="canvas-center">
            <div class="canvas-center-drag">
                <schema-content-item
                    :data="content.model.componentList"
                ></schema-content-item>

                <!-- 组件设置 -->
                <el-tooltip
                    effect="light"
                    content="组件设置"
                    placement="bottom"
                >
                    <div
                        class="canvas-center-drag-set flex-center"
                        @click="content.curComponent = null"
                    >
                        <i class="el-icon-setting"></i>
                    </div>
                </el-tooltip>
            </div>
        </div>

        <!-- left -->
        <div class="canvas-left">
            <draggable
                :list="cmpConfig"
                item-key="index"
                :group="{ name: 'itxst', pull: 'clone' }"
                :sort="false"
                :clone="handleClone"
                animation="300"
            >
                <template #item="{ element }">
                    <div class="canvas-left-item">
                        <span class="f13">{{ element.label }}</span>
                        <span class="canvas-left-item-type">{{
                            element.type
                        }}</span>
                    </div>
                </template>
            </draggable>
        </div>

        <!-- right -->
        <div class="canvas-right">
            <component
                :is="curComponentConfig"
                v-if="content.curComponent"
                v-bind="content.curComponent"
            ></component>
            <schema-component v-else></schema-component>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue';
import schemaContentItem from './schemaContentItem.vue';
import schemaContentShape from './schemaContentShape.vue';
import { cloneDeep } from 'lodash-es';
import { getRandomCode } from '@/utils/global';

const content: any = inject('content');
const cmpConfig: any = inject('cmpConfig');

const curComponentConfig = computed(
    () => `${content?.curComponent?.component}Config`,
);

const handleClone = (e: any) => {
    console.log('ssssssssss ');
    return {
        ...cloneDeep(e),
        id: getRandomCode(8),
        property: `${e.type}_${getRandomCode(2, false)}`,
    };
};
</script>

<style lang="scss" scoped>
.canvas {
    height: 100%; /*no*/
    padding-left: 200px; /*no*/
    padding-right: 300px; /*no*/
    background: #f7f8fa;
    border: solid 1px #e4e7ed;

    .canvas-left {
        float: left;
        width: 200px; /*no*/
        height: 100%; /*no*/
        margin-left: -100%; /*no*/
        padding: 0 10px;
        position: relative;
        left: -200px; /*no*/
        background: #fff;

        .canvas-left-item {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            width: 90px; /*no*/
            padding: 15px 0; /*no*/
            font-size: 12px; /*no*/
            color: #666;
            cursor: pointer;

            .canvas-left-item-type {
                margin-top: 10px;
                color: #c1c5d1;
            }

            i {
                font-size: 29px; /*no*/
                margin-top: 5px; /*no*/
                margin-bottom: 10px; /*no*/
            }

            &:hover {
                color: #fff !important;
                background: $color-theme;
                .canvas-left-item-type {
                    color: #fff;
                }
            }
        }
    }

    .canvas-center {
        position: relative;
        float: left;
        width: 100%; /*no*/
        height: 100%; /*no*/
        overflow: auto;

        // 隐藏滚动条
        &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }

        .canvas-center-drag {
            width: 360px; /*no*/
            background: #fff;
            margin: 20px auto; /*no*/
            box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1); /*no*/
            min-height: 600px; /*no*/

            .canvas-center-drag-set {
                position: absolute;
                top: 40px;
                left: 450px;
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
        }
    }

    .canvas-right {
        float: left;
        width: 300px; /*no*/
        height: 100%; /*no*/
        margin-left: -300px; /*no*/
        position: relative;
        left: 300px; /*no*/
        background: #fff;
    }
}

.ghost {
    position: relative;
    width: 100%;
    height: 40px; /*no*/

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('../../assets/image/ghost.jpg');
        z-index: 10000;
    }

    &::after {
        content: '组件放置区域';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 140px;
        height: 30px;
        line-height: 30px;
        background: #5487df;
        font-size: 12px /*no*/;
        color: #fff;
        text-align: center;
        pointer-events: none;
        z-index: 100001;
    }
}

.selector {
    display: none;
}

.event-none {
    // pointer-events: none;
    padding: 0 20px;
}
</style>
