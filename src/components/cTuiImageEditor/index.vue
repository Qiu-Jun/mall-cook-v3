<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-24 12:52:18
 * @LastEditors: June
 * @LastEditTime: 2023-01-28 19:20:45
-->
<template>
    <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png"
        :on-change="onChange"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
    >
        <img v-if="state.imageUrl" :src="state.imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-dialog
        v-model="state.show"
        title="编辑图片"
        width="50%"
        :before-close="onClose"
    >
        <div style="height: 700px">
            <div id="tui-image-editor"></div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="onClose">取消</el-button>
                <el-button type="primary" @click="onConfirm"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, nextTick } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import ImageEditor from 'tui-image-editor';
import { ElMessage } from 'element-plus';
import { locale_zh } from './lang/zh';
import customTheme from './styles/customTheme';
import 'tui-image-editor/dist/tui-image-editor.css';
import { upload } from '@/apis/utils';
import { fileToBlob, toBinary } from '@/utils/file';

const state = reactive({
    show: false,
    imageUrl: '',
});

const onChange = (file) => {
    if (!file || !file.raw) return;
    state.imageUrl = URL.createObjectURL(file.raw);
    onOpen();
    initImgEditor();
};

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('Avatar picture size can not exceed 2MB!');
        return false;
    }
    return true;
};

const onOpen = () => {
    state.show = true;
};

const onClose = () => {
    state.show = false;
};

let instance = null;

const initImgEditor = () => {
    nextTick(() => {
        // var file_name=file_path.replace(/(.*\/)*([^.]+).*/ig,"$2");
        instance = new ImageEditor(
            document.querySelector('#tui-image-editor'),
            {
                usageStatistics: false,
                includeUI: {
                    loadImage: {
                        path: state.imageUrl, //加载的图片链接
                        name: 'image', //图片名称（不重要）
                    },
                    initMenu: 'draw',
                    menuBarPosition: 'left', //操作栏位置
                    locale: locale_zh, //语言
                    theme: customTheme, //主题样式
                },
                cssMaxWidth: 700, //宽
                cssMaxHeight: 900, //高
            },
        );
    });
};

function getFile(dataurl, filename = 'file') {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let suffix = mime.split('/')[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
    });
}

const onConfirm = async () => {
    const base64String = instance?.toDataURL();
    const file = getFile(base64String);
    console.log(file);

    // const data = window.atob(base64String.split(',')[1]);
    // const ia = new Uint8Array(data.length);
    // for (let i = 0; i < data.length; i++) {
    //     ia[i] = data.charCodeAt(i);
    // }
    // const file = new File([ia], '333', { type: 'image/png' });

    upload({ file })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
    width: 72px;
    height: 72px;
}
:deep(.tui-image-editor-container) {
    height: 700px;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 72px;
    height: 72px;
    text-align: center;
}
</style>
