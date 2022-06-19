<template>
	<view class="content">
		<view class="top">
			<image class="head" :src="market.avatar" mode=""></image>
			<view class="right">
				<view class="nickname">
					{{market.username}}
				</view>
				<view class="address">
					地址：{{market.fleaMarketGoods.address}}
				</view>
			</view>
		</view>
		
		<view class="center">
			<view class="title">
				{{market.fleaMarketGoods.name}}
			</view>
			<view class="introduce">
				{{market.fleaMarketGoods.content}}
			</view>
			<image class="pic" :src="market.fleaMarketGoods.thumbnail"></image>
		</view>
		
		<view class="bottom">
			<view class="" v-if=" !active" @click="change">
				<image src="../../static/images/other/square_06.png" class="pic" ></image>
			</view>
			<view class="" v-else @click="change">
				<image src="../../static/images/other/personal_center_07.png" class="pic"></image>
			</view>
			<view class="want">
				想要
			</view>
			<button type="default">立即联系</button>
		</view>
	</view>
</template>

<script>
	import {
		getDetail
	}from '@/api/market'
	
	export default {
		data() {
			return {
				market: [],
				active:false
			};
		},
		onLoad() {
			this.load();
		},
		methods: {
			change(){
				this.active = !this.active
			},
			load(){
				getDetail().then((res)=>{
					if (res.code === 200) {
						console.log(res)
						console.log('1111111111111111111');
						this.active = res.data
					} 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	width: 391px;
	height: 560px;
	margin-left: 12px;
	margin-top: 13px;
	border-radius: 5px;
	background-color: white;
	.top{
		display: flex;
		width:391px;
		height: 71px;
		border-bottom: 1px #f1f1f1 solid;
		.head{
			width: 41px;
			height: 41px;
			margin-top: 13px;
			margin-left: 13px;
			border-radius: 50%;
		}
		.right{
			margin-left: 11px;
			.nickname{
				margin-top: 15px;
				font-size: 15px;
				font-weight: bold;
			}
			.address{
				color: #aaaaaa;
				font-size: 13px;
			}
		}
	}
	.center{
		.title{
			font-size: 18px;
			font-weight: bold;
			margin-left: 16px;
			margin-top: 15px;
		}
		.introduce{
			font-size: 15px;
			margin-left: 16px;
			margin-top: 15px;
			color: #aaaaaa;
		}
		.pic{
			width: 355px;
			height: 355px;
			margin-top: 20px;
			margin-left: 20px;
		}
	}
	
	.bot{
		display: flex;
		width: 100%;
		height: 50px;
		margin-top: 69px;
		background-color: white;
		.pic{
			width: 35px;
			height: 35px;
			padding-top: 7px;
			margin-left: 20px;
		}
		.want{
			margin-top: 12px;
			padding-left: 20px;
			font-size: 20px;
		}
		button{
			width: 110px;
			height: 40px;
			margin-top: 5px;
			margin-left: 170px;
			line-height: 40px;
			border-radius: 9px;
			background-color: $primary;
			color: white;
		}
	}
}
</style>
