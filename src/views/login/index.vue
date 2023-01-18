<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-17 13:22:24
 * @LastEditors: June
 * @LastEditTime: 2023-01-18 14:53:24
-->
<template>
    <div class="login">
        <div class="login-content">
            <!-- form -->
            <div class="login-content-left">
                <!-- tab -->
                <ul class="flex col-bottom mb60">
                    <li
                        v-for="tab in state.tabs"
                        :key="tab.value"
                        class="tab mr20"
                        :class="[
                            state.active === tab.value ? 'tab-active' : '',
                        ]"
                        :data-tab="tab.value"
                        @click="handleTab"
                    >
                        {{ tab.label }}
                    </li>
                </ul>

                <!-- 登录 -->
                <template v-if="state.active === 'login'">
                    <el-form
                        ref="loginRef"
                        :model="state.loginForm"
                        :rules="state.loginRules"
                        label-width="0"
                    >
                        <el-form-item prop="account" class="mb40">
                            <el-input
                                v-model="state.loginForm.account"
                                placeholder="请输入账户名"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="password" class="mb70">
                            <el-input
                                v-model="state.loginForm.password"
                                placeholder="输入密码登录"
                                show-password
                            ></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button
                        class="w-100 h48 f-white bg-theme r3 f18 lb-4"
                        type="primary"
                        @click="handleLogin"
                        >登录</el-button
                    >
                    <div
                        class="flex row-right mt25 f15 f-theme pointer"
                        data-tab="register"
                        @click="handleTab"
                    >
                        免费注册
                    </div>
                </template>

                <!-- 注册 -->
                <template v-if="state.active === 'register'">
                    <el-form
                        ref="registerRef"
                        :model="state.registerForm"
                        :rules="state.registerRules"
                        label-width="0"
                    >
                        <el-form-item prop="account" class="mb40">
                            <el-input
                                v-model="state.registerForm.account"
                                placeholder="请输入注册账户"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="password" class="mb40">
                            <el-input
                                v-model="state.registerForm.password"
                                placeholder="请输入注册密码"
                                show-password
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="userName" class="mb70">
                            <el-input
                                v-model="state.registerForm.userName"
                                placeholder="请输入用户名"
                            ></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button
                        class="w-100 h48 f-white bg-theme r3 f18 lb-4"
                        type="primary"
                        @click="handleRegister"
                        >注册</el-button
                    >
                </template>
            </div>

            <!-- logo -->
            <div class="login-content-right">
                <img class="w-100" src="../../assets/image/logo.jpeg" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { debounce } from 'lodash-es';
import useUser from '@/store/modules/user';

const loginRef = ref(null);
const registerRef = ref(null);
const userStore = useUser();

const state = reactive({
    active: 'login',
    loginForm: {
        account: '',
        password: '',
    },
    registerForm: {
        account: '',
        password: '',
        userName: '',
    },
    tabs: [
        { label: '密码登录', value: 'login' },
        { label: '免费注册', value: 'register' },
    ],
    loginRules: {
        account: [
            { required: true, message: '必填项', trigger: 'blur' },
            {
                min: 8,
                max: 16,
                message: '8-16位字母或数字',
                trigger: 'blur',
            },
        ],
        password: [
            { required: true, message: '必填项', trigger: 'blur' },
            {
                min: 6,
                max: 16,
                message: '8-16位字母或数字',
                trigger: 'blur',
            },
        ],
    },
    registerRules: {
        account: [
            { required: true, message: '必填项', trigger: 'blur' },
            {
                min: 8,
                max: 16,
                message: '8-16位字母或数字',
                trigger: 'blur',
            },
        ],
        password: [
            { required: true, message: '必填项', trigger: 'blur' },
            {
                min: 6,
                max: 16,
                message: '8-16位字母或数字',
                trigger: 'blur',
            },
        ],
        userName: [
            { required: true, message: '必填项', trigger: 'blur' },
            {
                min: 1,
                max: 10,
                message: '1-10位字母或数字',
                trigger: 'blur',
            },
        ],
    },
});

// 切换tab
const handleTab = debounce(function (e) {
    const tabObj = e.target.dataset || e.srcElement.dataset;
    if (!tabObj || !tabObj.tab) return;
    state.active = tabObj.tab;
    switch (tabObj.tab) {
        case 'register':
            loginRef.value.resetFields();
            break;
        case 'login':
            registerRef.value.resetFields();
            break;
        default:
            break;
    }
}, 300);

// 登录
const handleLogin = debounce(function () {
    loginRef.value.validate((valid) => {
        if (valid) {
            userStore.doLogin(state.loginForm);
        }
    });
}, 500);

const handleRegister = debounce(function () {
    registerRef.value.validate((valid) => {
        if (valid) {
            userStore.doRegister(state.registerForm, () => {
                registerRef.value.resetFields();
                state.active = 'login';
            });
        }
    });
}, 500);
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
    box-shadow: none;
}
:deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: none;
}
:deep(.el-form-item.is-error .el-input__inner) {
    border-bottom: solid 1px var(--el-color-danger) !important;
}
:deep(.el-input__inner) {
    border: 0;
    border-radius: 0;
    padding: 0;
    font-size: 16px;
    border-bottom: solid 1px #dcdee0 !important;
}
:deep(.el-input__icon) {
    font-size: 20px;
}
.login {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: #f2f3f5;
    overflow: hidden;
    .login-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        height: 500px;
        .login-content-left {
            width: 550px;
            margin-right: 20px;
            border-radius: 6px;
            background: #fff;
            padding: 50px 56px 60px;
            .tab {
                font-size: 20px;
                color: $color-grey;
                cursor: pointer;
            }
            .tab-active {
                font-size: 24px;
                color: #323233;
                font-weight: 500;
            }
        }
        .login-content-right {
            display: flex;
            align-items: center;
            width: 320px;
            border-radius: 6px;
            background: #fff;
        }
    }
}
</style>
