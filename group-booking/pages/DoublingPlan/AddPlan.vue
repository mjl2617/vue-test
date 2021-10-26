<template>
	<div class="setpage">
		<el-button s="danger" @click="repage()">返回</el-button>
		<div>
			<div class="title">新建快乐倍增计划</div>
			<div class="title-sub">基本信息</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
				<el-form-item label="轮数" prop="roundsNum">
					<div style="margin-left: 20px;color: red;">系统自动生成</div>
				</el-form-item>
				<el-form-item label="最大参与人数" prop="maxJoinPeopleNum">
					<el-input v-model="ruleForm.maxJoinPeopleNum" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="当前参与人数" prop="currentJoinPeopleNum">
					<el-input v-model="ruleForm.currentJoinPeopleNum" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="参团所需能量值" prop="groupEnergyValue">
					<el-select v-model="ruleForm.groupEnergyValue" placeholder="请选择" >
						    <el-option
						      v-for="item in energyList"
						      :key="item.value"
						      :label="item.label"
						      :value="item.val">
						    </el-option>
					</el-select>
				</el-form-item>
				<div class="title-sub">奖励信息</div>
				<div class="title-sub-s">计划成功奖励</div>
				<div class="flex-row">
					<el-form-item label="黄金矿石" prop="successGiftGoldNum">
						<el-input v-model="ruleForm.successGiftGoldNum" style="width: 150px;"></el-input> 个
					</el-form-item>
					<el-form-item label="白金矿石" prop="successGiftPlatinumNum">
						<el-input v-model="ruleForm.successGiftPlatinumNum" style="width: 150px;"></el-input> 个
					</el-form-item>
				</div>
				<el-form-item label="退回n-1期能量值" prop="successGiftEnergyValue">
					<el-input v-model="ruleForm.successGiftEnergyValue" style="width: 150px;"></el-input>
				</el-form-item>
				<div class="title-sub-s">计划失败奖励</div>
				<el-form-item label="黄金矿石" prop="failGiftGoldNum">
					<el-input v-model="ruleForm.failGiftGoldNum" style="width: 150px;"></el-input>个
				</el-form-item>
				<div class="flex-row">
					<el-form-item label="退回n-1期能量值" prop="failGiftPrevEnergyValue">
						<el-input v-model="ruleForm.failGiftPrevEnergyValue" style="width: 150px;"></el-input>
					</el-form-item>
					<el-form-item label="退回n期能量值" prop="failGiftCurrentEnergyValue">
						<el-input v-model="ruleForm.failGiftCurrentEnergyValue" style="width: 150px;"></el-input>
					</el-form-item>
				</div>


				<el-form-item>
					<el-button type="primary" :loading="checkDown" @click="submitForm('ruleForm')">
						{{groupId?'立即修改':'立即创建'}}
					</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 搜索给弹框 -->
		<el-dialog title="商品搜索" :visible.sync="dialogVisible" width="50%" center @current-change="handleCurrentChange">

			<el-form>
				<el-form-item label="选择商品">
					<el-input v-model="ruleForm.goodsId" style="width: 350px;" placeholder="商品ID/商品名称"></el-input>
					<el-button type="primary" @click="search()">搜索</el-button>
				</el-form-item>

			</el-form>


			<el-table :data="list" border style="width: 100%" stripe ref="list" @row-click="singleElection">
				<el-table-column width="80px" align="center" label="单选" type="index">
					<!-- label非常重要 -->
					<template slot-scope="scope">

						<el-radio class="radio" v-model="templateSelection" :label="scope.$index">&nbsp;</el-radio>



					</template>

				</el-table-column>


				<!-- <el-table-column type="index" label="排序"width="120">
				</el-table-column> -->
				<el-table-column prop="goodsId" label="商品ID">
				</el-table-column>
				<el-table-column prop="name" label="商品信息" width="350">
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
				<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange2" background
					layout="prev, pager, next" :total="total">
				</el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit()">确 定</el-button>
			</span>




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
				energyList:[],
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
				form: {}, //查询内容表单
				ruleForm: {
					failGiftCurrentEnergyValue: 1,
					failGiftPrevEnergyValue: 0.5,
					failGiftGoldNum: 50000,
					successGiftPlatinumNum: 2000,
					successGiftEnergyValue: 1,
					successGiftGoldNum: 1000,
					groupEnergyValue: null,
					currentJoinPeopleNum: null,
					maxJoinPeopleNum: null,
				},
				rules: {
					groupEnergyValue:[{
						required: true, message: '请选择', trigger: 'change'
					}],
					maxJoinPeopleNum: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入最大规模人数'))
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
					currentJoinPeopleNum: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入当前参与人数'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else if(Number(value)  > Number(this.ruleForm.maxJoinPeopleNum) ) {
									callback(new Error('当前参与人数大于最大人数！'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					successGiftGoldNum: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入金矿石数'))
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
					successGiftPlatinumNum: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入白金矿石数'))
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
					successGiftEnergyValue: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入能量值'))
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
					failGiftGoldNum: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入矿石数'))
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
					failGiftCurrentEnergyValue: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入能量数'))
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
					failGiftPrevEnergyValue: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入能量数'))
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
			this.energy()
		},

		methods: {
			async energy() {
				let {
					list
				} = await request({
					url: "/group/Multiply/EnergyType",
					method: "POST"
				});
				this.energyList  = list.map((item)=>{
					return {
						label:item+"能量值",
						val:item
					}
				})
			},
			isNumber(val) {
				var regPos = /^\d+(\.\d+)?$/
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
				if (regPos.test(val) || regNeg.test(val)) {
					return true
				} else {
					return false
				}
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
			submit() {},
			async getData() {
				let {
					data
				} = await request({
					url: "/group/Group/GetGroupDetials",
					method: "GET",
					params: {
						"groupId": this.groupId
					}
				});
				this.ruleForm = {
					...data,
					type: `${data.type}`,
					date1: [new Date(data.startTime), new Date(data.endTime)]
				}
			

			},
			handleCurrentChange2(val) {
				this.getList()
				console.log(`当前页: ${val}`);
			},

			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(111)
						this.checkDown = true
						let res = request({
							url: "/group/Multiply/CreateMultiply",
							method: "post",
							data: {
								...this.ruleForm
							}
						})
						res.then(ress => {
							console.log('ress', ress)
							if (ress.errorCode == 0) {
								this.$message({
									type: 'success',
									message: '新建成功'
								});
								// this.checkDown = false
								this.repage();
							}
						})
						res.catch(ress =>{
							this.checkDown = false
						})
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
