<!--
 * @Author: June
 * @Description: 物料属性面板
 * @Date: 2023-01-23 18:49:23
 * @LastEditors: June
 * @LastEditTime: 2023-01-25 22:51:09
-->
<template>
    <div class="Config">
        <!-- <config-ctn v-if="control.curWidget" :title="control.curWidget.name">
            <custom-schema-template
                v-model="control.curWidget"
                :schema="curSchema"
            ></custom-schema-template>
        </config-ctn> -->

        <config-ctn title="页面配置">
            <page-config></page-config>
        </config-ctn>
    </div>
</template>

<script lang="ts" setup>
import pageConfig from '@/components/pageConfig/index.vue';
</script>
