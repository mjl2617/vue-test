<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-row>
					<el-form-item label="商品">
						<el-input v-model="form.goodsId" placeholder="商品ID"></el-input>
					</el-form-item>
					<el-form-item label="来源">
						<el-select v-model="form.source" placeholder="请选择" @change="check()">
							<el-option label="全部" value=""></el-option>
							<el-option label="京东" value="2"></el-option>
							<el-option label="阿里巴巴" value="6"></el-option>
							<el-option label="天猫" value="7"></el-option>
							<el-option label="云仓" value="1"></el-option>
						</el-select>
					</el-form-item>
					<!-- 	 <el-form-item label="类别">
						<el-select v-model="form.category " placeholder="请选择搜索分类" @change="check()">
							<el-option v-for="type in categoryList" :key="type.id" :label="type.name" :value="type.id">
							</el-option>
						</el-select> 
					<el-cascader v-model="value" :options="categoryList" @change="handleChange"></el-cascader> -->
					<!-- </el-form-item> -->
				</el-row>
				<el-row>
					<el-form-item label="分类筛选">
						<el-select v-model="form.categoryId " placeholder="请选择" @change="check()">
							<el-option v-for="item in categoryList " :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>

					<!-- <el-form-item label="协议价">
						<el-input v-model="form.negotiatedPriceS" style="width: 100px;" placeholder="区间开始"></el-input>--
						<el-input v-model="form.negotiatedPriceE" style="width: 100px;" placeholder="区间结束"></el-input>
					</el-form-item>
					<el-form-item label="指导价">
						<el-input v-model="form.guidePriceS" style="width: 100px;" placeholder="区间开始"></el-input>--
						<el-input v-model="form.guidePriceE" style="width: 100px;" placeholder="区间结束"></el-input>
					</el-form-item> -->
				</el-row>
				<!-- <el-row>
					<el-form-item label="营销价">
						<el-input v-model="form.marketingPriceS" style="width: 100px;" placeholder="区间开始"></el-input>--
						<el-input v-model="form.marketingPriceE" style="width: 100px;" placeholder="区间结束"></el-input>
					</el-form-item>
				</el-row> -->
				<el-form-item>
					<el-button @click="search()" type="primary">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>
					<!-- <el-button @click="cancel()">同步</el-button> -->

					<el-button @click="cancels()">导入</el-button>
					<!-- <el-button @click="cancel()">批量分组</el-button>
					<el-button @click="cancel()">批量删除</el-button> -->
				</el-form-item>
			</el-form>
		</div>

		<el-table ref="multipleTable" :data="tableData" border style="width: 100%"
			@selection-change="handleSelectionChange">
			<!-- <el-table-column type="selection">
			</el-table-column> -->
			<!-- <el-table-column prop="sort" label="排序">
			</el-table-column> -->
			<el-table-column prop="goodsId" label="商品ID">
			</el-table-column>
			<el-table-column prop="name" label="商品信息" width="400">
				<template slot-scope="scope">
					<div style="display: flex;flex-direction: row;">
						<div
							style="margin-right: 10px; width:110px;height: 110px;border: 1px solid #E6E6E6;border-radius: 4px;box-sizing: border-box;display: flex;align-items: center;justify-content: center;">
							<img :src="scope.row.picture" alt="" style="width: 100px;height: 100px;">
						</div>
						<span>{{scope.row.name}}</span>
					</div>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="stock" label="库存">
			</el-table-column> -->
			<el-table-column prop="categoryName" label="分类">
			</el-table-column>
			<el-table-column prop="sellingPrice" label="拼团售价(元)">
			</el-table-column>
			<el-table-column prop="tagPrice" label="单独购买售价(元)">
			</el-table-column>
			<el-table-column prop="purchasePrice" label="进货价">
			</el-table-column>
			<!-- 是否分红按钮需要接口 -->
			<!-- <el-table-column label="是否参与全球分红">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.shareBonus"></el-switch>
				</template>
			</el-table-column> -->
			<!-- 签到页是否显示 -->

			<!-- <el-table-column label="签到页是否显示">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.shareBonus"></el-switch>
				</template>
			</el-table-column> -->

			<el-table-column prop="source" label="来源">
				<template slot-scope="scope">
					<span v-if="scope.row.source == 1">云仓</span>
					<span v-if="scope.row.source == 2">京东</span>
					<span v-if="scope.row.source == 6">阿里巴巴</span>
					<span v-if="scope.row.source == 7">天猫</span>
				</template>
			</el-table-column>
			<!-- 			<el-table-column prop="categoryId" label="建议分类">
				<template slot-scope="scope">
					<span v-if="scope.row.categoryId == 0">酒类茶叶</span>
					<span v-if="scope.row.categoryId == 1">女装</span>
					<span v-if="scope.row.categoryId == 2">农副产品</span>
					<span v-if="scope.row.categoryId == 3">中秋礼品</span>
					<span v-if="scope.row.categoryId == 4">时尚穿搭</span>
					<span v-if="scope.row.categoryId == 5">居家日用</span>
					<span v-if="scope.row.categoryId == 6">数码</span>
					<span v-if="scope.row.categoryId == 7">其他</span>
				</template>
			</el-table-column> -->
			<el-table-column prop="freeShipping" label="是否包邮">
				<template slot-scope="scope">
					<!-- <span v-if="scope.row.freeShipping == 0">否</span> -->
					<span>包邮</span>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="market_price" label="拼团售价">
			</el-table-column>
			<el-table-column prop="guide_price" label="直购售价">
			</el-table-column> -->

			<!-- 拼团数量 -->
			<!-- 	<el-table-column prop="agreement_price" label="拼团数量(个)">
			</el-table-column>

			<el-table-column prop="agreement_price" label="直购数量(个)">
			</el-table-column>

			<el-table-column prop="agreement_price" label="兑换数量(个)">
			</el-table-column> -->

			<!-- 	<el-table-column prop="" label="所属分组">
				<template slot-scope="scope">
					<div>{{scope.row.joinNumber}}</div>
					<el-popover placement="bottom" width="200" trigger="click" content="更多更多更多">
						<div slot="reference" style="cursor: pointer;">更多(2)...</div>
					</el-popover>
				</template>
			</el-table-column> -->
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- <router-link :to="'/base/Notice/Detail?id='+scope.row.id" style="color: #409EFF;text-decoration: none;">设置分组</router-link> -->
					<div @click="handleClick(scope.row,0)" style="color: #409EFF;cursor: pointer;">设置分类</div>
					<div @click="handleClick(scope.row,1)" style="color: #409EFF;cursor: pointer;">设置购买价格</div>
					<!-- <div @click="handleClicks(scope.row)" style="color: #409EFF;cursor: pointer;">设置分类</div> -->
					<div @click="changeState(scope.row)" style="color: #409EFF;cursor: pointer;">删除</div>


				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">

			<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background
				layout="prev, pager, next" :total="total">
			</el-pagination>
		</div>
		<!-- 设置价格弹窗 -->
		<el-dialog title="设置价格" :visible.sync="priceDialogVisible" width="420px" center :before-close="handleClose">
			<el-form ref="form" :model="form" label-width="100px" label-position="right">
				<el-form-item label="拼团售价">
					<el-input v-model="setPrice.sellingPrice" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="单独购买售价">
					<el-input v-model="setPrice.tagPrice" style="width: 200px;"></el-input>
				</el-form-item>

				<el-form-item label="拼团金币奖励">
					<el-input v-model="setPrice.bonus" style="width: 200px;"></el-input>
					<div style="color:#909399">拼团失败的用户获得的金币奖励</div>
				</el-form-item>
				<el-form-item label="直购金币奖励">
					<el-input v-model="setPrice.mallBonus" style="width: 200px;"></el-input>
					<div style="color:#909399">直接购买团队获得的金币奖励</div>
				</el-form-item>

				<el-form-item label="消耗金矿石数">
					<el-input v-model="setPrice.orePrice" style="width: 200px;"></el-input>

				</el-form-item>
				<el-form-item label="划线价">
					<el-input v-model="setPrice.markingPrice" style="width: 200px;"></el-input>

				</el-form-item>
				<el-form-item label="进货价">
					<el-input v-model="setPrice.purchasePrice" style="width: 200px;"></el-input>

				</el-form-item>

				<el-form-item label="运费">
					<el-input v-model="setPrice.deliveryPrice" style="width: 200px;"></el-input>

				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="priceDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="getPrice()">确 定</el-button>
			</span>
		</el-dialog>
		<!--设置 分类-->
		<el-dialog title="设置分类" :visible.sync="groupdialogVisible" width="40%" center :before-close="handleClose">
			<!-- 请选择分类 -->
			<el-row>
				<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
					<el-form-item label="分类筛选">
						<el-select v-model="setForm.categoryId " placeholder="请选择">
							<el-option v-for="(item2,i) in categoryList " :key="i" :label="item2.name"
								:value="item2.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="groupdialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="typeSure()">确 定</el-button>
			</span>
		</el-dialog>


		<!-- 导入的弹窗 -->
		<el-dialog title="导入" :visible.sync="dialogVisible" width="40%" center :before-close="handleClose">
			<el-input placeholder="请输入商品ID" v-model="goodsId"></el-input>
			<!-- 请选择分类 -->

			<el-row style="margin-top: 20px;">
				<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">

					<el-form-item label="分类筛选">
						<el-select v-model="form3.categoryId " placeholder="请选择">
							<el-option v-for="(item3,index) in categorylist " :key="index" :label="item3.name"
								:value="item3.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-row>
			<!-- <el-select v-model="form.postage " placeholder="请选择分类" @change="check()" style="width: 80%;margin-top: 20px;">
				<el-option label="全部" value="0"></el-option>
				<el-option label="是" value="1"></el-option>
				<el-option label="否" value="2"></el-option>
			</el-select>
 -->

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit()">确 定</el-button>
			</span>
		</el-dialog>


		<!-- <el-dialog title="设置库存" :visible.sync="dialogVisibleType" width="40%" center :before-close="handleClose">
			<el-input placeholder="请输入" v-model="input" show-password></el-input>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleType = false">取 消</el-button>
				<el-button type="primary" @click="submit()">确 定</el-button>
			</span>
		</el-dialog> -->


	</div>
