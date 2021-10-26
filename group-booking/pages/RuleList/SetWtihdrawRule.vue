<template>
	<div class="setpage">
		<div>
			<div class="title">提现规则设置<span style="color: red;font-size:16px;">(次日生效)</span></div>
			<el-form ref="form" :model="form" label-width="120px" style="padding: 0 30px;">

				<el-form-item label="当提现额度小于">
					<el-input v-model="form.reviewMoney" onkeyup="value=value.replace(/[^\d.]/g,'')"  ></el-input> 元时，系统自动通过审核。
				</el-form-item>
				<el-form-item label="提现手续费">
					<el-input v-model="form.commission" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="1天可提现">
					<el-input v-model="form.dayNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input> 次
				</el-form-item>
				<el-form-item label="提现金额">
					<el-input v-model="form.moneyList[0]" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> 元
					<i class="el-icon-circle-plus" @click="add()"></i>
				</el-form-item>
				<el-form-item v-for="(v,i) in addList" :key="i">
					<el-input v-model="form.moneyList[i+1]" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> 元
					<i class="el-icon-delete-solid" style="cursor: pointer;" @click="del(i+1)"></i>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="open()">保存设置</el-button>
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

				data: {},
				addList: [],
				form: {
					moneyList: []
				}
			}
		},
		created() {
			this.getData()
		},
		methods: {
			async getData() {
				let {
					data
				} = await request({
					url: "/group/Rule/WithdrawRuleDetail",
					method: "GET"
				})
				let arr = data.moneyList.split(',')
				let arr2 = arr.slice(0, arr.length - 1)
				this.addList = arr2
				this.form = data
				this.form.moneyList = arr
			},
			handleClick(row) {
				console.log('--', row);
			},
			open() {
				this.$confirm('是否保存设置?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.submit()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			async submit() {
				let {
					errorCode,
					errorMessage
				} = await request({
					url: "/group/Rule/SetWtihdrawRule",
					method: "POST",
					data: {
						"reviewMoney": this.form.reviewMoney,
						"commission": this.form.commission,
						"dayNum": this.form.dayNum,
						"moneyList": String(this.form.moneyList)
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						message: '设置成功！',
						type: 'success'
					});
				}

			},
			add() {
				this.addList.push('')
			},
			del(i) {
				this.$confirm('此操作将删除该设置, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.addList.splice(i - 1, 1)
					this.form.moneyList.splice(i, 1)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
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

		i {
			font-size: 24px;
		}
	}
</style>
