<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 14:27:55
 * @LastEditors: June
 * @LastEditTime: 2023-01-23 18:30:54
-->
<template>
    <div class="m20 p20 bg-white">
        <div class="mb20">
            <el-button size="small" class="f-white bg-theme" @click="handleAdd"
                >发布商品</el-button
            >
        </div>

        <!-- 表格 -->
        <div class="mt30">
            <el-table
                :data="state.list"
                :header-cell-style="{
                    background: '#f7f8fa',
                    color: '#323233',
                    fontWeight: 500,
                }"
                style="width: 100%"
            >
                <el-table-column
                    prop="name"
                    label="商品名"
                    align="center"
                    header-align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
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
                    <template #default="scope">
                        {{ moneyDec(scope.row.price) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="originalPrice"
                    label="原价（元）"
                    align="center"
                    header-align="center"
                >
                    <template #default="scope">
                        {{ moneyDec(scope.row.originalPrice) }}
                    </template>
                </el-table-column>
                <!-- <el-table-column
          prop="inventory"
          label="库存"
          align='center'
          header-align='center'
        >
        </el-table-column> -->

                <el-table-column
                    label="操作"
                    align="center"
                    header-align="center"
                >
                    <template #default="scope">
                        <span
                            class="mr5 f-theme pointer"
                            @click="handleEdit(scope.row)"
                            >编辑</span
                        >
                        <span
                            class="ml5 mr5 f-theme pointer"
                            @click="handleCopy(scope.row)"
                            >复制</span
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { debounce, cloneDeep } from 'lodash-es';
import { getGoodsList, copyGoods } from '@/apis/goods';
import useProject from '@/store/modules/project';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { moneyDec } from '@/utils/global';

const router = useRouter();
const projectStore = useProject();
const project = computed(() => projectStore.project);

const state = reactive({
    list: [],
});

const handleAdd = debounce(function () {
    router.push({
        path: '/mall/goods/goodsEdit',
    });
}, 300);

const handleEdit = debounce(function (row: any) {
    if (!row) return;
    router.push({
        name: '/mall/goods/goodsEdit',
        params: cloneDeep(row),
    });
}, 300);

const handleCopy = debounce(async function (row: any) {
    if (!row) return;
    const { status } = await copyGoods(row);

    if (status === '10000') {
        getList();
        ElNotification({
            title: '成功',
            message: '商品复制成功',
            type: 'success',
        });
    }
}, 300);

const getList = async () => {
    const { status, list } = await getGoodsList({
        projectId: project.value.id,
    });
    if (status === '10000') {
        state.list = list;
    }
};

getList();
</script>
