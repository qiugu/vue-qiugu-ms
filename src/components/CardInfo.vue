<template>
    <div class="card">
        <el-row :gutter="30">
            <el-col :span="8" v-for="(card, index) in cards" :key="index" class="card-item">
                <i class="fa" :class="card.icon"></i>
                <div class="right-card">
                    <h2>{{card.amount}}</h2>
                    <span>{{card.title}}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'CardInfo',
  computed: {
    cards () {
      return this.$store.state.cards
    }
  }
}
</script>

<style lang="less" scoped>
    .card-item {
        display: flex;
        align-items: center;
        height: 100px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .fa {
        text-align: center;
        color: #fff;
        display: inline-block;
        flex: 1;
        font-size: 40px;
        height: 100%;
        border-radius: 10px 0 0 10px;
        cursor: pointer;
        &::before {
            display: inline-block;
            line-height: 100px;
        }
    }
    .fa.fa-hourglass-end {
        background: #1f84f4;
        &:hover {
            background: #fff;
            color: #1f84f4;
        }
    }
    .fa.fa-tags {
        background: #00e072;
        &:hover {
            background: #fff;
            color: #00e072;
        }
    }
    .fa.fa-shopping-bag {
        background: #ff4e21;
        &:hover {
            background: #fff;
            color: #ff4e21;
        }
    }
    .right-card {
        flex: 1.5;
        background: #fff;
        padding-top: 20px;
        box-sizing: border-box;
        text-align: center;
        height: 100px;
        border-radius: 0 10px 10px 0;
        & h2 {
            margin: 0;
        }
        & span {
            color: #999;
        }
    }
</style>
