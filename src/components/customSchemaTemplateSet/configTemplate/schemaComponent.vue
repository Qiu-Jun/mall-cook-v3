<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-29 18:57:23
 * @LastEditors: June
 * @LastEditTime: 2023-01-29 23:04:30
-->
<template>
    <div class="SchemaComponent">
        <config-wrap title="组件配置">
            <config-item label="组件名称">
                <el-input
                    v-model="content.model.label"
                    placeholder="请输入组件名称"
                    size="small"
                ></el-input>
            </config-item>
            <config-item label="组件图标">
                <ul class="flex flex-wrap">
                    <li
                        v-for="(icon, index) in icons"
                        :key="index"
                        class="icon-item flex-center"
                        :class="[
                            content.model.icon == icon
                                ? 'icon-item-active'
                                : '',
                        ]"
                        @click="content.model.icon = icon"
                    >
                        <i class="icon f24" :class="icon"></i>
                    </li>
                </ul>
            </config-item>
        </config-wrap>
    </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import icons from './icon';
const content: any = inject('content');
</script>

<style lang="scss" scoped>
.icon-item {
    width: 44px;
    height: 44px;
    margin: 5px;
    cursor: pointer;

    &:hover {
        background: $color-theme;
        color: #fff;
    }
}

.icon-item-active {
    background: $color-theme;
    color: #fff;
}
</style>
