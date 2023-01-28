<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-27 22:07:11
 * @LastEditors: June
 * @LastEditTime: 2023-01-28 15:51:28
-->
<template>
    <div class="edit">
        <el-dialog
            v-model="state.show"
            :title="state.type === 'add' ? '新增分组' : '编辑分组'"
            width="25%"
        >
            <div class="auto-center">
                <el-form
                    ref="formRef"
                    :model="state.form"
                    label-width="120px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="级别" prop="level" verify>
                        <el-radio
                            v-model="state.form.level"
                            :label="1"
                            :disabled="state.type === 'edit'"
                            >一级</el-radio
                        >
                        <el-radio
                            v-model="state.form.level"
                            :label="2"
                            :disabled="state.type === 'edit'"
                            >二级</el-radio
                        >
                    </el-form-item>

                    <el-form-item
                        v-if="state.form.level === 1"
                        label="一级分组名称"
                        prop="name"
                        :verify="{ maxLen: 4 }"
                    >
                        <el-input
                            v-model="state.form.name"
                            maxlength="4"
                            show-word-limit
                            style="width: 150px"
                            size="small"
                        ></el-input>
                    </el-form-item>

                    <template v-if="state.form.level === 2">
                        <el-form-item label="上级分组" prop="parentType" verify>
                            <el-select
                                v-model="state.form.parentType"
                                placeholder="请选择上级分组"
                                style="width: 150px"
                                size="small"
                                :disabled="state.type === 'edit'"
                            >
                                <el-option
                                    v-for="item in project.config.goodsGroups"
                                    :key="item.type"
                                    :label="item.name"
                                    :value="item.type"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="二级分组名称"
                            prop="name"
                            :verify="{ maxLen: 6 }"
                        >
                            <el-input
                                v-model="state.form.name"
                                maxlength="4"
                                show-word-limit
                                style="width: 150px"
                                size="small"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="二级分组图片" prop="image" verify>
                            <c-tui-image-editor />
                        </el-form-item>
                        <el-form-item label="二级分组商品" prop="shopList">
                            <groupGoods
                                v-model="state.form.shopList"
                            ></groupGoods>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="close">取 消</el-button>
                    <el-button type="primary" @click="submitForm"
                        >确 定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import useProject from '@/store/modules/project';
import groupGoods from './groupGoods.vue';
import { cloneDeep } from 'lodash-es';
import { getRandomCode } from '@/utils/global';

const state = reactive({
    type: 'add',
    form: {
        level: 1,
        name: '',
        type: '',
        parentType: '',
        image: '',
        child: [],
        shopList: [],
    },
    show: false,
});

const projectStore = useProject();
const project = computed(() => projectStore.project);

const formRef = ref<any>(null);

const open = (level: number, data: any) => {
    if (!data) {
        state.type = 'add';
        state.form.level = level;
    } else {
        state.type = 'edit';
        state.form = cloneDeep(data);
    }
    state.show = true;
};

const close = () => {
    state.type = 'add';
    state.form = {
        level: 1,
        type: '',
        name: '',
        parentType: '',
        image: '',
        shopList: [],
        child: [],
    };
    state.show = false;
};

const add = () => {
    // 新增一级分类
    if (state.form.level === 1) {
        state.form.type = getRandomCode(4);
        state.form.child = [];
        project.value.config.goodsGroups.push(state.form);
    } else {
        // 新增二级分类
        state.form.type = getRandomCode(4);
        const temp = projectStore.project.config.goodsGroups.find(
            (item: any) => item.type == state.form.parentType,
        );
        temp.child.push(state.form);
    }
};

const edit = () => {
    // 编辑一级分类
    if (state.form.level === 1) {
        const temp = projectStore.project.config.goodsGroups.find(
            (item: any) => item.type === state.form.type,
        );
        temp.name = state.form.name;
    } else {
        // 编辑二级分类
        const temp = projectStore.project.config.goodsGroups.find(
            (item: any) => item.type === state.form.parentType,
        );
        const index = temp.child.reduce((pre: any, cur: any, i: any) => {
            if (cur.type === state.form.type) pre = i;
            return pre;
        }, 0);
        temp.child.splice(index, 1, state.form);
    }
};

const submitForm = () => {
    formRef.value?.validate((valid: boolean) => {
        if (valid) {
            state.type == 'add' ? add() : edit();
            close();
        } else {
            return false;
        }
    });
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
    display: inline-block;
    margin: 0 auto;
}
</style>
