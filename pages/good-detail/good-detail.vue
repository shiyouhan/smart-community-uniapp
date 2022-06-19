<template>
    <view class="px-2">
        <divider></divider>
        <view class="bg-white rounded-top py-2 pl-2 border-bottom">
            <!-- 商家信息-->
            <view class="flex">
                <image :src="market.avatar" class=" u-w-84 u-h-84 rounded-circle"></image>
                <view class="pl-2">
                    <view class="fw-900">
                        {{market.username}}
                    </view>
                    <view class="text-grey font" v-if="market.fleaMarketGoods">
                        地址：{{market.fleaMarketGoods.address}}
                    </view>
                </view>
            </view>
        </view>

        <!-- 商品信息 -->
        <view class="bg-white rounded-bottom p-2 u-p-b-90">
            <view class="h3 fw-900" v-if="market.fleaMarketGoods">
                {{market.fleaMarketGoods.name}}
            </view>
            <view class="pb-2 text-base" v-if="market.fleaMarketGoods">
                {{market.fleaMarketGoods.content}}
            </view>
            <image mode="widthFix" style="width: 100%;margin: 0 auto;" v-if="market.fleaMarketGoods"
                :src="market.fleaMarketGoods.thumbnail"></image>
        </view>
        <view class="flex align-center justify-between u-h-90 bg-white fixed-bottom">
            <view class="u-m-l-38 flex align-center">
                <view class="iconfont icon-shoucang1 u-p-r-19" :class="isMarked ? 'text-theme' : 'text-light-grey'"
                    @tap="changeCollect"></view>
                <view class="u-font-16">想要</view>
            </view>
            <view class="u-w-154 u-h-64 u-line-35 text-white bg-theme text-center rounded u-m-r-22">立即联系
            </view>
        </view>
    </view>
</template>

<script>
    import {
        getDetail,
        addMaCollect,
        delMaCollect
    } from '@/api/market'

    export default {
        data() {
            return {
                market: [],
                id: 0,
                isMarked: false
            };
        },
        onLoad(option) {
            this.id = Number(option.id)
            this.getPosition()
            this.load(this.id);
        },
        onShow() {
            this.getPosition()
        },
        methods: {
            // 加载商品数据
            async load(e) {
                const res = await getDetail(e)
                if (res.code === 200) {
                    this.market = res.data
                    this.isMarked = this.market.isMarked
                }
            },
            // 改变收藏
            async changeCollect() {
                if (this.isMarked) {
                    const res = await delMaCollect(this.id)
                    if (res.code === 200) {
                        this.$msg.toast('取消收藏')
                        this.load(this.id)
                    } else {
                        this.$msg.toast(res.message, 'err')
                        return false
                    }
                } else {
                    const res = await addMaCollect(this.id)
                    if (res.code === 200) {
                        this.$msg.toast('收藏成功', 'suc')
                        this.load(this.id)
                    } else {
                        this.$msg.toast(res.message, 'err')
                        return false
                    }
                }
            },
            // 获取用户当前定位
            getPosition() {
                uni.getLocation({
                    type: 'wgs84',
                    success: function(res) {
                        let position = res.longitude + '|' + res.latitude;
                        this.position = position;
                        uni.setStorageSync("position", this.position)
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
