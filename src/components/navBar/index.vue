<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-22 17:55:10
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 19:52:27
-->
<template>
    <ul class="tabs" :style="getTabsStyle()">
        <li
            v-for="(item, index) in props.list"
            :key="index"
            class="tabs-item"
            :class="[item.jump.id === state.activeTab ? 'f-h5-theme' : '']"
            @click="changeTab(item)"
        >
            <i class="icon f22" :class="item.icon"></i>
            <span class="f13">{{ item.text }}</span>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { reactive, PropType } from 'vue';
import { jump } from '@/utils/global';

const props = defineProps({
    styles: {
        type: Object,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        default: () => {},
    },
    list: {
        type: Array as unknown as PropType<[any]>,
        default: () => [],
    },
    disabled: {
        type: Boolean,
    },
});

const emits = defineEmits(['update:active']);

const state = reactive({
    activeTab: '',
});

// tabs 动态样式
const getTabsStyle = () => {
    return {
        // backgroundColor: this.style?.background || '#fff'
        backgroundColor: '#fff',
    };
};

const changeTab = (item: any) => {
    if (state.activeTab === item.jump.id) return;
    state.activeTab = item.jump.id;
    // 设置模式置灰，禁止点击跳转
    if (props.disabled) return;
    emits('update:active', state.activeTab);
    jump(item.jump);
};
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    width: 100%;
    height: 56px;
    border-top: solid 1px #9b9b9b20;

    .tabs-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        background-size: contain;
        font-size: 10px;
        color: #9b9b9b;

        i {
            font-size: 20px;
            margin-bottom: 3px;
        }
    }

    .tabs-item-select {
        color: #f20c25;
    }
}
</style>
