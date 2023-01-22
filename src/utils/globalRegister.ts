/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-18 17:29:59
 * @LastEditors: June
 * @LastEditTime: 2023-01-22 22:50:04
 */
import type { App } from 'vue';
import vuedraggable from 'vuedraggable';
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
}
