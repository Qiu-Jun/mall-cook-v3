<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-17 16:35:21
 * @LastEditors: June
 * @LastEditTime: 2023-01-19 22:33:17
-->
<template>
    <el-dialog
        v-model="state.show"
        width="35%"
        top="300px"
        @before-close="onDialogClose"
    >
        <div class="flex-column col-center">
            <!-- form -->
            <el-form
                ref="formRef"
                :model="state.form"
                :rules="state.formRules"
                label-width="80px"
                style="width: 300px"
            >
                <el-form-item label="名称" prop="name">
                    <el-input
                        v-model="state.form.name"
                        placeholder="请输入名称"
                        type="text"
                    />
                </el-form-item>

                <el-form-item label="类型" prop="type" class="form-item-none">
                    <el-radio v-model="state.form.type" label="mall"
                        >电商商城</el-radio
                    >
                    <el-radio v-model="state.form.type" label="model"
                        >商城模板</el-radio
                    >
                </el-form-item>

                <el-form-item label="行业" prop="industry">
                    <el-select
                        v-model="state.form.industry"
                        placeholder="请选择行业"
                    >
                        <el-option
                            v-for="item in mallIndustryList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

        <!-- submit -->
        <template #footer>
            <div class="dialog-footer flex-center">
                <el-button
                    type="primary"
                    round
                    style="width: 140px"
                    @click="handleSubmit"
                    >保存</el-button
                >
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { addProject } from '@/apis/project';
import { rojectModel } from '@/config/project';
import { mallIndustryList, mallTypeList } from '@/config/mall';
import { debounce } from 'lodash-es';
import useUser from '@/store/modules/user';
import useProject from '@/store/modules/project';
import { useRouter } from 'vue-router';

defineExpose({
    open,
});

const userStore = useUser();
const projectStore = useProject();
const router = useRouter();

const state = reactive({
    show: false,
    form: {
        type: 'mall',
        name: '',
        industry: '',
    },
    formRules: {
        name: [
            {
                required: true,
                message: '请输入名称',
                trigger: 'blur',
            },
        ],
        industry: [
            {
                required: true,
                message: '请选择行业',
                trigger: 'blur',
            },
        ],
    },
});

const formRef = ref(null);

function open() {
    state.show = true;
}
const onDialogClose = () => {
    state.show = false;
    formRef.value.resetFields();
};

const handleSubmit = debounce(function () {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const _map = new Map();
            mallTypeList.map((item) => _map.set(item.type, item.logo));
            const project = {
                ...rojectModel,
                ...state.form,
                userId: userStore.userInfo.userId,
                logo: _map.get(state.form.type),
            };
            const { status, id, message } = await addProject(project);
            if (status === '10000') {
                project.id = id;
                projectStore.setProject(project);
                router.push({
                    path: '/mall',
                });
            } else {
                ElMessage.error(message);
            }
        }
    });
}, 300);
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
    box-shadow: none;
}

:deep(.el-form-item) {
    padding-bottom: 5px;
    border-bottom: solid 1px #e3e3e3;

    .el-form-item__label {
        text-align: left;
    }

    .el-form-item__error {
        top: 47px;
        left: -80px;
    }
}

:deep(.el-button--primary) {
    background: $color-theme !important;
}

:deep(.el-select) {
    width: 100%;

    .el-input.is-focus .el-input__wrapper {
        box-shadow: none !important;
    }
    .el-input__wrapper.is-focus {
        box-shadow: none !important;
    }
}
:deep(.el-select:hover:not(.el-select--disabled)) .el-input__wrapper {
    box-shadow: none !important;
}
:deep(.el-input__inner) {
    border: 0px;
    margin: 0px;
    padding: 0px;
}

.form-item-none {
    border-color: transparent;
}
</style>
