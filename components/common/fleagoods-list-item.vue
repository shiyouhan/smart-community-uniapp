<template>
	<view class="goods shadow flex u-h-202 bg-white rounded mx-2 u-m-b-19" @tap="open(item.id)">
		<img class="border-x w-101 flex" :src="item.thumbnail"/>
		
		<view class="flex flex-1 flex-column u-m-26 justify-center">
            <view class="flex u-row-between">
                <view class="u-font-14 content-one u-w-382 font-weight-bold">{{item.name}}</view>
                <view v-if="showState" class="u-font-12 text-dark-blue">
                    {{item.state}}
                </view>
            </view>
			<view class="u-font-12 text-grey content-two my-2 u-p-r-19">{{item.content}}</view>
			<view class="flex justify-end text-danger u-font-12 font-weight-bold">{{item.price}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number,
            showState: Boolean
		},
		data() {
			return {
				
			};
		},
		methods:{
			open(id){
				uni.navigateTo({
					url:"../../pages/good-detail/good-detail?id=" +id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
    .text-dark-blue {
        color: #3000ac;
    }
</style>
