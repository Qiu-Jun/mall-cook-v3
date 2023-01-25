/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-25 22:19:00
 * @LastEditors: June
 * @LastEditTime: 2023-01-25 22:29:15
 */
import { reactive, defineProps, computed, watch, watchEffect } from 'vue';

const schemaHook = () => {
    const props = defineProps({
        id: {},
        value: {
            type: String,
            default: '',
        },
        label: {
            type: String,
        },
        options: {
            type: Object,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {},
        },
    });
    const emits = defineEmits(['input', 'change']);
    const state = reactive({
        mValue: '',
        defaultOptions: {}, // 如有默认options配置，则在调用组件重新定义此变量
    });

    const mOptions = computed(() => {
        return {
            ...state.defaultOptions,
            ...props.options,
        };
    });

    watchEffect(() => {
        state.mValue = props.value;
    });

    watch(
        () => state.mValue,
        (newVal) => {
            emits('input', newVal);
            emits('change', newVal);
        },
    );

    return {
        props,
        state,
        mOptions,
    };
};

export default schemaHook;
