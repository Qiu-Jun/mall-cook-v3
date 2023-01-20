<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-20 13:29:28
 * @LastEditors: June
 * @LastEditTime: 2023-01-20 21:56:07
-->
<template>
    <div class="RealTimeView">
        <el-dialog
            v-if="props.show"
            v-model="state.mShow"
            append-to-body
            width="415px"
            top="8vh"
        >
            <phone-ctn :head="false">
                <iframe
                    v-show="props.show"
                    id="cover"
                    ref="iframeRef"
                    class="screen"
                    scrolling="no"
                    :src="iframeSrc"
                    @load="load"
                ></iframe>
            </phone-ctn>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, nextTick, watch } from 'vue';
import useProject from '@/store/modules/project';
import { viewUrl } from '@/config/constants';

const projectStore = useProject();
const project = computed(() => projectStore.project);
const iframeSrc = computed(
    () => `${viewUrl}pages/index/tabbar/home?operate=realTime`,
);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});

const state = reactive({
    mShow: true,
});
const iframeRef = ref<HTMLElement | any>();

const load = () => {
    nextTick(() => {
        iframeRef.value?.contentWindow.postMessage(project, '*');
    });
};
</script>

<style lang="scss" scoped>
:deep(.ctn) {
    margin: 0;

    .ctn-height-tag {
        display: none;
    }
}

.screen {
    width: 375px /*no*/;
    height: 667px /*no*/;
    border: 0;

    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
}

:deep(.PhoneCtn) {
    width: 414px;
    margin: 0;

    .preview-height-tag {
        display: none;
    }

    .preview-body {
        height: 667px;
        // 隐藏滚动条
    }
}
</style>
