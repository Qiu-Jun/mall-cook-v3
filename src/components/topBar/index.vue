<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-19 22:40:27
 * @LastEditors: June
 * @LastEditTime: 2023-01-30 16:09:43
-->
<template>
    <div class="topBar">
        <!-- 左侧内容 -->
        <span class="f14 pointer" @click="handleBack">切换商城</span>

        <!-- 右侧内容 -->
        <div>
            <git-control />
            <el-button size="small" @click="toSchema">schema 生成器</el-button>

            <el-button size="small" @click="viewQr">商城二维码</el-button>

            <el-button size="small" @click="state.show = true"
                >实时预览</el-button
            >

            <el-button size="small" @click="handleSave">保存</el-button>

            <el-button size="small" @click="onLogout">退出</el-button>
        </div>
    </div>

    <realTimeView v-model:show="state.show" />

    <saveDialg ref="save" />

    <qrDialog ref="qr" />
</template>

<script lang="ts" setup>
import { reactive, computed, defineAsyncComponent } from 'vue';
import { debounce } from 'lodash-es';
import { useRouter } from 'vue-router';
import useUser from '@/store/modules/user';
import useProject from '@/store/modules/project';
import { ElMessageBox, ElNotification } from 'element-plus';
import { editProject } from '@/apis/project';

const router = useRouter();
const userStore = useUser();
const projectStore = useProject();

const project = computed(() => projectStore.project);

// 异步组件
const saveDialg = defineAsyncComponent(
    () => import('@/components/saveDialog/index.vue'),
);

const realTimeView = defineAsyncComponent(
    () => import('@/components/realTimeView/index.vue'),
);

const qrDialog = defineAsyncComponent(
    () => import('@/components/qrDialog/index.vue'),
);

const state = reactive({
    show: false,
});

const handleBack = debounce(function () {
    router.push({
        path: '/home',
    });
}, 300);

const handleSave = debounce(async function () {
    const params = {
        id: project.value.id,
        userId: userStore.userInfo.userId,
        name: project.value.name,
        richText: JSON.stringify(project.value),
    };
    const { status } = await editProject(params);
    if (status === '10000') {
        ElNotification({
            title: '成功',
            message: '项目保存成功',
            type: 'success',
        });
    }
}, 300);

const toSchema = debounce(function () {
    let { href } = router.resolve({
        path: '/schema',
    });
    window.open(href);
}, 300);

const viewQr = debounce(function () {
    console.log('viewQr');
}, 300);

const onLogout = debounce(function () {
    ElMessageBox.confirm('删除商城后将不可恢复, 是否继续?', '删除商城', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        userStore.doLogout();
        router.push({
            path: '/login',
        });
    });
}, 300);
</script>

<style lang="scss" scoped>
.topBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    width: 100%;
    padding: 0 20px;
    background: #fff;
    border-bottom: 1px solid #ebedf0;
}
</style>
