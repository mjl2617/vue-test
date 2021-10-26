<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				
				<el-form-item label="日期">
					<el-date-picker v-model="form.dateVal" type="daterange" value-format='yyyy-MM-dd' range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button @click="search()" type="primary">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table :data="tableData" border style="width: 100%;">
			<el-table-column  type="index"  width="120" align="center" label="序号">
				
				
			</el-table-column>
			<el-table-column prop="userPhone" align="center" label="手机号">
			</el-table-column>
			<el-table-column prop="createTime" align="center" label="注册时间">
			</el-table-column>
			
			<!-- 等级;0-普通用户,1-会员,2-团长,3-高级团长,4-合伙人,5-区县代理，6-市代理，,7-县代理 -->
			<el-table-column prop="level" label="当前等级" align="center">
				<template slot-scope='scope'>
					<div v-if="scope.row.level==0">普通用户</div>
					<div v-if="scope.row.level==1">会员</div>
					<div v-if="scope.row.level==2">团长</div>
					<div v-if="scope.row.level==3">高级团长</div>
					<div v-if="scope.row.level==4">合伙人</div>
					<div v-if="scope.row.level==5">区县代理</div>
					<div v-if="scope.row.level==6">市代理</div>
					<div v-if="scope.row.level==7">县代理</div>
				</template>
			</el-table-column>
			<el-table-column prop="alipayUserId" align="center" label="绑定支付宝">

			</el-table-column>
			
			
		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination background layout="prev, pager, next" :total="total" :current-page.sync="pageIndex" @current-change="handleCurrentChange">
			</el-pagination>
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
				tableData: [],
				data: {},
				form: {},
				total: 0,
				pageIndex: 1,
				id:""
			}
		},
		created() {
			this.id=this.$route.query.id
			this.getData()
		},
		methods: {
			async getData() {
				let {
					list,
					total
				} = await request({
					url: "base/Admin/GetUserTeam",
					method: "POST",
					params: {
						"userId": this.id,
						// "assetType": 1,
						// "changeType":  this.form.changeType,
						// "startDate": this.form.dateVal ? this.form.dateVal[0] : '',
						// "endDate": this.form.dateVal ? this.form.dateVal[1] : '',
						// "pageIndex": this.pageIndex,
						// "pageSize": 10
					}
				})
				this.tableData = list
				console.log('团队信息',this.tableData)
				this.total = total
			},
			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
			},
			search() {
				this.getData()
				console.log(this.form)
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
