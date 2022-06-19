<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="height-vh">
			<block v-for="(item, index) in swiper" :key="index">
				<swiper-item class=" flex algin-center justify-center">
					<swiper-item class="flex justify-end">
						<image :src="item.src" class="height-vh width-100" mode="aspectFill" lazy-load />
					</swiper-item>
				</swiper-item>
			</block>
		</swiper>
		<view class="u-abso u-m-38 bg-theme px-2 py-1 rounded-22 text-white top-0 right-0"
			@tap="open('login')">{{ time }}s后跳过</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper: [
					{
						src: '../../static/images/other/prologue1.jpg'
					},
					{
						src: '../../static/images/other/prologue2.jpg'
					},
					{
						src: '../../static/images/other/prologue3.jpg'
					},
					{
						src: '../../static/images/other/prologue4.jpg'
					}
				],
				time: 5,
                timer: null
			};
		},
		mounted() {
			this.timer = setInterval(() => {
				if(--this.time <= 0) {
					this.open('login')
					clearInterval(this.timer)
				}
			}, 1000)
		},
		methods: {
			open(path) {
                clearInterval(this.timer)
				uni.redirectTo({
					url: `../${path}/${path}`
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
