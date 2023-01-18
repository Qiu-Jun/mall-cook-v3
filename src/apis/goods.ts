/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-19 00:17:23
 * @LastEditors: June
 * @LastEditTime: 2023-01-19 00:22:50
 */
import service from '@/lib/service';

/**
 * 查询商品列表
 */
export function getGoodsList(data: any) {
    return service({
        url: '/goods/getByList',
        method: 'POST',
        data,
    });
}

/**
 * 根据id查询商品详情
 */
export function getGoodsById(data: any) {
    return service({
        url: '/goods/getById',
        method: 'POST',
        data,
    });
}

/**
 * 根据id列表查询商品列表
 */
export function getGoodsByIds(data: any) {
    return service({
        url: '/goods/getByIds',
        method: 'POST',
        data,
    });
}

/**
 * 新增商品
 */
export function addGoods(data: any) {
    return service({
        url: '/goods/add',
        method: 'POST',
        data,
    });
}

/**
 * 编辑商品
 */
export function editGoods(data: any) {
    return service({
        url: '/goods/edit',
        method: 'POST',
        data,
    });
}

/**
 * 复制商品
 */
export function copyGoods(data: any) {
    return service({
        url: '/goods/copy',
        method: 'POST',
        data,
    });
}
