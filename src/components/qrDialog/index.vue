<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-20 13:30:03
 * @LastEditors: June
 * @LastEditTime: 2023-01-20 21:24:47
-->
<template>
    <el-dialog
        v-model="state.show"
        title="二维码预览"
        width="30%"
        @before-close="onDialogClose"
    >
        <ul class="flex row-around pt20">
            <li>
                <div class="flex-column row-center mb20">
                    <img
                        v-show="state.qrcodeBase64"
                        class="w200 h200 mb20"
                        :src="state.qrcodeBase64"
                    />
                    <span class="lb-1 f-h5-grey">请扫码预览H5商城</span>
                </div>
            </li>
            <li>
                <div class="flex-column row-center">
                    <img
                        v-show="state.WXCode"
                        class="w200 h200 mb20"
                        :src="state.WXCode"
                    />
                    <span class="lb-1 f-h5-grey">请扫码预览小程序商城</span>
                </div>
            </li>
        </ul>
        <div class="mt40">
            <el-input v-model="state.url" placeholder="请输入内容">
                <template #append
                    ><el-button
                        type="primary"
                        icon="el-icon-link"
                        @click="handleLink"
                    ></el-button
                ></template>
            </el-input>
            <h3 class="mt5 mb10 f12 f-h5-grey">
                H5商城链接，可跳转直接在浏览器查看
            </h3>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { createWXcode } from '@/apis/project';
import { viewUrl } from '@/config/constants';
import { debounce } from 'lodash-es';
import useProject from '@/store/modules/project';
import jrQrcode from 'jr-qrcode';

const projectStore = useProject();
const project = computed(() => projectStore.project);

const state = reactive({
    show: false,
    url: '',
    qrcodeBase64: '',
    WXCode: '',
});

const getqr = () => {
    state.url = `${viewUrl}pages/index/tabbar/home?id=${project.value.id}`;
    const options = {
        padding: 10, // 二维码四边空白（默认为10px）
        width: 160, // 二维码图片宽度（默认为256px）
        height: 160, // 二维码图片高度（默认为256px）
        reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
        background: '#ffffff', // 二维码背景颜色（默认白色）
        foreground: '#000000', // 二维码颜色（默认黑色）
    };
    state.qrcodeBase64 = jrQrcode.getQrBase64(state.url, options);
    console.log('预览地址:' + state.url);
};

const getWXqr = async () => {
    const { status, data } = await createWXcode({ id: project.value.id });
    if (status === '10000') {
        state.WXCode = data;
    }
};

const open = () => {
    state.show = true;
    getqr();
    getWXqr();
};
const onDialogClose = () => {
    state.show = false;
};
const handleLink = debounce(function () {
    state.url && window.open(state.url);
}, 300);
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
    display: none !important;
}
</style>
