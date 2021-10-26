<template>
	<div class="setpage">
		<el-button s="danger" @click="repage()">返回</el-button>
		<div>
			<div class="title">快乐倍增计划-第{{ruleForm.roundsNum}}轮-第{{ruleForm.periodNum}}期</div>
			<div class="title-sub">基本信息</div>
			<div class="planBox">
				<div class="flex-row">
					<div class="title-sub">当前计划状态</div>
					<div class="title-sub" style="color: red;margin-left: 100px;" v-if="periodStatus==30">计划关闭倒计时:
					<Times :remainTime='ruleForm.autoNextEndDownSeconds' ></Times>
					</div>
				</div>
				
				<el-steps :active="PlanActive" align-center>
				  <el-step title="筹备中"  ></el-step>
				  <el-step title="预启动" ></el-step>
				  <el-step title="计划中" ></el-step>
				  <el-step v-if="periodStatus==40"  title="已达标" ></el-step>
				  <el-step v-if="periodStatus==60 "title="未达标"  ></el-step>
				  <el-step v-if="periodStatus==50 "  title="成功" ></el-step>
				  <el-step v-if="periodStatus==70 " title="失败"  ></el-step>
				</el-steps>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
				<el-form-item label="轮数" prop="roundsNum">
					<el-input v-model="ruleForm.roundsNum" disabled style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="最大参与人数"  prop="maxJoinPeopleNum">
					<el-input v-model="ruleForm.maxJoinPeopleNum" :disabled="periodStatus!=10" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="当前参与人数" prop="currentJoinPeopleNum">
					<el-input v-model="ruleForm.currentJoinPeopleNum"  :disabled="periodStatus>=40" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item v-if="periodStatus!=10" label="实际参与人数" >
					<el-input v-model="ruleForm.currentRealJoinPeopleNum"  :disabled="periodStatus!=10" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="参团所需能量值"  prop="groupEnergyValue">
					<el-select v-model="ruleForm.groupEnergyValue" :disabled="periodStatus!=10" placeholder="请选择" >
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
						<el-input v-model="ruleForm.successGiftGoldNum" :disabled="periodStatus>=40" style="width: 150px;"></el-input> 个
					</el-form-item>
					<el-form-item label="白金矿石" prop="successGiftPlatinumNum">
						<el-input v-model="ruleForm.successGiftPlatinumNum" :disabled="periodStatus>=40" style="width: 150px;"></el-input> 个
					</el-form-item>
				</div>
				<el-form-item label="退回n-1期能量值" prop="successGiftEnergyValue">
					<el-input v-model="ruleForm.successGiftEnergyValue" :disabled="periodStatus>=40" style="width: 150px;"></el-input>
				</el-form-item>
				<div class="title-sub-s">计划失败奖励</div>
				<el-form-item label="黄金矿石" prop="failGiftGoldNum">
					<el-input v-model="ruleForm.failGiftGoldNum" :disabled="periodStatus>=40" style="width: 150px;"></el-input>个
				</el-form-item>
				<div class="flex-row">
					<el-form-item label="退回n-1期能量值" prop="failGiftPrevEnergyValue">
						<el-input v-model="ruleForm.failGiftPrevEnergyValue" :disabled="periodStatus>=40" style="width: 150px;"></el-input> 
					</el-form-item>
					<el-form-item label="退回n期能量值" prop="failGiftCurrentEnergyValue">
						<el-input v-model="ruleForm.failGiftCurrentEnergyValue" :disabled="periodStatus>=40" style="width: 150px;"></el-input> 
					</el-form-item>
				</div>
				<div v-if="periodStatus!=10">
					<div class="title-sub" >用户参团情况（{{total}}）</div>
					<el-table :data="tableData" border style="width: 100%" stripe ref="list" @row-click="singleElection">
						<el-table-column prop="userPhone" label="用户手机号">
						</el-table-column>
						<el-table-column prop="userNick" label="用户昵称">
						</el-table-column>
						<el-table-column prop="trueName" label="用户姓名" >
						</el-table-column>
						<el-table-column prop="energyId" label="能量值Id" >
						</el-table-column>
						<el-table-column prop="energyUseNum" label="能量值使用次数" >
						</el-table-column>
						<el-table-column prop="createdAt" label="参与记录" >
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<div style="display: flex; flex-direction: row;">
								   <el-button type="primary" @click='delUser(scope.row.id)'>剔除</el-button>	
								</div>
							</template>
						</el-table-column>
					</el-table>
					<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
						<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange2" background
							layout="prev, pager, next" :total="total">
						</el-pagination>
					</div>
				</div>


				<el-form-item style="margin-top: 40px;text-align: center;">
					<el-button @click="repage()" type="infor" style="width: 160px;" >
						取消
					</el-button>
					<el-button @click="repage()" v-if="periodStatus>30" type="primary" style="width: 160px;" >
						确认
					</el-button>
					<el-button type="primary" v-if="periodStatus<40"  style="width: 160px;" :loading="checkDown" @click="submitForm('ruleForm')">
						更新信息
					</el-button>
					<el-button type="primary" v-if="periodStatus<40" @click="ChangePeriodyStatus((PlanActive+1)*10)" style="width: 160px;" :loading="checkDown" >
						结束当前状态
					</el-button>
					<el-button v-if="periodStatus==10" type="danger" @click="dialogVisible=true" style="width: 160px;" >删除</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 弹框 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center :before-close="handleClose">
			<div style="font-size: 16px;" >确认删除本轮倍增计划!!</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="del()">确 定</el-button>
			</span>
		</el-dialog>
		



	</div>
