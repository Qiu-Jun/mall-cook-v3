/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-19 00:04:55
 * @LastEditors: June
 * @LastEditTime: 2023-01-19 22:14:23
 */
import { defineStore } from 'pinia';
import { fixedPages } from '@/config/project';
import { getProject, settingProject, removeProject } from '@/utils/auth';

interface ProjectState {
    project: any;
    fixedPages: any;
    curPage: any;
    curComponent: any;
    dragComponent: any;
    dragStatus: any;
}

const useProject = defineStore({
    id: 'project', // id必填，且需要唯一
    state: (): ProjectState => {
        return {
            project: getProject(),
            fixedPages, // 静态页面集合
            curPage: {}, // 当前页面
            curComponent: null, // 当前物料
            dragComponent: null, // 拖拽物料
            dragStatus: false, // 拖拽入页面状态
        };
    },

    actions: {
        // 初始化重置项目
        setProject(project: any) {
            this.project = project;
            settingProject(project);
            this.curPage = project.pages.find((page: any) => page.home);
        },

        // 删除项目
        dropProject() {
            this.project = {};
            this.curPage = {};
            this.curComponent = null;
            this.dragComponent = null;
            this.dragStatus = false;
            removeProject();
        },

        // 设置首页为当前页
        setHomePage() {
            this.curPage = this.project.pages.find((page: any) => page.home);
        },

        // 设置当前页面
        setCurPage(page: any) {
            console.log('设置当前页面');
            console.log(JSON.stringify(page));

            this.curPage = page;
        },

        // 当前操作操作物料
        setcurComponent(component: any) {
            this.curComponent = component;
        },

        // 当前拖拽物料
        setDragComponent(component: any) {
            this.dragComponent = component;
        },

        // 添加物料
        addComponentList(component: any) {
            this.curPage.componentList.push(component);
        },

        // 删除物料
        delComponent(id: any) {
            // 查找物料对应下标
            const index = this.curPage.componentList.reduce(
                (pre: any, cur: any, i: any) => {
                    if (cur.id == id) pre = i;

                    return pre;
                },
                -1,
            );

            this.curPage.componentList.splice(index, 1);
            this.curComponent = null;
        },

        setDragStatus(status: boolean) {
            this.dragStatus = status;
        },
    },
});

export default useProject;
