<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="账号">
					<el-input v-model="form.name" placeholder="订单号/商品名称"></el-input>
				</el-form-item>
				<el-form-item label="支付状态" v-if="activeName!='three'">
					<el-select v-model="form.region" placeholder="请选择" @change="check()">
						<el-option label="全部" value=""></el-option>
						<el-option label="待支付" value="0"></el-option>
						<el-option label="已取消" value="3"></el-option>
						<el-option label="已支付" value="4" v-if="activeName=='second'"></el-option>
						
						<el-option label="已付款" value="1" v-if="activeName=='first'"></el-option>
						<el-option label="拼团中" value="15" v-if="activeName=='first'"></el-option>
						<el-option label="拼团成功" value="20" v-if="activeName=='first'"></el-option>
						<el-option label="拼团失败" value="25" v-if="activeName=='first'"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker v-model="form.dateVal" type="daterange" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="search()">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div>
			<el-tabs v-model="activeName" @tab-click="tabhandleClick">
				<el-tab-pane label="拼团订单（22）" name="first"></el-tab-pane>
				<el-tab-pane label="单独购买（233）" name="second"></el-tab-pane>
				<el-tab-pane label="兑换订单（22）" name="three"></el-tab-pane>
			</el-tabs>
		</div>

		
		<el-table :data="tableData" border v-if="activeName=='first'"  style="width: 100%">
			<el-table-column prop="orderNo" label="订单编号">
			</el-table-column>
			<el-table-column prop="goodsName" label="商品信息">
			</el-table-column>
			<el-table-column prop="amount" label="支付金额(元)">
			</el-table-column>
			<el-table-column prop="state" label="支付状态">
				<template slot-scope="scope">
					<div v-if="scope.row.state==0">待支付</div>
					<div v-if="scope.row.state==3">交易已取消</div>
					<div v-if="scope.row.state==15 || scope.row.state==1">拼团中</div>
					<div v-if="scope.row.state==20">已拼中</div>
					<div v-if="scope.row.state==25">拼团失败</div>
					<div v-if="scope.row.state==200">付款超时</div>
				</template>
			</el-table-column>
			<el-table-column label="支付方式" prop="payType">
				<template slot-scope="scope">
					<div v-if="scope.row.payType==1">支付宝</div>
					<div v-if="scope.row.payType==2">微信</div>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="下单时间">
			</el-table-column>
		</el-table>
		<el-table :data="tableData" border v-if="activeName=='second'" style="width: 100%">
			<el-table-column prop="orderNo" label="订单号">
			</el-table-column>
			<el-table-column prop="orderDetailsList[0].goodsName" label="商品信息">
			</el-table-column>
			<el-table-column prop="amount" label="支付金额(元)">
			</el-table-column>
			<el-table-column prop="state" label="支付状态">
				<template slot-scope="scope">
					<div v-if="scope.row.state==0">待付款</div>
					<div v-if="scope.row.state==1">已支付</div>
					<div v-if="scope.row.state==2">配送中</div>
					<div v-if="scope.row.state==3">交易已取消</div>
					<div v-if="scope.row.state==4">交易已完成</div>
					<!-- <div v-if="scope.row.state==5">换货处理中</div>
					<div v-if="scope.row.state==6">换货完成</div>
					<div v-if="scope.row.state==7">交易已关闭</div>
					<div v-if="scope.row.state==8">退款成功</div> -->
					<div v-if="scope.row.state==200">付款超时</div>
				</template>
			</el-table-column>
			<el-table-column prop="payType" label="支付方式">
				<template slot-scope="scope">
					<div v-if="scope.row.payType==1">支付宝</div>
					<div v-if="scope.row.payType==2">微信</div>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="下单时间">
			</el-table-column>
		</el-table>
		<el-table :data="tableData" border v-if="activeName=='three'"  style="width: 100%">
			<el-table-column prop="orderNo" label="订单号">
			</el-table-column>
			<el-table-column prop="goodsName" label="商品信息">
			</el-table-column>
			<el-table-column prop="orePrice" label="消耗金矿数">
			</el-table-column>
			<el-table-column prop="createTime" label="下单时间">
			</el-table-column>
		</el-table>

		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination background layout="prev, pager, next" :total="total" :current-page.sync="pageIndex" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import dayjs from 'dayjs'
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				tableData: [],
				data: {},
				form: {},
				activeName:"first",
				pageIndex: 1,
				total: 0,
				id:''
			}
		},
		created() {
			this.id=this.$route.query.id
			this.getData()
		},
		methods: {
			async getData() {
				let url
				if(this.activeName=="first"){
					url='/group/Group/GetGroupOrderList'
				}else if(this.activeName=="second"){
					url='/shop/MallOrder/GetAllMallOrderList'
				}else{
					url='/group/ConvertGoods/ConvertGoodsMallOrderList'
				}
				let {
					total,
					list
				} = await request({
					url: url,
					method: "post",
					data: {
						"keyWord": this.form.name,
						"state": this.form.region, //0-待付款  3-已取消 4-已完成
						"startDate": this.form.dateVal ? this.form.dateVal[0] : '',
						"endDate": this.form.dateVal ? this.form.dateVal[1] : '',
						"pageIndex": this.pageIndex,
						"pageSize": 10,
						"userid":this.id
					}
				});
				this.tableData = list
				this.tableData.map((item) => {
					item.createTime = dayjs(item.createTime).format('YYYY-MM-DD  HH:mm:ss')
				})
				this.total = total
				console.log("list: ", list);
			},
			check(){
				this.getData()
			},
			handleClick(row) {
				console.log(row);
			},
			search(){
				this.getData()
			},
			cancel() {
				this.form = {}
				this.pageIndex = 1
				this.getData()
			},
			confirm() {
			},
			tabhandleClick(tab, event) {
			  this.getData()
			  console.log(tab.index);
			},
			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
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