</template>

<script>
	import map from "lodash/map";
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				priceDialogVisible: false, //价格弹窗
				groupdialogVisible: false, //分组弹窗
				dialogVisible: false,
				tableData: [], //商品表格数据
				options: [],
				dialogVisibleType: false,
				goodsId: '',
				setPrice: {
					"sellingPrice": 0,
					"bonus": 0,
					"tagPrice": 0,
					"mallBonus": 0,
					"orePrice": 0,
					"markingPrice": 0,
					"purchasePrice": 0,
					"deliveryPrice": 0



				}, //设置商品价格
				data: {},
				total: 0,
				multipleSelection: [],
				id: '',
				form: {}, //查询内容表单
				form1: {},
				input: '', //设置库存
				pageIndex: 1,
				categoryList: [], //类别列表

				categorylist: [], //导入类别列表
				priceFrom: {}, //设置价格弹框表单数据
				tagList: [], //商品设置分组列表
				ids: [], //选中的分组标签id
				setForm: {},
				form3: {},
			}
		},
		mounted() {
			this.getData()
			this.getCategory()
			this.Category()
		},
		methods: {


			// 删除接口
			async changeState(row, state) {
				console.log("9*9**")
				console.log(row.id)

				let {
					errorMessage
				} = await request({
					url: "/shop/Goods/setState",
					method: "POST",
					data: {
						"goodsIdList": row.goodsId,
						"state": 255,
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						message: '提交成功!',
						type: 'success'
					});
					this.getData()
				}
			},

			// 设置价格

			async getPrice() {

				let {
					errorCode,
					errorMessage
				} = await request({
					url: "/group/Group/SetGoodsPrice",
					method: "POST",
					data: {
						"goodsId": this.setPrice.goodsId,
						"sellingPrice": this.setPrice.sellingPrice,
						"bonus": this.setPrice.bonus,
						"tagPrice": this.setPrice.tagPrice,
						"mallBonus": this.setPrice.mallBonus,
						"orePrice": this.setPrice.orePrice,
						"markingPrice": this.setPrice.markingPrice,
						"purchasePrice": this.setPrice.purchasePrice,
						"deliveryPrice": this.setPrice.deliveryPrice,
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '设置价格成功'
					});
					this.getData()
				}

				this.priceDialogVisible = false
			},
			//设置分类接口

			async typeSure() {
				let categoryName = '';


				// 遍历分类列表拿设置分类列表
				this.categoryList.map((item) => {
					// this.setForm.categoryId = item.categoryId;
					if (this.setForm.categoryId == item.id)
						categoryName = item.name

					console.log("this.setForm.categoryId", this.setForm.categoryId)
				})

				let {
					errorCode,
					errorMessage
				} = await request({
					url: "/shop/Category/UpdateShopGoods",
					method: "POST",
					data: {
						"categoryName": categoryName,
						"goodsId": this.setForm.goodsId,
						"categoryId": this.setForm.categoryId,
					}
				})

				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '设置分类成功'
					});

				}

				this.groupdialogVisible = false
				this.getData()
			},





			// 导入的打开
			cancels() {
				this.goodsId = "",
					this.dialogVisible = true

			},


			async submit() {
				
				if (this.goodsId == "") {
					this.$message({
						message: '请输入商品ID',
						type: 'warning'
					});


					return
				}

				if (this.form3.categoryId == "") {
					this.$message({
						message: '请选择分类筛选',
						type: 'warning'
					});


					return

				}



				let {
					data
				} = await request({
					url: "shop/Goods/STBZGoodsDetials",
					method: "POST",
					params: {
						id: this.goodsId,
						categoryId: this.form3.categoryId,

					}
				})
				if (data == 'ok') {
					this.$message({
						type: 'success',
						message: '导入成功'
					});

				}

				this.dialogVisible = false
			


				this.getData()
			},





			// 类别查询
			async getCategory() {
				let {
					list
				} = await request({
					url: "/shop/Category/GetCategory",
					method: "post",
					data: {
						parentId: this.form.categoryId,
						"pageIndex": this.pageIndex,
						"pageSize": 10

					}
				})
				this.categoryList = list
				console.log("类别列表", list)
				this.categoryList.unshift({
					name: "全部",
					categoryId: "",
				});

				console.log("商品库列表", list)
			},

			async Category() {
				let {
					list
				} = await request({
					url: "/shop/Category/GetCategory",
					method: "post",
					data: {
						parentId: this.form.categoryId,
						"pageIndex": this.pageIndex,
						"pageSize": 10

					}
				})
				this.categorylist = list
				console.log("类别列表", list)
				// this.categoryList.unshift({
				// 	name: "全部",
				// 	categoryId: "",
				// });

				console.log("商品库列表", list)
			},


			check() {
				console.log("111")


				this.getData()

			},
			// 商品数据列表
			async getData() {
				let {
					list,
					total
				} = await request({
					url: "/shop/Goods/GoodsList",
					method: "post",
					data: {
						"key": this.form.goodsId,
						"categoryId": this.form.categoryId,
						"source": this.form.source,
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				})
				this.tableData = list
				this.total = total

				this.tableData.map((item) => {
					this.goodsId = item.goodsId;
					this.setForm.categoryName = item.categoryName
					console.log(this.setForm.categoryName)
				})
				console.log("商品库列表", list)
			},


			handleChange(value) {
				console.log(value);
			},
			// 显示弹窗 0设置分组1设置价格2.设置分类
			handleClick(row, type) {
				if (type == 0) { //设置分类
					this.setForm = row;
					console.log("row.categoryId", row.categoryId)
					console.log('设置分类row', this.setForm);
					this.groupdialogVisible = true
				} else {
					this.setPrice = row;
					this.priceDialogVisible = true
				}

				// console.log(row);
				// if (type == 0) {
				// 	this.form = row;
				// 	this.form.categoryId = row.categoryId;
				// 	console.log(this.form.goodsId)
				// 	console.log(this.form.categoryId)
				// 	this.groupdialogVisible = true
				// } else {
				// 	this.setPrice = row;
				// 	this.priceDialogVisible = true
				// }

			},
			handleClicks(row) {

				this.dialogVisibleType = false


			},
			// 关闭模态框
			handleClose() {
				this.priceDialogVisible = false
				this.groupdialogVisible = false
				this.dialogVisible = false
			},
			// 模态框确定 0分组1价格2.设置分类
			confirm(type) {
				if (type == 0) {
					console.log("选中的分组", this.ids);
					this.groupdialogVisible = false
				} else if (type == 1) {
					this.priceDialogVisible = false
				} else {

					this.dialogVisibleType = false



				}
				// this.$message({
				// 	showClose: true,
				// 	message: '操作成功',
				// 	type: 'success'
				// });

			},
			// 分组标签选择
			change(id) {
				const _index = this.ids.indexOf(id)
				if (_index < 0) {
					this.ids.push(id);
				} else {
					this.ids.splice(_index, 1);
				}
			},


			// 表格勾选
			handleSelectionChange(val) {
				let select = val.map((item) => {
					return item.id
				});
				this.multipleSelection = String(select)
			},

			goDetail(item) {
				this.$router.push('/UserList/UserDetail')
			},
			// 分页
			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
			},
			// 查询搜索
			search() {

				this.getData()
				// console.log("查询内容",this.form)
			},
			// 取消搜索
			cancel() {
				this.form = {}
				this.pageIndex = 1
				this.getData()
			}

		}
	};
</script>
<style scoped lang="scss">
	.tagBg {
		background-color: #3A8EE6;
		min-height: 94px;
	}

	.abow_dialog {
		overflow: hidden;
		height: 420px;
		overflow-y: auto;
	}

	.tag-view {
		display: flex;
		flex-wrap: wrap;
		margin: -15px;

		.tags {
			padding: 15px 40px;
			width: 50%;
			box-sizing: border-box;

			.item {
				border: 1px solid #e6e6e6;
				padding: 40px;
				border-radius: 10px;
			}
		}
	}

	.checkBg {
		background-color: #409EFF;
		color: #FFFFFF;

	}
</style>
