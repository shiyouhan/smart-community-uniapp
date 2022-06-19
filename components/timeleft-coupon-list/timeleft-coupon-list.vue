<template>
	<view class="content">
		<view class="box1">
			<view class="top">
				<view class="note">
					￥
				</view>
				<view class="money">
					{{item.money}}
				</view>
				<view class="purpose">
					{{item.purpose}}
				</view>
				<view class="timeleft">
					{{item.timeLeft}}
				</view>
			</view>
			<view class="bot">
				<view class="name">
					{{item.name}}
				</view>
				<view class="startTime">
					{{item.startTime}}
				</view>
				<view class="word">
					至
				</view>
				<view class="endTime">
					{{item.endTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"bg-pic",
		props:{
			item:Object,
			index:Number
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.box1{
		width: 371px;
		height: 100px;
		margin-top: 10px;
		margin-left: 20px;
		background-image: url(../../static/background/bg_coupons_item_selected.png);
		background-size: cover;
		.top{
			display: flex;
			width:371px ;
			height: 60px;
			.note{
				padding-top: 33px;
				padding-left: 28px;
				font-size: 23px;
				color: white;
			}
			.money{
				padding-top: 16px;
				font-size: 40px;
				color: white;
			}
			.purpose{
				padding-top: 23px;
				padding-left: 61px;
				font-size: 26px;
				color: #666666;
			}
			// .timeleft{
			// 	padding-top: 22px;
			// 	padding-left:74px;
			// 	font-size: 13px;
			// 	color: $primary;
			// }
		}
		.bot{
			display: flex;
			.name{
				padding-top: 10px;
				padding-left: 28px;
				font-size: 14px;
				color:white
			}
			.startTime{
				padding-top: 13px;
				padding-left: 55px;
				font-size: 13px;
				color: #666666;
			}
			.word{
				padding-top: 13px;
				font-size: 13px;
				color: #666666;
			}
			.endTime{
				padding-top: 13px;
				font-size: 13px;
				color: #666666;
			}
		}
		
	}
	
</style>
