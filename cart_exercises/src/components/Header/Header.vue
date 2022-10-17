<template>
    <div class="header_container">
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            default: "",
            type: String,
        },
    },
};
</script>

<style lang="less" scoped>
.header_container {
    width: 100%;
    position: fixed;
    margin-top: -45px;
}
.title {
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: rgb(17, 115, 243);
    color: #fff;
}
</style>