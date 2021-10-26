<template>
	<div class="page">
		<!-- 列表 -->

		<el-table :data="tableData" border style="width: 100%">
			<el-table-column label="类型">
				<template slot-scope="scope">
					<div v-if="scope.row.type==6">视频任务</div>
					<div v-if="scope.row.type==5">邀请好友</div>
					<div v-if="scope.row.type==4">实名认证</div>
					<div v-if="scope.row.type==3">绑定上级id</div>
					<div v-if="scope.row.type==2">绑定支付宝</div>
					<div v-if="scope.row.type==1">视频专区</div>
				</template>

			</el-table-column>


			<el-table-column prop="name" label="名称">

			</el-table-column>

			<el-table-column prop="description" label="简介">
			</el-table-column>
			<!-- 开关是否显示 -->
			<el-table-column label="是否显示">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.state" :active-value="1" :inactive-value="0" active-color="#02538C" inactive-color="#B9B9B9"
					 @change="changeSwitch(scope.row.state,scope.row.id)" />
					</el-switch>
				</template>

			</el-table-column>
			<el-table-column label="是否分润">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.isProfit" :active-value="1" :inactive-value="0" active-color="#02538C"
					 inactive-color="#B9B9B9" @change="changeSwitchs(scope.row.isProfit,scope.row.id)" v-if="scope.row.type==1||scope.row.type==6" />
					</el-switch>
					<div v-else>--</div>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">设置</el-button>
					<el-button type="text" size="small" @click="informationDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- <div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination background layout="prev, pager, next" :total="1000">
			</el-pagination>
		</div> -->
		<!-- 根据列表中的专区标题弹框不同 -->
		<el-dialog :title="titles" :visible.sync="dialogVisible" width="30%" center>
			<!-- 其他设置 -->
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="名称">
					<el-input v-model="form.name" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="简称">
					<el-input v-model="form.description" style="width: 150px;"></el-input>

				</el-form-item>
				<el-row class="el-checkBox" v-for="(item,index) in form.taskGift ">
					<div>{{item.giftName}}</div>
					<el-input v-model="item.giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="width: 150px;margin-left: 15px;"></el-input>
					<div>{{item.giftUnit}}</div>
				</el-row>


				<!-- el-row class="el-checkBox">
					<div>普通拼团劵</div>
					<
					<el-input v-model="form.taskGift[2].giftNum" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="width: 150px;margin-left: 15px;"></el-input>
					<div style="margin-left: 12px;">张</div>
				</el-row>
				<el-row class="el-checkBox">
					<div>高级拼团劵</div>
					
					<el-input v-model="form.taskGift[3].giftNum" style="width: 150px;margin-left: 15px;"  oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
					<div style="margin-left: 12px;">张</div>
				</el-row>
				<el-row class="el-checkBox">
					<div>金币</div>
					
					<el-input v-model="form.taskGift[0].giftNum" style="width: 150px;margin-left: 55px;"  oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
					<div style="margin-left: 12px;">个</div>
				</el-row>
				<el-row class="el-checkBox">
					<div>金矿石</div>
					
					<el-input v-model="form.taskGift[1].giftNum" style="width: 150px;margin-left: 45px;"  oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
					<div style="margin-left: 12px;">个</div>
				</el-row>
				<el-row class="el-checkBox">
					<div>参团次数</div>
					
					<el-input v-model="form.taskGift[4].giftNum" style="width: 150px;margin-left: 15px;" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></el-input>
					<div style="margin-left: 12px;">次</div>
				</el-row> -->

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="taskSubmit()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	const cityOptions = ['普通拼团劵', '高级拼团劵', '金币', '金矿石', '参团次数'];

	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				a1: false,
				a2: false,
				a3: false,
				a4: false,
				a5: false,
				dialogVisible: false,
				cities: cityOptions,
				checkAll: false,
				isIndeterminate: true,
				dialogVisible: false,
				titles: '',
				addListlength: 0,
				addList: [], //添加事件列表
				checkedCities: ['普通拼团劵', '高级拼团劵'],
				pageIndex: 1,
				index: 0,
				id: '',
				tableData: [],
				data: {},
				form: { //任务奖励列表的数组
					dayNum: '', //每天看视频的数量
					intervalTime: '', //间隔多少秒可以看下一个视频
					name: '',
					description: '',
					type: '',
					"taskGift": [
						
						
						// {
						// 	"giftType": 1, //金币
						// 	"giftNum": "",
						// 	"state": 1 //状态，1=有效，0=无效，255=删除
						// },
						// {
						// 	"giftType": 2, //金矿石
						// 	"giftNum": "",
						// 	"state": 1 //状态，1=有效，0=无效，255=删除
						// },
						// {
						// 	"giftType": 3, //普通拼团券
						// 	"giftNum": "",
						// 	"state": 1 //状态，1=有效，0=无效，255=删除
						// },
						// {
						// 	"giftType": 4, //高级拼团券
						// 	"giftNum": "",
						// 	"state": 1 //状态，1=有效，0=无效，255=删除
						// },
						// {
						// 	"giftType": 5, //拼团次数
						// 	"giftNum": "",
						// 	"state": 1 //状态，1=有效，0=无效，255=删除
						// }
					],



					// taskGift: [ //设置为数组
					// 	 {
					// 		"giftType": 1, //金币
					// 		"giftNum": '',
					// 		"state": 0, //状态，1=有效，0=无效，
					// 		"sort": 0,
					// 	},
					// 	 {
					// 		"giftType": 2, //金矿石
					// 		"giftNum": '',
					// 		"state": 0, //状态，1=有效，0=无效，
					// 		"sort": 1,
					// 	},
					// 	 {
					// 		"giftType": 3, //普通拼团券
					// 		"giftNum": '',
					// 		"state": 0, //状态，1=有效，0=无效，
					// 		"sort": 2,
					// 	},
					// 	 {
					// 		"giftType": 4, //高级拼团券
					// 		"giftNum": "",
					// 		"state": 0, //状态，1=有效，0=无效，
					// 		"sort": 3,
					// 	},
					// 	 {
					// 		"giftType": 5, //拼团次数
					// 		"giftNum": '',
					// 		"state": 0, //状态，1=有效，0=无效
					// 		"sort": 4,
					// 	}
					// ]
				},
			}
		},
		mounted() {
			//console.log("giftNum11",this.form.taskGift[0].giftNum)
			this.TaskList()

		},

		// watch: {
		// 	// 设置成功的复选框的状态生效1未生效为0
		// 	a1(v) {
		// 		if (v) this.form.taskGift[3].state = 1
		// 		else this.form.taskGift[3].state = 0
		// 	},
		// 	a2(v) {
		// 		if (v) this.form.taskGift[4].state = 1
		// 		else this.form.taskGift[4].state = 0
		// 	},
		// 	a3(v) {
		// 		if (v) this.form.taskGift[1].state = 1
		// 		else this.form.taskGift[1].state = 0
		// 	},
		// 	a4(v) {
		// 		if (v) this.form.taskGift[2].state = 1
		// 		else this.form.taskGift[2].state = 0
		// 	},
		// 	a5(v) {
		// 		if (v) this.form.taskGift[5].state = 1
		// 		else this.form.taskGift[5].state = 0
		// 	},
		// },



		methods: {

			// 绑定任务列表接口
			async TaskList() {
				let {
					list,
					total
				} = await request({
					url: "/group/Task/TaskList",
					method: "post",
					data: {

						"pageIndex": this.pageIndex,
						"pageSize": 10

					}
				})
				this.tableData = list
				this.total = total
			},

			// 删除事件



			//添加列表事件
			// add() {
			// 	console.log("111")
			// 	this.addList.push('')

			// },
			//删除事件
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
					url: "/group/Task/DelTask?id=" + id,
					method: "post",
					data: {
						id: id
					}
				})
			},

			// switch是否显示
			changeSwitch(state, index) {
				// console.log(state)
				let newData = state;
				console.log("state1", state)
				newData == 0 ? '1' : '0'; //状态显示和不显示开关
				console.log("newData是否开关成功", newData)
				this.tableData[index] = newData;
				console.log("this.tableData[index]", this.tableData[index])
				this.submit(index, state)

			},
			//调用修改任务的显示
			async submit(index, state) {
				console.log("index", index)
				let {
					errorMessage
				} = await request({
					url: "/group/Task/EditState",
					method: "post",
					data: {
						id: index,
						state: state,
						type: 0

					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '修改显示成功！'
					});
				}
				this.TaskList()

			},
			// 分润显示
			changeSwitchs(isProfit, index) {
				console.log(isProfit)
				let newDatas = isProfit;
				console.log("分润", isProfit)
				newDatas == 0 ? '1' : '0'; //状态启用和禁用
				console.log("newData.states分润", isProfit)
				this.tableData[index] = newDatas;
				console.log("this.tableData[index]", this.tableData[index])
				this.submitMoney(index, isProfit)
			},
			async submitMoney(index, isProfit) {
				console.log("index", index)
				console.log()
				let {
					errorMessage
				} = await request({
					url: "/group/Task/EditState",
					method: "post",
					data: {
						id: index,
						state: isProfit,
						type: 1
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '分润修改显示成功！'
					});
				}
			},
			// 任务设置
			async taskSubmit() {
				this.dialogVisible = false


				let {
					errorCode,
					errorMessage
				} = await request({
					url: "/group/Task/SetTask",
					method: "POST",
					data: {
						"dayNum": this.form.dayNum,
						"name": this.form.name,
						"type": this.form.type,
						"description": this.form.description,
						intervalTime: this.form.intervalTime, //间隔多少秒可以看下一个视频
						"taskGift": this.form.taskGift,
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						message: '设置成功！',
						type: 'success'
					});
				}


			},

			//任务详情接口
			async getData() {
				let {
					data
				} = await request({
					url: "/group/Task/TaskDetial",
					method: "GET",
					params: {
						"id": this.id
					}
				});

				this.form = data
				console.log("res.data",data)
				

			},



			/* 点击设置列表传值 */
			handleClick(row) {
				console.log("是否传值到中", row.id);
				this.id = row.id
				// console.log("this.id", this.id);
				// let taskGift = this.form.taskGift;
				// row.taskGift.map(item => {
				// 	taskGift[item.giftType] = item;

				// })
				// row.taskGift = taskGift;
				this.form = row;
				if (row.type == 1) {
					// this.$router.push('/TaskList/SetTask/VideoSet')
					this.$router.push({
						path: "/TaskList/SetTask/VideoSet",
						query: {
							id: row.id
						}
					});

				} else if (row.type == 2) {
					this.dialogVisible = true

					this.titles = "绑定支付宝"


				} else if (row.type == 3) {
					this.dialogVisible = true
					this.titles = "绑定上级id"

				} else if (row.type == 4) {
					this.dialogVisible = true
					this.titles = "实名认证"
				} else if (row.type == 5) {
					this.dialogVisible = true
					this.titles = "邀请好友"
				} else {
					this.dialogVisible = true
					this.titles = "视频任务"

				}



				this.getData()



			},
			// confirm() {
			// 	this.dialogVisible = false
			// }
		}
	};
