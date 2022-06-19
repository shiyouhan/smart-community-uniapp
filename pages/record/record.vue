<template>
    <view>
        <divider></divider>
        <block v-for="(item, index) in list" :key="index">
            <fleagoods-list-item :item="item" :index="index" :showState="isShow">
            </fleagoods-list-item>
        </block>
        <!-- 无数据 -->
        <view v-if="list.length === 0" class="flex justify-center u-m-t-104">
            <image src="../../static/images/other/null.png" class="w-166"></image>
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
                more: true,
                isShow: true
            }
        },
        onLoad() {
            uni.getSystemInfo({
                success: res => {
                    this.scrollH = res.windowHeight - uni.upx2px(101);
                }
            });
            uni.startPullDownRefresh();
            this.load();
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
                console.log(res.data)
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
                        console.log(res)
              			       this.list = res.data
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
