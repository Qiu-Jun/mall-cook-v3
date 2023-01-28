<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-28 14:28:17
 * @LastEditors: June
 * @LastEditTime: 2023-01-28 15:16:08
-->
<template>
    <el-dialog
        v-model="state.visible"
        title="选择商品"
        :close-on-click-modal="false"
        append-to-body
        width="45%"
    >
        <el-table
            ref="multipleTable"
            :data="state.list"
            tooltip-effect="dark"
            style="width: 100%"
            max-height="300"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
                type="selection"
                align="center"
                header-align="center"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="商品名"
                align="center"
                header-align="center"
            >
            </el-table-column>
            <el-table-column
                label="商品封面"
                align="center"
                header-align="center"
            >
                <template #default="scope">
                    <img class="w50 h50" :src="scope.row.cover" />
                </template>
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格（元）"
                align="center"
                header-align="center"
            >
            </el-table-column>
            <el-table-column
                prop="originalPrice"
                label="原价（元）"
                align="center"
                header-align="center"
            >
            </el-table-column>
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="state.visible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import useProject from '@/store/modules/project';
import { getGoodsList } from '@/apis/goods';

const projectStore = useProject();
const project = computed(() => projectStore.project);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    value: {
        type: Array,
        default: () => [],
    },
});

const tableRef = ref<any>(null);

const emits = defineEmits(['update:show', 'submit']);

const state = reactive<any>({
    visible: false,
    selectList: [],
    list: [],
});

watch(
    () => props.show,
    (newVal) => {
        console.log('goodsCOnfig value change');
        state.visible = newVal;
    },
);
watch(
    () => state.visible,
    (newVal) => {
        console.log('goodsCOnfig value change');
        emits('update:show', newVal);
    },
);

// 勾选回显
const toggleSelection = (rows: any) => {
    if (rows) {
        rows.forEach((row: any) => {
            tableRef.value?.toggleRowSelection(row);
        });
    }
};

// 勾选选中
const handleSelectionChange = (val: any) => {
    state.selectList = val;
};

const getList = async () => {
    const { status, list } = await getGoodsList({
        projectId: project.value.id,
    });

    if (status === '10000') {
        // 筛选字段
        state.list = list;

        // 根据选中列表id，筛选匹配对应数组，用于勾选回显
        state.selectList = list.filter((item: any) => {
            return props.value.includes(item.id);
        });

        // 勾选回显回调方法
        setTimeout(() => {
            toggleSelection(state.selectList);
        }, 0);
    }
};

const submit = () => {
    emits(
        'submit',
        state.selectList.map((item: any) => item.id),
    );
};
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
    .el-dialog__title {
        font-size: 14px !important;
        font-weight: 600;
    }
    .el-dialog__body {
        padding: 10px 20px 30px 20px !important;
    }
}

.wrap {
    background: #f2f2f6;
    height: 400px;
    border-radius: 5px;
}
</style>
