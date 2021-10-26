<template>
	<div class="page">
		<div>
			<el-tabs v-model="activeName" @tab-click="tabhandleClick">
				<el-tab-pane label="线上商品分类" name="1"></el-tab-pane>
				<el-tab-pane label="本地生活分类" name="0"></el-tab-pane>
			</el-tabs>
		</div>
		<el-row style="margin: 30px 0;" v-if="activeName==1">
			<el-button type="primary" @click="add(0)" plain>新建</el-button>
		</el-row>

		<el-table ref="multipleTable" :data="tableData" border style="width: 100%"
			@selection-change="handleSelectionChange" v-if="activeName==1">
			<el-table-column prop="sort" label="排序">
			</el-table-column>
			</el-table-column>
			<el-table-column prop="name" label="类别名称">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<div style="display: flex; flex-direction: row;">
						<div @click="add(1,scope.row)" style="color: #409EFF;cursor: pointer;">修改</div>
						<!-- <div @click="changeState(scope.row.id)" style="color: #409EFF;cursor: pointer; margin-left: 12px;">删除</div> -->
						<div @click="informationDelete(scope.row)"
							style="color: #409EFF;cursor: pointer; margin-left: 12px;">删除</el-button>
						</div>
				</template>
			</el-table-column>
		</el-table>
		<el-table ref="multipleTable" :data="tableData" border style="width: 100%"
			@selection-change="handleSelectionChange" v-if="activeName==0">
			<el-table-column prop="sort" label="排序">
			</el-table-column>
			</el-table-column>
			<el-table-column prop="name" label="类别名称">
			</el-table-column>
			
		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background
				layout="prev, pager, next" :total="total">
			</el-pagination>
		</div>
		<!--  -->
		<el-dialog :title="title" :visible.sync="priceDialogVisible" width="40%" center :before-close="handleClose">

			<el-input placeholder="请输入分类名称" v-model="name" maxlength='4'></el-input>


			<el-input placeholder="请输入排序号" style="margin-top: 20px;" v-model="newSort" maxlength='4'></el-input>

			<span slot="footer" class="dialog-footer">
				<el-button @click="priceDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confire">确 定</el-button>
			</span>




		</el-dialog>

</template>

<script>
	import dayjs from 'dayjs'
	import map from "lodash/map";
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				activeName: '1',
				dialogVisible: false,
				title: '',
				priceDialogVisible: false,
				multipleSelection: [],
				tableData: [],
				data: {},
				recom: '',
				name: '',
				newSort: '',
				id: '',
				form: {},
				state: 5,
				pageIndex: 1,
				total: 0,
				pageIndex2: 1,
				total2: 0,
				list: [],
				num_z: 0,
				clockIn: '',
				num_x: 0,
				down: 0,
				up: 0,
				num_c: 0,
				type: '',
				id: ''

			}
		},
		created() {
			this.getData(1)

		},
		methods: {
			confire() {
				if (this.name == "") {
					this.$message({
						message: '请输入分类名称',
						type: 'warning'
					});


					return

				}

				if (this.newSort == "") {
					this.$message({
						message: '请输入排序号',
						type: 'warning'
					});


					return

				}
				this.priceDialogVisible = false

				if (this.type == 1) { //修改

					this.editCreateCategory()
				} else { //添加

					this.CreateCategory()
				}
			},
			add(type, row) {
				console.log("12356");
				console.log("getRecomData", row);
				// console.log(row.type)
				this.priceDialogVisible = true
				this.type = type;
				if (type == 0) {
					this.name = "";
					this.newSort = "";
					this.title = "添加分类"
				} else {
					this.title = "修改分类"
					this.id = row.id
					this.name = row.name;
					this.newSort = row.sort;
				}


			},
			// 添加接口

			async CreateCategory() {




				let {
					errorCode,
					errorMessage
				} = await request({
					url: "/shop/Category/CreateCategory",
					method: "POST",
					data: {
						"name": this.name,
						"sort": this.newSort * 1,

					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '添加分类成功'
					});

				}

				this.getData(1)
			},


			// 修改接口
			async editCreateCategory() {
				let {
					errorCode,
					errorMessage
				} = await request({
					url: "/shop/Category/EditCategory",
					method: "POST",
					data: {
						"id": this.id,
						"name": this.name,
						"sort": this.newSort * 1,

					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '修改分类成功'
					});
					this.getData(1)
				}


			},






			// 关闭模态框
			handleClose() {
				this.priceDialogVisible = false
				this.groupdialogVisible = false
				this.dialogVisible = false
			},
			// 签到页展示接口

			async getType() {

				this.priceDialogVisible = false
			},



			// 批量虚拟成团如果是一个参数如何

			cancel() {
				console.log("1233")
				this.form = {}
				this.pageIndex = 1
				this.getData(1)
			},




			/* 设置排序的弹框 */
			handleClick(row, type) {


				this.priceDialogVisible = true

			},

			// 删除接口
			async informationDelete(item) {
				console.log("12333")
				console.log(item)
				try {
					await this.$confirm("确定删除?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					});
					this.del(item.id);
				} catch (e) {
					this.$message({
						type: "info",
						message: "已取消删除"
					});
					//TODO handle the exception
				}
			},
			async del(id) {
				console.log("id", id)
				let {
					errorMessage
				} = await request({
					url: "/shop/Category/EditCategoryState?id=" + id,
					method: "post",
					data: {
						id: id
					}
				})


				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
					this.getData(1)
				}




				this.getData(1)
			},





			// 类别列表查询
			async getData(id) {
				let {
					total,
					list
				} = await request({
					url: "/shop/Category/GetCategory",
					method: "post",
					data: {
						'parentId':id,//1是线上 2是本地
						"pageIndex": 1,
						"pageSize": 100
					}
				});
				this.tableData = list
				this.total = total
				this.list.map((item) => {
					item.createTime = dayjs(item.createTime).format('YYYY-MM-DD  HH:mm:ss')
				})
			},


			async getUser(id) {
				let {
					total,
					list
				} = await request({
					url: "/group/Group/GetGroupUserList",
					method: "post",
					data: {
						"groupId": id,
						"pageIndex": this.pageIndex2,
						"pageSize": 10
					}
				})
				this.list = list
				this.total2 = total
				this.list.map((item) => {
					item.createTime = dayjs(item.createTime).format('YYYY-MM-DD  HH:mm:ss')
				})


			},
			search() {
				this.getData(1)
			},
			check() {
				this.getData(1)
			},
			handleClick(row) {
				// console.log(row.id);
				this.dialogVisible = true
				this.getUser(row.id)
			},
			// 切换导航
			tabhandleClick(tab, event) {
				console.log(tab.index);
				if (tab.index == 0) {
					this.activeName = "1"
					this.state = 5
					this.getData(1)
				} else if (tab.index == 1) {
					this.activeName = "0"
					this.state = 0
						this.getData(2)
				}
			},
			/* 上下架单选与多选的 */
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			}, 
			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
			},
			handleCurrentChange2(val) {
				this.getUser()
				console.log(`当前页: ${val}`);
			},
			edit(val) {
				console.log("12333")
				console.log(val.id)
				console.log(val.goodsId)
				this.$router.push('/TeamBuyGoodsDetail?id=' + val.id + '&goodsId' + val.goodsId)
			},
			// add() {
			// 	this.$router.push('/TeamBuyGoodsDetail')
			// }

		}
	};
</script>
<style scoped lang="scss">

</style>
