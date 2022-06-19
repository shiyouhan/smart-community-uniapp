<template>
    <view>
        <view class="position-fixed top-0 w-100 top-nav">
            <view class="w-100 u-h-260">
                <image src="../../static/images/other/bank.png" class="w-100 h-100"></image>
            </view>
            <view class="flex justify-around u-font-14 u-m-b-36">
                <view class="flex align-center flex-column" @tap="goDetail(1)">
                    <image src="../../static/images/other/phone.png" class="w-56 my-18"></image>
                    <view>手机</view>
                </view>
                <view class="flex align-center flex-column" @tap="goDetail(2)">
                    <image src="../../static/images/other/computer.png" class="w-56 my-18"></image>
                    <view>电脑</view>
                </view>
                <view class="flex align-center flex-column" @tap="goDetail(3)">
                    <image src="../../static/images/other/game.png" class="w-56 my-18"></image>
                    <view>游戏</view>
                </view>
                <view class="flex align-center flex-column" @tap="goDetail(4)">
                    <image src="../../static/images/other/digital.png" class="w-56 my-18"></image>
                    <view>数码</view>
                </view>
                <view class="flex align-center flex-column" @tap="goDetail(5)">
                    <image src="../../static/images/other/tool.png" class="w-56 my-18"></image>
                    <view>工具</view>
                </view>
            </view>
        </view>

        <view class="u-m-t-520">
            <block v-for="(item, index) in list" :key="index">
                <fleagoods-list-item :item="item" :index="index">
                </fleagoods-list-item>
            </block>
            <!-- 无数据 -->
            <view v-if="list.length === 0" class="flex justify-center u-m-t-104">
                <image src="../../static/images/other/null.png" class="w-166"></image>
            </view>
        </view>

        <view class="position-fixed bottom-0 w-100 bottom-bar text-center">
            <view @tap="open('shelves')">
                <view class="iconfont icon-jiahao"></view>
                <view>立即上架</view>
            </view>
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
        onNavigationBarButtonTap(e) {
            uni.navigateTo({
                url: '../record/record'
            })
        },
        async onLoad() {
            uni.getSystemInfo({
                success: res => {
                    this.scrollH = res.windowHeight - uni.upx2px(101);
                }
            });
            uni.startPullDownRefresh();
            await this.getPosition();
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
            goDetail(i) {
                uni.navigateTo({
                    url: `../good-type/good-type?typeId=${i}`
                })
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
    .top-nav {
        margin-top: var(--window-top);
        background-color: $uni-bg-color-hover;
    }

    .bottom-bar {
        height: 120rpx;
        background: rgba(255, 255, 255, 0.7);
        color: $primary;

        .icon-jiahao {
            margin-top: -47rpx;
            font-size: 94rpx;
        }
    }
</style>
