<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="关键词">
					<el-input v-model="form.name" placeholder="输入昵称查询"></el-input>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker v-model="form.dateVal" type="daterange" value-format='yyyy-MM-dd' range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button @click="search()" type="primary">搜索</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
<!-- 				<el-table-column type="selection" width="55">
				</el-table-column> -->
<!-- 				<el-table-column prop="date" label="序号">
				</el-table-column> -->
				<el-table-column prop="userName"  label="反馈人昵称">
				</el-table-column>
				<el-table-column prop="userPhone" label="反馈人账号">
				</el-table-column>
				
				<el-table-column label="反馈内容">
					<template slot-scope="scope">
						<div>{{scope.row.backContent}}</div>
						<!-- <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button> -->
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="时间">
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
	export default {
		data() {
			return {
				dialogVisible:false,
				tableData: [],
				pageIndex:1,
				data: {},
				form: {},
				total:0,
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			async getData() {
				let {
					list,
					total
				} = await request({
					url: "/base/Admin/Base_GetFeedBackList",
					method: "post",
					data:{
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
			handleClick(row) {
				this.dialogVisible = true
				console.log(row);
			},
			handleSelectionChange(val) {
			  this.multipleSelection = val;
			},
			goDetail(item) {
				if(item) {
					this.$router.push('/base/Notice/Detail?id=1')
				}else {
					this.$router.push('/base/Notice/Detail')
				}
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
				this.pageIndex =1
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
