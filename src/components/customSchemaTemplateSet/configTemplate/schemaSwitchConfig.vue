<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-29 18:57:23
 * @LastEditors: June
 * @LastEditTime: 2023-01-29 19:11:43
-->
<template>
    <div>
        <config-wrap title="必输配置">
            <config-item label="属性名">
                <el-input
                    v-model="content.curComponent.property"
                    placeholder="请输入属性名"
                    size="small"
                ></el-input>
            </config-item>
        </config-wrap>
        <config-wrap title="基础配置">
            <config-item label="标题">
                <el-input
                    v-model="content.curComponent.label"
                    placeholder="请输入标题"
                    size="small"
                ></el-input>
            </config-item>
            <config-item label="默认值">
                <el-switch v-model="content.curComponent.value" class="mt8">
                </el-switch>
            </config-item>
            <config-item label="开启文案">
                <el-input
                    v-model="content.curComponent.options.trueLabel"
                    size="small"
                ></el-input>
            </config-item>
            <config-item label="关闭文案">
                <el-input
                    v-model="content.curComponent.options.falseLabel"
                    size="small"
                ></el-input>
            </config-item>
        </config-wrap>
    </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
const content: any = inject('content');
</script>
