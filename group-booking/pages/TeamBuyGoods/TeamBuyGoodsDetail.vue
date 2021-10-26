<template>
	<div class="setpage">
		<el-button s="danger" @click="repage()">返回</el-button>
		<div>
			<div class="title">团购商品设置</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">

				<el-form-item label="选择商品" v-if="!groupId">
					<el-input v-model="groupIds" style="width: 150px;" placeholder="商品ID/商品名称"></el-input>
					<el-button type="primary" @click="search()">搜索</el-button>
				</el-form-item>

				<!-- 

				<div class="flex-row">
					<el-form-item label="拼团售价" prop="allNumber">
						<el-input v-model="ruleForm.allNumber" style="width: 150px;"></el-input> 元
					</el-form-item>
					<el-form-item label="拼团金币奖励" prop="allNumber">
						<el-input v-model="ruleForm.allNumber" style="width: 150px;"></el-input> 个
					</el-form-item>
				</div> -->

				<!-- 	<div class="flex-row">
					<el-form-item label="直购售价" prop="allNumber">
						<el-input v-model="ruleForm.allNumber" style="width: 150px;"></el-input> 元
					</el-form-item>
					<el-form-item label="直购金币奖励" prop="allNumber">
						<el-input v-model="ruleForm.allNumber" style="width: 150px;"></el-input> 个
					</el-form-item>
				</div> -->
				<el-form-item label="排序" prop="recom">
					<el-input v-model="ruleForm.recom" style="width: 150px;"></el-input>
				</el-form-item>



				<el-form-item label="活动分类" prop="type">
					<el-select v-model="ruleForm.type" @change='Typechange' placeholder="请选择类别">
						<el-option label="爆品区" value="1"></el-option>
						<el-option label="热门区" value="2"></el-option>
						<el-option label="平价区" value="3"></el-option>
						<el-option label="新人专区1分购" value="4"></el-option>
						<el-option label="快乐倍增" value="5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动名称"  >
					<el-select v-model="ruleForm.activity" placeholder="请选择类别">
						<el-option v-if="ruleForm.type!=5" label="百亿补贴" value="百亿补贴"></el-option>
						<el-option  v-if="ruleForm.type==5"  label="能量商品1000元专区" value="1000"></el-option>
						<el-option  v-if="ruleForm.type==5"  label="能量商品500元专区" value="500"></el-option>
						<el-option  v-if="ruleForm.type==5"  label="能量商品100元专区" value="100"></el-option>
						<el-option  v-if="ruleForm.type==5"  label="能量商品50元专区" value="50"></el-option>
						<el-option    label="无" value=""></el-option>
					</el-select>
					 
				</el-form-item>
				<el-form-item v-if="ruleForm.type==5" label="赠送能量值" prop="energy">
					<el-select v-model="ruleForm.energy" placeholder="请选择类别">
						<el-option
						  v-for="item in energyList"
						  :key="item.value"
						  :label="item.label"
						  :value="item.val">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="ruleForm.type!=5" label="拼团总人数" prop="allNumber">
					<el-input v-model="ruleForm.allNumber"></el-input> 人
				</el-form-item>
				<el-form-item v-if="ruleForm.type!=5" label="拼团成功人数" prop="successNumber">
					<el-input v-model="ruleForm.successNumber"></el-input> 人
				</el-form-item>
				<el-form-item v-if="ruleForm.type!=5" label="消耗拼团券" prop="ticket">
					<el-input v-model="ruleForm.ticket"></el-input> 张
				</el-form-item>
				<!-- 				<el-form-item label="是否是限时活动" prop="useTimeLimit">
					<el-radio-group v-model="ruleForm.useTimeLimit">
						<el-radio :label="0">否</el-radio>
						<el-radio :label="1">是</el-radio>
					</el-radio-group>
					<el-form-item prop="date1" v-if="ruleForm.useTimeLimit==1">
						<el-date-picker v-model="ruleForm.date1" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
						 style="width: 30%;">
						</el-date-picker>
					</el-form-item>
				</el-form-item> -->

			<!-- 	<el-form-item label="是否循环拼团" prop="isRepeat">
					<el-radio-group v-model="ruleForm.isRepeat">
						<el-radio :label="0">否</el-radio>
						<el-radio :label="1">是</el-radio>
					</el-radio-group>
				</el-form-item> -->

				<el-form-item v-if="ruleForm.type!=5" label="是否可提前查看拼团结果" prop="isSearch">
					<el-radio-group v-model="ruleForm.isSearch">
						<el-radio :label="0">否</el-radio>
						<el-radio :label="1">是</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item v-if="ruleForm.type!=5" label="是否是特价商品" prop="isSubsidy">
					<el-radio-group v-model="ruleForm.isSubsidy">
						<el-radio :label="0">否</el-radio>
						<el-radio :label="1">是</el-radio>
					</el-radio-group>
				</el-form-item>

					<div v-if="ruleForm.isSubsidy==1">
						<el-form-item label="特惠价格" prop="subsidyPrice" label-width="380px">
							<el-input v-model="ruleForm.subsidyPrice"></el-input> 元
						</el-form-item>
					</div>

					<!-- <el-form-item label="补贴红包" prop="bonus" label-width="100px">
						<el-input v-model="ruleForm.bonus"></el-input> 元
					</el-form-item> -->


				<!-- <el-form-item label="拼团规则" prop="groupRule">
					<el-input style="width: 30%;" type="textarea" v-model="ruleForm.groupRule"></el-input>
				</el-form-item>
				<el-form-item label="售后规则" prop="saleRule">
					<el-input style="width: 30%;" type="textarea" v-model="ruleForm.saleRule"></el-input>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary"  :loading="checkDown" @click="submitForm('ruleForm')">{{groupId?'立即修改':'立即创建'}}</el-button>
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
				checkDown:false,
				dialogVisible: false,
				list: [],
				energyList:[],
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
					groupId: null,
					allNumber: null,
					recom: null,
					//拼团总人数
					successNumber: null, //拼团成功人数
					ticket: null, //消耗拼团券
					type: '',
					type1: '',
					date1: [], //时间
					date2: '',
					delivery: false,
					// type: [],
					useTimeLimit: 0, //是否是限时活动  1：是 0：否
					isRepeat: 1, //是否循环拼团  1：是 0：否
					isSearch: 1, //是否可提前查看结果  1：是 0：否
					isSubsidy: 1, //是否是特价商品拼团  1：是 0：否
					groupRule: null,
					saleRule: null,
					"subsidyPrice": null,
					"bonus": null,
					"activity":'',
					"energy":''
				},
				rules: {
					allNumber: [{
							required: true,
							message: '请输入拼团总人数',
							trigger: 'blur'
						},
						// {
						// 	min: 3,
						// 	max: 5,
						// 	message: '长度在 3 到 5 个字符',
						// 	trigger: 'blur'
						// }
					],
					successNumber: [{
						required: true,
						message: '请输入拼团成功人数',
						trigger: 'blur'
					}],
					ticket: [{
						required: true,
						message: '请输入消耗拼团券张数',
						trigger: 'blur'
					}],
					type1: [{
						required: true,
						message: '请选择活动类别',
						trigger: 'change'
					}],
					type: [{
						required: true,
						message: '请选择活动类别',
						trigger: 'change'
					}],
					date1: [{
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					// useTimeLimit: [{
					// 	required: true,
					// 	message: '请选择是否是限时活动',
					// 	trigger: 'change'
					// }],
					energy: [{
						required: true,
						message: '请填写赠送能量值',
						trigger: 'blur'
					}],
					isRepeat: [{
						required: true,
						message: '请选择是否循环拼团',
						trigger: 'change'
					}],
					isSearch: [{
						required: true,
						message: '请选择是否提前查看拼团结果',
						trigger: 'change'
					}],
					isSubsidy: [{
						required: true,
						message: '请选择是否是特价商品',
						trigger: 'change'
					}],
					groupRule: [{
						required: true,
						message: '请填写拼团规则',
						trigger: 'blur'
					}],
					saleRule: [{
						required: true,
						message: '请填写售后规则',
						trigger: 'blur'
					}],
					subsidyPrice: [{
						required: true,
						message: '请填写特惠价格',
						trigger: 'blur'
					}],
					// bonus:[{
					// 	required: true,
					// 	message: '请填写补贴红包',
					// 	trigger: 'blur'
					// }],
				}
			};
		},
		created() {




			this.getList()
			this.groupId = this.$route.query.id
			// this.groupIds=this.$route.query.goodsId
			console.log("12233")
			console.log(this.groupIds)
			if (this.groupId) {
				this.getData()
			}
			this.getEnergy()



			this.GoodsList()
		},

		methods: {
			async getEnergy() {
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

				this.dialogVisible = false
				// this.groupIds = row.goodsId
				console.log(this.groupIds)
				// this.ruleForm.goodsId= this.templateRadio

			},
			Typechange(v) {
				if(v==5) {
					this.ruleForm.isSubsidy = 0
					this.ruleForm.isSearch = 0
					this.ruleForm.ticket = 0
					this.ruleForm.successNumber = 1
					this.ruleForm.allNumber = 1
				}else {
					this.ruleForm.isSubsidy = 1
					this.ruleForm.isSearch = 1
					this.ruleForm.ticket = null
					this.ruleForm.successNumber = null
					this.ruleForm.allNumber = null
				}

			},
			// 商品数据列表
			async GoodsList() {
				let {
					list,
					total
				} = await request({
					url: "/shop/Goods/GoodsList",
					method: "post",
					data: {
						"key": this.ruleForm.goodsId,
						"categoryId	": this.form.category,

						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				})
				this.list = list
				this.total = total
				console.log("商品库列表", list)
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
				this.getList()
				console.log(`当前页: ${val}`);
			},
			async getList() {
				let {
					list
				} = await request({
					url: '/shop/Goods/GetShopClassList',
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
						if (this.groupId) {
							let res = request({
								url: "/group/Group/EditGroupGoods",
								method: "post",
								data: {
									"energy": this.ruleForm.energy,
									id: this.groupId,
									"goodsId": this.ruleForm.goodsId,
									"recom": this.ruleForm.recom,
									"type": this.ruleForm.type, //活动分类 1爆品，2热门，3平价
									"allNumber": this.ruleForm.allNumber,
									"successNumber": this.ruleForm.successNumber,
									"ticket": this.ruleForm.ticket,
									"useTimeLimit": this.ruleForm.useTimeLimit,
									"startTime": this.ruleForm.date1[0],
									"endTime": this.ruleForm.date1[1],
									"isRepeat": this.ruleForm.isRepeat,
									"isSearch": this.ruleForm.isSearch,
									"isSubsidy": this.ruleForm.isSubsidy,
									"subsidyPrice": this.ruleForm.subsidyPrice || null,
									// "bonus": this.ruleForm.bonus||null,
									// "groupRule": this.ruleForm.groupRule,
									// "saleRule": this.ruleForm.desc
									"activity":this.ruleForm.activity
								}
							})

							res.then(ress => {
								console.log('ress', ress)
								if (ress.errorCode == 0) {
									this.$message({
										type: 'success',
										message: '修改成功'
									});
									this.checkDown = false
									this.repage();
								}
							})
						} else {
							let res = request({
								url: "/group/Group/AddGroupGoods",
								method: "post",
								data: {
									"energy": this.ruleForm.energy,
									"goodsId": this.groupIds,
									"recom": this.ruleForm.recom,
									"type": this.ruleForm.type, //活动分类 1爆品，2热门，3平价
									"names": this.ruleForm.names,
									"allNumber": this.ruleForm.allNumber,
									"successNumber": this.ruleForm.successNumber,
									"ticket": this.ruleForm.ticket,
									"useTimeLimit": this.ruleForm.useTimeLimit,
									"startTime": this.ruleForm.date1[0],
									"endTime": this.ruleForm.date1[1],
									"isRepeat": this.ruleForm.isRepeat,
									"isSearch": this.ruleForm.isSearch,
									"isSubsidy": this.ruleForm.isSubsidy,
									"subsidyPrice": this.ruleForm.subsidyPrice || null,
									// "bonus": this.ruleForm.bonus||null,
									// "groupRule": this.ruleForm.groupRule,
									// "saleRule": this.ruleForm.desc
									"activity":this.ruleForm.activity
								}
							})
							res.then(ress => {
								console.log('ress', ress)
								if (ress.errorCode == 0) {
									this.$message({
										type: 'success',
										message: '新建成功'
									});
									this.checkDown = false
									this.repage();
								}
							})
							res.catch(ress =>{
								this.checkDown = false
							})


						}

					} else {
						// console.log('error submit!!');
						return false;
					}
				});
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.checkDown = false
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
