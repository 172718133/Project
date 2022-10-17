<template>
    <div class="goods_container">
        <div class="goods_item">
            <!-- <input type="checkbox" :checked="state"/> -->
            <span class="input-group-addon">
                <input type="checkbox" :checked="state" @change="stateChange" />
            </span>
            <a href="javascript:;">
                <div class="goods_img">
                    <img class="img" :src="pic" alt="" />
                </div>
                <div class="goods_info">
                    <div class="goods_title">{{ name }}</div>
                    <div class="num">
                        <div class="goods_price">￥{{ price }}</div>
                        <Counter :num="count" :id="id"></Counter>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
import Counter from "@/components/Counter/Counter.vue";
export default {
    props: {
        id: {
            default: "",
            type: Number,
        },
        pic: {
            default: "",
            type: String,
        },
        price: {
            default: 0,
            type: Number,
        },
        name: {
            default: "",
            type: String,
        },
        state: {
            default: false,
            type: Boolean,
        },
        count: {
            default: 1,
            type: Number,
        },
    },
    methods: {
        // 勾选框触发change事件
        stateChange(e) {
            // console.log(this);
            // console.log(e);
            // 定义要发送的数据：勾选数据项的id，最新的勾选状态
            const obj = { id: this._props.id, value: e.target.checked };
            // 自定义事件，使用this.$emit(事件名称，传送的数据)
            this.$emit("stateChange", obj);
        },
    },
    components: {
        Counter,
    },
};
</script>

<style lang="less" scoped>
.goods_item {
    padding: 10px;
    display: flex;
    align-items: center;
    height: 140px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    a {
        display: flex;
        text-decoration: none;
        font-size: 14px;
        color: #000;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-weight: bold;
        .goods_img {
            // height: 120px;
            // width: 120px;
            margin: 0 10px;
            .img {
                height: 120px;
                width: 120px;
                // width: 100%;
                // height: 100%;
            }
        }
        .goods_info {
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            .goods_title {
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .num {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .goods_price {
                    color: #dc3545;
                    font-weight: 800;
                }
            }
        }
    }
}
.goods_item:last-child {
    border-bottom: none;
}
</style>
