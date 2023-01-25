<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-24 12:52:18
 * @LastEditors: June
 * @LastEditTime: 2023-01-24 22:56:13
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
        :before-close="onClick"
    >
        <div style="height: 700px">
            <div id="tui-image-editor"></div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="onClick">取消</el-button>
                <el-button type="primary" @click="onClick"> 确认 </el-button>
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

const onClick = () => {
    state.show = false;
};

const initImgEditor = () => {
    nextTick(() => {
        const instance = new ImageEditor(
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
