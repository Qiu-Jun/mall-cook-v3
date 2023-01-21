<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-18 23:58:39
 * @LastEditors: June
 * @LastEditTime: 2023-01-21 23:08:59
-->
<template>
    <div class="main">
        <!-- 侧边菜单 -->
        <ul class="main-meau">
            <img class="w40 auto-center mt10 mb30 radius" :src="project.logo" />
            <template v-for="item in state.meauList" :key="item.path">
                <router-link :to="{ path: item.path }">
                    <li class="main-meau-item">
                        <i class="icon" :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                    </li>
                </router-link>
            </template>
        </ul>

        <!-- 内容 -->
        <div class="main-body">
            <top-bar></top-bar>
            <div class="main-body-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import useProject from '@/store/modules/project';
import { settingProject } from '@/utils/auth';

const projectStore = useProject();
const project = computed(() => projectStore.project);

const state = reactive({
    meauList: [
        {
            name: '商城',
            icon: 'icon-shop',
            path: '/mall/store',
        },
        {
            name: '页面',
            icon: 'icon-fuzhiyemian',
            path: '/mall/pagesManage',
        },
        {
            name: '商品',
            icon: 'icon-shangpin-meau',
            path: '/mall/goods',
        },
        {
            name: '构建',
            icon: 'icon-list',
            path: '/mall/pageBuild',
        },
        {
            name: '模板',
            icon: 'icon-list',
            path: '/mall/modelManage',
        },
    ],
});

const setProject = () => settingProject(project);

onMounted(() => {
    projectStore.setHomePage();
    window.addEventListener('beforeunload', setProject);
});

onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', setProject);
});
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    height: 100vh; /*no*/
    background: #f7f8fa;

    .main-body {
        flex: 1;

        .main-body-content {
            position: relative;
            height: calc(100% - 60px); /*no*/
            margin-top: 4px;
            overflow: hidden;
        }
    }
}

.main-meau {
    width: 120px; /*no*/
    height: 100%;
    padding-top: 16px; /*no*/
    border-right: 1px solid #ebedf0; /*no*/
    // background: #22242f;
    background: #fff;

    .main-meau-item {
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 14px; /*no*/
        padding: 11px 20px;
        color: #7d7e80;
        cursor: pointer;

        i {
            margin-right: 5px;
            font-size: 18px; /*no*/
            color: #7d7e80;
        }
    }

    .router-link-active {
        i {
            color: $color-theme !important;
        }
        .main-meau-item {
            position: relative;
            color: $color-theme !important;

            &::after {
                position: absolute;
                right: 10px; /*no*/
                content: '';
                width: 4px; /*no*/
                height: 21px; /*no*/
                border-radius: 3px; /*no*/
                background: $color-theme;
            }
        }
    }
}
</style>
