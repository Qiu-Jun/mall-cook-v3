<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-01-23 22:07:53
 * @LastEditors: June
 * @LastEditTime: 2023-01-23 22:43:00
-->
<template>
    <MiniMCE :options="{ language: 'zh-Hans' }" />
</template>

<script setup>
// import 'minimce/dist/style.css';
import MiniMCE from 'minimce';

// 在组件外部引入静态资源的目的是方便用户对其进行更换
import 'tinymce/skins/ui/oxide/skin.min.css'; // 皮肤
import 'tinymce/themes/silver/theme'; // 主题
import 'tinymce/icons/default/icons'; // 图标
import './langs/zh-Hans.js'; // 语言（非必须，默认英文，下载地址：https://www.tiny.cloud/get-tiny/language-packages）
</script>
