<template>
	<view class="goods" @tap="goto(item.id)">
		<view class="left" >
			<img class="pic" :src="item.thumbnail"/>
		</view>
		
		<view class="right">
			<view class="title">
				{{item.name}}
			</view>
			<view class="introduce">
				{{item.content}}
			</view>
			<view class="money">
				{{item.price}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods-list-items",
		props: {
			item: Object,
			index: Number
		},
		data() {
			return {
				
			};
		},
		methods:{
			goto(id){
				uni.navigateTo({
					url:"../../pages/good-detail/good-detail?id=" +id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.goods{
	display: flex;
	border-radius: 5px;
	margin-left: 10px;
	width: 393px;
	height: 103px;
	background-color: white;
	margin-bottom: 10px;
	.left{
		margin-top: 2px;
		margin-left: 5px;
		width:96px;
		height: 96%;
		.pic{
			height: 96px;
			width: 96px;
		}
	}
	.right{
		.title{
			margin-top: 12px;
			margin-left: 18px;
			font-size: 17px;
			font-weight: bold;
			overflow: hidden;
			word-break: break-all;  /* break-all(允许在单词内换行。) */
            text-overflow: ellipsis;  /* 超出部分省略号 */
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 1; /** 显示的行数 **/
		}
		.introduce{
			margin-top: 5px;
			margin-left: 18px;
			font-size: 15px;
			color: #C0C0C0;
			overflow: hidden;
			word-break: break-all;  /* break-all(允许在单词内换行。) */
			text-overflow: ellipsis;  /* 超出部分省略号 */
			display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 2; /** 显示的行数 **/
		}
		.money{
			width: 80px;
			margin-left: 210px;
			font-size: 17px;
			color: red;
		}
	}
}
</style>
