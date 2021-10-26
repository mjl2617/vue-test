<template>
	<div class="setpage">
		<el-button s="danger" @click="repage()">返回</el-button>
		<div>
			<div class="title">兑换商品设置</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
				<el-form-item label="选择商品">
					<el-input v-model="groupIds" style="width: 150px;" placeholder="商品ID/商品名称"></el-input>
					<el-button type="primary" @click="search()">搜索</el-button>
				</el-form-item>
				<!-- <el-form-item label="选择商品" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择组">
						<el-option label="一" value="shanghai"></el-option>
						<el-option label="二" value="beijing"></el-option>
					</el-select>
					<el-select v-model="ruleForm.regions" placeholder="请选择商品">
						<el-option label="一" value="shanghai"></el-option>
						<el-option label="二" value="beijing"></el-option>
					</el-select>
				</el-form-item> -->

				<el-form-item label="排序" prop="recom">
					<el-input v-model="ruleForm.recom" style="width: 150px;"></el-input> 
				</el-form-item>

				<el-form-item label="兑换规则" prop="groupRule">
					<el-input style="width: 30%;" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" v-model="ruleForm.exchangeRules"></el-input>
				</el-form-item>
				<el-form-item label="售后规则" prop="saleRule">
					<el-input style="width: 30%;" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" v-model="ruleForm.saleRule"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-dialog title="商品搜索" :visible.sync="dialogVisible" width="50%" center>

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
				<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange2" background layout="prev, pager, next"
				 :total="total">
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
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				dialogVisible: false,
				list: [],
				total: 0,
				templateSelection: '',
				pageIndex: 1,
				form: {}, //查询内容表单
				groupIds: "",
				ruleForm: {

					"goodsId": "",
					"groupRule": "",
					"saleRule": ""

				},
				rules: {
					orePrice: [{
						required: true,
						message: '请输入消耗金矿石数',
						trigger: 'blur'
					}],
					region: [{
						required: true,
						message: '请选择组',
						trigger: 'change'
					}],
					regions: [{
						required: true,
						message: '请选择商品',
						trigger: 'change'
					}],

					// groupRule: [{
					// 	required: true,
					// 	message: '请填写兑换规则',
					// 	trigger: 'blur'
					// }],
					saleRule: [{
						required: true,
						message: '请填写售后规则',
						trigger: 'blur'
					}]
				},
				id: ''
			};
		},
		created() {

			// this.getList()
			this.groupId = this.$route.query.id
			if (this.groupId) {
				this.getData()
			}
			this.GoodsList()

			// this.id = this.$route.query.id
			// if (this.id) this.getData()
		},
		methods: {
			submit() {

				this.dialogVisible = false
				// this.groupIds = row.goodsId
				console.log(this.groupIds)
				// this.ruleForm.goodsId= this.templateRadio

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
			singleElection(row) {

				this.groupIds = row.goodsId

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




			search() {

				this.dialogVisible = true;
				this.GoodsList()
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
						"subCategoryId": "",
						"state": "",
						"isHot": "",
						"pageIndex": 1,
						"pageSize": 10
					}
				})
				this.list = list
				this.total = total
				console.log("商品库列表", list)
			},

			// 添加与编辑接口




			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.groupId) {
							let res = request({
								url: "/group/ConvertGoods/EditConvertGoods",
								method: "POST",
								data: {
									"keyWord": this.groupIds,
									"recom": this.ruleForm.recom,
									"saleRule": this.ruleForm.saleRule,
									"groupRule": this.ruleForm.groupRule,
								}
							})
						} else {
							let res = request({
								url: "/group/ConvertGoods/Group_AddConvertGood",
								method: "POST",
								data: {

									"goodsId": this.groupIds,
									"recom": this.ruleForm.recom,
									"saleRule": this.ruleForm.saleRule,
									"groupRule": this.ruleForm.groupRule,
								}
							})

						}
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
			},





			// async getData() {
			// 	let {
			// 		data
			// 	} = await request({
			// 		url: "/group/ConvertGoods/Group_ConvertGoods",
			// 		method: "GET",
			// 		params: {
			// 			id: this.id
			// 		}
			// 	})
			// 	this.ruleForm.orePrice = data.orePrice
			// 	this.ruleForm.afterSale = data.afterSale
			// 	this.ruleForm.exchangeRules = data.exchangeRules
			// },
			// async submit() {
			// 	let {
			// 		errorMessage
			// 	} = await request({
			// 		url: "/group/ConvertGoods/Group_AddConvertGoods",
			// 		method: "POST",
			// 		params: {
			// 			"goodsId": "",
			// 			"orePrice": this.ruleForm.orePrice,
			// 			// "names": "string",
			// 			"exchangeRules": this.ruleForm.exchangeRules,
			// 			"afterSale": this.ruleForm.afterSale
			// 		}
			// 	})
			// },
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			repage() {
				this.$router.go(-1)
			}
		}
	}
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
