<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="关键词">
					<el-input v-model="form.keyWord" placeholder="输入关键词查询"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="form.region" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option label="已发布" value="1"></el-option>
						<el-option label="未发布" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="search()" type="primary">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-row style="margin: 30px 0;">
			<el-button type="info" @click="del()" plain>删除</el-button>
			<el-button type="primary" @click="goDetail()" plain>新建</el-button>
		</el-row>
		<el-table ref="multipleTable" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="title" label="标题">
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<div v-if="scope.row.state==1">已发布</div>
					<div v-if="scope.row.state==0">未发布</div>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="时间">
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- <router-link :to="'/base/Notice/Detail?id='+scope.row.id" style="color: #409EFF;text-decoration: none;">编辑</router-link> -->
					<div v-if="scope.row.state==0" @click="changeState(scope.row.id,1)" style="color: #409EFF;cursor: pointer;">发布</div>
					<div v-else  style="color: #666;cursor: pointer;">已发布</div>
					<!-- <div v-if="scope.row.state==1" @click="changeState(scope.row.id,0)" style="color: #409EFF;cursor: pointer;">禁用</div> -->
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination :current-page.sync="pageIndex" @current-change="handleCurrentChange" background layout="prev, pager, next"
			 :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		request
	} from "@/common/index.js"
	import map from "lodash/map";

	export default {
		data() {
			return {
				dialogVisible: false,
				tableData: [],
				data: {},
				total: 0,
				form: {},
				pageIndex: 1,
				multipleSelection: [],
			}
		},
		created() {
			this.getData()
		},
		methods: {
			async getData() {
				let {
					list,
					total
				} = await request({
					url: "/base/Informatica/BaseGetLists",
					method: "POST",
					data: {
						"type": 1, //信息公告，1=公告，2=资讯
						"state": this.form.region,
						"keyWord": this.form.keyWord,
						"pageIndex": this.pageIndex,
						"pageSize": 10
					}
				})
				this.tableData = list
				this.total = total
			},
			handleClick(row) {
				this.dialogVisible = true
				console.log(row);
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
			async changeState(ids, i) {

				let url = ''
				if (i == 255) url = "/base/Informatica/Bsae_EditState"
				else if (i == 1) url = "/base/Informatica/Bsae_EditState"
				else url = "/base/Informatica/Bsae_EditState"
				let {
					errorMessage
				} = await request({
					url: url,
					method: "POST",
					data: {
						"id": ids,
						"state": i,
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

			// async changeState(v, i) {
			// 	let {
			// 		errorMessage
			// 	} = await request({
			// 		url: "/base/Informatica/Bsae_EditState",
			// 		method: "POST",
			// 		data: {
			// 			"id": v,
			// 			"state": i,
			// 		}
			// 	})
			// 	if (errorMessage == 'ok') {
			// 		this.$message({
			// 			message: '提交成功!',
			// 			type: 'success'
			// 		});
			// 		this.getData()
			// 	}
			// },





			// del() {
			// 	this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消',
			// 		type: 'warning'
			// 	}).then(() => {
			// 		this.changeState(this.multipleSelection, 255);
			// 	}).catch(() => {
			// 		this.$message({
			// 			type: 'info',
			// 			message: '已取消删除'
			// 		});
			// 	});
			// },



			goDetail() {
				this.$router.push('/base/Notice/Detail')
			},
			handleCurrentChange(val) {
				this.getData()
				console.log(`当前页: ${val}`);
			},
			search() {
				this.getData()
				console.log(this.form)
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
</style>
