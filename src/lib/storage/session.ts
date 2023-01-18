/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-18 15:01:05
 * @LastEditors: June
 * @LastEditTime: 2023-01-18 16:13:28
 */
export function getSession(key: string) {
    if (!key) throw new Error('key不能为空');
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : null;
}

export function setSession(key: string, value: any) {
    if (!key || !value) throw new Error('key or value不能为空');
    return sessionStorage.setItem(key, JSON.stringify(value));
}

export function removeSession(key: string) {
    if (!key) throw new Error('key不能为空');
    return sessionStorage.removeItem(key);
}

export function clearSession() {
    return sessionStorage.clear();
}
