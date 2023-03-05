/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 12:46:35
 * @LastEditors: June
 * @LastEditTime: 2023-03-04 00:43:28
 */
import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import App from './App.vue';
import ieDialog from 'ie-dialog';
import 'ie-dialog/dist/style.css';
import {
    registerGlobalComponents,
    registerConfigComponent,
    registerScemaConfig,
    registerSchemaInitializing,
} from '@/utils/globalRegister';

// 适配
import '@/utils/adapter.js';

import '@/styles/index.scss';
// 解决api调用样式问题
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-notification.css';

/**
 * 图片上传
 */
function bootStrap() {
    const app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(ieDialog);
    registerGlobalComponents(app);
    registerConfigComponent(app);
    registerScemaConfig(app);
    registerSchemaInitializing(app);
    app.mount('#app');
}

bootStrap();
