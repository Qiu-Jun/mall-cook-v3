<!--
 * @Author: June
 * @Description: 物料列表
 * @Date: 2023-01-23 18:50:14
 * @LastEditors: June
 * @LastEditTime: 2023-01-25 23:08:29
-->
<template>
    <div class="panel">
        <phone-ctn>
            <div class="page">
                <!-- <iframe
                    v-if="initIframe"
                    ref="iframe"
                    class="page-iframe"
                    frameborder="no"
                    :style="{
                        height: iframeHeight + 'px',
                        pointerEvents: control.dragstatus ? 'none' : 'auto',
                    }"
                    :src="iframeUrl"
                    @load="init"
                ></iframe> -->

                <!-- 拖拽与iframe交互蒙层 -->
                <!--  zIndex: control.dragstatus ? '20' : '1', -->
                <div
                    class="page-layer"
                    type="page"
                    :style="{
                        height: state.iframeHeight + 'px',
                    }"
                    @dragover="layerMove"
                >
                    <control-widget-shape
                        v-for="item in state.widgetInfoList"
                        :key="item.id"
                        :data="item"
                        @changeCurrWidget="changeCurrWidget"
                    >
                        <div
                            :id="item.id"
                            ref="layerWidget"
                            class="page-layer-widget"
                            type="widget"
                            :style="{ height: item.height + 'px' }"
                        ></div>
                    </control-widget-shape>
                </div>
            </div>

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
import { reactive, inject } from 'vue';
import controlWidgetShape from './controlWidgetShape.vue';

const state = reactive<any>({
    widgetInfoList: [],
    iframeHeight: 667,
    initIframe: false,
});

const control: any = inject('controlState');

const layerMove = () => {
    console.log('layerMove');
};
const changeCurrWidget = () => {
    console.log('changeCurrWidget');
};
</script>

<style lang="scss" scoped>
.wrap {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 176px; /*no*/
    overflow: hidden;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 72px; /*no*/
    margin-bottom: 8px; /*no*/
    padding: 10px 0; /*no*/
    font-size: 12px; /*no*/
    color: #666;

    i {
        font-size: 29px; /*no*/
        margin-top: 5px; /*no*/
        margin-bottom: 10px; /*no*/
    }

    &:hover {
        color: #fff;
        background: $color-theme;
    }
}
</style>
