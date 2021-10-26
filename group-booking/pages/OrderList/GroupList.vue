<template>
	<div class="page">
		<div>
			<el-tabs v-model="activeName" @tab-click="tabhandleClick">
				<el-tab-pane :label="'全部('+num+')'" name=""></el-tab-pane>
				<el-tab-pane :label="'已拼中('+num_z+')'" name="first"></el-tab-pane>
				<el-tab-pane :label="'拼团中('+num_x+')'" name="second"></el-tab-pane>
				<el-tab-pane :label="'拼团失败('+num_c+')'" name="three"></el-tab-pane>
				<el-tab-pane :label="'待收货('+num_n+')'" name="five"></el-tab-pane>
				<el-tab-pane :label="'待支付('+num_v+')'" name="six"></el-tab-pane>
				<el-tab-pane :label="'已取消('+num_b+')'" name="seven"></el-tab-pane>
				<el-tab-pane :label="'已完成('+num_m+')'" name="enght"></el-tab-pane>
				<el-tab-pane :label="'待消费('+num_dxf+')'" name="num_dxf"></el-tab-pane>
				<el-tab-pane :label="'已过期('+num_ygq+')'" name="num_ygq"></el-tab-pane>

			</el-tabs>
		</div>
		<div>

			<!-- <el-row style="margin: 30px 0;">
				<el-button type="info" @click="table()" plain>导出</el-button>
				<el-button type="info" @click="table()" plain>导入</el-button> 
			</el-row> -->
			<div>
				<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
					<el-form-item label="商品名称">
						<el-input v-model="form.name" placeholder="订单号/商品名称/用户昵称/用户账号" style="width: 320px;"></el-input>
					</el-form-item>
					<el-form-item label="日期">
						<el-date-picker v-model="form.dateVal" type="daterange" range-separator="至" start-placeholder="开始日期"
						 end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>

				</el-form>
			</div>
			
			<el-row style="margin-bottom: 20px;">
				<el-button type="primary" @click="search()">搜索</el-button>
				<el-button @click="cancel()">取消</el-button>
				<el-button type="primary" @click="toExport()">导出</el-button>
				<!-- 导入发货 -->
				<el-button type="primary" @click="upModel" icon="el-icon-upload" v-if="state==20">批量导入发货</el-button>
			
			</el-row>
			<el-table ref="multipleTable" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="orderNo" label="订单编号">
				</el-table-column>
				<el-table-column prop="goodsName" label="商品信息" width="350px">
					<template slot-scope="scope">
						<div style="display: flex;flex-direction: row;">
							<div style="margin-right: 10px; width:110px;height: 110px;border: 1px solid #E6E6E6;border-radius: 4px;box-sizing: border-box;display: flex;align-items: center;justify-content: center;">
								<el-image :src="scope.row.image" style="width: 100px;height: 100px;"></el-image>
							</div>
							<span>{{scope.row.goodsName}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column  label="订单类型">
					<template slot-scope="scope">
						<div>{{scope.row.goodsType==2?"本地生活":"线上商品"}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="userName" label="用户昵称">
				</el-table-column>
				<el-table-column prop="userPhone" label="用户账号">
				</el-table-column>

				<el-table-column prop="adName" label="收货人姓名">
				</el-table-column>

				<el-table-column prop="address" label="收货地址">
				</el-table-column>

				<el-table-column prop="amount" label="购买金额(元)">
				</el-table-column>
				<!-- <el-table-column prop="profit" label="利润(元)">
				</el-table-column> -->
				<el-table-column label="支付方式" prop="payType">
					<template slot-scope="scope">
						<div v-if="scope.row.payType==1">支付宝</div>
						<div v-if="scope.row.payType==2">微信</div>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="下单时间">
				</el-table-column>
				<el-table-column label="操作" >
					<template slot-scope="scope">
						<el-button v-if="state==20 && scope.row.goodsType!=2" @click="handleClickS(scope.row)" type="text" size="small">发货</el-button>
						<el-button v-if="state!=3" @click="handleClose(scope.row)" type="text" size="small">关闭</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
				<el-pagination background layout="prev, pager, next" :total="total" :current-page.sync="pageIndex" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
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
				dialogVisible: false,
				multipleSelection: "",
				rowData: {},
				tableData: [],
				data: {},
				form: {},
				activeName: 'first',
				pageIndex: 1,
				total: 0,
				num_z: 0,
				num_dxf:0,
				num_ygq:0,
				num_x: 0,
				num: 0,
				num_c: 0,
				num_v: 0,
				num_n: 0,
				num_b: 0,
				num_m: 0,
				state: 20
			}
		},
		created() {
			this.getData()
		},
		methods: {
			//导出
			async toExport() {

				const res = await request({
					url: "/shop/MallOrder/GetDeliveryOrderExl",
					method: "post",
					data: {

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



			// 导入（上传文件）

			beforeUpload(file) {
				console.log("file", file)
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
					this.$message({
						message: '导入成功!',
						type: 'success'
					});

					this.uploadDialog = false;
				}






				setTimeout(() => {
					this.uploading = false;
					this.getData()
				}, 1500);
			},

			colseFile() {
				console.log("888")
				this.uploadDialog = false;
			},






			// async uploadFile() {


			// 	if (this.fileList.length === 0) {
			// 		this.$message.warning("请上传文件")



			// 	} else {

			// 		onst data = new FormData()
			// 		const fileUps = file.file
			// 		data.append('file', fileUps)
			// 		this.$axios({
			// 			headers: {
			// 				'Content-Type': 'multipart/form-data'
			// 			},
			// 			url: "/shop/MallOrder/SetDeliveryOrderExl",

			// 		})

			// 	}

			// 	// const res = await request({
			// 	// 	url: "/shop/MallOrder/SetDeliveryOrderExl",
			// 	// 	method: "post",

			// 	// })
			// 	// console.log("1111")

			// 	// this.tableData = res.data;
			// 	if (res.errorCode == 0) {
			// 		this.$message({
			// 			message: '导入成功!',
			// 			type: 'success'
			// 		});



			// 	}

			// 	this.getData()
			// },









			//发货
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





			/* 操作发货 */
			handleClickS(row) {
				console.log("123444")
				console.log(row.orderNo)
				this.rowData = row;
				this.dialogVisible = true
			},

			async getData() {
				let {
					total,
					list
				} = await request({
					url: "/group/Group/GetGroupOrderList",
					method: "post",
					data: {
						"keyWord": this.form.name,
						"state": this.state, //0-待付款  3-已取消 4-已完成
						"startDate": this.form.dateVal ? this.form.dateVal[0] : '',
						"endDate": this.form.dateVal ? this.form.dateVal[1] : '',
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				});
				this.tableData = list
				this.tableData.map((item) => {
					item.createTime = dayjs(item.createTime).format('YYYY-MM-DD  HH:mm:ss')

				})
				this.total = total
				console.log("list: ", list);

				let {
					data
				} = await request({
					url: "/group/Group/GetGroupOrderListIndex",
					method: "POST"
				})
				this.num_z = data.num_z
				this.num_x = data.num_x
				this.num_c = data.num_c
				this.num_v = data.num_v
				this.num_b = data.num_b
				this.num_n = data.num_n
				this.num_m = data.num_m
				this.num = data.num_y
				this.num_dxf = data.num_dxf
				this.num_ygq = data.num_ygq
			},




			handleClick(row) {
				console.log(row);
				this.dialogVisible = true
			},
			tabhandleClick(tab, event) {
				console.log(tab.index);
				if (tab.index == 0) {
					this.state = ""
				} else if (tab.index == 1) {
					this.state = 20
				} else if (tab.index == 2) {
					this.state = 1
				} else if (tab.index == 3) {
					this.state = 25
				} else if (tab.index == 4) {
					this.state = 2
				} else if (tab.index == 5) {
					this.state = 0
				} else if (tab.index == 6) {
					this.state = 3
				} else if (tab.index == 7) {
					this.state = 4
				} else if (tab.index == 8) {
					this.state = 45
				} else if (tab.index == 9) {
					this.state = 50
				}

				this.getData()
			},

			// 拼团订单数量统计
			async GetGroupOrderListIndex() {





			},


			handleSelectionChange(val) {

				this.multipleSelection = val;
			},
			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
			},
			edit() {
				this.$router.push('/TeamBuyGoodsDetail')
			},
			add() {
				this.$router.push('/TeamBuyGoodsDetail')
			},

			search() {
				this.getData()
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
