<template>
    <div class="app_container">
        <Header title="购物车"></Header>
        <Goods
            v-for="item in goods"
            :key="item.id"
            :id="item.id"
            :name="item.goods_name"
            :pic="item.goods_img"
            :price="item.goods_price"
            :state="item.goods_state"
            :count="item.goods_count"
            @stateChange="getNewState"
        ></Goods>
        <Footer
            :isFull="fullCheck"
            :total_price="totalPrice"
            :total_num="totalNum"
            @isAllCheck="getIsAll"
        ></Footer>
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Goods from "@/components/Goods/Goods.vue";
import Counter from "@/components/Counter/Counter.vue";
import Footer from "@/components/Footer/Footer.vue";
// 引入 axios 包
import axios from "axios";
// 引入 eventBus.js
import bus from "@/components/eventBus.js";
export default {
    components: {
        Header,
        Goods,
        Counter,
        Footer,
    },
    data() {
        return {
            goods: [],
        };
    },
    computed: {
        fullCheck() {
            return this.goods.every((item) => item.goods_state);
        },
        totalPrice() {
            return this.goods
                .filter((item) => item.goods_state)
                .reduce((price, item) => {
                    return (price += item.goods_price * item.goods_count);
                }, 0);
        },
        totalNum() {
            return this.goods
                .filter((item) => item.goods_state)
                .reduce((num, item) => {
                    return (num += item.goods_count);
                }, 0);
        },
    },
    methods: {
        // 初始化获取商品列表数据
        async initGoodsList() {
            // 发送请求将 data 数据解构赋值给 res
            const { data: res } = await axios.get(
                "https://www.escook.cn/api/cart"
            );
            // 将解构赋值后的res数据赋值给 goods数组
            this.goods = res.list;
        },
        // 自定义事件，接收最近的勾选状态
        getNewState(val) {
            this.goods.some((item) => {
                // 查找传过来的id对应的item数据项
                if (item.id === val.id) {
                    // 找到对应的数据项，赋值最新的勾选状态
                    item.goods_state = val.value;
                    // 停止循环
                    return true;
                }
            });
        },
        // 自定义事件，接收全选按钮的勾选状态
        getIsAll(val) {
            this.goods.forEach((item) => (item.goods_state = val));
        },
    },
    created() {
        this.initGoodsList();
        bus.$on("share", (val) => {
            this.goods.some((item) => {
                if (item.id === val.id) {
                    item.goods_count = val.value;
                }
            });
        });
    },
};
</script>

<style lang="less" scoped>
.app_container {
    // position: relative;
    padding: 45px 0 50px 0;
}
</style>
