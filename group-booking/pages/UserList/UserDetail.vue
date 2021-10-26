<template>
	<div>
		<el-button @click="repage()" type="danger">返回</el-button>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card class="box-card ">
					<div class="user">
						<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
						<div class="user-info" >
							<div>
								<span>{{userInfo.userName}}：</span>
								<el-tag>{{userInfo.idCard?'已实名':'未实名'}}</el-tag>
							</div>
							<div>
								<span>ID：</span><span>{{userInfo.userId}}</span>
							</div>
							<div>
								<span>用户等级：</span><span v-if="userInfo.level==0">普通用户</span>
								<span v-if="userInfo.level==1">会员</span>
								<span v-if="userInfo.level==2">团长</span>
								<span v-if="userInfo.level==3">高级团长</span>
								<span v-if="userInfo.level==4">合伙人</span>
								<span v-if="userInfo.level==5">区县代理</span>
								<span v-if="userInfo.level==6">市代理</span>
								<span v-if="userInfo.level==7">县代理</span>
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
			<!-- 				<div>
								<span>用户渠道：</span><span>小程序/APP</span>
							</div> -->
							<!-- <div>
								<span>绑定微信：</span><span>未绑定/张三（15256232356）</span>
							</div>
							<div>
								<span>绑定支付宝：</span><span>未绑定/张三（15256232356）</span>
							</div> -->
							<!-- <div>
								<span>邀请人：</span><span>用户545445（15326564532）</span>
							</div> -->
							<div>
								<span>注册时间：</span><span>{{userInfo.createTime}}</span>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card" >
					<div class="code" style="height: 200px;">
						<div>二维码</div>
						<div style="margin-bottom: 30px;">
							邀请码：{{userInfo.shareCode}}
						</div>
						<div  id="qrcode" ref="qrcode"></div>
					</div>
				</el-card>
			</el-col>

		</el-row>
		<el-row :gutter="20">
			<el-col :span="4">
				<el-card class="box-card cardsub">
					<div class="code">
						<div>团队人数(个)</div>
						<div>
							总人数：312
						</div>
						<div>
							直推人数：29
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card class="box-card cardsub">
					<div class="code">
						<div>金币（个）</div>
						<div>
							当前余额：{{userInfo.coin}}
						</div>
						<div>
							累计赚取：{{userInfo.accumulativeGoId}}
						</div>
						<div>
							预计待到账：{{userInfo.waitingGoId}}
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card class="box-card cardsub">
					<div class="code">
						<div>金矿石（个）</div>
						<div>
							当前余额：{{userInfo.ore}}
						</div>
						<div>
							累计赚取：{{userInfo.accumulativeMoney}}
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card class="box-card cardsub">
					<div class="code">
						<div>拼团券（张）</div>
						<div>
							普通拼团券：{{userInfo.ordinaryCoupon}}
						</div>
						<div>
							高级拼团券：{{userInfo.highCoupon}}
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card class="box-card cardsub">
					<div class="code">
						<div>拓展基金（元）</div>
						<div>
							当前余额：312
						</div>
						<div>
							累计赚取：29
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-divider></el-divider>
		<el-row>
		  <el-button type="primary" @click="table('')" plain>团队信息</el-button>
		  <el-button type="primary" @click="table('m2s')" plain>团队活跃统计</el-button>
		  <el-button type="primary" @click="table('m2')" plain>金币明细</el-button>
		  <el-button type="primary" @click="table('m3')" plain>金矿石明细</el-button>
		  <el-button type="primary" @click="table('m4')" plain>普通拼团券明细</el-button>
		  <el-button type="primary" @click="table('m4s')" plain>高级拼团券明细</el-button>
		  <el-button type="primary" @click="table('m5')" plain>订单信息</el-button>
<!-- 		  <el-button type="primary" @click="table('m6')" plain>地址信息</el-button>
		  <el-button type="primary" @click="table('m7')" plain>会员升级记录</el-button>
		  <el-button type="primary" @click="table('m8')" plain>拓展基金明细</el-button> -->
		</el-row>
		<el-divider></el-divider>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import QRCode from "qrcodejs2";
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			return {
				selectId:1,
				userInfo:{}
			}
		},
		created() {
			this.getData(this.$route.query.id)
			this.$nextTick(function() {
			  this.qrcode(this.userInfo.shareUrl);
			});
		},
		  components: {
		    QRCode
		  },
		methods: {
			async getData(id){
				let {data} = await request({
					url: "/base/Admin/Base_GetBannerList",
					method: "post",
					params:{
						userId: id
					}
				})
				this.userInfo = data
			},
			qrcode(url) {//这里是调用的方法
			      let qrcode = new QRCode("qrcode", {
			        width: 100, // 设置宽度
			        height: 100, // 设置高度
			        text:url?url: "https://baidu.com"
			      });
			    },

			handleClick(row) {
				this.dialogVisible = true
				console.log(row);
			},
			table(v) {
				if(v==''){
					this.$router.push(`/UserList/UserDetail?id=${this.$route.query.id}`)
				}else{
					this.$router.push(`/UserList/UserDetail/${v}?id=${this.$route.query.id}`)
				}
			},
			repage() {
				this.$router.push('/UserList/UserList')
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
