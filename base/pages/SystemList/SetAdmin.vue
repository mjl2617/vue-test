<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="账号">
					<el-input v-model="form.name" placeholder="用户昵称/账号"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="form.region" placeholder="请选择">
						<el-option label="全部" value="1"></el-option>
						<el-option label="启用" value="2"></el-option>
						<el-option label="停用" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">搜索</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-row style="margin: 30px 0 ;">
			<el-button @click="add()" type="primary">添加</el-button>
		</el-row>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="trueName" label="姓名">
			</el-table-column>
			<el-table-column prop="date" label="角色">
				<template slot-scope="scope">
					<div>管理员</div>
				</template>
			</el-table-column>
			<el-table-column prop="userPhone" label="登陆账号">
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<div v-if="scope.row.state==0">启用</div>
					<div v-if="scope.row.state==1">禁用</div>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="时间">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(0,scope.row)" v-if="scope.row.state==1" type="text" size="small">启用
					</el-button>
					<el-button @click="handleClick(1,scope.row)" v-if="scope.row.state==0" type="text" size="small">禁用
					</el-button>
					<el-button @click="handleClick(2,scope.row)" type="text" size="small">修改</el-button>
					<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>

		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background
				layout="prev, pager, next" :total="total">
			</el-pagination>
		</div>
		<el-dialog :title="popTitle" :visible.sync="dialogVisible" width="35%" center @close="close">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
				<el-form-item label="姓名" prop="trueName">
					<el-input style="width: 60%;" v-model="ruleForm.trueName"></el-input>
				</el-form-item>
				<!-- <el-form-item label="角色" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择角色">
						<el-option label="管理员" value="1"></el-option>
						<el-option label="超级管理员" value="2"></el-option>
					</el-select>
				</el-form-item> -->

				<el-form-item label="登录账号" prop="userPhone">
					<el-input style="width: 60%;" v-model="ruleForm.userPhone" maxlength="11"></el-input>
				</el-form-item>
				<el-form-item label="登录密码">
					<el-input style="width: 60%;" v-model="ruleForm.password" maxlength="6" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">{{btnTitle}}</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import md5 from "js-md5";
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				ruleForm: {
					pass: '',
					account: '',
					region: '',
					name: ''
				},
				popTitle: '添加',
				btnTitle: "立即创建",
				rules: {
					trueName: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					// region: [{
					// 	required: true,
					// 	message: '请选择角色',
					// 	trigger: 'change'
					// }],
					userPhone: [{
						required: true,
						message: '请输入登录账号',
						trigger: 'blur'
					}],
					password: [{
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
				tableData: [],
				data: {},
				form: {},
				total: 0,
				pageIndex: 1,
				id: "",
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
					url: "/base/Admin/GetAdminList",
					method: "POST",
					data: {
						"keyword": this.form.name,
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				})
				console.log("列表", list);
				this.tableData = list
				this.total = total
			},
			confirm() {
				this.dialogVisible = false
			},
			submitForm(formName) {
				console.log('id', this.id);
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.id) {
							this.editAdmin()
						} else {
							this.addAdmin()
						}
					} else {
						return false;
					}
				});
			},
			// 0 启用 1 禁用  2 修改
			handleClick(type, item) {
				if (type !== 2) {
					this.$confirm('确定更改账号状态?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.changeState(type, item.userId)
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消更改'
						});
					});
				} else {
					this.id = item.userId
					this.ruleForm = item
					this.popTitle = "修改"
					this.btnTitle = "立即修改"
					this.dialogVisible = true;
				}
			},
			// 详情接口
			// async getDetail(id) {
			// 	let {
			// 		data
			// 	} = await request({
			// 		url: "/base/Admin/GetAdminDetail",
			// 		method: "post",
			// 		params: {
			// 			userId: id
			// 		}
			// 	})
			// 	data.password = md5(data.password)
			// 	console.log("详情", data);
			// 	this.ruleForm = data
			// 	this.popTitle = "修改"
			// 	this.btnTitle = "立即修改"
			// 	this.dialogVisible = true;

			// },
			// 启用 禁用 接口 
			async changeState(type, id) {
				let {
					errorCode
				} = await request({
					url: "/base/Admin/UpdateAdmin",
					method: "post",
					params: {
						state: type,
						userId: id
					}
				})
				if (errorCode == 0) {
					this.$message({
						type: 'success',
						message: '操作成功'
					});
					this.getData()
				}
			},
			// 修改 接口 
			async editAdmin() {
				let {
					errorCode
				} = await request({
					url: "/base/Admin/EditAdmin",
					method: "post",
					data: {
						userId: this.id,
						trueName: this.ruleForm.trueName,
						userPhone: this.ruleForm.userPhone,
						password: md5(this.ruleForm.password)
					}
				})
				if (errorCode == 0) {
					this.$message({
						type: 'success',
						message: '修改成功'
					});
					this.getData()
					this.dialogVisible = false
				}
			},
			// 删除 
			del(row) {
				this.$confirm('确定删除该账号?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delAdmin(row.userId)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 删除 接口
			async delAdmin(id) {
				let {
					errorCode
				} = await request({
					url: "/base/Admin/DeleteAdmin",
					method: "post",
					params: {
						userId: id,
					}
				})
				if (errorCode == 0) {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
					this.getData()
					this.dialogVisible = false
				}
			},
			// 添加管理员
			add() {
				this.id = ''
				this.ruleForm = {}
				this.popTitle = "添加"
				this.btnTitle = "立即创建"
				this.dialogVisible = true
			},
			// 添加管理员 接口
			async addAdmin() {
				if (!this.ruleForm.password) {
					this.$message({
						type: 'error',
						message: '请输入登录密码'
					});
					return
				}
				let {
					errorCode
				} = await request({
					url: "/base/Admin/AddAdmin",
					method: "post",
					data: {
						trueName: this.ruleForm.trueName,
						userPhone: this.ruleForm.userPhone,
						password: md5(this.ruleForm.password)
					}
				})
				if (errorCode == 0) {
					this.$message({
						type: 'success',
						message: '添加成功'
					});
					this.getData()
					this.dialogVisible = false
				}
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.getData()
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false
				this.id = ''
			},
			close() {
				
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
