<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-28 14:23:26
 * @LastEditors: June
 * @LastEditTime: 2023-01-28 15:24:24
-->
<template>
    <div class="flex flex-wrap">
        <div
            v-for="(item, key) in state.list"
            :key="key"
            class="flex-center h45 w45 mr10 mb10 shadow"
        >
            <img class="w-100 h-100" :src="item.cover" />
        </div>
        <div
            class="flex-center h45 w45 shadow pointer"
            @click="state.show = true"
        >
            +
        </div>

        <GoodsConfigChoose
            v-if="state.show"
            v-model:show="state.show"
            :active-list="state.mValue"
            @submit="submit"
        >
        </GoodsConfigChoose>
    </div>
</template>

<script lang="ts" setup>
import { reactive, computed, watch } from 'vue';
import useProject from '@/store/modules/project';
import { getGoodsByIds } from '@/apis/goods';

const projectStore = useProject();
const project = computed(() => projectStore.project);

const props = defineProps({
    value: {
        type: Array,
        default: () => [],
    },
});

const emits = defineEmits(['input']);

const state = reactive<any>({
    show: false,
    mValue: [],
    list: [],
});

const getList = async () => {
    const params = {
        projectId: project.value.id,
        ids: state.mValue,
    };
    const { status, list } = await getGoodsByIds(params);
    if (status === '10000') {
        state.list = list;
    }
};

const submit = (list: [any]) => {
    state.list = list;
};

watch(
    () => props.value,
    (newVal) => {
        console.log('gor value change');
        state.mValue = newVal;
    },
);
watch(
    () => state.mValue,
    (newVal) => {
        console.log('goodsCOnfig value change');
        emits('input', newVal);
    },
);
</script>
