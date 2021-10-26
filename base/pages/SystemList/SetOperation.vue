<template>
	<div class="page">
		<div>
			<el-form style="display: flex;flex-direction: row;" ref="form" :model="form" label-width="80px">
				<el-form-item label="账号">
					<el-input v-model="form.keyWord" placeholder="姓名/账号"></el-input>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker v-model="form.dateVal" value-format='yyyy-MM-dd' type="daterange" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button @click="search()" type="primary">搜索</el-button>
					<el-button  @click="cancel()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="userName" label="操作姓名">
			</el-table-column>
			<el-table-column prop="userPhone" label="操作账号">
			</el-table-column>
			<el-table-column prop="loginIP" label="操作IP">
			</el-table-column>
			<el-table-column prop="actionModel" label="操作模块" >
			</el-table-column>
			<el-table-column prop="actionContent" label="操作内容">
			</el-table-column>
			<el-table-column prop="createTime" label="操作时间">
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
			<el-pagination
			:current-page.sync="pageIndex" @current-change="handleCurrentChange"
			  background
			  layout="prev, pager, next"
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
				data: {},
				pageIndex:1,
				total:0,
				form: {},
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
					url: "/base/Admin/Base_GetLogList",
					method: "post",
					data:{
						"keyWord":this.form.keyWord,
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
			goDetail() {
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
