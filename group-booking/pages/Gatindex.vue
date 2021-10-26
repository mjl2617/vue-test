<template>
	<div class="page">
		<div class="page-title">用户统计</div>
		<div class="warp warp-content">
			<div class="box" v-for="(v,i) in list1" :key="i">
				<div class="item column">
					<div class="title">{{v.t}}</div>
					<div class="number color-3">{{ v.v }}</div>
				</div>
			</div>
		</div>
		<div class="page-title" style="margin-top: 43px;">总收益统计（金币）</div>
		<div class="warp warp-content" style="width: 90%;">
			<div class="box" style="width: 25%;" v-for="(item,i) in list2" :key="i">
				<div class="item column">
					<div class="title"> {{item.t}}</div>
					<div class="number color-3" :style="item.v.length>6?'font-size:26px':''">{{ item.v }}</div>
				</div>
			</div>
		</div>
		<div class="page-title" style="margin-top: 43px">资金统计</div>
		<div class="warp warp-content" style="width: 80%;">
			<div class="box" style="width: 40%;" v-for="(v,i) in list3" :key="i">
				<div class="item column">
					<div class="title">  {{v.t}}</div>
					<div class="number color-3" :style="v.v.length>6?'font-size:26px':''">{{ v.v }}</div>
				</div>
			</div>
		</div>
		<div class="page-title" style="margin-top: 43px">订单统计</div>
		<div class="warp warp-content" style="width: 64%;">
			<div class="box" style="width: 33%;" v-for="(v,i) in list4" :key="i">
				<div class="item column">
					<div class="title">  {{v.t}}</div>
					<div class="number color-3">{{ v.v }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetIndex } from "../api/Gatindex.js"
	export default {
		data() {
			return {
				chart: null,
				data: {},
				tableData: [],
				list1: [{
						t: '总用户',
						v: '0'
					},
					{
						t: '普通用户',
						v: '0'
					},
					{
						t: '会员',
						v: '0'
					},
					{
						t: '团长',
						v: '0'
					},
					{
						t: '高级团长',
						v: '0'
					},
					{
						t: '合伙人',
						v: '0'
					},
					{
						t: '区县代理',
						v: '0'
					},
					{
						t: '市代理',
						v: '0'
					},
					{
						t: '省代理',
						v: '0'
					}
				],
				list2: [{
						t: '总发放收益',
						v: '0'
					},
					{
						t: '会员',
						v: '0'
					},
					{
						t: '团长',
						v: '0'
					},
					{
						t: '高级团长',
						v: '0'
					},
					{
						t: '合伙人',
						v: '0'
					},
					{
						t: '区县代理',
						v: '0'
					},
					{
						t: '市代理',
						v: '0'
					},
					{
						t: '省代理',
						v: '0'
					}
				],
				list3:[{
						t: '用户剩余可提现（金币）',
						v: '0'
					},
					{
						t: '用户总提现（金币）',
						v: '0'
					},
					// {
					// 	t: '会员升级总金额（元）',
					// 	v: '0'
					// },
					{
						t: '用户历史获得金矿石数（个）',
						v: '0'
					},
					{
						t: '用户剩余金矿石数（个）',
						v: '0'
					},
					// {
					// 	t: '总发放拓展基金（元）',
					// 	v: '0'
					// }

				],
				list4:[{
				 		t: '拼团成功订单数（个）',
				 		v: '0'
				 	},
				 	{
				 		t: '拼团成功订单总金额（元）',
				 		v: '0'
				 	},
				 	{
				 		t: '拼团成功订单总利润（元）',
				 		v: '0'
				 	},
				 	{
				 		t: '单独购买订单数（个）',
				 		v: '0'
				 	},
				 	{
				 		t: '单独购买订单总金额（元）',
				 		v: '0'
				 	},
				 	{
				 		t: '单独购买订单总利润（元）',
				 		v: '0'
				 	},
				 	{
				 		t: '兑换订单数（个）',
				 		v: '0'
				 	},
				 	{
				 		t: '兑换订单总成本（元）',
				 		v: '0'
				 	}
				 ],
				radio1: "本周"
			};
		},
		mounted() {
			// this.getData();
			// this.getLineChartStatistics();
		},
		beforeDestroy() {
			if (!this.chart) {
				return;
			}
			this.chart.dispose();
			this.chart = null;
		},

		methods: {
			async getData() {
				const {
					data
				} = await GetIndex();
				this.list1[0].v = data.memberNum;
				this.list1[1].v = data.commonMemberNum;
				this.list1[2].v = data.memberNumq;
				this.list1[3].v = data.memberNuma;
				this.list1[4].v = data.memberNums;
				this.list1[5].v = data.memberNumd;
				this.list1[6].v = data.memberNumf;
				this.list1[7].v = data.memberNumg;
				this.list1[8].v = data.memberNumh;
				
				this.list2[0].v = this.priceSwitch(data.memberNum_z);
				this.list2[1].v = data.memberNumqq;
				this.list2[2].v = data.memberNumaa;
				this.list2[3].v = data.memberNumss;
				this.list2[4].v = data.memberNumdd;
				this.list2[5].v = data.memberNumff;
				this.list2[6].v = data.memberNumgg;
				this.list2[7].v = data.memberNumhh;
				
				this.list3[0].v = data.memberNum_a;
				this.list3[1].v = data.memberNum_s;
				this.list3[2].v = data.memberNum_d;
				this.list3[3].v = data.memberNum_g;
				// this.list3[4].v = data.memberNum_a;
				// this.list3[5].v = data.memberNum_a;
				// this.list3[6].v = data.memberNum_a;
				
				console.log(data)
			
			},
			priceSwitch(x) {
				console.log(x)
				//强制保留两位小数
				var f = parseFloat(x);
				if (isNaN(f)) return x;
				var f = Math.round(x * 100) / 100;
				var s = f.toString();
				var rs = s.indexOf(".");
				if (rs < 0) {
					rs = s.length;
					s += ".";
				}
				while (s.length < rs + 1 + 2) {
					s += "0";
				}
				//每三位用一个逗号隔开
				var leftNum = s.split(".")[0];
				var rightNum = "." + s.split(".")[1];
				var result;
				//定义数组记录截取后的价格
				var resultArray = new Array();
				if (leftNum.length > 3) {
					var i = true;
					while (i) {
						resultArray.push(leftNum.slice(-3));
						leftNum = leftNum.slice(0, leftNum.length - 3);
						if (leftNum.length < 4) {
							i = false;
						}
					}
					//由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
					var sortArray = new Array();
					for (var i = resultArray.length - 1; i >= 0; i--) {
						sortArray.push(resultArray[i]);
					}
					result = leftNum + "," + sortArray.join(",") + rightNum;
				} else {
					result = s;
				}
				return result;
			}
		}
	};
