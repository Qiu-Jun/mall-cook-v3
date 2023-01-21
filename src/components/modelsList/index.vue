<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 22:16:16
 * @LastEditors: June
 * @LastEditTime: 2023-01-21 23:02:53
-->
<template>
    <div>
        <div class="wrap">
            <!-- 行业分类 -->
            <ul class="wrap-head" @click="onTab">
                <li
                    v-for="(item, index) in state.industryList"
                    :key="index"
                    class="wrap-head-item"
                    :class="[
                        item.value === state.industry ? 'wrap-head-active' : '',
                    ]"
                    :data-value="item.value"
                >
                    {{ item.label }}
                </li>
            </ul>
            <!-- 模板列表 -->
            <div v-loading="state.loading">
                <ul v-if="state.list.length" class="wrap-list">
                    <li
                        v-for="model in state.list"
                        :key="model.id"
                        class="model"
                    >
                        <img class="model-img" :src="model.cover" />
                        <div class="model-desc">
                            <h3 class="mt5 f14">{{ model.name }}</h3>
                            <!-- <div class="mt10 f12 f-grey">设计师：{{ userInfo.userName }}</div> -->
                            <el-tag effect="plain" size="small" class="mt5">
                                {{ getlIndustryName(model.industry) }}
                            </el-tag>
                        </div>

                        <div class="model-qr">
                            <img class="w90 mb5" :src="getQr(model.id)" />
                            <span>扫码预览</span>
                        </div>

                        <span class="model-btn" @click="useModel(model)"
                            >使用模板</span
                        >
                    </li>
                </ul>

                <!-- 空列表 -->
                <el-empty v-else class="mt80">
                    <template #description>
                        <span class="f13 f-grey">{{ `没有此类型模板哦` }}</span>
                    </template>
                </el-empty>
            </div>
        </div>
        <div class="flex-center mt50">
            <el-pagination
                background
                :page-size="state.paginationForm.pageSize"
                layout="total, prev, pager, next"
                :total="state.paginationForm.total"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { getModelList, getProjectById } from '@/apis/project';
import { mallIndustryList, mallTypeList } from '@/config/mall';
import { debounce } from 'lodash';
import jrQrcode from 'jr-qrcode';
import { viewUrl } from '@/config/constants';

const state = reactive<any>({
    loading: false,
    industry: 'all',
    list: [],
    industryList: [{ label: '全部', value: 'all' }, ...mallIndustryList],
    paginationForm: {
        page: 1,
        total: 0,
        pageSize: 10,
    },
});

const onTab = debounce(function (e: any) {
    const dataset = e.target?.dataset || e.srcElement?.dataset;
    if (!dataset || !dataset.value || dataset.value === state.industry) return;
    state.industry = dataset.value;
    state.paginationForm.page = 1;
    modelList();
});

// 模板商城暂时只展示自己的
const modelList = async () => {
    state.loading = true;
    const { list, totalCount } = await getModelList({
        industry: state.industry === 'all' ? '' : state.industry,
        pagination: state.paginationForm,
    });
    state.list = list;
    state.paginationForm.total = totalCount;
    state.loading = false;
};

const getlIndustryName = (target: any) => {
    let industryMap = mallIndustryList.reduce((pre, cur) => {
        pre.set(cur.value, cur.label);
        return pre;
    }, new Map());
    return industryMap.get(target);
};

const getQr = (id: string) => {
    const url = `${viewUrl}pages/index/tabbar/home?id=${id}`;
    const options = {
        padding: 0, // 二维码四边空白（默认为10px）
        width: 180, // 二维码图片宽度（默认为256px）
        height: 180, // 二维码图片高度（默认为256px）
        reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
        background: '#ffffff', // 二维码背景颜色（默认白色）
        foreground: '#000000', // 二维码颜色（默认黑色）
    };
    return jrQrcode.getQrBase64(url, options);
};

const handleCurrentChange = () => {
    console.log('d');
};

const useModel = debounce(function (data: any) {
    console.log('ss');
}, 300);

modelList();
</script>

<style lang="scss" scoped>
:deep(.el-button) {
    background: $color-theme;
}

.el-tag {
    color: $color-theme;
    border-color: $color-theme;
}

.wrap {
    margin-top: 20px;

    .wrap-head {
        display: flex;
        margin-bottom: 10px;

        .wrap-head-item {
            padding: 8px 12px;
            margin: 0 8px 8px 0;
            background: #f2f2f6;
            border-radius: 4px;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
        }

        .wrap-head-active {
            color: $color-theme;
            background: rgba(37, 137, 255, 0.1);
        }
    }

    .wrap-list {
        height: 65vh;
        overflow: auto;

        .model {
            position: relative;
            display: inline-block;
            width: 220px;
            max-height: 380px;
            margin: 0 20px 20px 0;
            border: 1px solid #e9e9e9;
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;

            .model-img {
                width: 100%;
                min-height: 400px;
            }

            .model-desc {
                position: absolute;
                left: 0;
                bottom: -30px;
                width: 100%;
                height: 90px;
                padding: 10px;
                background: hsla(0, 0%, 100%, 0.95);
                font-size: 12px;
                color: #333;
                transition: all 0.3s;
                z-index: 10;
            }

            .model-qr {
                display: none;
                position: absolute;
                top: 20%;
                left: 50%;
                width: 110px;
                padding: 10px;
                border-radius: 6px;
                transform: translateX(-50%);
                background: #fff;
                font-size: 12px;
                text-align: center;
                color: #595961;
                z-index: 10;
            }

            .model-btn {
                display: none;
                position: absolute;
                top: 56%;
                left: 50%;
                width: 110px;
                height: 28px;
                line-height: 28px;
                border-radius: 4px;
                transform: translateX(-50%);
                background: $color-theme;
                font-size: 12px;
                color: #fff;
                text-align: center;
                z-index: 10;
            }

            &:hover {
                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #68656530;
                    z-index: 1;
                    transition: all 0.3s;
                }

                .model-desc {
                    bottom: 0px;
                }

                .model-btn,
                .model-qr {
                    display: inline-block;
                }
            }
        }
    }
}
</style>
