/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-19 00:04:55
 * @LastEditors: June
 * @LastEditTime: 2023-01-19 00:06:02
 */
import { defineStore } from 'pinia';

const useProject = defineStore({
    id: 'project', // id必填，且需要唯一
    state: () => {
        return {};
    },
});

export default useProject;
