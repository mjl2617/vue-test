<template>
	<div>
		<el-button @click="repage()" type="danger">返回</el-button>
		<el-row :gutter="24">
			<el-col :span="10">
				<el-card class="box-card ">
					<div class="user">
						<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
						</el-avatar>
						<div class="user-info">
							<div>
								<span>{{userInfo.userName}}：</span>
								<el-tag>{{userInfo.idCard?'已实名':'未实名'}}</el-tag>
							</div>
							<div>
								<span>ID：</span><span>{{userInfo.userId}}</span>
							</div>
							<div>
								<span>用户星级：</span><span v-if="userInfo.level==0">普通用户</span>
								<span v-if="userInfo.level==1">会员</span>
								<span v-if="userInfo.level==2">团长</span>
								<span v-if="userInfo.level==3">高级团长</span>
								<span v-if="userInfo.level==4">合伙人</span>
								<span v-if="userInfo.level==5">区县代理</span>
								<span v-if="userInfo.level==6">市代理</span>
								<span v-if="userInfo.level==7">县代理</span>
								 <i style="color: #0e94fa;cursor: pointer;" @click="dialogVisible=true"  class="el-icon-edit-outline"></i> 
							</div>
							<div>
								<span>姓名：</span><span>{{userInfo.trueName}}</span>
							</div>
							<div>
								<span>身份证号：</span><span>{{userInfo.idCard?userInfo.idCard:'未实名'}}</span>
							</div>
							<div>
								<span>手机号：</span><span>{{userInfo.userPhone}}</span>
							</div>
							<div>
								<span>直邀上级：</span><span>用户545445（15326564532）</span> 
								<i style="color: #0e94fa;cursor: pointer;" @click=""  class="el-icon-edit-outline"></i> 
							</div>
							<div>
								<span>注册时间：</span><span>{{userInfo.createTime}}</span>
							</div>
							<div>
								<span>风控开关：</span>({{value?'已开启':'已关闭'}})
								<el-switch v-model="value" active-color="#13ce66" @change="changeRelieve" inactive-color="#ff4949">
								</el-switch><span
									style="color: red;font-size: 12px;margin-left: 20px;">*开启代表风控该用户，无法提现</span>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card class="box-card cardsub">
					<div class="code">
						<div>0.1能量值余额：99999</div>
						<div>1能量值余额：99999</div>
						<div>团队总人数：99999</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card class="box-card cardsub">
					<div class="code">
						<div>白金矿石余额：9999</div>
						<div>黄金矿石余额：9999</div>
						<div>直推总人数：9999</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card class="box-card cardsub">
					<div class="code">
						<div>白金矿石累计获得：9999</div>
						<div>黄金矿石累计获得：9999</div>
						<div>团队总业绩：9999</div>
					</div>
				</el-card>
			</el-col>

		</el-row>

		<el-divider></el-divider>
		<el-row>
			<el-button type="primary" @click="table('')" plain>团队信息</el-button>
			<el-button type="primary" @click="table('b5')" plain>团队图谱</el-button>
			<el-button type="primary" @click="table('b2')" plain>黄金矿石明细</el-button>
			<el-button type="primary" @click="table('b3')" plain>白金矿石明细</el-button>
			<el-button type="primary" @click="table('b4')" plain>订单信息</el-button>
		</el-row>
		<el-divider></el-divider>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		
		<el-dialog title="修改等级" :visible.sync="dialogVisible" width="30%" center>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item>
					<el-radio-group v-model="level">
						<el-radio :label="0">普通用户</el-radio>
						<el-radio :label="1">会员</el-radio>
						<el-radio :label="2">团长</el-radio>
						<el-radio :label="3" style="margin-top: 15px;">高级团长</el-radio>
						<el-radio :label="4" style="margin-top: 15px;">合伙人</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm()">确 定</el-button>
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
				selectId: 1,
				userInfo: {},
				dialogVisible:false,
				form:{},
				level:0,
				value: false
			}
		},
		created() {
			this.getData(this.$route.query.id)
		},
		methods: {
			// 解除风控提示
			changeRelieve() {
				let text = !this.value?'解除':'开启'
				this.$confirm('是否'+text +'风控?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.relieve();
				}).catch(() => {
					this.value = false
					this.$message({
						type: 'info',
						message: '已取消'+text+'风控'
					});
				});
			},
			// 解除风控接口
			async relieve() {
				let {
					errorMessage
				} = await request({
					url: "/base/Admin/UpdateAdmin",
					method: "post",
					params: {
						"userId": this.userInfo.userId,
						"state": this.value?2:1
					}
				})
				if (errorMessage == 'ok') {
					this.$message({
						type: 'success',
						message: '修改成功'
					});
					this.dialogVisible = false
					this.getData(this.userInfo.userId)
				}
			},
			async getData(id) {
				let {
					data
				} = await request({
					url: "/base/Admin/Base_GetBannerList",
					method: "post",
					params: {
						userId: id
					}
				})
				this.userInfo = data
				if(data.state==1)  this.value = false
				else if(data.state==2) this.value = true
				else this.value = false
			},

			handleClick(row) {
				this.dialogVisible = true
				console.log(row);
			},
			table(v) {
				if (v == '') {
					this.$router.push(`/DoublingPlan/UserDetail?id=${this.$route.query.id}`)
				} else {
					this.$router.push(`/DoublingPlan/UserDetail/${v}?id=${this.$route.query.id}`)
				}
			},
			repage() {
				this.$router.push('/DoublingPlan/UserList')
			}


		}
	};
</script>

<style scoped lang="scss">
	.box-card {
		height: 340px;
	}

	.el-row {
		margin: 20px;
	}

	.cardsub {
		height: 200px;
	}

	.user {
		display: flex;
		flex-direction: row;

		.user-info {
			margin-left: 40px;

			>div {
				padding: 2px;
			}
		}
	}

	.code {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: center;
		height: 160px;

		img {
			width: 100px;
			height: 100px;
			background-color: #B5B5B5;
		}
	}
</style>
