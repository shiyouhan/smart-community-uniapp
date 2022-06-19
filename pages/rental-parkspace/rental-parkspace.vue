<template>
	<view>
		<divider></divider>

		<picker @change="parkChange" :value="parkIndex" :range="(parks || []).map(i => i['communityName'])">
			<uni-list-item showBadge :badgeText="parks[parkIndex].communityName" title="停车场">
			</uni-list-item>
		</picker>

		<picker @change="rentalChange" :value="rentalIndex" :range="rentals">
			<uni-list-item showBadge :badgeText="rentals[rentalIndex]" title="车位">
			</uni-list-item>
		</picker>

		<picker @change="cardChange" :value="cardIndex" :range="(cards || []).map(i => i['name'])">
			<uni-list-item showBadge :badgeText="cards[cardIndex].name" title="卡类">
			</uni-list-item>
		</picker>

		<uni-list-item showBadge :badgeText="carNumber" title="车牌号" @click="show">
		</uni-list-item>

		<uni-popup ref="popup" type="bottom">
			<view class="flex p-5 justify-between">
				<p>请输入车牌号</p>
				<input style="width: 60px" placeholder="车牌号" type="text" v-model="carNumber" />
			</view>
		</uni-popup>

		<view class="flex  align-center justify-between u-h-90 bg-white fixed-bottom">
			<view class="u-m-l-38 flex">
				<view>总金额：</view>
				<view class="text-theme">¥ {{ card.price }}</view>
			</view>
			<view @click="pay" class="u-w-154 u-h-64 u-line-35 text-white bg-theme text-center rounded u-m-r-22">去支付
			</view>
		</view>
	</view>
</template>

<script>
	import uniListItem from "@/components/common/uni-list-item.vue"
	import uniPopup from "@/components/uni/uni-popup/uni-popup.vue"
	import {
		parkList,
		parkCard,
		carRental,
		rental,
	} from "@/api/parking/index.js"
	export default {
		components: {
			uniListItem,
			uniPopup
		},
		data() {
			return {
				parks: [{
					"parkingId": 0,
					"communityName": "",
					"distant": 0,
					"carports": 0,
					"totalCarports": 0,
					"longitude": 0,
					"latitude": 0
				}],
				parkIndex: 0,
				cards: [{
					"id": 0,
					"parkingId": 0,
					"name": "",
					"price": 0,
					"createTime": "",
					"updateTime": ""
				}],
				cardIndex: 0,
				rentals: [],
				rentalIndex: 0,
				card: {
					price: '100'
				},
				coord: {
					"longitude": 0,
					"latitude": 0
				},
				carNumber: "",
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				parkList(this.coord).then((res) => {
					this.parks = res.data
				})
				parkCard(this.parks[this.parkIndex].id).then(res => {
					this.cards = res.data
				})
				carRental(this.parks[this.parkIndex].id).then(res => {
					this.rentals = res.data
				})
			},
			parkChange(e) {
				this.parkIndex = e.detail.value
			},
			cardChange(e) {
				this.cardIndex = e.detail.value
			},
			rentalChange(e) {
				this.rentalIndex = e.detail.value
			},
			show() {
				this.$refs.popup.open();
			},
			pay() {
				var section = this.rentals[this.rentalIndex].split("-")
				let param = {
					"parkingId": this.parks[this.parkIndex].parkingId,
					"section": section[1],
					"carportNo": section[2],
					"cardName": this.cards[this.cardIndex].name,
					"carNumber": this.carNumber
				}
				rental(param).then((res) => {
					this.$msg.toast(res.message)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
