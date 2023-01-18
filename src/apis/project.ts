/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-18 18:06:51
 * @LastEditors: June
 * @LastEditTime: 2023-01-18 18:11:07
 */
import service from '@/lib/service';

/**
 * 查询项目列表
 */
export function getProjectList(data: any) {
    return service({
        url: '/project/getByList',
        method: 'POST',
        data,
    });
}

/**
 * 删除
 */
export function delProject(data: any) {
    return service({
        url: '/project/delete',
        method: 'POST',
        data,
    });
}