</template>

<script>
	import Times from "./Time.vue"
	import dayjs from 'dayjs'
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				energyList:[],
				periodStatus:40, //筹备中=10，预启动=20,计划中=30，已达标=40,未达标=50
				PlanActive:1,
				checkDown: false,
				dialogVisible: false,
				pageIndex: 1,
				templateSelection: '',
				templateRadio: '',
				multipleSelection: [],
				tableData:[], 
				total: 0,
				groupId: null,
				groupIds: null,
				groupID: null,
				form: {}, //查询内容表单
				periodId:"",
				multiplyId:'',
				ruleForm: {
					roundsNum: "",
					failGiftCurrentEnergyValue: null,
					failGiftPrevEnergyValue: null,
					failGiftGoldNum: null,
					successGiftPlatinumNum: null,
					successGiftEnergyValue: null,
					successGiftGoldNum: null,
					groupEnergyValue: null,
					currentJoinPeopleNum: null,
					maxJoinPeopleNum: null,
				},
				rules: {
					roundsNum: [{
						validator: (rule, value, callback) => {
							if (value==='') {
								callback(new Error('请输入轮数'))
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
					maxJoinPeopleNum: [{
						validator: (rule, value, callback) => {
							if (value==='') {
								callback(new Error('请输入初始规模人数'))
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
							if (value==='') {
								callback(new Error('请输入当前参与人数'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								}  else if( Number(value) > Number(this.ruleForm.maxJoinPeopleNum) ) {
									callback(new Error('当前参与人数大于最大人数！'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					groupEnergyValue:[{
						required: true, message: '请选择', trigger: 'change'
					}],
					successGiftGoldNum: [{
						validator: (rule, value, callback) => {
							if (value==='') {
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
							if (value==='') {
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
					successGiftEnergyValue:[{
						validator: (rule, value, callback) => {
							if (value==='') {
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
							if (value==='') {
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
							console.log('111',value)
							if (value==='') {
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
					failGiftPrevEnergyValue:[{
						validator: (rule, value, callback) => {
							if (value==='') {
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
				}
			};
		},
		components:{
			Times
		},
		created() {
			this.periodId = this.$route.query.periodId
			this.multiplyId = this.$route.query.multiplyId
			this.energy()
			this.getDetail()
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
				console.log(val)
				var regPos = /^\d+(\.\d+)?$/
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
				if (regPos.test(val) || regNeg.test(val)) {
					return true
				} else {
					return false
				}
			},
			// 关闭模态框
			handleClose() {
				this.dialogVisible = false
			},
			singleElection(row) {
				//    this.templateSelection = this.list.indexOf(row);
				//    this.templateRadio = row.id;
				console.log(row)
				this.groupIds = row.goodsId
				console.log(this.groupIds)
			},
			// handleCurrentChange(val) {
			// 	this.currentRow = val;
			// },
			// handleRowChange() {

			// 	this.selectId = data.id

			// },
			// // 选择勾选
			// submit() {

			// 	this.dialogVisible = false
			// 	// this.groupIds = row.goodsId
			// 	console.log(this.groupIds)
			// 	// this.ruleForm.goodsId= this.templateRadio

			// },
			async ChangePeriodyStatus(val) {
				let {
					data,errorCode
				} = await request({
					url: "/group/Multiply/ChangePeriodyStatus",
					method: "post",
					params: {
						"periodId": this.periodId,
						"multiplyId":this.multiplyId,
						"status":val
					}
				})
				if(errorCode==0) {
					this.$message({
						type: 'success',
						message: '更新成功'
					});
					this.getDetail()
				}
			},

			// 商品详情
			async getDetail() {
				let {
					data
				} = await request({
					url: "/group/Multiply/GetMultiplyPeriodDetail",
					method: "post",
					params: {
						"periodId": this.periodId
					}
				})
				this.ruleForm = data
				this.periodStatus = data.periodStatus
				this.PlanActive = (data.periodStatus/10)-1
				if(data.periodStatus>10) this.table()
			},
			async table() {
				let {
					list,
					total
				} = await request({
					url: "/group/Multiply/GetMultiplyUserRecord",
					method: "post",
					data: {
						  "periodId": this.periodId,
						  "multiplyId": this.multiplyId,
						  "pageIndex": this.pageIndex,
						  "pageSize": 10
					}
				})
						
				this.tableData = list
				this.total = total
			},
			async delUser(id) {
				let {
					data,errorCode
				} = await request({
					url: "/group/Multiply/RemoveMultiplyUserRecord",
					method: "post",
					data: {
						"recordId": id
					}
				})
				if(errorCode==0) {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
					this.getDetail()
				}
				
			},
			
			async del () { 
				
				let {
					data,errorCode
				} = await request({
					url: "/group/Multiply/DeleteMultiply",
					method: "post",
					params: {
						"periodId": this.periodId,
						"multiplyId":this.multiplyId
					}
				})
				if(errorCode==0) {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
					this.repage()
				}

			},
			search() {

				this.dialogVisible = true;
				this.GoodsList()



			},
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
				// this.pageIndex = val
				this.table()
				console.log(`当前页: ${val}`);
			},
			async getList() {
				let {
					list
				} = await request({
					url: '/group/Goods/GetShopClassList',
					method: 'post',
					data: {
						"pageIndex": 1,
						"pageSize": 100
					}
				})
				console.log("list: ", list);
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
						if (valid) {
							this.checkDown = true
							let res = request({
								url: "/group/Multiply/UpdateMultiply",
								method: "post",
								data: {...this.ruleForm,id:this.periodId}
							})
								res.then(ress => {
									console.log('ress', ress)
									if (ress.errorCode == 0) {
										this.$message({
											type: 'success',
											message: '更新成功'
										});
										this.checkDown = false
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
	.planBox {
		position: absolute;
		right: 30px;
		top: 190px;
		width: 50%;
	}
	.title-sub {
		font-size: 18px;
		font-weight: bold;
		margin-left: 30px;
		margin: 20px ;
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
