<template>
	<div class="form" :style="!show?'width:32px;height:110px;':''">
		<div class="header" v-show="show">
			手机商品内容预览
			<span class="hidden-box" @click="hidden">隐藏</span>
		</div>
		<div class="body" v-show="show">
			<!-- 			<div class="body-top">
				<div class="time">有效期至2020-10-29</div>
				<div class="share-block">分享</div>
			</div>
			<div class="body-two">
				<el-carousel height="150px">
					<el-carousel-item v-for="(item,index) in imglist" :key="index">
						<img :src="'https://cdridge-hotel.oss-cn-shanghai.aliyuncs.com/'+item" alt="">
					</el-carousel-item>
				</el-carousel>
				<div class="f-name">{{datas.name}}
				</div>
				<div class="f-hotel">
					{{obj.mercName}} <img src="../../static/vf.png" style="width: 10px;height: 10px;margin-left: 6px;" alt="">
				</div>
				<div class="f-title-list">
					<div v-for="(item,index) in datas.tipList">
						<img src="../../static/gouf.png" style="width: 12px;height: 12px;margin-right: 2px;" alt=""> {{item}}
					</div>
					
				</div>
			</div> -->
			<div class="body-mid">
				<!-- 				<div class="mid-nav">
					<div  @click="demoId=1" :style="demoId==1?'border-color:red':''">
						商品内容
					</div>
					<div @click="demoId=2" :style="demoId==2?'border-color:red':''">
						图文详情
					</div>
					<div @click="demoId=3" :style="demoId==3?'border-color:red':''">
						购买须知
					</div>

				</div> -->
				<!-- 					<div v-if="demoId==1">
						<div class="mid-title" >商品内容</div>
						<div class="mid-title-sub">Product content</div>
						<div style="margin-left: 30px;">
							<div v-for="(item,index) in arr" style="margin: 4px 0;">
							{{index+1}}.{{item}}
							</div>
						</div>
					</div> -->
				<!-- 			<div v-if="demoId==2"> -->
				<!-- 						<div class="mid-title" >图文详情</div>
						<div class="mid-title-sub">Graphic details</div> -->

				<div id="description">



				</div>
				<!-- </div> -->
				<!-- 					<div style="margin-left: 30px;" v-if="demoId==3">
						<div class="mid-title" >购买须知</div>
						<div class="mid-title-sub">Purchase Notes</div>
						<div>
							有效期
						</div>
						<div>
							<span v-if="datas.date1[0]">{{datas.date1[0]}}至{{datas.date1[1]}}</span> 
							<span v-if="datas.afterday">只购买日起，{{datas.afterday}}天有效</span>
						</div>
						<div>使用说明</div>
						<div>
							<span v-if="!ruledemo">购买后凭收到的电子券号消费或预约</span>
						</div>
						<div v-for="(item,index) in ruledemo" style="margin: 4px 0;">
						{{index+1}}.{{item}}
						</div>
						<div>温馨提示</div>
						<div>
							<span v-if="!datas.tipsmemo">如需发票,请在消费后向工作人员索取</span>
							{{datas.tipsmemo}}
						</div>
					</div> -->
			</div>
			<!-- 			<div class="body-foot">
				<div class="mid-title" style=";margin-top: 10px;padding-top: 30px;" >商家信息</div>
				<div class="mid-title-sub">Business information</div>
				<div class="foot-box">
					<div class="foot-address">
						<img src="../../static/addressf.png" style="width: 10px;height: 12px;" alt="">
						<div style="width: 220px">{{obj.mercName}}</div> 
					</div>
					<div style="color: red;margin: 10px 0 10px 40px;margin-left: 40px;">查看位置 ></div>
					<div>
						<img src="../../static/phonef.png" style="width: 12px;height: 12px;" alt="">
						{{obj.phone}}
					</div>
				</div>
			</div> -->
			<!-- 			<div class="bottom">
				<div class="b-left">
					<span class="price">￥{{datas.price}}</span>
					<span class="oldprice">门市价：{{datas.tagPrice}}元</span>
				</div>
				<div class="b-right">即将上线</div>
			</div> -->
		</div>
		<span v-show="!show"  class="showb" @click="hidden">手机预览</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				demoId: 2,
				arr: [],
				item: [1, 2, 3, 4],
				imglist: [],
				obj: {},
				ruledemo: []
			};
		},
		props: ['datas', 'setmeals', 'quillmemos', 'imgLists', 'ruledemos'],
		watch: {
			setmeals(val) {
				this.arr = val.split("；");

			},
			ruledemos(val) {
				this.ruledemo = val.split("；");
			},
			quillmemos(val) {
				// debugger
				this.$nextTick(() => {
					const shadowHost = document.getElementById('description');
					if(!this.shadowRoot)
						this.shadowRoot = shadowHost.attachShadow({
							mode: 'open'
						});
					this.shadowRoot.innerHTML = '';
					this.shadowRoot.innerHTML = `
				      <style>
				      *{
				          margin: 0;
				          padding: 0;
				          box-sizing: border-box;
				       max-width: 100%;
				      }
				      img{
				         
				       vertical-align: middle;
				      }
				      
				      </style>
				      ${val}
				      `
				})
			},
			imgLists(val) {
				this.imglist = val.split(',')
			}
		},
		created() {
			// this.token = sessionStorage.getItem('admin_token');
			// this.getshop()
			// this.$nextTick(() => {
			// 	const shadowHost = document.getElementById('description');
			// 	const shadowRoot = shadowHost.attachShadow({
			// 		mode: 'open'
			// 	});
			// 	shadowRoot.innerHTML = '';
			// 	shadowRoot.innerHTML = `
			//       <style>
			//       *{
			//           margin: 0;
			//           padding: 0;
			//           box-sizing: border-box;
			//        max-width: 100%;
			//       }
			//       img{
			         
			//        vertical-align: middle;
			//       }
			      
			//       </style>
			//       ${this.quillmemos}
			//       `
			// })
		},
		updated(){
			
		},
		methods: {
			hidden() {
				this.show = !this.show;
			},
			getshop() {
				var _this = this;
				_this.HttpPost({
					url: _this.HttpPost.Url + "/hotel/Merchant/GetInfo",
					type: "POST",
					token: _this.token,
					success: function(res) {
						console.log('res', res)
						let {
							errorCode,
							errorMessage,
							data
						} = res;
						if (errorCode !== 0) {
							_this.$message({
								message: errorMessage,
								type: 'error'
							});
							_this.logining = false;
						} else {

							_this.obj = res.data


						}
					},
					error: function() {
						_this.logining = false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.foot-address {
		display: flex;
		flex-direction: row;

	}

	.foot-box {
		width: 276px;
		height: 121px;
		background: #FFFFFF;
		border: 1px solid #E5E5E5;
		border-radius: 4px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.foot-box img {
		margin-right: 10px;
		margin-left: 22px;
	}

	.mid-title {
		font-size: 14px;
		font-weight: bold;
		color: #000000;
		text-align: center;
		margin-top: 30px;
	}

	.mid-title-sub {
		text-align: center;
		font-size: 12px;
		margin-bottom: 30px;
	}

	.mid-nav {
		display: flex;
		flex-direction: row;
		height: 50px;
		align-items: center;
		justify-content: space-between;
		padding: 0 30px;
		font-size: 14px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		font-weight: bold;
		border-bottom: 1px solid #E6E6E6;
	}

	.mid-nav>div {
		border-bottom: 2px solid transparent;
		height: 25px;
		cursor: pointer;
	}

	.f-title-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 0 auto;
		width: 315px;
		padding-bottom: 20px;
	}

	.f-title-list>div {
		padding: 10px 10px 0 0;
	}

	.f-hotel {
		font-size: 12px;
		font-weight: 400;
		color: #858585;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30px;
	}

	.f-name {
		width: 315px;
		padding: 30px 0;
		margin: 0 auto;
		font-size: 14px;
		font-family: Adobe Heiti Std;
		color: #333333;
		font-weight: bold;
	}

	.el-carousel__item img {
		width: 370px;
		height: 150px;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.showb {
		font-size: 16px;
		font-weight: 400;
		color: #FEFEFE;
		letter-spacing: 1px;
		line-height: 20px;
		text-align: center;
		display: flex;
		margin-top: 10px;
		text-shadow: 0px 0px 8px rgba(16, 32, 45, 0.2);
		cursor: pointer;
	}

	.bottom {
		width: 371px;
		margin: 0 auto;
		height: 40px;
		border-top: 1px solid #EBEBEB;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.b-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 40px;
		margin-left: 10px;
	}

	.b-right {
		width: 120px;
		height: 40px;
		background: #858585;
		font-size: 14px;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 40px;

	}

	.price {
		font-size: 14px;
		font-weight: 400;
		color: #C8323D;
	}

	.oldprice {
		font-size: 12px;
		font-weight: 400;
		text-decoration: line-through;
		color: #B3B3B3;
		margin-left: 6px;
	}

	.header {
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #fff;

	}

	.body {
		width: 371px;
		margin: 0 auto;
		min-height: 360px;
		max-height: 62vh;
		background: #F6F6F6;
		overflow-y: scroll;
		padding-bottom: 2px;
		font-size: 12px;
		color: #858585;
		overflow-x: hidden;
	}

	.body-two {
		width: 371px;
		min-height: 108px;
		background: #FFFFFF;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	.body-mid {
		width: 371px;
		min-height: 294px;
		background: #FFFFFF;
		margin-bottom: 10px;
		margin: 0 auto;
		padding-bottom: 10px;
	}

	.body-foot {
		width: 371px;
		min-height: 222px;
		background: #FFFFFF;
		margin: 0 auto;
		margin-bottom: 40px;
		padding-bottom: 20px;
	}

	.body-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 40px;
		align-items: center;
	}

	.share-block {
		width: 60px;
		height: 28px;
		background: #858585;
		border-radius: 14px;
		font-size: 12px;
		font-weight: 400;
		color: #FEFEFE;
		line-height: 30px;
		text-align: center;

	}

	.time {
		width: 140px;
		height: 28px;
		background: #858585;
		border-radius: 0px 14px 14px 0px;
		font-size: 12px;
		font-weight: 400;
		color: #FEFEFE;
		line-height: 30px;

	}

	.hidden-box {
		color: #fff;
		position: absolute;
		right: 20px;
		top: 0px;
		cursor: pointer;
	}

	.body::-webkit-scrollbar {
		display: none;
	}
</style>
