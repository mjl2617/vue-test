<template>
	<div class="page">
		<div>
			<el-tabs v-model="activeName" @tab-click="tabhandleClick">
				<el-tab-pane :label="'出售中('+up+')'" name="1"></el-tab-pane>
				<el-tab-pane :label="'已下架('+down+')'" name="0"></el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="商品名称">
					<el-input v-model="form.name" placeholder="商品名称"></el-input>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker v-model="form.dateVal" type="daterange" range-separator="至" value-format='yyyy-MM-dd'
					 start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<!-- <el-row>
					<el-form-item label="分类筛选">
						<el-select v-model="form.categoryId " placeholder="请选择" @change="check()">
							<el-option v-for="item in categoryList " :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>

				</el-row> -->


				<el-form-item>
					<el-button @click="search()" type="primary">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-row style="margin: 30px 0;" v-if="activeName==1">
			<el-button type="primary" @click="add()" plain>新建</el-button>
			<el-button type="info" @click="del()" plain>删除</el-button>
			<el-button type="danger" @click="downs()" plain>下架</el-button>
		</el-row>
		<el-row style="margin: 30px 0;" v-if="activeName==0">
			<el-button type="primary" @click="add()" plain>新建</el-button>
			<el-button type="info" @click="del()" plain>删除</el-button>
			<el-button type="danger" @click="ups()" plain>上架</el-button>
		</el-row>
		<el-table ref="multipleTable" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="recom" label="排序">
			</el-table-column>
			<el-table-column prop="goodsId" label="商品ID">
			</el-table-column>
			<el-table-column prop="names" label="商品信息">
			</el-table-column>
			<!-- <el-table-column prop="categoryName" label="分类">
			</el-table-column> -->
			<el-table-column prop="orePrice" label="金矿石">
			</el-table-column>
			<el-table-column prop="createTime" label="最后编辑">
			</el-table-column>
			<el-table-column label="操作" v-if="activeName==1">
				<!-- <template slot-scope="scope">
					<router-link :to="'/ConvertGoods/ConvertGoods?id='+scope.row.exId" style="color: #409EFF;text-decoration: none;">编辑</router-link>
				</template> -->
				<template slot-scope="scope">
					<div style="display: flex; flex-direction: row;">
						<router-link :to="'/ConvertGoods/ConvertGoods?id='+scope.row.exId" style="color: #409EFF;text-decoration: none;">编辑</router-link>
						<div @click="handleClick(scope.row,0)" style="color: #409EFF;cursor: pointer;margin-left: 12px;">设置排序</div>
					</div>


				</template>

			</el-table-column>
		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background layout="prev, pager, next"
			 :total="total">
			</el-pagination>
		</div>



		<!-- 设置排序 -->
		<el-dialog title="设置排序" :visible.sync="priceDialogVisible" width="40%" center :before-close="handleClose">
			<el-input placeholder="请输入" v-model="recom"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="priceDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="getRecom()">确 定</el-button>
			</span>
		</el-dialog>

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
				tableData: [],
				priceDialogVisible: false,
				data: {},
				id: '',
				recom: '',
				form: {},
				activeName: '1',
				multipleSelection: "",
				pageIndex: 1,
				total: 0,
				down: 0,
				up: 0,
				categoryList: [], //类别列表
			}
		},
		created() {
			this.getData()
			this.getCategory()
		},
		methods: {
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
				this.categoryList.map((item) => {
					this.form.categoryId = item.categoryId;
				})
				console.log("商品库列表", list)
			},
			check() {
				this.getData()
			},
			
			// 设置排序GET

			async getRecom() {
				const res = await request({
					url: "/group/ConvertGoods/RecomConvertGoods?groupId=" + this.id + '&recom=' + this.recom,
					method: "GET",
					data: {
						"groupId": this.id,
						"recom": this.recom

					}

				})

				this.$message({
					type: "success",
					message: "设置排序成功!"
				});


				this.getData()
				this.priceDialogVisible = false
			},

			// 关闭模态框
			handleClose() {
				this.priceDialogVisible = false
				this.groupdialogVisible = false
				this.dialogVisible = false
			},
			async getData() {
				let {
					list,
					total
				} = await request({
					url: "/group/ConvertGoods/Group_ConvertGoodsList",
					method: "post",
					data: {
						"state": this.activeName,
						"keyWord": this.form.name,
						"startDate": this.form.dateVal ? this.form.dateVal[0] : '',
						"endDate": this.form.dateVal ? this.form.dateVal[1] : '',
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				})
				let list1 = list.map((item) => {
					item.createTime = item.createTime.replace('T', ' ')
					this.id = item.exId
					this.recom = item.recom
					return item



				})
				this.tableData = list1
				this.total = total
				let {
					data
				} = await request({
					url: "/group/ConvertGoods/GetIndex",
					method: "POST"
				})
				this.down = data.num_x
				this.up = data.num_z
			},

			tabhandleClick(tab, event) {
				console.log(this.activeName);
				this.getData()
			},
			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
			},
			handleSelectionChange(val) {

				this.multipleSelection = val;
				console.log(this.multipleSelection);
				// let select = val.map((item) => {
				// 	return item.exId
				// });
				// this.multipleSelection = String(select)
				// console.log()
			},
			// 下架
			downs() {
				if (this.multipleSelection.length == 0) {
					this.$message({
						message: "请先勾选",
						type: "warning"
					});
					return;
				}
				const data = map(this.multipleSelection, "exId");
				this.changeState(data.join(","), 0);
			},
			// 删除

			del() {


				if (this.multipleSelection.length == 0) {
					this.$message({
						message: "请先勾选",
						type: "warning"
					});
					return;
				}
				const data = map(this.multipleSelection, "exId");
				this.changeState(data.join(","), 255);

			},
			/* 上架 */
			ups() {
				if (this.multipleSelection.length == 0) {
					this.$message({
						message: "请先勾选",
						type: "warning"
					});
					return;
				}
				const data = map(this.multipleSelection, "exId");
				this.changeState(data.join(","), 1);
			},



			async changeState(exIds, i) {

				let url = ''
				if (i == 255) url = "/group/ConvertGoods/DeleteAppsState"
				else if (i == 1) url = "/group/ConvertGoods/EditAppsUp"
				else url = "/group/ConvertGoods/EditAppsDown"
				let {
					errorMessage
				} = await request({
					url: url,
					method: "POST",
					data: {
						"goodsIdList": exIds
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



			add() {
				this.$router.push('/ConvertGoods/ConvertGoods')
			},
			search() {
				this.getData()
				console.log(this.form)
			},
			handleClick(row, type) {
				// console.log(row);


				this.priceDialogVisible = true

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

</style>
