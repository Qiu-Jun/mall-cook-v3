<template>
    <div class="manage">
        <!-- 头部菜单 -->
        <div class="manage-head">
            <div class="manage-head-content">
                <git-control />
                <el-button
                    size="small"
                    class="f-white bg-theme"
                    @click="handleCreate"
                    >立即创建</el-button
                >
                <el-button size="small" @click="handleLogout">退出</el-button>
            </div>
        </div>

        <div v-for="type in state.list" :key="type.type" class="manage-body">
            <h2 class="manage-body-title">
                {{ type.title }}
                <span>{{ type.subTitle }}</span>
            </h2>

            <ul v-if="type.list.length" class="list">
                <li v-for="item in type.list" :key="item.id" class="list-item">
                    <div class="list-item-content">
                        <img :src="item.logo" class="w50 mt10 radius" />
                        <div class="mt25 f20">{{ item.name }}</div>
                        <div class="list-item-content-type">
                            {{ type.title }}
                        </div>
                        <div class="list-item-content-btn">
                            <span @click="handleUpdate(item)">修改</span>
                            <span @click.stop="handleDel(item.id)">删除</span>
                        </div>
                    </div>
                </li>
            </ul>

            <!-- 空列表 -->
            <el-empty v-else class="mt80">
                <template #description>
                    <span class="f13 f-grey">{{
                        `快去创建${type.title}吧`
                    }}</span>
                </template>
            </el-empty>
        </div>

        <!-- 页尾 -->
        <div class="footer"></div>
    </div>

    <create-dialog ref="createDialogRef" />

    <ie-dialog> </ie-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus';
import { debounce, cloneDeep } from 'lodash-es';
import { getProjectList, delProject } from '@/apis/project';
import useUser from '@/store/modules/user';
import useProject from '@/store/modules/project';
import { mallTypeList } from '@/config/mall';
import { useRouter } from 'vue-router';

const userStore = useUser();
const projectStore = useProject();
const router = useRouter();

const state = reactive<any>({
    list: [],
});

const createDialogRef = ref<any>();

const getProject = async () => {
    const map = new Map();
    const temp = cloneDeep(mallTypeList);
    temp.forEach((item: any) => {
        item.list = [];
        map.set(item.type, item.list);
    });
    const { status, list } = await getProjectList({
        userId: userStore.userInfo.userId,
    });
    if (status === '10000') {
        list.forEach((item: any) => {
            let value = map.get(item.type);
            value.push(item);
        });
        state.list = temp;
    }
};

const handleUpdate = debounce(function (project) {
    projectStore.setProject(project);
    router.push({ path: '/mall' });
}, 300);

const handleDel = debounce(function (id) {
    ElMessageBox.confirm('删除商城后将不可恢复, 是否继续?', '删除商城', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        delProject({ id }).then(({ status }) => {
            if (status == 10000) {
                getProject();
            }
        });
    });
}, 300);

const handleCreate = debounce(function () {
    createDialogRef.value?.open();
}, 300);

const handleLogout = () => {
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
};

getProject();
</script>

<style lang="scss" scoped>
.manage {
    position: relative;
    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

    .manage-head {
        position: fixed;
        top: 0;
        left: 0;
        height: 50px;
        width: 100%;
        background: #fff;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
        z-index: 10;

        .manage-head-content {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 970px;
            height: 100%;
            margin: 0 auto;
            line-height: 50px;
            text-align: right;
        }
    }

    .manage-body {
        width: 1000px;
        margin: 100px auto;

        .manage-body-title {
            font-size: 18px;
            color: #1b1c26;
            margin-bottom: 20px;
            padding: 0 15px;
            font-weight: 700;

            span {
                color: #ced1d6;
            }
        }

        .list {
            display: flex;
            flex-wrap: wrap;

            .list-item {
                height: 300px;

                .list-item-content {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 220px;
                    margin: 10px 15px 50px;
                    padding-top: 20px;
                    border-radius: 10px;
                    background-image: linear-gradient(-50deg, #edf1f7, #ebedf4);
                    box-shadow: 0 5px 10px 0 rgba(2, 31, 65, 0.05);
                    cursor: pointer;
                    transition: all 0.2s;

                    &:hover {
                        box-shadow: 0 20px 40px 0 rgba(15, 48, 85, 0.1);
                        margin-top: 5px;
                    }

                    .list-item-content-type {
                        position: relative;
                        margin-top: 15px;
                        font-size: 14px;
                        color: #61616a;
                        line-height: 24px;

                        &::after {
                            content: '';
                            position: absolute;
                            top: 50%;
                            right: -50px;
                            width: 35px;
                            height: 1px;
                            background-color: #e1e0e6;
                        }

                        &::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: -50px;
                            width: 35px;
                            height: 1px;
                            background-color: #e1e0e6;
                        }
                    }

                    .list-item-content-btn {
                        margin: 50px auto 25px;
                        width: 180px;
                        height: 40px;
                        line-height: 40px;
                        border-radius: 100px;
                        background-color: hsla(0, 0%, 100%, 0.4);

                        span {
                            display: inline-block;
                            width: 50%;
                            height: 100%;
                            font-size: 12px;
                            color: #61616a;
                            text-align: center;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    .footer {
        height: 200px;
        width: 100%;
    }
}
</style>
