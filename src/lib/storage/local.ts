/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-19 00:25:15
 * @LastEditors: June
 * @LastEditTime: 2023-01-19 00:26:11
 */
export function getLocal(key: string) {
    if (!key) throw new Error('key不能为空');
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
}

export function setLocal(key: string, value: any) {
    if (!key || !value) throw new Error('key or value不能为空');
    return localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocal(key: string) {
    if (!key) throw new Error('key不能为空');
    return localStorage.removeItem(key);
}

export function clearSession() {
    return localStorage.clear();
}
