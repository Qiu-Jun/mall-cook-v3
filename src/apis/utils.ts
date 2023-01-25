/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-24 22:41:21
 * @LastEditors: June
 * @LastEditTime: 2023-01-24 22:42:40
 */
import service from '@/lib/service';

export function upload(file: any) {
    return service({
        url: '/upload',
        method: 'post',
        data: file,
    });
}
