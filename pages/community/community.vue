<template>
    <view>
        <image class="width-100 u-abso u-h-308" src="../../static/images/other/yinhang.png" mode=""></image>

        <view class="u-rela top-320">
            <view class="flex justify-around">
                <view class="flex align-center flex-column" @tap="open('transaction')">
                    <image class="w-64 u-m-b-28" src="../../static/images/other/community_service_03.png"></image>
                    <view class="u-font-14">房产交易</view>
                </view>
                <view class="flex align-center flex-column" @tap="open('market')">
                    <image class="w-64 u-m-b-28" src="../../static/images/other/community_service_05.png"></image>
                    <view class="u-font-14">跳蚤市场</view>
                </view>
                <view class="flex align-center flex-column" @tap="open('business')">
                    <image class="w-64 u-m-b-28" src="../../static/images/other/community_service_07.png"></image>
                    <view class="u-font-14">小区商家</view>
                </view>
            </view>
        </view>

        <view class="u-m-t-374">
            <view class="u-font-16 u-m-l-24 u-m-t-54 u-m-b-22">热门推荐</view>

            <block v-for="(item, index) in list" :key="index">
                <fleagoods-list-item :item="item" :index="index">
                </fleagoods-list-item>
            </block>
        </view>
    </view>
</template>

<script>
    import {
        getOrder
    } from '@/api/market'

    import fleagoodsListItem from "@/components/common/fleagoods-list-item.vue"
    export default {
        components: {
            fleagoodsListItem
        },
        data() {
            return {
                list: [],
                pageNum: 1,
                sizeNum: 6,
                more: true
            }
        },
        onLoad() {
            uni.getSystemInfo({
                success: res => {
                    this.scrollH = res.windowHeight - uni.upx2px(101);
                }
            });
            setTimeout(function() {}, 1000);
            uni.startPullDownRefresh();
            this.getPosition()
            this.load();
        },
        onShow() {
            this.getPosition()
        },
        onReachBottom() {
            if (!this.more) {
                uni.showToast({
                    title: '已经是底部了',
                    duration: 1000
                });
                return false;
            }
            this.pageNum = this.pageNum + 1;
            uni.showLoading({
                title: '加载中'
            });
            let params = {
                page: this.pageNum,
                size: this.sizeNum
            };
            getOrder(params).then(res => {
                setTimeout(() => {
                    uni.hideLoading();
                }, 100);
                this.list = this.list.concat(res.data);
                if (res.data.length < this.sizeNum && this.pageNum > 0) {
                    this.more = false;
                }
            });
        },
        // 下拉刷新，要将当前页码重置为1，more属性回归撑true
        onPullDownRefresh() {
            this.pageNum = 1;
            this.more = true;
            this.load()
            // 1秒没下拉复原
            setTimeout(function() {
                uni.stopPullDownRefresh();
            }, 1000);
        },
        methods: {
            load() {
                const data = {
                    page: this.pageNum,
                    size: this.sizeNum
                };
                getOrder(data).then((res) => {
                    if (res.code === 200) {

                        this.list = res.data
                    }
                })
            },
            open(path) {
                uni.navigateTo({
                    url: `../${path}/${path}`
                })
            },
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
