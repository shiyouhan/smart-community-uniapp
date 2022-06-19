<template>
	<view class="">
		<view class="content__a p-3 mt-2"  @tap="goto(item.id)">
			<view class="content__a__biaoti">
				<image class="content__a__biaoti__touxiang" :src="item.avatar"></image>
				<view class="content__a__biaoti__miaoshu">
					<view class="content__a__biaoti__miaoshu__shangceng mt-1">
						<view class="content__a__biaoti__miaoshu__shangceng__a"><text class="flex-1"
								style="font-size: 15px;">{{item.username}}</text><text
								class="content__a__biaoti__miaoshu__shangceng__a__money">￥{{item.oriPrice}}</text></view>
						<view class="content__a__biaoti__miaoshu__shangceng__b">
							<text style="font-size: 14px;" class="flex-1">{{item.createTime}}</text>
							<text
								style="text-decoration: line-through"
								class="content__a__biaoti__miaoshu__shangceng__b__money">￥{{item.nowPrice}}</text>
						</view>
					</view>
					
				</view>

			</view>
			<view class="content__a__wenzi">
				{{item.content}}
			</view>
			<view class="content__a__tuxiang">
				<view v-if="item.banner.length === 1">
					<image v-for="(item1,index) in item.banner" :key="index" :src="item1.trim()" mode="aspectFill"></image>
				</view>
				<view v-if="item.banner.length === 2 || item.banner.length === 4" class="wrap1">
					<image v-for="(item1,index) in item.banner" :key="index" :src="item1.trim()" mode="aspectFill"></image>
				</view>
				<view v-else class="wrap">
					<image v-for="(item1,index) in item.banner" :key="index" :src="item1.trim()" mode="aspectFill"></image>
				</view>
			</view>
			<view class="content__a__icons">
				<text class="iconfont icon-31dianzan  " :class="liang? 'bianse' : ''" @tap="dianzan"> <text
						class="ml-1">{{dz}}</text></text>
				<text class="iconfont icon-shoucang1 " :class="liang1? 'bianse' : ''" @tap="dianzan1">
					<text class="ml-1">{{star}}</text></text>
				<text class="iconfont icon-pinglun3 " @tap="dianzan2">
					<text class="ml-1">{{comment}}</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		dzAdd,
		starAdd
	} from '@/api/luntan'
	export default {
		props: {
			item: Object,
			index: Number,
			comment: {
				type: Number,
				default: 0
			},
			dz: {
				type: Number,
				default: 0
			},
			star: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				liang: false,
				liang1: false,
				liang2: false,
			}
		},

		methods: {
			dianzan() {
				dzAdd(this.item.id, 3).then(res => {
					this.liang = !this.liang;
					console.log(res)
					this.$emit('dianzan')
				})
			},
			dianzan1() {
				starAdd(this.item.id, 3).then(res => {
					this.liang1 = !this.liang1;
					console.log(res)
					this.$emit('dianzan')
					
				})
			
			},
			dianzan2() {
				this.$emit('pinglun')
			},
			goto(id) {
				uni.navigateTo({
					url: "../../pages/xiangqingb/xiangqingb?id=" + id
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		width: 100%;
		background-color: $uni-bg-color-grey;
	}

	.bianse {
		color: $primary;
	}
	.content {

		&__a {
			background-color: #fff;
			border-radius: 10px;
			box-shadow: 4rpx 4rpx 8rpx 2px rgba(208, 208, 208, 0.25);

			&__biaoti {
				display: flex;

				&__touxiang {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				&__miaoshu {
					margin-left: 20rpx;
					width: 80%;

					&__shangceng {
						width: 100%;

						&__a {
							display: flex;
							&__money {
								font-size: 17px;
								color: #dc3838;
							}
						}

						&__b {
							margin-top: 10rpx;
							display: flex;
							&__money {
								font-size: 10px;
								color: rgb(200, 200, 200);
							}
						}


					}

					&__c {
						margin-top: 10rpx;
						font-size: 10px;
						color: rgb(200, 200, 200);
					}
				}

			}

			&__wenzi {
				margin-top: 12px;
				margin-bottom: 12px;
				overflow: hidden;
				word-break: break-all;
				/* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;
				/* 超出部分省略号 */
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 1;
				/** 显示的行数 **/
			}

			&__tuxiang {
				position: relative;
				display: flex;
				overflow: hidden;

				.wrap {
					image {
						width: 200rpx;
						height: 200rpx;
						object-fit: cover;
						border-radius: 3px;
						float: left;
						margin: 5rpx;
					}
				}

				.wrap1 {
					image {
						width: 212rpx;
						height: 212rpx;
						object-fit: cover;
						border-radius: 3px;
						float: left;
						margin: 5rpx;
					}
				}

			}

			&__icons {
				display: flex;
				color: $uni-text-color-grey;
				justify-content: space-between;
				margin-top: 20rpx;
			}
		}
	}
</style>
