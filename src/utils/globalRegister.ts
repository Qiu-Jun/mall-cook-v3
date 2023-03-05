/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-18 17:29:59
 * @LastEditors: June
 * @LastEditTime: 2023-03-04 00:37:54
 */
import type { App } from 'vue';
import vuedraggable from 'vuedraggable';
// import cTuiImageEditor from '@/components/cTuiImageEditor/index.vue';

/**
 * 注册对应包下所有组件
 * @param {*} path 包路径
 */
export function registerGlobalComponents(app: App<Element>) {
    const globalCom = import.meta.glob('@/components/global/*.vue', {
        eager: true,
        import: 'default',
    });
    Object.keys(globalCom).forEach((com: string) => {
        const component: any = globalCom[com];
        app.component(component.__name, component);
    });
    app.component('Draggable', vuedraggable);
    // app.component('CTuiImageEditor', cTuiImageEditor);
}

// 注册所有配置组件
export function registerConfigComponent(app: App<Element>) {
    const globalCom = import.meta.glob(
        '@/components/customSchemaTemplate/*/*.vue',
        {
            eager: true,
            import: 'default',
        },
    );
    Object.keys(globalCom).forEach((com: string) => {
        const component: any = globalCom[com];
        app.component(component.__name, component);
    });
}

// 注册所有schema配置组件
export function registerScemaConfig(app: App<Element>) {
    const globalCom = import.meta.glob(
        '@/components/customSchemaTemplateSet/configTemplate/*.vue',
        {
            eager: true,
            import: 'default',
        },
    );
    Object.keys(globalCom).forEach((com: string) => {
        const component: any = globalCom[com];
        app.component(component.__name, component);
    });
}

// 获取所有属性配置组件 initializing
export function registerSchemaInitializing(app: App<Element>) {
    const initializingObj: any = import.meta.glob(
        '@/components/customSchemaTemplate/*/initializing.js',
        {
            eager: true,
            import: 'default',
        },
    );
    const list: any = [];
    Object.keys(initializingObj).forEach((key) => {
        // const name = key.replace(/(\.\/|\/initializing.js)/g, '');
        const keySplit = key.split('/'); // 获取组件名
        const componentName = keySplit[4];
        list.push({
            component: componentName,
            ...initializingObj[key],
        });
    });
    app.provide('cmpConfig', list);
}
