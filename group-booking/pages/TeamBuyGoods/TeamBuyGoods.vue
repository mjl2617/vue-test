<template>
	<div class="page">
		<div>
			<el-tabs v-model="activeName" @tab-click="tabhandleClick">

				<!-- el-tab-pane :label="'拼团中('+num_x+')'" name="second">
					</el-tab-pane>
					<el-tab-pane :label="'拼团成功('+num_z+')'" name="first"></el-tab-pane>
					<el-tab-pane :label="'拼团失败('+num_c+')'" name="three"></el-tab-pane> -->
				<el-tab-pane :label="'出售中('+down+')'" name="1"></el-tab-pane>
				<el-tab-pane :label="'已下架('+up+')'" name="0"></el-tab-pane>


			</el-tabs>
		</div>
		<div v-show="activeName=='1'">
			<el-row style="margin: 30px 0;">
				<el-button type="primary" @click="add()" plain>新建</el-button>
				<el-button type="success" @click="downs()" plain>下架</el-button>

				<!-- <el-button type="warning" @click="All()" plain>虚拟成团</el-button> -->
				<!-- <el-button type="danger" @click="tables()" plain>克隆</el-button> -->
				<el-button @click="Signin()">签到页展示</el-button>
				<el-button @click="activeBybt()">百亿补贴</el-button>

				<!-- <el-button type="info" @click="table()" plain>推荐</el-button> -->
			</el-row>
			<!-- <el-row style="margin: 30px 0;">
				<el-button type="info" @click="table()" plain>导出</el-button>
				<el-button type="info" @click="table()" plain>导入</el-button>
			</el-row> -->
			<div>
				<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
					<el-form-item label="商品名称">
						<el-input v-model="form.name" placeholder="拼团编号/商品名称"></el-input>
					</el-form-item>
					<el-form-item label="活动分类">
						<el-select v-model="form.region" placeholder="请选择" @change="check()">
							<el-option label="全部" value=""></el-option>
							<el-option label="爆品区" value="1"></el-option>
							<el-option label="热门区" value="2"></el-option>
							<el-option label="平价区" value="3"></el-option>
							<el-option label="新人专区1分" value="4"></el-option>
							<el-option label="快乐倍增" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item v-if="form.region==5" label="快乐倍增">
						<el-select style="margin-left: 10px;" v-model="form.Plan" placeholder="请选择" @change="checkPlan">
							<el-option label="能量商品1000元专区" value="1000"></el-option>
							<el-option label="能量商品500元专区" value="500"></el-option>
							<el-option label="能量商品100元专区" value="100"></el-option>
							<el-option label="能量商品50元专区" value="50"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日期">
						<el-date-picker v-model="form.dateVal" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
					<!-- 	<el-row>
						<el-form-item label="分类筛选">
							<el-select v-model="form.categoryId " placeholder="请选择" @change="check()">
								<el-option v-for="item in categoryList " :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item> -->

					<!-- <el-form-item label="协议价">
						<el-input v-model="form.negotiatedPriceS" style="width: 100px;" placeholder="区间开始"></el-input>--
						<el-input v-model="form.negotiatedPriceE" style="width: 100px;" placeholder="区间结束"></el-input>
					</el-form-item>
					<el-form-item label="指导价">
						<el-input v-model="form.guidePriceS" style="width: 100px;" placeholder="区间开始"></el-input>--
						<el-input v-model="form.guidePriceE" style="width: 100px;" placeholder="区间结束"></el-input>
					</el-form-item> -->
					<!-- </el-row> -->
				</el-form>
			</div>
			<el-row style="margin-bottom: 20px;">
				<el-button type="primary" @click="search()">搜索</el-button>
				<el-button @click="cancel()">取消</el-button>
			</el-row>
			<el-table ref="multipleTable" :data="tableData" border style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column v-if="form.region!=5" prop="successArr" label="中奖序号">
				</el-table-column>
				<el-table-column prop="recom" label="商品排序">
				</el-table-column>
				</el-table-column>
				<el-table-column prop="goodsId" label="商品ID">
				</el-table-column>
				<!-- <el-table-column prop="categoryName" label="分类">
				</el-table-column> -->
				<el-table-column prop="name" label="商品信息">
				</el-table-column>
				<el-table-column v-if="form.region!=5" prop="clockIn" label="是否签到页展示">
					<template slot-scope="scope">
						<span v-if="scope.row.clockIn==1">是</span>
						<span v-else>否</span>
					</template>


				</el-table-column>

				<el-table-column v-if="form.region!=5" prop="data" label="拼中人数/拼团人数">
				</el-table-column>
				<el-table-column v-if="form.region!=5" label="已参团人数">
					<template slot-scope="scope">
						<div>{{scope.row.joinNumber}}</div>
						<el-button @click="lookClick(scope.row)" type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="活动分类">
				</el-table-column>
				<el-table-column v-if="form.region==5" prop="tagPrice" label="售价(元)">
				</el-table-column>
				<el-table-column v-else prop="sellingPrice" label="售价(元)">
				</el-table-column>
				<!-- <el-table-column prop="profit" label="利润(元)">
				</el-table-column> -->
				<el-table-column prop="createTime" label="时间">
				</el-table-column>

				<el-table-column label="操作">
					<template slot-scope="scope">
						<div style="display: flex; flex-direction: row;">
							<div @click="edit(scope.row)" style="color: #409EFF;cursor: pointer;margin-left: 12px;">编辑
							</div>
							<div @click="handleClicks(scope.row,0)"
								style="color: #409EFF;cursor: pointer;margin-left: 12px;">设置排序</div>
						</div>
					</template>
				</el-table-column>
			</el-table>

			<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
				<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background
					layout="prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</div>
		<div v-show="activeName=='0'">
			<el-row style="margin: 30px 0;">
				<el-button type="primary" @click="add()" plain>新建</el-button>

				<el-button type="danger" @click="ups()" plain>上架</el-button>
				<el-button type="info" @click="del()" plain>删除</el-button>
			</el-row>
			<!-- <el-row style="margin: 30px 0;">
				<el-button type="info" @click="table()" plain>导出</el-button>
			</el-row> -->
			<div>
				<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
					<el-form-item label="商品名称">
						<el-input v-model="form.name" placeholder="拼团编号/商品名称"></el-input>
					</el-form-item>
					<el-form-item label="活动分类">
						<el-select v-model="form.region" placeholder="请选择" @change="check()">
							<el-option label="爆品区" value="1"></el-option>
							<el-option label="热门区" value="2"></el-option>
							<el-option label="平价区" value="3"></el-option>
							<el-option label="新人专区1分" value="4"></el-option>
							<el-option label="快乐倍增" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item v-if="form.region==5" label="快乐倍增">
						<el-select style="margin-left: 10px;" v-model="form.Plan" placeholder="请选择" @change="checkPlan">
							<el-option label="能量商品1000元专区" value="1000"></el-option>
							<el-option label="能量商品500元专区" value="500"></el-option>
							<el-option label="能量商品100元专区" value="100"></el-option>
							<el-option label="能量商品50元专区" value="50"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日期">
						<el-date-picker v-model="form.dateVal" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-form>
			</div>
			<el-row style="margin-bottom: 20px;">
				<el-button type="primary" @click="search()">搜索</el-button>
				<el-button @click="cancel()">取消</el-button>
			</el-row>
			<el-table ref="multipleTable" :data="tableData" border style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column v-if="form.region!=5" prop="successArr" label="中奖序号">
				</el-table-column>
				<el-table-column prop="recom" label="商品排序">
				</el-table-column>
				</el-table-column>
				<el-table-column prop="goodsId" label="商品ID">
				</el-table-column>
				<el-table-column prop="name" label="商品信息">
				</el-table-column>

				<el-table-column v-if="form.region!=5" prop="data" label="拼中人数/拼团人数">
				</el-table-column>
				<el-table-column v-if="form.region!=5" label="已参团人数">
					<template slot-scope="scope">
						<div>{{scope.row.joinNumber}}</div>
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="活动分类">
				</el-table-column>
				<el-table-column v-if="form.region==5" prop="tagPrice" label="售价(元)">
				</el-table-column>
				<el-table-column v-else prop="sellingPrice" label="售价(元)">
				</el-table-column>



				<!-- <el-table-column prop="profit" label="利润(元)">
				</el-table-column> -->
				<el-table-column prop="createTime" label="时间">
				</el-table-column>
				<!-- <el-table-column label="操作">
					<template slot-scope="scope">
						<div style="display: flex; flex-direction: row;">
							<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
							<div @click="handleClicks(scope.row,0)" style="color: #409EFF;cursor: pointer;margin-left: 12px;">设置排序</div>
						</div>
					</template>
				</el-table-column> -->
			</el-table>

			<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
				<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background
					layout="prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</div>
		<div v-if="activeName=='three'">
			<el-row style="margin: 30px 0;">
				<el-button type="primary" @click="add()" plain>新建</el-button>
				<el-button type="danger" @click="tables()" plain>克隆</el-button>
				<el-button type="info" @click="del()" plain>删除</el-button>
			</el-row>
			<!-- <el-row style="margin: 30px 0;">
				<el-button type="info" @click="table()" plain>导出</el-button>
			</el-row> -->
			<div>
				<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
					<el-form-item label="商品名称">
						<el-input v-model="form.name" placeholder="拼团编号/商品名称"></el-input>
					</el-form-item>
					<el-form-item label="活动分类">
						<el-select v-model="form.region" placeholder="请选择" @change="check()">
							<el-option label="爆品区" value="1"></el-option>
							<el-option label="热门区" value="2"></el-option>
							<el-option label="平价区" value="3"></el-option>
							<el-option label="新人专区1分" value="4"></el-option>
							<el-option label="快乐倍增" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item v-if="form.region==5" label="快乐倍增">
						<el-select style="margin-left: 10px;" v-model="form.Plan" placeholder="请选择" @change="checkPlan">
							<el-option label="能量商品1000元专区" value="1000"></el-option>
							<el-option label="能量商品500元专区" value="500"></el-option>
							<el-option label="能量商品100元专区" value="100"></el-option>
							<el-option label="能量商品50元专区" value="50"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日期">
						<el-date-picker v-model="form.dateVal" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="search()">搜索</el-button>
						<el-button @click="cancel()">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table ref="multipleTable" :data="tableData" border style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column v-if="form.region!=5" prop="successArr" label="中奖序号">
				</el-table-column>
				<el-table-column prop="recom" label="商品排序">
				</el-table-column>
				<el-table-column prop="goodsId" label="商品ID">
				</el-table-column>
				<el-table-column prop="id" label="拼团编号">
				</el-table-column>
				<el-table-column prop="name" label="商品信息">
				</el-table-column>
				<el-table-column v-if="form.region!=5" prop="data" label="拼中人数/拼团人数">
				</el-table-column>
				<el-table-column v-if="form.region!=5" label="已参团人数">
					<template slot-scope="scope">
						<div>{{scope.row.joinNumber}}</div>
						<el-button @click="lookClick(scope.row)" type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="活动分类">
				</el-table-column>
				<el-table-column v-if="form.region==5" prop="tagPrice" label="售价(元)">
				</el-table-column>
				<el-table-column v-else prop="sellingPrice" label="售价(元)">
				</el-table-column>
				<!-- <el-table-column prop="profit" label="利润(元)">
				</el-table-column> -->
				<el-table-column prop="createTime" label="时间">
				</el-table-column>

			</el-table>

			<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
				<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background
					layout="prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</div>

		<el-dialog title="" :visible.sync="dialogVisible" width="30%" center>
			<el-table :data="list" border style="width: 100%">
				<el-table-column prop="payIndex" label="参团序号">
				</el-table-column>
				<el-table-column prop="userName" label="用户昵称">
				</el-table-column>
				<el-table-column prop="userPhone" label="用户账号">
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<div v-if="scope.row.isSuccess==1">是</div>
						<div v-else>否</div>

					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="时间">
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
				<el-pagination :current-page.sync="pageIndex2" @current-change="handleCurrentChange2" background
					layout="prev, pager, next" :total="total2">
				</el-pagination>
			</div>
		</el-dialog>
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
	import dayjs from 'dayjs'
	import map from "lodash/map";
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				dialogVisible: false,
				priceDialogVisible: false,
				categoryList: [], //类别列表
				multipleSelection: [],
				tableData: [],
				data: {},
				recom: '',
				id: '',
				form: {
				},
				activeName: "1",
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
				activity: ''
			}
		},
		created() {
			this.getData()
			this.getCategory()
		},
		methods: {
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

			handleClicks(row, type) {
				// console.log(row);
				console.log("getRecomData", row);
				this.getRecomData = row;
				this.recom = row.recom
				this.priceDialogVisible = true

			},
			activeBybt() {
				this.activity = "百亿补贴"
				this.getData()
			},
			// 关闭模态框
			handleClose() {
				this.priceDialogVisible = false
				this.groupdialogVisible = false
				this.dialogVisible = false
			},
			// 签到页展示接口
			async Signin() {
				let SigninList = map(this.multipleSelection, "id");
				console.log(SigninList.toString())
				const res = await request({
					url: "/group/Group/ClockInGroup",
					method: "POST",
					data: {
						"groupId": SigninList.toString(),
						"clockIn": 1
					}
				})
				if (res.errorMessage == 'ok') {
					this.$message({
						type: "success",
						message: "设置成功!"
					});
					this.getData()
				} else {
					this.$message({
						type: "error",
						message: "设置失败!"
					});
					this.getData()
				}

			},
			async getRecom() {
				const res = await request({
					url: "/group/group/RecomGroupGoods?groupId=" + this.getRecomData.id + '&recom=' + this
						.recom,
					method: "GET",
				})

				this.$message({
					type: "success",
					message: "设置排序成功!"
				});
				this.getData()
				this.priceDialogVisible = false
			},
			cancel() {
				if (this.multipleSelection.length == 0) {
					this.$message({
						message: "请先勾选",
						type: "warning"
					});
					return;
				}
				const data = map(this.multipleSelection, "id");

				console.log("12333")
				console.log(data)
				this.ClockInGroup(data.join(","), 1);
			},

			async ClockInGroup(ids, clockIn) {
				console.log("cid: " + ids);
				console.log("clockIn: " + clockIn);
				const res = await request({
					url: "/group/Group/ClockInGroup",
					method: "POST",
					data: {
						"groupId": ids,
						"clockIn": 1,
					}






				})





			},








			// 批量虚拟成团如果是一个参数如何
			All() {
				if (this.multipleSelection.length == 0) {
					this.$message({
						message: "请先勾选",
						type: "warning"
					});
					return;
				}
				const data = map(this.multipleSelection, "id");
				console.log("12333")
				console.log(data)
				this.tableEmpty(data.join(","));
			},
			/* 接口 */
			async tableEmpty(ids) {
				const res = await request({

					url: "/group/Group/RecomGroup?groupId=" + ids,
					method: "GET",
					data: {
						"groupId": ids,
					}

				})

				this.$message({
					type: "success",
					message: "虚拟成团成功!"
				});
				this.getData()

			},
			cancel() {
				console.log("1233")
				this.form = {}
				this.pageIndex = 1
				this.activity = ''
				this.getData()
			},

			// 批量克隆成团如果是一个参数如何
			tables() {
				if (this.multipleSelection.length == 0) {
					this.$message({
						message: "请先勾选",
						type: "warning"
					});
					return;
				}
				const data = map(this.multipleSelection, "id");
				console.log("12333")
				console.log(data)
				this.Empty(data.join(","));
			},
			/* 接口 */
			async Empty(ids) {
				const res = await request({
					url: "/group/Group/CopyGroupGoods?groupId=" + ids,
					method: "GET",
					data: {
						"groupId": ids,
					}

				})

				this.$message({
					type: "success",
					message: "克隆成功!"
				});
				this.getData()

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
				const data = map(this.multipleSelection, "id");
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
				const data = map(this.multipleSelection, "id");
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
				const data = map(this.multipleSelection, "id");
				this.changeState(data.join(","), 5);
			},

			/* 设置排序的弹框 */
			handleClick(row, type) {


				this.priceDialogVisible = true

			},

			// 上下架，删除接口

			async changeState(ids, state) {
				let url = "/group/group/EditGroupState"
				let {
					errorMessage
				} = await request({
					url: url,
					method: "POST",
					data: {
						"groupId": ids,
						"state": state,
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






			async getData() {
				let {
					total,
					list
				} = await request({
					url: "/group/Group/GetGroupListAdmin",
					method: "post",
					data: {
						"type": this.form.region, // 1-爆品区 2-热门区 3-平价区
						"state": this.state,
						"keyWord": this.form.name,
						"startDate": this.form.dateVal ? this.form.dateVal[0] : '',
						"endDate": this.form.dateVal ? this.form.dateVal[1] : '',
						"pageIndex": this.pageIndex,
						"pageSize": 10,
						"goodsType": 0,
						"activity": this.activity
					}
				});
				this.tableData = list
				this.total = total

				let {
					data
				} = await request({
					url: "group/Group/GetGroupOrderListIndex",
					method: "POST"
				})
				this.down = data.num_u
				this.up = data.num_i



				this.tableData.map((item) => {
					item.data = item.successNumber + '/' + item.allNumber
					item.profit = item.sellingPrice - item.purchasePrice
					if (item.type == 1) {
						item.type = '爆品区'
					} else if (item.type == 2) {
						item.type = '热门区'
					} else if (item.type == 3) {
						item.type = '平价区'
					} else if (item.type == 4) {
						item.type = '新人专区1分购'
					} else if (item.type == 5) {
						item.type = '快乐倍增'
					}
					item.createTime = dayjs(item.createTime).format('YYYY-MM-DD  HH:mm:ss')
					this.id = item.id
					this.clockIn = item.clockIn
					console.log(this.clockIn)

				})
			},


			async getUser() {
				console.log()
				let {
					total,
					list
				} = await request({
					url: "/group/Group/GetAllGroupUserList",
					method: "post",
					data: {
						"groupId": this.id,
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
			// tabhandleClick(tab, event) {
			// 	console.log(this.activeName);
			// 	this.getData()
			// },
			search() {
				this.getData()
			},
			check() {
				if(this.form.region ==5) {
					this.activity = '1000'
					this.form.Plan = '1000'
				}
				this.getData()
			},
			checkPlan(v) {
				this.form.region = "5"
				this.activity = v
				this.getData()
			},
			lookClick(row) {
				console.log("row", row);
				this.dialogVisible = true
				this.id = row.id
				this.getUser()
			},

			// 切换导航
			tabhandleClick(tab, event) {
				console.log(tab.index);
				if (tab.index == 0) {
					this.activeName = "1"
					this.state = 5
				} else if (tab.index == 1) {
					this.activeName = "0"
					this.state = 0
				}
				this.getData()
			},
			/* 上下架单选与多选的 */
			handleSelectionChange(val, row) {
				this.multipleSelection = val;

			},


			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
			},
			handleCurrentChange2(val) {
				console.log(val.id)
				this.getUser()
				console.log(`当前页: ${val}`);
			},
			edit(val) {
				console.log("12333")
				console.log(val.id)
				console.log(val.goodsId)
				this.$router.push('/TeamBuyGoodsDetail?id=' + val.id + '&goodsId' + val.goodsId)
			},
			add() {
				this.$router.push('/TeamBuyGoodsDetail')
			}

		}
	};
</script>
<style scoped lang="scss">

</style>