</script>
<style scoped lang="scss">
	.choose {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30px;


	}


	.warp {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -15px;

		.box {
			padding: 0 15px;
			box-sizing: border-box;

			.item {
				padding: 20px 30px;
				border-radius: 10px;
				background-color: #f5f5f5;
				margin-bottom: 20px;
			}
		}
	}

	.page-title {
		margin-bottom: 20px;
		font-weight: bold;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.overview {
		.box {
			width: 33.33%;
			color: #ffb943;
		}

		.title {
			font-size: 22px;
		}

		.sub-title {
			font-size: 16px;
		}

		.sub-number {
			font-size: 18px;
		}

		.number {
			font-size: 48px;
			margin-bottom: 20px;
			margin-top: 40px;
			font-weight: bold;
		}

		.flex {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.warp-content {
		.title {
			color: #333333;
			font-size: 15px;
		}

		.box {
			width: 20%;
		}

		.item {
			background: #f5f5f5;
			align-items: center;
			justify-content: center;
		}

		.number {
			font-size: 48px;
		}

		.color-1 {
			color: #8792f2;
		}

		.color-2 {
			color: #ffb943;
		}

		.color-3 {
			color: #ffb943;
			font-size: 36px;
			height: 80px;
			line-height: 80px;
		}
	}

	.chartBox {
		height: 493px;
		background: #f5f5f5;
		border: 1px solid #e6e6e6;
		overflow: hidden;
		border-radius: 20px;

		position: relative;

		#charts {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.radio {
			position: absolute;
			top: 16px;
			right: 16px;
			z-index: 10;
		}
	}

	.el-checkBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 26px;
		margin-top: 20px;


	}
</style>
