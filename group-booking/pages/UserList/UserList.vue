<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="身份">
					<el-select v-model="form.type" placeholder="请选择" @change="check()">
						<el-option label="全部" value=""></el-option>
						<el-option label="普通用户" value="0"></el-option>
						<el-option label="会员" value="1"></el-option>
						<el-option label="团长" value="2"></el-option>
						<el-option label="高级团长" value="3"></el-option>
						<el-option label="合伙人" value="4"></el-option>
						<el-option label="区县代理" value="5"></el-option>
						<el-option label="市代理" value="6"></el-option>
						<el-option label="省代理" value="7"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="实名">
					<el-select v-model="form.real " placeholder="请选择" @change="check()">
						<el-option label="全部" value=""></el-option>
						<el-option label="已实名" value="1"></el-option>
						<el-option label="未实名" value="0"></el-option>
					</el-select>
				</el-form-item>
				<!-- 状态筛选 -->
				<el-form-item label="状态筛选">
					<el-select v-model="form.state " placeholder="请选择" @change="check()">
						<el-option label="全部" value=""></el-option>
						<!-- <el-option label="未注册" value="0"></el-option> -->
						<el-option label="已启用" value="1"></el-option>
						<el-option label="已禁用" value="2"></el-option>
						<!-- <el-option label="已注销" value="255"></el-option> -->

					</el-select>
				</el-form-item>

				<el-form-item label="账号">
					<el-input v-model="form.name" placeholder="用户昵称/账号"></el-input>
				</el-form-item>

				<el-form-item label="日期">
					<el-date-picker v-model="form.dateVal" type="daterange" value-format='yyyy-MM-dd' range-separator="至"
					 start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<!-- <el-form-item>

					<el-button @click="search()" type="primary">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>


				</el-form-item> -->
			</el-form>
		</div>
		<!-- 导入发货 -->
		<div style="display: flex; flex-direction: row;align-items: center;margin-bottom: 50px;margin-left: 40px;">
			<el-button type="primary" @click="upModel" icon="el-icon-upload">快乐八点半活动导入</el-button>
			<el-button @click="search()" type="primary">搜索</el-button>
			<el-button @click="cancel()">取消</el-button>

		</div>


		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="userName" label="用户昵称">
			</el-table-column>
			<el-table-column prop="userPhone" label="手机号">
			</el-table-column>
			<el-table-column prop="level" label="用户等级">
				<template slot-scope="scope">
					<div v-if="scope.row.level==0">普通用户</div>
					<div v-if="scope.row.level==1">会员</div>
					<div v-if="scope.row.level==2">团长</div>
					<div v-if="scope.row.level==3">高级团长</div>
					<div v-if="scope.row.level==4">合伙人</div>
					<div v-if="scope.row.level==5">区县代理</div>
					<div v-if="scope.row.level==6">市代理</div>
					<div v-if="scope.row.level==7">省代理</div>
				</template>
			</el-table-column>
			<el-table-column label="实名认证">
				<template slot-scope="scope">
					<div v-if="scope.row.idCard==''">未实名</div>
					<div v-else>{{scope.row.idCard}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="coin" label="金币余额">
			</el-table-column>
			<el-table-column prop="ore" label="金矿石余额">
			</el-table-column>
			<el-table-column prop="goldenOre" label="黄金矿石余额">
			</el-table-column>
			<el-table-column prop="platinumOre" label="铂金金矿石余额">
			</el-table-column>
			<!-- 			<el-table-column prop="address" label="拓展基金余额">
			</el-table-column> -->
			<!-- //0-未注册 1-启用 2-禁用 255-删除/注销 -->
			<el-table-column prop="state" label="账户状态">
				<template slot-scope="scope">
					<!-- <div v-if="scope.row.state==0">未注册</div> -->
					<div v-if="scope.row.state==1">已启用</div>
					<div v-if="scope.row.state==2">已禁用</div>
					<!-- <div v-if="scope.row.state==255">已注销</div> -->
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="注册时间">
			</el-table-column>
			<!-- 			<el-table-column prop="address" label="操作人">
			</el-table-column> -->
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="changeUser(scope.row,1)" v-if="scope.row.state==2" type="text" size="small">启用</el-button>
					<el-button type="text" @click="changeUser(scope.row,2)" size="small" v-if="scope.row.state==1">冻结</el-button>
					<el-button @click="handleClick(scope.row)" type="text" size="small">修改等级</el-button>
					<el-button @click="changeRelieve(scope.row)" type="text" size="small">解除风控</el-button>
					<!-- <el-button type="text" size="small">已结算</el-button> -->
					<router-link :to="'/UserList/UserDetail?id='+scope.row.userId" style="color: #409EFF;text-decoration: none;font-size: 14px;">详情</router-link>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">

			<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background layout="prev, pager, next"
			 :total="total">
			</el-pagination>
		</div>
		<el-dialog title="修改等级" :visible.sync="dialogVisible" width="30%" center :before-close="handleClose">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="一般等级">
					<el-radio-group v-model="level">
						<el-radio :label="0">普通用户</el-radio>
						<el-radio :label="1">会员</el-radio>
						<el-radio :label="2">团长</el-radio>
						<el-radio :label="3" style="margin-top: 15px;">高级团长</el-radio>
						<el-radio :label="4" style="margin-top: 15px;">合伙人</el-radio>
					</el-radio-group>
				</el-form-item>
				<!-- <el-form-item label="代理商">
					<el-radio-group v-model="level">
						<el-radio :label="5">区县代理</el-radio>
						<el-radio :label="6">市代理</el-radio>
						<el-radio :label="7">省代理</el-radio>
					</el-radio-group>
				</el-form-item> -->
				<!-- 	<el-form-item label="备注">
					<el-tag>标签一</el-tag>
					<el-tag>标签一</el-tag>
					<el-tag>标签一</el-tag>
				</el-form-item> -->
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm()">确 定</el-button>
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
				<!-- 	<div class="row">
					<el-input placeholder="请输入奖励的金币数" style="width: 256px;"></el-input>
					<el-input placeholder="活动备注" style="width: 256px;margin-top: 25px;"></el-input>
					
					<el-date-picker v-model="value1" type="date" placeholder="选择日期" style="margin-top: 25px;width: 256px;">
					</el-date-picker>
				</div> -->



			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="colseFile()">取 消</el-button>
				<el-button type="primary" @click="postFile()" :disabled="uploading">确 定</el- button>
			</div>

		</el-dialog>

		<!-- 上传文件后确定又给个弹框列表 -->
		<el-dialog title="获奖账号" :visible.sync="dataDialog" class="eldialog">
			<div class="dataStyle">{{data}}</div>

			<div slot="footer" class="dialog-footer">
				<!-- <el-button @click="colseFile()">取 消</el-button> -->
				<el-button type="primary" @click="dataFile()" :disabled="uploading">确 定</el- button>
			</div>

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
				uploadDialog: false,
				dataDialog: false,
				uploading: false,
				tableData: [],
				relieveInfo: {}, //解除风控信息
				data: {},
				total: 0,
				form: {},
				pageIndex: 1,
				level: -1,
				userInfo: {},
				"coin": 0,
				"remark": "",
				"activeTime": "",
				data: {},


			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			dataFile() {

				this.dataDialog = false


			},
			check() {
				console.log("111")
				this.getData()
			},
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
				this.data = []

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
				let fileData = new FormData();
				fileData.append("file", fileObj);

				let headers = {
					"Content-Type": "multipart/form-data"
				};
				this.uploading = true;

				const res = await request({
					method: "post",
					url: "/group/UserAsset/ActiveCoinGiveGift",
					headers: headers,
					data: fileData,



				})
				console.log('res。data', res.data)
				this.data = res.data

				if (res.errorCode == 0) {
					// this.$message({
					// 	message: '导入成功!',
					// 	type: 'success'
					// });

					this.uploadDialog = false;
					this.dataDialog = true;
				}
				setTimeout(() => {
					this.uploading = false;
					this.getData()
				}, 1500);
			},

			colseFile() {
				console.log("888")
				this.uploadDialog = false;
				this.dataDialog = false;
			},


			async getData() {
				let {
					list,
					total
				} = await request({
					url: "/base/Admin/Base_GetUserList",
					method: "post",
					data: {
						"level": this.form.type,
						"idCard": this.form.real,
						"state": this.form.state,
						"keyWord": this.form.name,
						"startDate": this.form.dateVal ? this.form.dateVal[0] : '',
						"endDate": this.form.dateVal ? this.form.dateVal[1] : '',
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				})
				this.tableData = list
				console.log(this.tableData)
				this.total = total
			},
			async submit() {
				let {
					errorMessage
				} = await request({
					url: "/base/Admin/Base_UpdateUserRole",
					method: "post",
					data: {
						"userId": this.userInfo.userId,
						"level": this.level
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '修改成功'
					});
					this.dialogVisible = false
					this.getData()
				}
			},
			async submitState(i) {
				let {
					errorMessage
				} = await request({
					url: "/base/Admin/UpdateAdmin",
					method: "post",
					params: {
						"userId": this.userInfo.userId,
						"state": i
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '修改成功'
					});
					this.dialogVisible = false
					this.getData()
				}
			},


			changeUser(item, i) {
				this.userInfo = item;
				this.$confirm('是否修改状态?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.submitState(i);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
			},
			handleClick(row) {
				this.dialogVisible = true
				this.userInfo = row;
				this.relieveInfo = row
				this.level = row.level
			},

			// 解除风控提示

			changeRelieve(item) {
				this.relieveInfo = item;
				this.$confirm('是否解除风控?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.relieve();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消解除风控'
					});
				});
			},

			// 解除风控接口
			async relieve() {
				let {
					errorMessage
				} = await request({
					url: "/base/Admin/Base_UpdateUserK",
					method: "post",
					params: {
						"userId": this.relieveInfo.userId,
						// "state": i
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '修改成功'
					});
					this.dialogVisible = false
					this.getData()
				}





			},
			handleClose() {
				this.dialogVisible = false
			},
			goDetail(item) {
				this.$router.push('/UserList/UserDetail')
			},
			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
			},
			search() {
				this.getData()
				console.log(this.form)
			},
			confirm() {
				this.$confirm('是否修改等级?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.submit();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
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
	.el-tag {
		margin-left: 10px;
	}

	.row {

		display: flex;
		flex-direction: column;

		// align-items: center;


	}

	.dataStyle {

		width: 750px;
		overflow: hidden;
		white-space: normal;
		word-break: break-all;



	}
</style>
