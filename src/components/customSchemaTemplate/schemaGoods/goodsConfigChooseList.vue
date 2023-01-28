<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-28 14:28:17
 * @LastEditors: June
 * @LastEditTime: 2023-01-28 14:38:51
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
        <div class="flex-center h45 w45 shadow pointer" @click="add">+</div>
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
        required: true,
    },
});

const emits = defineEmits(['edit']);

const state = reactive<any>({
    list: [],
});

const getList = async () => {
    const params = {
        projectId: project.value.id,
        ids: props.value,
    };
    const { status, list } = await getGoodsByIds(params);
    if (status === '10000') {
        state.list = list;
    }
};

const add = () => {
    emits('edit');
};

watch(
    () => props.value,
    () => {
        console.log('goodsCOnfigLiar value change');
        getList();
    },
);
</script>
