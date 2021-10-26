<template>
	<div class="setpage">
		<div>
			<div class="title">快乐倍增配置</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="280px" class="demo-ruleForm">
				<el-form-item label="快乐拼专区单类最大可购次数" prop="key_10">
					<el-input v-model="ruleForm.key_10" style="width: 400px;"></el-input>
				</el-form-item>
				<el-form-item label="快乐倍增计划同期同一用户可参与次数" prop="key_20">
					<el-input v-model="ruleForm.key_20" style="width: 400px;"></el-input>
				</el-form-item>

				<div class="title-sub">用户星级奖励矿石分配比例配置</div>
				<div class="flex-row">
					<el-form-item label="1星-黄金矿石分配比例" prop="key_101">
						<el-input v-model="ruleForm.key_101" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="1星-白金矿石分配比例" prop="key_201">
						<el-input v-model="ruleForm.key_201" style="width: 200px;"></el-input>
					</el-form-item>
				</div>
				<div class="flex-row">
					<el-form-item label="2星-黄金矿石分配比例" prop="key_102">
						<el-input v-model="ruleForm.key_102" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="2星-白金矿石分配比例" prop="key_202">
						<el-input v-model="ruleForm.key_202" style="width: 200px;"></el-input>
					</el-form-item>
				</div>
				<div class="flex-row">
					<el-form-item label="3星-黄金矿石分配比例" prop="key_103">
						<el-input v-model="ruleForm.key_103" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="3星-白金矿石分配比例" prop="key_203">
						<el-input v-model="ruleForm.key_203" style="width: 200px;"></el-input>
					</el-form-item>
				</div>
				<div class="flex-row">
					<el-form-item label="4星-黄金矿石分配比例" prop="key_104">
						<el-input v-model="ruleForm.key_104" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="4星-白金矿石分配比例" prop="key_204">
						<el-input v-model="ruleForm.key_204" style="width: 200px;"></el-input>
					</el-form-item>
				</div>
				<div class="flex-row">
					<el-form-item label="5星-黄金矿石分配比例" prop="key_105">
						<el-input v-model="ruleForm.key_105" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="5星-黄金矿石分配比例" prop="key_205">
						<el-input v-model="ruleForm.key_205" style="width: 200px;"></el-input>
					</el-form-item>
				</div>
				<div class="title-sub">能量值面额配置</div>
<!-- 				<el-form-item label="提现金额">
					<el-input v-model="form.moneyList[0]" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> 元
					<i class="el-icon-circle-plus" @click="add()"></i>
				</el-form-item>
				<el-form-item v-for="(v,i) in addList" :key="i">
					<el-input v-model="form.moneyList[i+1]" onkeyup="value=value.replace(/[^\d.]/g,'')" ></el-input> 元
					<i class="el-icon-delete-solid" style="cursor: pointer;" @click="del(i+1)"></i>
				</el-form-item> -->
				<el-button type="primary" style="margin:30px 100px;" @click="dialogVisible=true" >新增能量值类别</el-button>
				<el-table :data="tableData" border style="width: 300px;margin-left: 200px;">
					<el-table-column prop="val" label="类别">
					</el-table-column>
					<el-table-column  label="操作">
						<template slot-scope="scope">
							<el-button type="warning" @click="del(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-form-item style="margin-top: 60px;">
					<el-button type="primary" :loading="checkDown" @click="submitForm('ruleForm')">
						确定
					</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 上传文件后确定又给个弹框列表 -->
		<el-dialog title="新增面值" :visible.sync="dialogVisible" class="eldialog">
				面值: <el-input v-model="newEnergy" type="number" style="width: 200px;"></el-input>
		
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible=false">取 消</el-button>
				<el-button type="primary" @click="confirm()" >确 定</el-button>
			</div>
		
		</el-dialog>
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
				newEnergy:"",
				tableData:[],
				checkDown: false,
				dialogVisible: false,
				list: [],
				pageIndex: 1,
				templateSelection: '',
				templateRadio: '',
				multipleSelection: [],
				total: 0,
				groupId: null,
				groupIds: null,
				groupID: null,
				form: {
					
				}, //查询内容表单
				ruleForm: {
					"key_10": null,
					"key_20": null,
					"key_101": null,
					"key_102": null,
					"key_103": null,
					"key_104": null,
					"key_105": null,
					"key_201": null,
					"key_202": null,
					"key_203": null,
					"key_204": null,
					"key_205": null,
				},
				rules: {
					"key_10": [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_20": [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_101": [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_102": [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_103": [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_104":[{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_105": [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_201": [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_202":[{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_203":[{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_204":[{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					"key_205":[{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入值'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
				}
			};
		},
		created() {
			this.getData()
		},

		methods: {

			isNumber(val) {
				var regPos = /^\d+(\.\d+)?$/
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
				if (regPos.test(val) || regNeg.test(val)) {
					return true
				} else {
					return false
				}
			},
			async confirm() {
				if(this.newEnergy && this.newEnergy>0) {
					let {
						errorCode
					} = await request({
						url: "/group/Multiply/AddEnergyType?unit="+this.newEnergy,
						method: "POST",
						data:{
						}
					});
					if(errorCode==0) {
						this.dialogVisible=false
						this.getData()
						this.$message({
							type: 'success',
							message: '添加成功！'
						});
					}
				}else {
					this.$message({
						type: 'error',
						message: '格式不对'
					});
				}
		
		
			},
			del(val) {
				this.$confirm('此操作将删除该设置, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let {
						errorCode
					} = await request({
						url: "/group/Multiply/DelEnergyType?unit="+val.key,
						method: "POST",
						data:{
						}
					});
					if(errorCode==0) {
						this.getData()
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}
				
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			
			},
			singleElection(row) {
				//    this.templateSelection = this.list.indexOf(row);
				//    this.templateRadio = row.id;
				console.log(row)
				this.groupIds = row.goodsId
				console.log(this.groupIds)
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			handleRowChange() {

				this.selectId = data.id

			},
			// 选择勾选
			submit() {
			},
			async getData() {
				let {
					data
				} = await request({
					url: "/group/Multiply/GetMultiplyConfig",
					method: "POST"
				});
				this.ruleForm = {
					...data
				}
				let {
					list
				} = await request({
					url: "/group/Multiply/EnergyType",
					method: "POST"
				});
				this.tableData  = list.map((item)=>{
					return {
						val:item+"能量值",
						key:item
					}
				})

			},
			handleCurrentChange2(val) {
				this.getList()
				console.log(`当前页: ${val}`);
			},
	
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						
						this.checkDown = true
							let res = request({
								url: "/group/Multiply/SaveMultiplyConfig",
								method: "post",
								data: {config:this.ruleForm} 
							})
							res.then(ress => {
								console.log('ress', ress)
								if (ress.errorCode == 0) {
									this.$message({
										type: 'success',
										message: '修改成功'
									});
									this.checkDown = false
									this.$router.push('/DoublingPlan/List')
								}
							})
							this.checkDown = false
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			repage() {
				this.$router.go(-1)
			},
		}
	}
</script>
<style scoped lang="scss">
	.flex-row {
		display: flex;
		flex-direction: row;
		align-items: center;



	}

	.title-sub {
		font-size: 18px;
		font-weight: bold;
		margin-left: 30px;
	}

	.title-sub-s {
		font-size: 16px;
		font-weight: bold;
		margin-left: 40px;
		margin-top: 30px;
	}

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
