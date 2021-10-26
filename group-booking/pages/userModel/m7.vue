<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="账号">
					<el-input v-model="form.name" placeholder="订单编号"></el-input>
				</el-form-item>
				<el-form-item label="方式">
					<el-select v-model="form.region" placeholder="请选择">
						<el-option label="全部" value="1"></el-option>
						<el-option label="提现" value="2"></el-option>
						<el-option label="支付" value="3"></el-option>
						<el-option label="扣除" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker v-model="form.dateVal" type="daterange" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary">搜索</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="date" label="订单编号">
			</el-table-column>
			<el-table-column prop="date" label="方式">
			</el-table-column>
			<el-table-column prop="date" label="金额(元)">
			</el-table-column>
			<el-table-column prop="date" label="支付方式">
			</el-table-column>
			<el-table-column prop="date" label="时间">
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination background layout="prev, pager, next" :total="1000">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				data: {},
				form: {},
			}
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			confirm() {
				this.dialogVisible = false
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
