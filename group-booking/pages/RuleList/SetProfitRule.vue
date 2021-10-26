<template>
	<div class="setpage">
		<div>
			<div class="title">提现奖励规则设置</div>
			<el-form ref="form" :model="form" label-width="120px" style="padding: 0 30px;">

				<el-form-item label="会员">
					<el-input v-model="form.pushFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="团长">
					<el-input v-model="form.chiefFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="平级团长">
					<el-input v-model="form.levelChiefFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="高级团长">
					<el-input v-model="form.highchiefFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="平级高级团长">
					<el-input v-model="form.leveHighchiefFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="合伙人">
					<el-input v-model="form.partnerFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="区县代理">
					<el-input v-model="form.districtFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="市代理">
					<el-input v-model="form.cityFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="省代理">
					<el-input v-model="form.provinceFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
				</el-form-item>
				<el-form-item label="加权平均分红">
					<el-input v-model="form.weightingFee" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> %
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

				data: {},
				addList: [],
				form: {}
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
					url: "/group/Rule/ProfitRuleDetail",
					method: "GET"
				})
				this.form = data
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
					errorMessage
				} = await request({
					url: "/group/Rule/SetProfitRule",
					method: "post",
					data: {
						"pushFee": this.form.pushFee,
						"chiefFee": this.form.chiefFee,
						"levelChiefFee": this.form.levelChiefFee,
						"highchiefFee": this.form.highchiefFee,
						"leveHighchiefFee": this.form.leveHighchiefFee,
						"partnerFee": this.form.partnerFee,
						"districtFee": this.form.districtFee,
						"cityFee": this.form.cityFee,
						"provinceFee": this.form.provinceFee,
						"weightingFee": this.form.weightingFee
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '设置成功！'
					});
				}
			},

			handleClick(row) {
				console.log(row);
			},


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