</script>
<style scoped lang="scss">
	.warp {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -15px;

		.box {
			padding: 0 15px;
			box-sizing: border-box;

			.item {
				padding: 20px 30px;
				border-radius: 10px;
				background-color: #f5f5f5;
				margin-bottom: 20px;
			}
		}
	}
	.page-title {
		margin-bottom: 20px;
		font-weight: bold;
	}
	.column {
		display: flex;
		flex-direction: column;
	}

	.overview {
		.box {
			width: 33.33%;
			color: #ffb943;
		}

		.title {
			font-size: 22px;
		}

		.sub-title {
			font-size: 16px;
		}

		.sub-number {
			font-size: 18px;
		}

		.number {
			font-size: 48px;
			margin-bottom: 20px;
			margin-top: 40px;
			font-weight: bold;
		}

		.flex {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.warp-content {
		.title {
			color: #333333;
			font-size: 15px;
		}

		.box {
			width: 20%;
		}

		.item {
			background: #f5f5f5;
			align-items: center;
			justify-content: center;
		}

		.number {
			font-size: 48px;
		}

		.color-1 {
			color: #8792f2;
		}

		.color-2 {
			color: #ffb943;
		}

		.color-3 {
			color: #ffb943;
			font-size: 36px;
			height: 80px;
			line-height: 80px;
		}
	}

	.chartBox {
		height: 493px;
		background: #f5f5f5;
		border: 1px solid #e6e6e6;
		overflow: hidden;
		border-radius: 20px;

		position: relative;

		#charts {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.radio {
			position: absolute;
			top: 16px;
			right: 16px;
			z-index: 10;
		}
	}
</style>
