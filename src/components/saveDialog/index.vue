<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-20 13:15:09
 * @LastEditors: June
 * @LastEditTime: 2023-01-20 22:13:06
-->
<template>
    <el-dialog v-model="state.show" top="50px" width="40%">
        <div class="flex-column col-center">
            <!-- logo -->
            <img class="w60 mb30 radius" :src="project.logo" />

            <!-- form -->
            <el-form
                ref="formRef"
                :model="project"
                label-width="80px"
                style="width: 300px"
            >
                <el-form-item label="商城名称" prop="name" verify>
                    <input v-model="project.name" type="text" />
                </el-form-item>
            </el-form>

            <!-- 封面 -->
            <div class="cover">
                <div class="cover-title">
                    <el-button
                        icon="el-icon-refresh-right"
                        circle
                        @click="changeCover"
                    ></el-button>
                    <span class="ml10 lb-1 f-theme">点击更新商城封面</span>
                </div>
                <div class="cover-img">
                    <img class="w-100" :src="project.cover" />
                </div>
            </div>
        </div>

        <!-- submit -->
        <template #footer>
            <div class="dialog-footer flex-center">
                <el-button
                    type="primary"
                    round
                    style="width: 140px"
                    @click="handleSave"
                    >保存</el-button
                >
            </div>
        </template>

        <home-cover ref="homeCoverRef" @complete="onComplete"></home-cover>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, defineAsyncComponent } from 'vue';
import { editProject } from '@/apis/project';
import useProject from '@/store/modules/project';
import { debounce } from 'lodash-es';
import type { FormInstance } from 'element-plus';
import { ElNotification } from 'element-plus';

const homeCover = defineAsyncComponent(() => import('./homeCover.vue'));

const projectStore = useProject();
const project = computed(() => projectStore.project);

const state = reactive({
    show: false,
    view: false,
});

const formRef = ref<FormInstance>();
const homeCoverRef = ref<any>();
const open = (view: any) => {
    state.show = true;
    state.view = view;
};

/**
 * 更新封面
 * 成功更新封面图片,失败则更新为默认图片
 */
const changeCover = debounce(function () {
    homeCover.value?.init();
}, 300);

const onComplete = (result: any) => {
    console.log('complete.....');
    console.log(result);
    // if (result.status == 1) {
    //     this.$set(this.project, 'cover', result.data);
    //     this.$notify({
    //         title: '成功',
    //         message: '封面生成成功!',
    //         type: 'success',
    //     });
    // } else {
    //     this.$set(
    //         this.project,
    //         'cover',
    //         'https://i.niupic.com/images/2022/11/02/aaa2.jpeg',
    //     );
    //     this.$notify({
    //         title: '失败',
    //         message: '封面生成失败,显示默认封面',
    //         type: 'warning',
    //     });
    // }
};

const handleSave = () => {
    formRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            const { status } = await editProject(project);
            if (status === '10000') {
                state.show = false;
                ElNotification({
                    title: '成功',
                    message: '商城保存成功',
                    type: 'success',
                });
                if (state.view) {
                    //             this.topBar.openQr();
                    //   this.view = false;
                }
            }
        }
    });
};
</script>

<style lang="scss" scoped>
input {
    border: 0;
    margin-bottom: 5px;
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

.cover {
    position: relative;

    .cover-title {
        margin: 10px 0 15px 0;
    }

    .cover-img {
        width: 300px;
        max-height: 400px;
        overflow-y: auto;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

        // 隐藏滚动条
        &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }
    }

    .cover-btn {
        position: absolute;
        top: 40px;
        right: -120px;
        z-index: 1;
    }
}
</style>
