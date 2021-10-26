<template>
	<div class="page">
		<div>
			<el-tabs v-model="activeName" @tab-click="tabhandleClick">
				<el-tab-pane :label="'全部('+num_all+')'" name=""></el-tab-pane>
				<el-tab-pane :label="'待发货('+num_z+')'" name="first"></el-tab-pane>
				<el-tab-pane :label="'待收货('+num_n+')'" name="five"></el-tab-pane>
				<el-tab-pane :label="'已完成('+num_m+')'" name="enght"></el-tab-pane>

			</el-tabs>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">

				<el-form-item label="账号">
					<el-input v-model="form.name" placeholder="订单号/商品名称/用户昵称/用户账号" style="width: 260px;"></el-input>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker v-model="form.dateVal" type="daterange" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="search()">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>
					<!-- 导入发货 -->
					<el-button type="primary" @click="upModel" icon="el-icon-upload" v-if="state==5">批量导入发货</el-button>

					<el-button type="primary" @click="toExport()">导出</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="orderNo" label="订单编号">
			</el-table-column>
			<!-- <el-table :data="tableData.orderDetailsList" border style="width: 100%"> -->
			<el-table-column prop="goodsName" label="商品信息">
			</el-table-column>
			<!-- </el-table> -->
			<el-table-column prop="userName" label="用户昵称">
			</el-table-column>
			<el-table-column prop="userPhone" label="用户账号">
			</el-table-column>
			<el-table-column prop="orePrice" label="消耗金矿石数">
			</el-table-column>
			<el-table-column prop="adName" label="收货人姓名">
			</el-table-column>
			<el-table-column prop="address" label="收货地址">
			</el-table-column>
			<el-table-column prop="createTime" label="时间">
			</el-table-column>
			<!-- 操作 -->
			<el-table-column label="操作" >
				<template slot-scope="scope">
					<el-button v-if="state==1" @click="handleClickS(scope.row)" type="text" size="small">发货</el-button>
					<el-button v-if="state!=3" @click="handleClose(scope.row)" type="text" size="small">关闭</el-button>
				</template>
			</el-table-column>


		</el-table>

		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination background layout="prev, pager, next" :total="total" :current-page.sync="pageIndex" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
		<el-dialog title="发货" :visible.sync="dialogVisible" width="30%" center>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="快递公司">
					<el-input type="textarea" v-model="form.deliveryName" placeholder="请输入快递公司"></el-input>
				</el-form-item>
				<el-form-item label="物流单号">
					<el-input type="textarea" v-model="form.deliveryNo" placeholder="请输入物流单号"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit()">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 弹出上传文件的弹框 -->
		<el-dialog title="上传文件" :visible.sync="uploadDialog" class="eldialog">
			<el-form ref="addForm" class="eldialogForm" id="addForm">
				<el-form-item label>
					<el-upload class="upload-demo" drag :before-upload="beforeUpload" :on-exceed="handleExceed" :limit="1"
					 :http-request="uploadFile" multiple ref="upload" action>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">
							将文件拖到此处，或
							<em>点击上传</em>
						</div>
						<div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="colseFile()">取 消</el-button>
				<el-button type="primary" @click="postFile()" :disabled="uploading">确 定</el- button>
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
				// 上传文件
				uploadDialog: false,
				uploading: false,
				file: [],
				tableData: [],
				data: {},
				rowData: {},
				form: {},
				pageIndex: 1,
				total: 0,
				state: 1,
				activeName: 'first',
				dialogVisible: false,
				num_all: 0,
				num_m: 0,
				num_n: 0,
				num_z: 0,

			}
		},
		created() {
			this.getData()
		},
		methods: {
			//关闭订单
			async handleClose(row){
				console.log(row);
				await request({
					url: "/shop/MallOrder/AdminCancelOrder?orderNo="+row.orderNo,
					method: "POST",
					
				})
				this.$message({
					type: 'success',
					message: '提交成功'
				});
				this.getData()
				
			},

			// 导入（上传文件）
			colseFile() {
				console.log("888")
				this.uploadDialog = false;
			},


			beforeUpload(file) {
				if (file.type == "" || file.type == null || file.type == undefined) {
					const FileExt = file.name.replace(/.+\./, "").toLowerCase();
					if (
						FileExt == "xls" ||
						FileExt == "xlsx" ||
						FileExt == "XLS" ||
						FileExt == "XLSX"
					) {
						return true;
					} else {
						this.$message.error("上传文件必须是Excel格式!");
						return false;
					}
				}
				return true;
			},
			upModel() {
				console.log("DA")
				this.uploadDialog = true;
				this.uploading = false;
				this.file = [];

			},
			// 上传文件个数超过定义的数量
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
			},
			uploadFile(item) {
				this.file = item.file;
			},
			async postFile() {
				console.log("5656566")
				const fileObj = this.file;
				var fileData = new FormData();
				fileData.append("file", fileObj);
				let headers = {
					"Content-Type": "multipart/form-data"
				};
				this.uploading = true;

				const res = await request({
					method: "post",
					url: "/shop/MallOrder/SetDeliveryOrderExl",
					headers: headers,
					data: fileData
				})
				if (res.errorCode == 0) {
					console.log(123213213213213213213213)
					this.$message({
						message: '导入成功!',
						type: 'success'
					});


					this.uploadDialog = false;

					var _this = this;
					setTimeout(function() {
						_this.getData()

					}, 1500);

				}


				// .then(res => {
				// 	console.log("res:", res);
				// 	if (res == 200) {
				// 		this.$message.success("读取成功");
				// 		this.uploadDialog = false;
				// 	} 
				// 	// else {
				// 	// 	this.$message.error("错误！请检查上传文件内容");
				// 	// }
				// });


			},

			// 发货
			async submit() {
				let {
					errorCode,
					errorMessage
				} = await request({
					url: "/shop/MallOrder/SetOrderDelivery",
					method: "POST",
					data: {
						orderNo: this.rowData.orderNo,
						deliveryName: this.form.deliveryName,
						deliveryNo: this.form.deliveryNo
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '提交成功'
					});
					this.getData()
				}

				this.dialogVisible = false
			},







			handleClickS(row) {
				console.log("123444")
				console.log(row.orderNo)
				this.rowData = row;
				this.dialogVisible = true
			},






			// 顶部导航
			tabhandleClick(tab, event) {
				console.log(tab.index);
				if (tab.index == 0) {
					this.state = ""
				} else if (tab.index == 1) {
					this.state = 1
				} else if (tab.index == 2) {
					this.state = 2
				} else if (tab.index == 3) {
					this.state = 4
				} else if (tab.index == 4) {
					this.state = 4

				}
				this.getData()
			},

			/* 订单导出 */

			async toExport() {

				// var item = this.$refs.tableData.querytoString();

				const res = await request({
					url: "/shop/MallOrder/GetDeliveryOrderExl",
					method: "post",
					data: {
						"state": this.activeName,
						"startDate": this.form.startDate,
						"endDate": this.form.endDate,
						"pageIndex": this.pageIndex,
						"pageSize": 100

					}



				})
				console.log("1111")

				// this.tableData = res.data;
				if (res.errorCode == 0) {
					window.open(res.data);
				}


			},



			async getData() {
				let {
					total,
					list
				} = await request({
					url: "/group/ConvertGoods/ConvertGoodsMallOrderList",
					method: "post",
					data: {
						"keyWord": this.form.name,
						"state": this.state,
						"startDate": this.form.dateVal ? this.form.dateVal[0] : '',
						"endDate": this.form.dateVal ? this.form.dateVal[1] : '',
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				});
				this.tableData = list
				this.total = total
				this.tableData.map((item) => {
					item.createTime = dayjs(item.createTime).format('YYYY-MM-DD  HH:mm:ss')
				})
				// 兑换订单数量统计
				let {
					data
				} = await request({
					url: "/group/ConvertGoods/GetConvertOrderListIndex",
					method: "POST"
				})

				this.num_z = data.num_1

				this.num_all = data.num_all
				this.num_n = data.num_2
				this.num_m = data.num_4
				console.log("list: ", list);
			},
			search() {
				this.getData()
			},
			/* 状态选择的接口 */
			check() {
				this.getData()
			},


			cancel() {
				this.form = {}
				this.pageIndex = 1
				this.getData()
			},
			handleClick(row) {
				console.log(row);
			},
			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
			}

		}
	};
</script>
<style scoped lang="scss">

</style>
