<template>
    <div>
        <!-- 搜索框 -->
        <div class="sercarh">
            <div class="sercarh-body">
                <i class="el-icon-search mr5"></i>
                请输入关键词
            </div>
            <div class="sercarh-btn">搜索</div>
        </div>

        <!-- 热门搜索 -->
        <div class="pl15 pr15 mt10 f14">
            <div>热门搜索</div>
            <ul class="flex flex-wrap">
                <li
                    v-for="(item, index) in project.config.hotList"
                    :key="index"
                    class="hot flex-center"
                    @click="onHot(item)"
                >
                    <img
                        src="https://b.yzcdn.cn/search-page/hot-fire.png"
                        alt=""
                    />
                    <span>
                        {{ item.value }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useProject from '@/store/modules/project';
import { useRouter } from 'vue-router';

const projectStore = useProject();
const project = computed(() => projectStore.project);
const router = useRouter();

const onHot = (item: any) => {
    router.push({ path: 'goodsList', query: { search: item.value } });
};
</script>

<style lang="scss" scoped>
.hot {
    margin: 8px 8px 0px 0;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    color: #f44;
    border-color: rgba(254, 68, 68, 0.1);
    border: 1px solid #ebedf0;

    img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }
}

.sercarh {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    .sercarh-body {
        display: flex;
        align-items: center;
        width: 330px;
        height: 30px;
        margin: 0 6px 0 12px;
        padding-left: 9px;
        background: #f7f8fa;
        border-radius: 15px;
        color: #d6d6d9;
        font-size: 13px;
    }

    .sercarh-btn {
        width: 48px;
        height: 26px;
        color: #fff;
        border-radius: 13px;
        line-height: 26px;
        font-size: 12px;
        text-align: center;
        background: linear-gradient(90deg, #ef4c2d, #d40908);
        cursor: pointer;
    }
}
</style>
