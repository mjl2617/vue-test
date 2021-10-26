<template>
	<div class="setpage">
		<div>

			<el-form ref="form" :model="form" label-width="80px">
				<div class="title">新人注册奖励设置</div>
				<el-form-item label="">
					<div class="items">
						<el-checkbox v-model="a1" label="金币" name="type"></el-checkbox>
						<el-input v-model="form.registGift[0].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="margin-left: 65px;"></el-input>
						<div>个</div>
					</div>
					<div class="items">
						<el-checkbox v-model="a2" label="金矿石" name="type"></el-checkbox>
						<el-input v-model="form.registGift[1].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="margin-left: 50px;"></el-input>
						<div>个</div>
					</div>
					<div class="items">
						<el-checkbox v-model="a3" label="普通拼团券" name="type"></el-checkbox>
						<el-input v-model="form.registGift[2].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
						<div>张</div>
					</div>
					<div class="items">
						<el-checkbox v-model="a4" label="高级拼团券" name="type"></el-checkbox>
						<el-input v-model="form.registGift[3].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
						<div>张</div>
					</div>
					<div class="items">
						<el-checkbox v-model="a5" label="参团次数" name="type"></el-checkbox>
						<el-input v-model="form.registGift[4].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"style="margin-left: 35px;"></el-input>
						<div>次</div>
					</div>
				</el-form-item>
				<div class="title">分享拼团信息奖励设置</div>
				<el-form-item label="每人每天奖励" label-width="300" style="margin-left: 80px;">
					<el-input v-model="form.shareNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
				</el-form-item>
				<div style="margin-left: 80px;">分享拼团到微信群/个人微信/朋友圈每次获得</div>
				<el-form-item label="">
					<div class="items">
						<el-checkbox v-model="b1" label="金币" name="type"></el-checkbox>
						<el-input v-model="form.shareGift[0].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"style="margin-left: 66px;">></el-input>
						<div>个</div>
					</div>
					<div class="items">
						<el-checkbox v-model="b2" label="金矿石" name="type"></el-checkbox>
						<el-input v-model="form.shareGift[1].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="margin-left: 50px;"></el-input>
						<div>个</div>
					</div>
					<div class="items">
						<el-checkbox v-model="b3" label="普通拼团券" name="type"></el-checkbox>
						<el-input v-model="form.shareGift[2].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
						<div>张</div>
					</div>
					<div class="items">
						<el-checkbox v-model="b4" label="高级拼团券" name="type"></el-checkbox>
						<el-input v-model="form.shareGift[3].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
						<div>张</div>
					</div>
					<div class="items">
						<el-checkbox v-model="b5" label="参团次数" name="type"></el-checkbox>
						<el-input v-model="form.shareGift[4].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="margin-left: 35px;"></el-input>
						<div>次</div>
					</div>
				</el-form-item>
				<div class="title">金矿石奖励设置</div>
				<el-form-item label="会员拼团成功后，获得拼团产品价格的" label-width="300" style="margin-left: 80px;">
					<el-input v-model="form.sucedOre" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input> %
				</el-form-item>
				<div class="title">拼团次数设置</div>
				<el-form-item label="每个会员每天最多可参与拼团" label-width="300" style="margin-left: 80px;">
					<el-input v-model="form.groupNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input> 次
				</el-form-item>
				<div class="title">金币设置</div>
				<el-form-item label="现金：金币=" label-width="300" style="margin-left: 80px;">
					<el-input v-model="form.cash" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input> ：
					<el-input v-model="form.coin" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
				</el-form-item>
				<div class="title">用户团费设置</div>
				<el-form-item label="会员团费" label-width="300" style="margin-left: 80px;">
					<el-input v-model="form.taskFull" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input> 元
				</el-form-item>
				<div class="title">奖励到账设置</div>
				<el-form-item label="">
					<el-radio-group v-model="form.rewardWay">
						<el-radio label="拼团订单支付完成后到账"></el-radio>
						<el-radio label="拼团订单产品售后到期到账"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button @click="open()" type="primary">保存设置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				a1: false,
				a2: false,
				a3: false,
				a4: false,
				a5: false,
				b1: false,
				b2: false,
				b3: false,
				b4: false,
				b5: false,
				data: {},

				form: {
					"registGift": [{
							"giftType": 1, //金币
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						},
						{
							"giftType": 2, //金矿石
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						},
						{
							"giftType": 3, //普通拼团券
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						},
						{
							"giftType": 4, //高级拼团券
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						},
						{
							"giftType": 5, //拼团次数
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						}
					],
					"shareNum": "",
					"shareGift": [{
							"giftType": 1, //金币
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						},
						{
							"giftType": 2, //金矿石
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						},
						{
							"giftType": 3, //普通拼团券
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						},
						{
							"giftType": 4, //高级拼团券
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						},
						{
							"giftType": 5, //拼团次数
							"giftNum": "",
							"state": 0 //状态，1=有效，0=无效，255=删除
						}
					],
					"sucedOre": "",
					"groupNum": "",
					"cash": "",
					"coin": "",
					"taskFull": "",
					"rewardWay": "拼团订单支付完成后到账"
				},
			}
		},
		watch: {
			a1(v) {
				if (v) this.form.registGift[0].state = 1
				else this.form.registGift[0].state = 0
			},
			a2(v) {
				if (v) this.form.registGift[1].state = 1
				else this.form.registGift[1].state = 0
			},
			a3(v) {
				if (v) this.form.registGift[2].state = 1
				else this.form.registGift[2].state = 0
			},
			a4(v) {
				if (v) this.form.registGift[3].state = 1
				else this.form.registGift[3].state = 0
			},
			a5(v) {
				if (v) this.form.registGift[4].state = 1
				else this.form.registGift[4].state = 0
			},
			b1(v) {
				if (v) this.form.shareGift[0].state = 1
				else this.form.shareGift[0].state = 0
			},
			b2(v) {
				if (v) this.form.shareGift[1].state = 1
				else this.form.shareGift[1].state = 0
			},
			b3(v) {
				if (v) this.form.shareGift[2].state = 1
				else this.form.shareGift[2].state = 0
			},
			b4(v) {
				if (v) this.form.shareGift[3].state = 1
				else this.form.shareGift[3].state = 0
			},
			b5(v) {
				if (v) this.form.shareGift[4].state = 1
				else this.form.shareGift[4].state = 0
			},
		},
		created() {
			this.getData()
		},
		
		
		
		
		
		methods: {
			
			async getData() {
				let {
					data
				} = await request({
					url: "/group/Rule/BaseRuleDetail",
					method: "GET"
				})
				if(data.registGift.length<5 || data.shareGift.length<5) {
					return
				}
				this.form = data
				console.log('----------',data.registGift)
			
				this.form.registGift[0].state == 1 ? this.a1 = true : this.a1 = false;
				this.form.registGift[1].state == 1 ? this.a2 = true : this.a2 = false;
				this.form.registGift[2].state == 1 ? this.a3 = true : this.a3 = false;
				this.form.registGift[3].state == 1 ? this.a4 = true : this.a4 = false;
				this.form.registGift[4].state == 1 ? this.a5 = true : this.a5 = false;
				this.form.shareGift[0].state == 1 ? this.b1 = true : this.b1 = false;
				this.form.shareGift[1].state == 1 ? this.b2 = true : this.b2 = false;
				this.form.shareGift[2].state == 1 ? this.b3 = true : this.b3 = false;
				this.form.shareGift[3].state == 1 ? this.b4 = true : this.b4 = false;
				this.form.shareGift[4].state == 1 ? this.b5 = true : this.b5 = false;
				if (this.form.rewardWay == '1') {
					this.form.rewardWay = '拼团订单支付完成后到账'
				} else {
					this.form.rewardWay = '拼团订单产品售后到期到账'
				}
			},
			async sumbit() {
				console.log(this.form)
				let {
					errorMessage
				} = await request({
					url: "/group/Rule/SetBaseRule",
					method: "POST",
					data: {
						"registGift": this.form.registGift,
						"shareNum": this.form.shareNum,
						"shareGift": this.form.shareGift,
						"sucedOre": this.form.sucedOre,
						"groupNum": this.form.groupNum,
						"cash": this.form.cash,
						"coin": this.form.coin,
						"taskFull": this.form.taskFull,
						"rewardWay": this.form.rewardWay == '拼团订单支付完成后到账' ? 1 : 2
					}
				})
				if (errorMessage=='ok') {
					this.$message({
						type: 'success',
						message: '设置成功!'
					});
				}
			},
			open() {
				this.$confirm('是否保存设置?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.sumbit()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}

		}
	};
</script>
<style scoped lang="scss">
	.setpage {
		.title {
			font-size: 24px;
			font-weight: bold;
			padding: 20px;

		}

		.items {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 10px 0;

		}

		.el-input {
			width: 120px;
			margin: 0 20px;
		}
	}
</style>
