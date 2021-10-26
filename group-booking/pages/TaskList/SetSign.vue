<template>
	<div class="setpage">
		<div>

			<el-form ref="form" :model="form" label-width="80px">
				<div class="title">用户签到设置</div>

				<!-- 每日签到次数 -->
				<el-form-item label="每天可签" prop="resource" style="margin-left: 15px;">
					<el-radio-group v-model="form.signNum">
						<el-radio :label='1'>一次</el-radio>
						<el-radio :label='2'>两次</el-radio>
					</el-radio-group>
				</el-form-item>
				<!-- 时间选择以逗号隔开-->
				<div class="chooseDate" v-if="form.signNum==2">
					<el-form-item label="早上" prop="resource" style="margin-left: 135px;">
						<el-time-picker is-range v-model="form.signTimeOne" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
						 placeholder="选择时间范围" format="HH:mm;" value-format="HH:mm">
						</el-time-picker>
					</el-form-item>
					<!-- 结束时间不早于开始时间 -->
					<el-form-item label="晚上" prop="resource" style="margin-left: 15px;">
						<el-time-picker is-range arrow-control v-model="form.signTimeTwo" range-separator="至" start-placeholder="开始时间"
						 end-placeholder="结束时间" placeholder="选择时间范围" format="HH:mm;" value-format="HH:mm">
						</el-time-picker>
					</el-form-item>
				</div>

				<!-- 连续签到 -->
				<div class="chooseDate" style="margin-left: 25px;font-size: 15px;color: #666666;">
					<div>每签到一次获得</div>
					<div style="margin-left: 305px;">连续签到</div>
					<el-input v-model="form.nextDay"  oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="margin-left: 50px;"></el-input>
					<div>天，<span>获得</span></div>
				</div>

				<!-- 每日 -->
				<div class="chooseDate">

					<el-form-item label="">
						<div class="items">
							<el-checkbox v-model="a1" label="金币" name="type"></el-checkbox>
							<!-- 限制输入框只能输入正整数 -->
							<el-input v-model="form.dayGift[0].giftNum " oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="margin-left: 60px;"></el-input>
							<div>个</div>
						</div>
						<div class="items">
							<el-checkbox v-model="a2" label="金矿石" name="type"></el-checkbox>
							<el-input v-model="form.dayGift[1].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="margin-left: 48px;"></el-input>
							<div>个</div>
						</div>
						<div class="items">
							<el-checkbox v-model="a3" label="普通拼团券" name="type"></el-checkbox>
							<el-input v-model="form.dayGift[2].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
							<div>张</div>
						</div>
						<div class="items">
							<el-checkbox v-model="a4" label="高级拼团券" name="type"></el-checkbox>
							<el-input v-model="form.dayGift[3].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
							<div>张</div>
						</div>
						<div class="items">
							<el-checkbox v-model="a5" label="参团次数" name="type"></el-checkbox>
							<el-input v-model="form.dayGift[4].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"style="margin-left: 35px;"></el-input>
							<div>次</div>
						</div>
					</el-form-item>


					<!-- 连续签到 -->
					<el-form-item label="">
						<div class="items">
							<el-checkbox v-model="b1" label="金币" name="type"></el-checkbox>
							<el-input v-model="form.nextGift[0].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="margin-left: 65px;"></el-input>
							<div>个</div>
						</div>
						<div class="items">
							<el-checkbox v-model="b2" label="金矿石" name="type"></el-checkbox>
							<el-input v-model="form.nextGift[1].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"style="margin-left: 50px;"></el-input>
							<div>个</div>
						</div>
						<div class="items">
							<el-checkbox v-model="b3" label="普通拼团券" name="type"></el-checkbox>
							<el-input v-model="form.nextGift[2].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="margin-left: 21px;"></el-input>
							<div>张</div>
						</div>
						<div class="items">
							<el-checkbox v-model="b4" label="高级拼团券" name="type"></el-checkbox>
							<el-input v-model="form.nextGift[3].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
							<div>张</div>
						</div>
						<div class="items">
							<el-checkbox v-model="b5" label="参团次数" name="type"></el-checkbox>
							<el-input v-model="form.nextGift[4].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"style="margin-left: 38px;"></el-input>
							<div>次</div>
						</div>
					</el-form-item>
				</div>

				<!-- 视频签到 -->
				<div style="margin-left: 42px;margin-bottom: 14px;">签到视频设置</div>
				<el-form ref="form" :model="form" label-width="80px">

					<el-form-item label="每天可看" style="margin-left: 42px;">
						<el-input v-model="form.dayNum" style="width: 150px;" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
						个视频
					</el-form-item>
					<el-form-item label="间隔" style="margin-left: 42px;">
						<el-input v-model="form.intervalTime" style="width: 150px;" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
						s看下一个
					</el-form-item>
					<div style="margin-left: 42px;">每看1个视频获得</div>
					<el-form-item label="">
						<div class="items">
							<el-checkbox v-model="c1" label="金币" name="type"></el-checkbox>
							<el-input v-model="form.videoGift[0].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"style="margin-left: 58px;"></el-input>
							<div>个</div>
						</div>
						<div class="items">
							<el-checkbox v-model="c2" label="金矿石" name="type"></el-checkbox>
							<el-input v-model="form.videoGift[1].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"style="margin-left: 48px;"></el-input>
							<div>个</div>
						</div>
						<div class="items">
							<el-checkbox v-model="c3" label="普通拼团券" name="type"></el-checkbox>
							<el-input v-model="form.videoGift[2].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
							<div>张</div>
						</div>
						<div class="items">
							<el-checkbox v-model="c4" label="高级拼团券" name="type"></el-checkbox>
							<el-input v-model="form.videoGift[3].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
							<div>张</div>
						</div>
						<div class="items">
							<el-checkbox v-model="c5" label="参团次数" name="type"></el-checkbox>
							<el-input v-model="form.videoGift[4].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"style="margin-left: 38px;"></el-input>
							<div>次</div>
						</div>
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



				c1: false,
				c2: false,
				c3: false,
				c4: false,
				c5: false,

				value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
				value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],



				data: {},

				form: {

					"dayGift": [{
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
							"giftNum": " ",
							"state": 0 //状态，1=有效，0=无效，255=删除
						}
					],



					"nextGift": [{
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
					"videoGift": [{
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





					signNum: 1, //每日可签到次数， 1,2

					signTimeOne: '', //第一阶段签到时间， 例： 0: 00,12: 00， 逗号隔开

					signTimeTwo: '', //第二阶段签到时间， 例： 12: 00,24: 00， 逗号隔开

					nextDay: '', //连续签到多少天， 0 表示没有连续签到奖励


				},
			}
		},
		watch: {
			
			
			
			
			
			
			a1(v) {
				console.log("是否执行", this.form.dayGift)
				if (v) this.form.dayGift[0].state = 1
				else this.form.dayGift[0].state = 0
			},
			a2(v) {
				if (v) this.form.dayGift[1].state = 1
				else this.form.dayGift[1].state = 0
			},
			a3(v) {
				if (v) this.form.dayGift[2].state = 1
				else this.form.dayGift[2].state = 0
			},
			a4(v) {
				if (v) this.form.dayGift[3].state = 1
				else this.form.dayGift[3].state = 0
			},
			a5(v) {
				if (v) this.form.dayGift[4].state = 1
				else this.form.dayGift[4].state = 0
			},



			b1(v) {
				if (v) this.form.nextGift[0].state = 1
				else this.form.nextGift[0].state = 0
			},
			b2(v) {
				if (v) this.form.nextGift[1].state = 1
				else this.form.nextGift[1].state = 0
			},
			b3(v) {
				if (v) this.form.nextGift[2].state = 1
				else this.form.nextGift[2].state = 0
			},
			b4(v) {
				if (v) this.form.nextGift[3].state = 1
				else this.form.nextGift[3].state = 0
			},
			b5(v) {
				if (v) this.form.nextGift[4].state = 1
				else this.form.nextGift[4].state = 0
			},



			c1(v) {
				if (v) this.form.videoGift[0].state = 1
				else this.form.videoGift[0].state = 0
			},
			c2(v) {
				if (v) this.form.videoGift[1].state = 1
				else this.form.videoGift[1].state = 0
			},
			c3(v) {
				if (v) this.form.videoGift[2].state = 1
				else this.form.videoGift[2].state = 0
			},
			c4(v) {
				if (v) this.form.videoGift[3].state = 1
				else this.form.videoGift[3].state = 0
			},
			c5(v) {
				if (v) this.form.videoGift[4].state = 1
				else this.form.videoGift[4].state = 0
			},
		},
		
		

		created() {
			console.log('111', this.form)
			this.getDetail()
		},
		methods: {
			async getDetail() {
				let {
					data
				} = await request({
					url: "/group/SignIn/SignInDetail",
					method: "GET"
				})
				console.log(data)
				if (data.dayGift.length < 5 || data.nextGift.length < 5 ||data.videoGift<5) {
					return
				}
				this.form = data

				this.form.dayGift[0].state == 1 ? this.a1 = true : this.a1 = false;
				this.form.dayGift[1].state == 1 ? this.a2 = true : this.a2 = false;
				this.form.dayGift[2].state == 1 ? this.a3 = true : this.a3 = false;
				this.form.dayGift[3].state == 1 ? this.a4 = true : this.a4 = false;
				this.form.dayGift[4].state == 1 ? this.a5 = true : this.a5 = false;

				this.form.nextGift[0].state == 1 ? this.b1 = true : this.b1 = false;
				this.form.nextGift[1].state == 1 ? this.b2 = true : this.b2 = false;
				this.form.nextGift[2].state == 1 ? this.b3 = true : this.b3 = false;
				this.form.nextGift[3].state == 1 ? this.b4 = true : this.b4 = false;
				this.form.nextGift[4].state == 1 ? this.b5 = true : this.b5 = false;

				this.form.videoGift[0].state == 1 ? this.c1 = true : this.c1 = false;
				this.form.videoGift[1].state == 1 ? this.c2 = true : this.c2 = false;
				this.form.videoGift[2].state == 1 ? this.c3 = true : this.c3 = false;
				this.form.videoGift[3].state == 1 ? this.c4 = true : this.c4 = false;
				this.form.videoGift[4].state == 1 ? this.c5 = true : this.c5 = false;

				let dateArr = data.signTimeOne.split(',') || []
				let dateArrs = data.signTimeTwo.split(',') || []
				this.form.signTimeOne = dateArr
				this.form.signTimeTwo = dateArrs
				if (!data.dayGift) {
					this.form = { ...data,
						dayGift: this.form.dayGift
					}
					// data.registGift=this.form.registGift

				} else if (!data.nextGift) {
					this.form = { ...data,
						nextGift: this.form.nextGift
					}
				} else if (!data.videoGift) {
					this.form = { ...data,
						videoGift: this.form.videoGift
					}
				} else {
					this.form = data
				}



			},
			async sumbit() {
				this.form.nextGift = this.form.nextGift.map((item) => {
					if (item.giftNum == '') {
						return { ...item,
							giftNum: 0
						}
					} else {
						return item
					}
				})
				this.form.dayGift = this.form.dayGift.map((item) => {
					if (item.giftNum == '') {
						return { ...item,
							giftNum: 0
						}
					} else {
						return item
					}
				})
				this.form.videoGift = this.form.videoGift.map((item) => {
					if (item.giftNum == '') {
						return { ...item,
							giftNum: 0
						}
					} else {
						return item
					}
				})
				console.log(this.form)
				let {
					errorMessage
				} = await request({
					url: "/group/SignIn/SetSignIn",
					method: "POST",
					data: {
						"dayGift": this.form.dayGift, //每签到一次获得数组
						dayNum: Number(this.form.dayNum), //每签到一次可看多少个视频
						"nextGift": this.form.nextGift, //连续签到数组
						"videoGift": this.form.videoGift, //视频签到设置
						signTimeOne: this.form.signTimeOne ? this.form.signTimeOne[0] + ',' + this.form.signTimeOne[1] : '', //第一阶段签到时间， 例： 0: 00,12: 00， 逗号隔开
						signTimeTwo: this.form.signTimeTwo ? this.form.signTimeTwo[0] + ',' + this.form.signTimeTwo[1] : '', //第二阶段签到时间， 例： 12: 00,24: 00， 逗号隔开
						nextDay: this.form.nextDay, //连续签到多少天， 0 表示没有连续签到奖励
						signNum: this.form.signNum, //每日可签到次数， 1,2
						intervalTime: Number(this.form.intervalTime), //间隔多少秒看下一个视频
					}
				})
				if (errorMessage == 'ok') {
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
						message: '已取消设置'
					});
				});
			}

		}
	};
</script>
<style scoped lang="scss">
	.chooseDate {
		display: flex;
		flex-direction: row;
		align-items: center;

	}

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
