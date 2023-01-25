<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-21 14:31:11
 * @LastEditors: June
 * @LastEditTime: 2023-01-24 13:00:39
-->
<template>
    <div class="m20 p20 bg-white">
        <el-form
            ref="form"
            label-position="right"
            label-width="120px"
            :model="state.form"
            size="small"
            class="mb50"
        >
            <el-form-item label="商品名：" prop="name" :verify="{ maxLen: 30 }">
                <el-input v-model="form.name" style="width: 500px"></el-input>
                <div class="f12 f-grey">商品名称，建议30字以内</div>
            </el-form-item>
            <el-form-item
                label="商品描述："
                prop="describe"
                :verify="{ maxLen: 60 }"
            >
                <el-input
                    v-model="form.describe"
                    style="width: 500px"
                ></el-input>
                <div class="f12 f-grey">
                    在商品详情页标题下面展示卖点信息，建议60字以内
                </div>
            </el-form-item>
            <el-form-item label="商品封面：" prop="cover" verify>
                <c-tui-image-editor />
                <!-- <Imgpond v-model="form.cover" :count="1" /> -->
                <div class="f12 f-grey">建议尺寸：800*800像素</div>
            </el-form-item>
            <el-form-item label="商品图：" prop="imgList" verify>
                <!-- <Imgpond v-model="form.imgList" :count="10" /> -->
                <div class="f12 f-grey">
                    建议尺寸：800*800像素，你可以拖拽图片调整顺序，最多上传10张
                </div>
            </el-form-item>
            <el-form-item
                label="价格："
                prop="price"
                :verify="{ gte: 0, type: '数字' }"
            >
                <el-input v-model="form.price" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item
                label="划线价："
                prop="originalPrice"
                :verify="{ gte: 0, type: '数字' }"
            >
                <el-input
                    v-model="form.originalPrice"
                    style="width: 150px"
                ></el-input>
            </el-form-item>
            <!-- <el-form-item
        label="库存："
        prop="inventory"
        :verify="{gte:1,lte:10000,type:'数字'}"
      >
        <el-input
          v-model="form.inventory"
          style="width:150px"
        ></el-input>
      </el-form-item> -->
            <el-form-item label="商品详情：">
                <cMiniMCE v-model="form.richText" style="width: 800px" />
            </el-form-item>
        </el-form>

        <div class="operation">
            <el-button
                size="small"
                class="f-white bg-theme"
                @click="handleSubmit"
                >保存商品</el-button
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { addGoods, editGoods } from '@/apis/goods';
import useProject from '@/store/modules/project';
import { debounce } from 'lodash-es';
import cMiniMCE from '@/components/cMiniMCE/index.vue';

const route = useRoute();
const projectStore = useProject();
const project = computed(() => projectStore.project);
const state = reactive<any>({
    form: {},
});

const form: any = route.params;
form.price = form.price ? form.price / 100 : 0;
form.originalPrice = form.originalPrice ? form.originalPrice / 100 : 0;
state.form = { ...form };

const handleSubmit = debounce(function () {
    console.log('a');
}, 300);

const onClick = (e: any, editor: any) => {
    console.log(e, editor);
};
</script>

<style lang="scss" scoped>
.operation {
    position: fixed;
    bottom: 0px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 1612px;
    box-shadow: 0 -3px 5px #eee;
    background: #fff;
}
</style>
