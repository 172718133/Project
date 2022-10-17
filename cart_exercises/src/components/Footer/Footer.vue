<template>
    <div class="footer_container">
        <div class="all_check">
            <span class="input-group-addon">
                <input
                    type="checkbox"
                    id="all"
                    :checked="isFull"
                    @change="allChecked"
                />
            </span>
            <label for="all">全选</label>
        </div>
        <div class="total">
            <div class="total_text">合计：</div>
            <div class="total_price">{{ total_price.toFixed(2) }}</div>
        </div>
        <div class="btn_pay">结算（{{ total_num }}）</div>
    </div>
</template>

<script>
export default {
    props: {
        isFull: {
            default: false,
            type: Boolean,
        },
        total_price: {
            default: 0,
            type: Number,
        },
        total_num: {
            default: 0,
            type: Number,
        },
    },
    methods: {
        allChecked(e) {
            // 子传父=>自定义事件
            this.$emit("isAllCheck", e.target.checked);
        },
    },
};
</script>

<style lang="less" scoped>
.footer_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    font-size: 14px;
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #ccc;
    .all_check {
        #all {
            margin-right: 6px;
        }
    }
    .total {
        display: flex;
        .total_price {
            color: #dc3545;
            font-weight: 800;
        }
    }
    .btn_pay {
        color: #fff;
        background-color: rgb(17, 115, 243);
        padding: 8px 16px;
        border-radius: 20px;
    }
}
</style>