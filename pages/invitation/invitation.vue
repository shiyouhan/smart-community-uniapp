<template>
	<view>
		<view class="u-w-715 u-m-19 bg-white flex flex-column rounded">
			<view class="u-font-16 u-p-38">请选择门锁（多选）</view>
			
			<view>
				<view v-for="(item, index) in list" :key="index" class="float-l bg-white card u-relative" @click="doorIndex = index">
					<guard-list-item :item="item" :class="{'border-theme': doorIndex === index, 'active': doorIndex === index}">
					</guard-list-item>
				</view>
			</view>
			
			<view class="flex u-m-b-38 u-m-t-19">
				<button class="u-w-314 u-h-90 line-90 text-grey">开始时间</button>
				<view class="justify-center align-center">
					<view class="line-90 text-grey">～</view>
				</view>
				<button class="u-w-314 u-h-90 line-90 text-grey">结束时间</button>
			</view>
		</view>
		
		<divider></divider>
		
		<view class="bg-white mx-2 rounded">
			<view class="input_line flex algin-center">
				<text class="u-w-326">访客姓名</text>
				<input v-model="member.name" placeholder="张先生" class="text-right"/>
			</view>
			<view class="input_line border-0">
				<text class="u-w-326">手机号码</text>
				<input v-model="member.phone" placeholder="13456892546" class="text-right" />
			</view>
		</view>
		
		<button class="btn_submit u-m-t-54" @click="login">
			<text class="btn_content">发送邀请</text>
		</button>
	</view>
</template>

<script>
	import guardListItem from "@/components/common/guard-list-item.vue";
	
	export default {
		components: {
			guardListItem
		},
		data() {
			return {
				list: [
					{
						id: 1,
						guard: '东门'
					},
					{
						id: 2,
						guard: '南门'
					},
					{
						id: 3,
						guard: '北门'
					},
					{
						id: 4,
						guard: '东门'
					},
					{
						id: 5,
						guard: '南门'
					},
					{
						id: 6,
						guard: '北门'
					}
				],
				member: [],
				doorIndex: 0
			}
		},
		// 监听点击导航栏设置按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../invitation-record/invitation-record'
			})
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
.active::after {
	position: absolute;
	right: 4rpx;
	bottom: 4rpx;
    font-family: "iconfont" !important;
    content: '\e7fb';
    font-size: 15px;
    color: $primary;
}
</style>
