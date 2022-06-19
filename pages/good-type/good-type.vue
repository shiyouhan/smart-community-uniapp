<template>
    <view>
        <divider></divider>
        <view class="bg-white filter-bar position-fixed top-0 w-100 flex text-center">
            <view class="flex-1 flex justify-center align-center" :class="{active: this.last >= 0}" @tap="openTime()">
                <view>
                    {{timeTip}}
                </view>
                <view class="iconfont icon-xiajiantoushixinxiao"></view>
            </view>
            <view class="flex-1 flex justify-center align-center">
                <view>
                    {{priceTip}}
                </view>
                <view class="mt-2">
                    <view v-for="(item, index) in priceIcon" :key="index" class="iconfont" :class="item.icon"
                        :style="{color: (item.checked ? '#f5820f' : '')}" style="margin-top: -20rpx;"
                        @tap="changePrice(index)">
                    </view>
                </view>
            </view>
            <view class="flex-1 flex justify-center align-center">
                <view class="">
                    筛选
                </view>
                <view class="iconfont icon-shaixuan ml-1"></view>
            </view>
        </view>

        <view class="u-m-t-100">
            <block v-for="(item, index) in list" :key="index">
                <fleagoods-list-item :item="item" :index="index">
                </fleagoods-list-item>
            </block>
            <!-- 无数据 -->
            <view v-if="list.length === 0" class="flex justify-center u-m-t-104">
                <image src="../../static/images/other/null.png" class="w-166"></image>
            </view>
        </view>

        <uni-popup class="popup" ref="timePopup" type="top">
            <view v-for="(item, index) in timeArr" :key="index" class="u-p-20" @tap="timePopupEvent(item)">
                <view :class="{active: item.checked}" class="flex justify-between">
                    <view class="">
                        {{item.label}}
                    </view>
                    <view v-if="item.checked" class="iconfont icon-duigou font-weight-bolder"></view>
                </view>
            </view>
        </uni-popup>

        <uni-popup class="popup" ref="pricePopup" type="top">
            <view v-for="(item, index) in priceArr" :key="index" class="u-p-20" @tap="pricePopupEvent(item)">
                <view :class="{active: item.checked}" class="flex justify-between">
                    <view class="">
                        {{item.label}}
                    </view>
                    <view v-if="item.checked" class="iconfont icon-duigou font-weight-bolder"></view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import {
        getTypegood
    } from '@/api/market'

    import uniPopup from "@/components/uni/uni-popup/uni-popup.vue"
    import fleagoodsListItem from "@/components/common/fleagoods-list-item.vue"
    export default {
        components: {
            fleagoodsListItem,
            uniPopup
        },
        data() {
            return {
                // 页面标题
                title: '',
                // 类型id
                typeId: 0,
                // 价格
                price: 0,
                priceTip: '价格',
                // 时间
                last: 0,
                timeTip: '默认',
                // 页数
                page: 1,
                // 每页条数
                size: 10,
                priceOrder: null,
                // 数据列表
                list: [],
                timeArr: [{
                    label: '默认',
                    value: 0,
                    checked: true
                }, {
                    label: '最新',
                    value: 0,
                    checked: false
                }, {
                    label: '最近',
                    value: 1,
                    checked: false
                }],
                priceArr: [{
                    label: '降序',
                    value: 1,
                    checked: false
                }, {
                    label: '升序',
                    value: 0,
                    checked: false
                }],
                priceIcon: [{
                    icon: 'icon-shangjiantoushixinxiao',
                    value: 1,
                    checked: false
                }, {
                    icon: 'icon-xiajiantoushixinxiao',
                    value: 0,
                    checked: false
                }],
                more: true
            }
        },
        onLoad(option) {
            uni.getSystemInfo({
                success: res => {
                    this.scrollH = res.windowHeight - uni.upx2px(101);
                }
            });
            this.typeId = Number(option.typeId)
            this.setTitle(this.typeId)
            uni.startPullDownRefresh();
            this.getPosition();
            this.load();
        },
        // 下拉刷新，要将当前页码重置为1，more属性回归成true
        onPullDownRefresh() {
            this.page = 1;
            this.more = true;
            this.load()
            // 1秒没下拉复原
            setTimeout(function() {
                uni.stopPullDownRefresh();
            }, 1000);
        },
        onReachBottom() {
            if (!this.more) {
                uni.showToast({
                    title: '已经是底部了',
                    duration: 1000
                });
                return false;
            }
            this.page = this.page + 1;
            uni.showLoading({
                title: '加载中'
            });
            getTypegood(this.typeId, this.price, this.last, this.page, this.size).then(res => {
                setTimeout(() => {
                    uni.hideLoading();
                }, 100);
                this.list = this.list.concat(res.data);
                if (res.data.length < this.size && this.page > 0) {
                    this.more = false;
                }
            });
        },
        methods: {
            setTitle(type) {
                switch (type) {
                    case 1:
                        this.title = '手机'
                        break;
                    case 2:
                        this.title = '电脑'
                        break;
                    case 3:
                        this.title = '游戏'
                        break;
                    case 4:
                        this.title = '数码'
                        break;
                    case 5:
                        this.title = '工具'
                        break;
                    default:
                        break;
                }
                // 动态设置当前页面的标题
                uni.setNavigationBarTitle({
                    title: this.title
                });
            },
            // 获取商品数据
            load() {
                getTypegood(this.typeId, this.price, this.last, this.page, this.size).then((res) => {
                    if (res.code === 200) {
                        this.list = res.data
                    }
                })
            },
            onShow() {
                this.getPosition()
            },
            // 弹窗关闭打开
            openTime() {
                this.closePrice()
                this.$refs.timePopup.open()
            },
            openPrice() {
                this.closeTime()
                this.$refs.pricePopup.open()
            },
            closeTime() {
                this.$refs.timePopup.close()
            },
            closePrice() {
                this.$refs.pricePopup.close()
            },
            // 时间条件切换
            timePopupEvent(item) {
                this.timeArr = this.timeArr.map((i) => {
                    if (i.label != item.label) {
                        i.checked = false
                    } else {
                        i.checked = true
                    }
                    return i
                })
                this.last = item.value
                this.timeTip = item.label
                this.closeTime()
                this.load()
            },
            // 弹窗价格条件切换
            pricePopupEvent(item) {
                this.priceArr = this.priceArr.map((i) => {
                    if (i.label != item.label) {
                        i.checked = false
                    } else {
                        i.checked = true
                    }
                    return i
                })
                this.price = item.value
                this.priceTip = item.label
                this.closePrice()
                this.load()
            },
            // 图标价格条件切换
            changePrice(i) {
                this.priceIcon = this.priceIcon.map((item) => {
                    item.checked = false;
                    return item
                })
                this.priceIcon[i].checked = !this.priceIcon[i].checked;
                this.price = this.priceIcon[i].value;
                this.load()
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
    .filter-bar {
        margin-top: var(--window-top);
        padding: 20rpx 0;
    }

    .popup {
        margin-top: 180rpx;
    }

    .active {
        color: $primary;
    }
</style>
