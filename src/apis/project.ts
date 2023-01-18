/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-18 18:06:51
 * @LastEditors: June
 * @LastEditTime: 2023-01-19 00:17:01
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
 * 删除项目
 */
export function delProject(data: any) {
    return service({
        url: '/project/delete',
        method: 'POST',
        data,
    });
}

/**
 * 根据id查询项目详情
 */
export function getProjectById(data: any) {
    return service({
        url: '/project/getById',
        method: 'POST',
        data,
    });
}

/**
 * 新增项目
 */
export function addProject(data: any) {
    return service({
        url: '/project/add',
        method: 'POST',
        data,
    });
}

/**
 * 编辑
 */
export function editProject(data: any) {
    return service({
        url: '/project/edit',
        method: 'POST',
        data,
    });
}

/**
 * 查询项目模板
 */
export function getModelList(data: any) {
    return service({
        url: '/project/getModelList',
        method: 'POST',
        data,
    });
}

/**
 * 封面上传
 */
export function uploadCover(data: any) {
    return service({
        url: '/upload',
        method: 'POST',
        data,
    });
}

/**
 * 生成小程序码
 */
export function createWXcode(data: any) {
    return service({
        url: '/project/getWXQr',
        method: 'POST',
        data,
    });
}
