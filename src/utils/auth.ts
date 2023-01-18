/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-18 15:06:34
 * @LastEditors: June
 * @LastEditTime: 2023-01-18 15:10:14
 */
import { getSession, setSession, removeSession } from '@/lib/storage/session';

const TokenKey = 'token';
const UserInfoKey = 'user-info';
const ProjectKey = 'mall-project';

export function getAuthToken() {
    return getSession(TokenKey);
}

export function setAuthToken(token: any) {
    return setSession(TokenKey, token);
}

export function removeAuthToken() {
    return removeSession(TokenKey);
}

export function setAuthUserInfo(userInfo: any) {
    return setSession(UserInfoKey, userInfo);
}

export function getAuthUserInfo() {
    return getSession(UserInfoKey);
}

export function removeAuthUserInfo() {
    return removeSession(UserInfoKey);
}

export function getProject() {
    return getSession(ProjectKey);
}

export function settingProject(project: any) {
    return setSession(ProjectKey, project);
}

export function removeProject() {
    return removeSession(ProjectKey);
}
