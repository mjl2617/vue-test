<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="账号">
					<el-input v-model="form.name" placeholder="流水号/支付宝账号/用户手机号"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="form.region" placeholder="请选择" @change="check()">
						<!-- <el-option label="全部" value=""></el-option> -->
						<el-option label="待审核" value="0"></el-option>
						<el-option label="成功" value="1"></el-option>
						<el-option label="失败" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker v-model="form.dateVal" value-format='yyyy-MM-dd' type="daterange"
						range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>


			</el-form>
		</div>
		<el-row style="margin-bottom: 20px;">
			<el-button @click="search()" type="primary">搜索</el-button>
			<el-button @click="cancel()">取消</el-button>
			<!-- 导出 -->
			<el-button @click="toExport()" type="primary">导出</el-button>

		</el-row>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="orderNo" label="流水号">
			</el-table-column>
			<el-table-column prop="money" label="提现金额(元)">
			</el-table-column>
			<!-- <el-table-column prop="handling" label="手续费(元)">
			</el-table-column>
			<el-table-column prop="amountAccount" label="到账金额(元)">
			</el-table-column>
			<el-table-column prop="consumeGold" label="消耗金币(个)">
			</el-table-column> -->
			<el-table-column prop="accountName" label="支付宝姓名">
			</el-table-column>
			<el-table-column prop="payAccount" label="支付宝账号">
			</el-table-column>
			<el-table-column prop="userName" label="申请人昵称">
			</el-table-column>
			<el-table-column prop="userPhone" label="申请人手机号">
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<div v-if="scope.row.state==0">待审核</div>
					<div v-if="scope.row.state==1">成功</div>
					<div v-if="scope.row.state==2">失败</div>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="申请时间">
			</el-table-column>
			<!-- <el-table-column prop="admin" label="操作人">
			</el-table-column> -->
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.state==0">审核
					</el-button>
					<div v-else>已审核</div>
				</template>
			</el-table-column>



		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background
				layout="prev, pager, next" :total="total">
			</el-pagination>
		</div>

		<el-dialog title="审核" :visible.sync="dialogVisible" width="30%" center>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="">
					<el-radio-group v-model="form.resource">
						<el-radio label="1">通过</el-radio>
						<el-radio label="2">不通过</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="form.desc"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import dayjs from 'dayjs'
	import {
		request
	} from "@/common/index.js"
	import Helper from "@/common/function.js"
	export default {
		data() {
			return {
				dialogVisible: false,
				tableData: [],
				data: {},
				form: {},
				pageIndex: 1,
				total: 0,
				rowData: {},

				Service: "", //手续费
				money: "",
			}
		},
		created() {
			this.getData()



		},
		methods: {

			async toExport() {
				// var item = this.$refs.tableData.querytoString();
				const res = await request({
					url: "/group/Withdraw/GetConeyOrdersExl",
					method: "post",
					data: {
						"state": this.form.region,
						"keyWord": this.form.name,
						"startDate": this.form.startDate,
						"endDate": this.form.endDate,
						"pageIndex": this.pageIndex,
						"pageSize": 100
					}
				})
				console.log("1111")
				// this.tableData = res.data;
				if (res.errorCode == 0) {
					window.open(res.data);
				}
			},



			async getData() {
				let {
					total,
					list
				} = await request({
					url: "/group/Withdraw/Group_ConeyOrdersList",
					method: "post",
					data: {
						"state": this.form.region, //0-待审核 1-成功 2-失败 255-删除
						"keyWord": this.form.name,
						"startDate": this.form.dateVal ? this.form.dateVal[0] : '',
						"endDate": this.form.dateVal ? this.form.dateVal[1] : '',
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				});
				this.tableData = list

				/* 处理列表里面的费用 */

				this.tableData.map((item) => {
					item.createTime = dayjs(item.createTime).format('YYYY-MM-DD  HH:mm:ss')
				})

				this.total = total
			},
			handleClick(row) {
				this.rowData = row;
				this.dialogVisible = true
			},
			handleCurrentChange(val) {
				this.getData()
			},
			confirm() {


				this.$confirm('是否提交?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.submit();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				this.dialogVisible = false

			},



			async submit() {

				if (this.form.resource == "") {
					this.$message({
						message: '请选择状态',
						type: 'warning'
					});


					return

				}


				let {
					data
				} = await request({
					url: "/base/Admin/AuditMoneyOrders",
					method: "POST",
					data: {
						orderNo: this.rowData.orderNo,
						state: this.form.resource, //0-待审核  1-成功  2-失败 255-删除
						reason: this.form.desc
					}
				})
				if (data == 'ok') {
					this.$message({
						type: 'success',
						message: '提交成功'
					});

				}

				this.dialogVisible = false
				this.getData()
			},



			search() {
				this.getData()
				console.log(this.form)
			},
			check() {
				this.getData()
			},
			cancel() {
				this.form = {}
				this.pageIndex = 1
				this.getData()
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
