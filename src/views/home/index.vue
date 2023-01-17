<template>
    <div class="wrap">
        home
        <span>d</span>
        <el-button>dd</el-button>
        <el-empty description="description" />
    </div>
</template>

<style lang="scss" scoped>
.wrap {
    background-color: salmon;
    & > span {
        color: blue;
    }
}
</style>
