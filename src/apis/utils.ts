/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-24 22:41:21
 * @LastEditors: June
 * @LastEditTime: 2023-01-28 19:40:17
 */
import service from '@/lib/service';

export function upload(file: any) {
    return service({
        url: '/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: file,
    });
}
