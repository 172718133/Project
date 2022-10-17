<template>
    <div class="count_container">
        <div class="btn less" @click="less">-</div>
        <div class="num">{{ num }}</div>
        <div class="btn add" @click="add">+</div>
    </div>
</template>

<script>
import bus from "@/components/eventBus.js";
export default {
    props: {
        num: {
            default: 1,
            type: Number,
        },
        id: {
            default: 1,
            type: Number,
        },
    },
    methods: {
        // 触发+1事件时，使用eventBus，将+1之后的数量传给父组件（app）
        add() {
            // 若使用this.num += 1，会报错不能修改props里面的属性的值
            const obj = { id: this.id, value: this.num + 1 };
            bus.$emit("share", obj);
        },
        less() {
            const obj = { id: this.id, value: this.num - 1 };
            bus.$emit("share", obj);
        },
    },
};
</script>

<style lang="less" scoped>
.count_container {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.num {
    padding: 2px 10px;
    border-radius: 2px;
    border: 1px solid #ccc;
}
.btn {
    width: 30px;
    // line-height: 30px;
    font-size: 20px;
    margin: 0;
    padding: 0;
}
</style>