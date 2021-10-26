<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">

				<el-form-item label="账号">
					<el-input v-model="form.name" placeholder="订单编号/用户昵称/手机号"></el-input>
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
			<el-table-column prop="date" label="订单编号" >
			</el-table-column>
			<el-table-column prop="date" label="用户昵称">
			</el-table-column>
			<el-table-column prop="date" label="手机号">
			</el-table-column>
			<el-table-column prop="date" label="方式">
			</el-table-column>
			<el-table-column prop="name" label="金额(元)">
			</el-table-column>
			<el-table-column prop="address" label="支付方式">
			</el-table-column>
			<el-table-column prop="address" label="时间">
			</el-table-column>

		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination
			
			  background
			  layout="prev, pager, next"
			  :total="1000">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			console.log(1111);
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
			}

		}
	};
</script>
<style scoped lang="scss">

</style>
