<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="账号">
					<el-input v-model="form.name" placeholder="用户昵称/账号"></el-input>
				</el-form-item>
				<el-form-item label="身份">
					<el-select v-model="form.region" placeholder="请选择">
						<el-option label="全部" value="1"></el-option>
						<el-option label="普通用户" value="2"></el-option>
						<el-option label="会员" value="3"></el-option>
						<el-option label="团长" value="4"></el-option>
						<el-option label="高级团长" value="5"></el-option>
						<el-option label="合伙人" value="6"></el-option>
						<el-option label="区县代理" value="7"></el-option>
						<el-option label="市代理" value="8"></el-option>
						<el-option label="省代理" value="9"></el-option>
					</el-select>
				</el-form-item>


				<el-form-item>
					<el-button type="primary">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="date" label="ID">
			</el-table-column>
			<el-table-column prop="date" label="用户昵称">
			</el-table-column>
			<el-table-column prop="date" label="手机号">
			</el-table-column>
			<el-table-column prop="date" label="用户等级">
			</el-table-column>
			<el-table-column prop="date" label="团队总人数">
			</el-table-column>
			<el-table-column  label="会员数">
				<template slot-scope="scope">
					<div>111</div>
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="团长数">
				<template slot-scope="scope">
					<div>111</div>
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="高级团长数">
				<template slot-scope="scope">
					<div>111</div>
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="合伙人数">
				<template slot-scope="scope">
					<div>111</div>
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="区县代理数">
				<template slot-scope="scope">
					<div>111</div>
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column>

		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination background layout="prev, pager, next" :total="1000">
			</el-pagination>
		</div>
		<el-dialog title="" :visible.sync="dialogVisible" width="30%" center :before-close="handleClose">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="date" label="ID">
				</el-table-column>
				<el-table-column prop="date" label="用户昵称">
				</el-table-column>
				<el-table-column prop="date" label="手机号">
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				pageIndex:1,
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
			cancel() {
				console.log("1233")
				this.form = {}
				this.pageIndex =1
				this.getData()
			},
			
			handleClose(){
				
				this.dialogVisible = false
				
			},
			handleClick(row) {
				console.log(row);
				this.dialogVisible = true
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
