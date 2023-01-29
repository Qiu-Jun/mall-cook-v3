<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-29 18:31:13
 * @LastEditors: June
 * @LastEditTime: 2023-01-29 22:43:22
-->
<template>
    <div ref="shapeRef" class="shape" @click.stop="setcurComponent(data)">
        <!-- 选中组件高亮 -->
        <div
            v-if="isCurComponent(props.data.id)"
            class="shape-solid event-none"
        ></div>

        <div class="shape-dashed event-none"></div>

        <!-- 组件工具栏 -->
        <div v-if="show" class="shape-tab" :style="{ right: getRightStyle() }">
            <template v-if="isCurComponent(props.data.id)">
                <i
                    class="icon icon-shanchu tab-icon f16"
                    @click.stop="
                        delComponent(content.model.componentList, props.data.id)
                    "
                ></i>
            </template>

            <span v-else>{{ props.data.label }}</span>
        </div>

        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => {
            //
        },
    },
});
console.log(props);
const show = ref(false);
const shapeRef = ref<any>(null);
const content: any = inject('content');

const getRightStyle = () => {
    let [width] = window.getComputedStyle(shapeRef.value).width.split('px');
    return `${-(360 - +width) / 2 - 86}px`;
};

const isCurComponent = (id: string) => {
    return content?.curComponent?.id == id;
};

const setcurComponent = (cmp: any) => {
    content.curComponent = cmp;
};

const delComponent = (list: [any], id: string) => {
    let index = list.reduce((pre, cur, i) => {
        return cur.id == id ? i : pre;
    }, -1);
    if (index >= 0) {
        list.splice(index, 1);
    } else {
        list.filter((c) => c.child).forEach((c) => {
            delComponent(c.child, id);
        });
    }
};

onMounted(() => {
    show.value = true;
});
</script>

<style lang="scss" scoped>
.shape {
    position: relative;

    &:hover > .shape-dashed {
        display: block;
    }

    .shape-dashed {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: dashed 1px $color-theme;
        z-index: 100;
    }

    .shape-solid {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: solid 2px $color-theme;
        z-index: 100;
    }

    .shape-tab {
        position: absolute;
        top: 0; /*no*/
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px; /*no*/
        height: 24px; /*no*/
        font-size: 12px; /*no*/
        color: #333;
        background: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &::after {
            content: '';
            position: absolute;
            right: 100%; /*no*/
            top: 7px; /*no*/
            width: 0; /*no*/
            height: 0; /*no*/
            border-width: 5px; /*no*/
            border-style: solid;
            border-color: transparent;
            margin-bottom: -1px; /*no*/
            border-right-width: 5px; /*no*/
            border-right-color: currentColor;
            color: #fff;
        }
    }

    .event-none {
        pointer-events: none;
    }

    .tab-icon {
        color: #969799;
        cursor: pointer;

        &:hover {
            color: #87888a;
        }
    }
}
</style>
