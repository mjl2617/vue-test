<template>
	<div class="page">

		<el-button s="danger" @click="repage()" style="margin-bottom: 20px;">返回</el-button>

		<el-button @click="addSetting('', 0)">添加设置</el-button>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="sort" label="次数">
			</el-table-column>
			<el-table-column label="奖励类型">
				<template slot-scope="scope">
					<div v-if="scope.row.giftType==5">拼团次数</div>
					<div v-if="scope.row.giftType==4">高级拼团券</div>
					<div v-if="scope.row.giftType==3">普通拼团券</div>
					<div v-if="scope.row.giftType==2">金矿石</div>
					<div v-if="scope.row.giftType==1">金币</div>


				</template>
			</el-table-column>
			<el-table-column prop="giftNum" label="奖励数量">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="addSetting(scope.row,1)" type="text" size="small">编辑</el-button>
					<el-button type="text" @click="informationDelete(scope.row)" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">

			<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background layout="prev, pager, next"
			 :total="total">
			</el-pagination>
		</div>
		<!-- 设置添加和编辑弹框 -->
		<el-dialog :title="title" :visible.sync="dialogVisible" width="30%" center>

			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="第">
					<el-input v-model="form.num" style="width: 150px;"  oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
					次
				</el-form-item>

				<!-- <el-form-item label="每天可看">
					<el-input v-model="form.dayNum" style="width: 150px;"></el-input>
					个视频
				</el-form-item>
				<el-form-item label="间隔">
					<el-input v-model="form.intervalTime" style="width: 150px;"></el-input>
					s看下一个
				</el-form-item> -->

				<!-- 循环奖励类型 -->
				<el-form-item label="奖励类型" v-for="(v,i) in form.taskGift">
					<el-select placeholder="请选择" v-model="v.giftType">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<i class="el-icon-circle-plus" @click="add()"></i>
					<!-- <i class="el-icon-delete-solid" @click="del(i)"></i> -->


					<el-form-item label="奖励数量" style="margin-top: 12px;">
						<el-input style="width: 150px;" v-model="v.giftNum"  oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
					</el-form-item>

					<!-- 循环 -->
					<!-- 	<el-form-item v-for="(v,i) in addList" :key="i" style="margin-top: 12px;">
						<el-select v-model="form.moneyList[i+1]" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<i class="el-icon-delete-solid" @click="del(i+1)"></i>
						<el-form-item label="奖励数量" style="margin-top: 12px;">
							<el-input v-model="form.moneyList[i+1]" style="width: 150px;"></el-input>
						</el-form-item>

					</el-form-item> -->



				</el-form-item>



			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="SetVideoTask()">确 定</el-button>
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
				id: '',
				addNumList: [],
				tableData: [],
				addList: [],
				title: '',
				numList: [], //奖励数量的
				status: '',
				data: {},
				total: 0,

				form: { //任务奖励列表的数组
					region: '',
					// moneyList: [],
					dayNum: '', //每天看视频的数量
					intervalTime: '', //间隔多少秒可以看下一个视频
					name: '',
					description: '',
					type: 1,
					taskGift: [{
							giftType: -1,
							giftNum: 0,
							sort: 1,

						},



					],


				},




				// select选择的

				options: [{
						value: -1,
						label: '请选择'
					},
					{
						value: 3,
						label: '普通拼团劵'
					},
					{
						value: 4,
						label: '高级拼团劵'
					}, {
						value: 2,
						label: '金矿石'
					}, {
						value: 1,
						label: '金币'
					}, {
						value: 5,
						label: '拼团次数'
					}
				],
				value: '',
				pageIndex: 1
			}
		},
		mounted() {

			// 接收id值
			this.id = this.$route.query.id;
			console.log("this.id", this.id)
			this.TaskGiftList()
			// this.detail()
		},
		methods: {
			//删除事件
			
			async informationDelete(row) {
				console.log("12333777")
				console.log(row)
				try {
					await this.$confirm("确定删除?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					});
					
					this.del(row.id);
					
				} catch (e) {
					this.$message({
						type: "info",
						message: "已取消删除"
					});
					//TODO handle the exception
				}
			},

			async del(id) {
				console.log("是否被删除！！！")
				console.log("id", id)
				let {
					errorMessage
				} = await request({
					url: "/group/Task/DelTaskGift?id=" +row.taskId,
					method: "post",
					data: {
						id: row.taskId,
						

					}
				})
			},


			// 跳转添加设置
			addSetting(row, status) {

				this.dialogVisible = true
				if (status == 0) {
					console.log(111);
					this.form.taskGift = [{
						giftType: -1,
						giftNum: 0,
						sort: 1,

					}];

					this.title = "添加设置"
				} else {

					//-----
					let list = [];
					this.tableData.map(item => {
						if (item.sort == row.sort) {
							list.push(item)
						}
					})



					this.form.taskGift = list;
					this.form.num = row.sort;
					this.title = "编辑设置"
					//this.detail()

				}


			},

			/* 视频的列表页面 */
			async TaskGiftList() {
				let {
					list,
					total
				} = await request({
					url: "/group/Task/TaskGiftList",
					method: "post",
					data: {

						"taskId": this.id,
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				})
				this.tableData = list

				console.log(this.tableData)
				this.total = total
			},


			// 添加设编辑设置接口
			async SetVideoTask() {
				console.log("111")

				this.form.taskGift.map(item => {
					item.sort = this.form.num
				})


				let {
					errorCode,
					errorMessage
				} = await request({
					url: "/group/Task/SetVideoTask",
					method: "POST",
					data: this.form
				})
				this.dialogVisible = false
				console.log("222")
				console.log(this.form);
				if (errorMessage == 'ok') {
					this.$message({
						message: '设置成功！',
						type: 'success'
					});
				}

			},




			add() {
				this.form.taskGift.push({
					giftType: -1,
					giftNum: 0,
					sort: 0,

				})

			},
			del(i) {
				this.form.taskGift.splice(i, 1)

			},
			// 数量的添加

			addNum() {

				this.addNumList.push('')

			},


			handleClick(row) {
				this.dialogVisible = true
				this.userInfo = row;
				this.form.resource = String(row.level)
				console.log(this.form.resource)
			},
			handleClose() {
				this.dialogVisible = false
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
			repage() {
				this.$router.go(-1)
			}

		}
	};
</script>
<style scoped lang="scss">
	.el-tag {
		margin-left: 10px;
	}
</style>
