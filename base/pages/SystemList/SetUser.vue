<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="120px">
				<el-form-item label="角色筛选：">
					<el-select v-model="form.region" placeholder="请选择">
						<el-option label="全部" value="-1"></el-option>
						<el-option label="启用" value="0"></el-option>
						<el-option label="停用" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="search()" type="primary">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-row style="margin: 30px 0 ;">
			<el-button @click="add()" type="primary">添加</el-button>
		</el-row>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="id" label="ID">
			</el-table-column>
			<el-table-column prop="roleName" label="角色名">

			</el-table-column>
			<el-table-column prop="date" label="拥有权限">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>

		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination background layout="prev, pager, next" :total="total" :current-page.sync="pageIndex" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
		<el-dialog :title="popTitle" :visible.sync="dialogVisible" width="35%" center>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
				<el-form-item label="姓名" prop="name">
					<el-input style="width: 60%;" v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择角色">
						<el-option label="管理员" value="1"></el-option>
						<el-option label="超级管理员" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="登录账号" prop="account">
					<el-input style="width: 60%;" v-model="ruleForm.account"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" prop="pass">
					<el-input style="width: 60%;" v-model="ruleForm.pass"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="添加角色" :visible.sync="dialogVisibles" width="35%" center>
			<el-form :model="ruleForms" :rules="ruless" ref="ruleForms" label-width="130px">
				<el-form-item label="角色" prop="role">
					<el-input style="width: 60%;" v-model="ruleForms.role"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForms('ruleForms')">立即创建</el-button>
					<el-button @click="resetForms('ruleForms')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				pageIndex: 1,
				total: 0,
				ruleForm: {
					pass: '',
					account: '',
					region: '',
					name: ''
				},
				ruleForms: {
					role: ''
				},
				popTitle: '添加',
				ruless: {
					role: [{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur'
					}]
				},
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}],
					account: [{
						required: true,
						message: '请输入登录账号',
						trigger: 'blur'
					}],
					pass: [{
							required: true,
							message: '请输入登录密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 10,
							message: '长度在 6 到 10 个字符',
							trigger: 'blur'
						}
					]
				},
				dialogVisible: false,
				dialogVisibles: false,
				tableData: [],
				data: {},
				form: {},
			}
		},
		created() {
			this.getData()
		},
		methods: {
			async getData() {
				let {
					list,
					total
				} = await request({
					url: "/base/Role/GetRoleList",
					method: "post",
					data: {
						"state": this.form.region,
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				})
				this.tableData = list
				console.log(this.tableData)
				this.total = total
			},
			handleClick(row) {
				if (row) {
					this.popTitle = '修改'
					this.dialogVisible = true
					return
				}
				this.dialogVisible = true
			},
			add() {
				this.dialogVisibles = true
			},
			confirm() {
				this.dialogVisible = false
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false
			},
			submitForms(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submit()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async submit() {
				let {
					errorMessage
				} = await request({
					url: "/base/Role/AddRole",
					method: "post",
					data: {
						"roleName": this.ruleForms.role
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '添加成功!'
					});
					this.dialogVisible = false
					this.getData()
				}
			},
			resetForms(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisibles = false
			},
			handleCurrentChange(val) {
				this.getData()
			},
			search() {
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
