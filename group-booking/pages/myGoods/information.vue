<template>
	<div class="page">
		<!-- 商户信息，价格信息，库存信息，展示信息 -->
		<el-button t="danger" @click="repage()">返回</el-button>
		<div class="information">
			{{title}}
		</div>
		<div class="userInfo">商户信息</div>
		<!-- 商户名称 -->

		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
			<el-form-item label="商户名称(必填)" prop="mercName">
				<el-input style="width: 60%;" v-model="ruleForm.mercName" placeholder="请输入提供此商品的商品名称">
				</el-input>
			</el-form-item>
			<el-form-item label="预约链接(选填)" >
				<el-input style="width: 60%;" v-model="ruleForm.reserveUrl" placeholder="请输入提供此商品的预约链接">
				</el-input>
			</el-form-item>
			<!-- 商户地区（必填） -->
			<el-form-item label="商户地区（必填)" prop="provinceCode">
				<el-select v-model="ruleForm.provinceCode" placeholder="请选择省份（直辖市）" @change="renderCity" clearable>
					<el-option v-for="item in provinceListAll" :key="item.name" :label="item.label" :value="item.name">
					</el-option>
				</el-select>
				<el-select v-model="ruleForm.cityCode" placeholder="请选择城市" @change="renderCitys" clearable>
					<el-option v-for="item in cityListAll" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<!-- 商户详细地址 -->
			<el-form-item label="商户详细地址(必填)" prop="mercAddress">
				<el-input v-model="ruleForm.mercAddress" style="width: 90%;" placeholder="请输入提供此商品的商户详细地址">
				</el-input>
			</el-form-item>
			<!-- 商户联系方式 -->
			<el-form-item label="商户联系方式" prop="mercPhone">
				<el-input v-model="ruleForm.mercPhone" maxlength="20" style="width: 60%;" placeholder="请输入提供此商品的商户联系方式">
				</el-input>
			</el-form-item>
			<!-- 地图经纬度 -->
			<!-- 			<div class="el-information">
				<div>商户坐标
					<span v-if="loaded">
						<span style="margin-left: 24px;">当前商标坐标为lng={{lng}}</span>
						<span>lat={{lat}}</span>
					</span>
					<span v-else>正在定位</span>


				</div>
			</div> -->
			<el-amap-search-box class="search-box" style='margin-left: 200px;' :search-option="searchOption"
				:on-search-result="onSearchResult"></el-amap-search-box>
			<div class="toolbar" style='margin-left: 200px;' v-if="loaded">
				当前坐标经纬度: [{{ lng }}, {{ lat }}] 地址: {{ address }}
			</div>
			<div style='margin-left: 200px;' v-else>正在定位</div>
			<el-amap vid="amapDemo" :center="center" style="width: 800px;height: 600px;margin-left: 200px;"
				:plugin="plugin" :events="events"  >
				<el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="'marker' + index" :draggable="true"  :raiseOnDrag="true">
				</el-amap-marker>
			</el-amap>
			<!-- 地图 -->
			<!-- 		 	<div style="margin-left: 315px;">
				<div style="width: 1000px;height: 300px;">
					<el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
					</el-amap>

				</div>

			</div> -->
			<!-- 价格信息 -->
			<div class="userInfo">价格信息</div>
			<div style="display: flex; flex-direction: row;align-items: center;">
				<div style="display: flex; flex-direction: row;align-items: center;">
					<el-form-item label="拼团售价" prop="sellingPrice">
						<el-input v-model="ruleForm.sellingPrice" placeholder="请输入拼团售价">
						</el-input>
					</el-form-item>
					<div style="margin-left: 12px;margin-top: -15px;">元</div>
				</div>
<!-- 				<div>
					<div style="display: flex; flex-direction: row;align-items: center;">
						<el-form-item label="拼团金币奖励" prop="bonus">
							<el-input v-model="ruleForm.bonus" placeholder="拼团金币奖励">
							</el-input>
						</el-form-item>
						<div style="margin-left: 12px;margin-top: -15px;">个</div>
					</div>
				</div> -->
			</div>
			<div style="display: flex; flex-direction: row;align-items: center;">
				<div style="display: flex; flex-direction: row;align-items: center;">
					<el-form-item label="直购售价" prop="tagPrice">
						<el-input v-model="ruleForm.tagPrice" placeholder="请输入直购售价">
						</el-input>
					</el-form-item>
					<div style="margin-left: 12px;margin-top: -15px;">元</div>
				</div>
<!-- 				<div>
					<div style="display: flex; flex-direction: row;align-items: center;">
						<el-form-item label="直购金币奖励" prop="mallBonus">
							<el-input v-model="ruleForm.mallBonus" placeholder="请输入直购金币奖励">
							</el-input>
						</el-form-item>
						<div style="margin-left: 12px;margin-top: -15px;">个</div>
					</div>
				</div> -->
			</div>
			<div>
				<el-form-item label="消耗金矿石数" prop="orePrice">
					<el-input v-model="ruleForm.orePrice" placeholder="请输入消耗金矿石数" style="width: 20%;">
					</el-input>
					个
				</el-form-item>
			</div>
			<div>
				<el-form-item label="划线价" prop="markingPrice">
					<el-input v-model="ruleForm.markingPrice" placeholder="请输入划线价" style="width: 20%;">
					</el-input>
					元
				</el-form-item>
			</div>
			<div>
				<el-form-item label="进货价" prop="purchasePrice">
					<el-input v-model="ruleForm.purchasePrice" placeholder="请输入进货价" style="width: 20%;">
					</el-input>
					元
				</el-form-item>
			</div>
			<div>
				<el-form-item label="运费" prop="deliveryPrice">
					<el-input v-model="deliveryPrice" placeholder="请输入运费" style="width: 20%;">
					</el-input>
					元
				</el-form-item>
				<div class="userInfo">库存信息</div>
				<el-form-item label="库存" prop="stock">
					<el-input v-model="stock" placeholder="请输入库存" style="width: 20%;">
					</el-input>
					个
				</el-form-item>
			</div>
			<!-- 库存信息 -->

			<!-- 展示信息 -->
			<div class="userInfo">展示信息</div>
			<div style="display: flex;flex-direction: row;align-items: center;margin-left: 200px;">
				<div style="margin-left: 15px;margin-top: 15px;">上架与否</div>
				<div style="margin-left: 459px; display: flex;flex-direction: row;align-items: center;">
					<div style="margin-right: 15px;">上架</div>
					<el-switch v-model="ruleForm.state" active-color="#02538C" inactive-color="#B9B9B9">
					</el-switch>
				</div>
			</div>
			<div style="display: flex;flex-direction: row;align-items: center;margin-left: 200px;">
				<div style="margin-left: 15px;margin-top: 15px;">推荐与否</div>
				<div style="margin-left: 459px; display: flex;flex-direction: row;align-items: center;">
					<div style="margin-right: 5px;">推荐</div>
					<el-switch v-model="ruleForm.isTop" active-color="#02538C" inactive-color="#B9B9B9">
					</el-switch>
				</div>
			</div>
			<!-- 商品详情-->
			<el-form-item label="商品详情">
				<RichText name="description" :contents="ruleForm.description" @change="dataChange" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
		<preview class="preview" :quillmemos="ruleForm.description" />






	</div>
</template>

<script>
	import preview from '@/common/preview.vue'
	import RichText from "@/common/RichText.vue";
	const defaultMerchant = {
		id: null,
		storeName: '', // 门店名称
		province: '', // 所属省（直辖市）
		city: '', // 所属市
	};
	import {
		request
	} from "@/common/index.js"
	export default {
		data() {
			const self = this;
			return {
				value: false,
				//地图
				searchKey: '',
				markers: [
					[121.59996, 31.197646],
					[121.40018, 31.197622],
					[121.69991, 31.207649]
				],
				searchOption: {
					city: '杭州',
					citylimit: false
				},

				center: [121.59996, 31.197646],

				lng: 0,
				lat: 0,
				loaded: false,
				plugin: [{
					enableHighAccuracy: true, //是否使用高精度定位，默认:true
					timeout: 100, //超过10秒后停止定位，默认：无穷大
					maximumAge: 0, //定位结果缓存0毫秒，默认：0
					convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: true, //显示定位按钮，默认：true
					buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
					showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					extensions: 'all',
					pName: 'Geolocation',
					draggable: true,
					raiseOnDrag: true,

					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								console.log(result)
								if (result && result.position) {
									self.lng = result.position.lng;
									self.lat = result.position.lat;
									self.center = [self.lng, self.lat];
									self.currentcenter = [self.lng, self.lat];
									self.loaded = true;
									// self.draggable = true;
									// self.raiseOnDrag = true;
									self.$nextTick();
								}
							});
						}
					}
				}],
				currentcenter: [],
				address: '',
				events: {
					click(e) {
						let {
							lng,
							lat
						} = e.lnglat
						self.lng = lng
						self.lat = lat
						self.ruleForm.mercLongitude = lng
						self.ruleForm.mercLatitude = lat
						// 这里通过高德 SDK 完成。
						var geocoder = new AMap.Geocoder({
							radius: 1000,
							extensions: 'all'
						})
						geocoder.getAddress([lng, lat], function(status, result) {
							if (status === 'complete' && result.info === 'OK') {
								if (result && result.regeocode) {
									self.address = result.regeocode.formattedAddress
									self.ruleForm.mercAddress = result.regeocode.formattedAddress
									self.$nextTick()
								}
							}
						})
					}
				},
				title: "设置商户信息",
				stock: "",
				deliveryPrice: '',
				ruleForm: {
					mercName: '',
					mercAddress: "",
					mercPhone: "",
					sellingPrice: "",
					tagPrice: "",
					bonus: "",
					mallBonus: "",
					orePrice: "",
					purchasePrice: "",
					markingPrice: "",
					mercLongitude: "",
					mercLatitude: '',
					isTop: false,
					state: false,
					cityCode: "",
					provinceCode: "",
					reserveUrl:''
				},
				rules: {
					mercName: [{
						required: true,
						message: '请输入商家名称',
						trigger: 'blur'
					}, ],
					mercAddress: [{
						required: true,
						message: '请输入商家地址',
						trigger: 'blur'
					}, ],
					// mercPhone: [{
					// 	validator: (rule, value, callback) => {
					// 		if (!value) {
					// 			callback(new Error('请输入商家电话'))
					// 		} else {
					// 			if (!this.isPhone(value)) {
					// 				callback(new Error('请输入正确电话格式'))
					// 			} else {
					// 				callback()
					// 			}
					// 		}
					// 	},
					// 	trigger: 'blur',
					// 	required: true,
					// }
					// ],

					sellingPrice: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入拼团售价'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					tagPrice: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入直购价'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					bonus: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入拼团金币奖励'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					mallBonus: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入直购金币奖励'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					orePrice: [{
						validator: (rule, value, callback) => {
							console.log(value)
							if (value===' '||value===null || value === undefined) {
								callback(new Error('请输入金矿石数'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					purchasePrice: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入进价'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					markingPrice: [{
						validator: (rule, value, callback) => {
							if (!value) {
								callback(new Error('请输入划线价'))
							} else {
								if (!this.isNumber(value)) {
									callback(new Error('请输入数字值'))
								} else {
									callback()
								}
							}
						},
						trigger: 'blur',
						required: true,
					}],
					// deliveryPrice: [{
					// 	validator: (rule, value, callback) => {
					// 		// if (value=='') {
					// 		// 	callback(new Error('请输入运费'))
					// 		// } else {
					// 			if (!this.isNumber(value)) {
					// 				callback(new Error('请输入数字值'))
					// 			} else {
					// 				callback()
					// 			}
					// 		// }
					// 	},
					// 	trigger: 'blur',
					// 	required: true,
					// }],
					title: [{
						required: true,
						message: '请输入公告标题',
						trigger: 'blur'
					}, ],
					contents: [{
						required: true,
						message: '请输入公告内容',
						trigger: 'blur'
					}],
					provinceCode: [{
						required: true,
						message: '请输入所属省份（或者直辖市）',
						trigger: 'blur'
					}],
					storeName: [{
						required: true,
						message: '请输入商家的门店名称',
						trigger: 'blur'
					}],
				},
				merchant: Object.assign({}, defaultMerchant),
				modal1: false,
				isEdit: false,
				provinceListAll: [], // 全国34个省份（包括直辖市）列表
				cityListAll: [], // 全国各个城市列表
				citySelectAble: true, // 城市是否可选
			}
		},
		components: {
			RichText,
			preview
		},
		watch: {
			address: {
				handler: function(val, oldVal) {
					this.address = val
					this.$emit('sendAddress', this.address)
				},
				// 深度观察监听
				deep: true
			}
		},
		created() {
			this.getGoodsDetail(this.$route.query.goodsId)
			this.provinceList()
		},
		methods: {
			isNumber(val) {
				var regPos = /^\d+(\.\d+)?$/
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
				if (regPos.test(val) || regNeg.test(val)) {
					return true
				} else {
					return false

				}
			},
			isPhone(val) {
				// if (/^1[2,3,4,5,6,7,8,9]\d{9}$/.test(val)) {
				// 	return true;
				// } else {
				// 	return false;
				// }
				if (/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(val)) {
					return true;
				} else {


					return false;


				}
			},
			//  提交
			submitForm(formName) {

				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ruleForm.state = this.ruleForm.state ? 1 : 0
						this.ruleForm.isTop = this.ruleForm.isTop ? 1 : 0
						this.submit()

					} else {
						this.$message.error('请完善信息');
						return false;
					}
				});
			},
			async submit() {
				this.ruleForm.stock = this.stock;
				this.ruleForm.deliveryPrice = this.deliveryPrice
				let {
					errorCode
				} = await request({
					url: "/group/Group/SetGoodsPrice",
					method: "POST",
					data: this.ruleForm
				})
				if (errorCode == 0) {
					this.$message({
						message: '提交成功',
						type: 'success'
					});
					this.getGoodsDetail(this.$route.query.goodsId)
				} else {
					this.$message.error('提交失败');
				}

			},
			// 富文本编辑
			dataChange(value) {
				this.ruleForm.description = value.description
				console.log(value)
			},
			onSearchResult(pois) {
				let latSum = 0
				let lngSum = 0
				if (pois.length > 0) {
					pois.forEach(poi => {
						let {
							lng,
							lat
						} = poi
						lngSum += lng
						latSum += lat
						this.markers.push([poi.lng, poi.lat])
					})
					let mapcenter = {
						lng: lngSum / pois.length,
						lat: latSum / pois.length
					}
					this.center = [mapcenter.lng, mapcenter.lat]
				}
			},
			addMarker: function() {
				let lng = 121.5 + Math.round(Math.random() * 1000) / 10000
				let lat = 31.197646 + Math.round(Math.random() * 500) / 10000
				this.markers.push([lng, lat])
			},
			renderCity(e) { // 根据选择的省份，展示该省份相对应的城市列表，未选择省份时，不能选择城市
				this.cityListAll = []
				this.ruleForm.cityCode = ""
				this.cityList(e)

			},
			renderCitys(e) {
				console.log(e)
				this.ruleForm.cityCode = e
			},
			async cityList(id) {
				let {
					list
				} = await request({
					url: "/base/City/GetBaseCityList",
					method: "POST",
					data: {
						"provinceCode": id,
						"pageIndex": 1,
						"pageSize": 9999
					}
				})
				let cityList = list.map((item) => {
					return {
						value: item.cityCode,
						label: item.city
					}
				})
				this.cityListAll = cityList
			},
			async provinceList() {
				let {
					list
				} = await request({
					url: "/base/City/BaseProvinceCityList",
					method: "POST",
					data: {
						"pageIndex": 1,
						"pageSize": 9999
					}
				})
				this.provinceListAll = list.map((item) => {
					return {
						name: item.provinceCode,
						label: item.province,
						...item
					}
				})
			},
			async getGoodsDetail(id) {
				let {
					data
				} = await request({
					url: "/shop/Goods/GoodsDetails",
					method: "POST",
					params: {
						goodsId: id,
					}
				})

				let datas = await request({
					url: "/group/Group/GetShopgoodsMerchantList",
					method: "POST",
					data: {
						goodsId: id,
					}
				})
				this.ruleForm = {
					...data,
					...datas.data
				}
				this.stock = data.skuList[0].stock
				this.deliveryPrice = data.deliveryPrice
				this.ruleForm.state = data.state == 1 ? true : false
				this.ruleForm.isTop = data.isTop == 1 ? true : false
				if (datas.data.mercLongitude) {
					this.$nextTick(() => {
						this.center = [datas.data.mercLongitude, datas.data.mercLatitude]
						this.loaded = true;
						// this.stock =
					});
				}
				this.cityList(datas.data.provinceCode)
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.ruleForm.description = ""
				this.ruleForm.cityCode = ''
				this.stock = ''
				this.ruleForm.state  = false
				this.ruleForm.isTop = false
			},
			repage() {
				this.$router.go(-1)
			}


		}
	}
</script>

<style scoped lang="scss">
	.information {
		text-align: center;
		font-size: 24px;
		font-weight: bold;

	}

	.preview {
		position: fixed;
		right: 0;
		top: 10vh;
		z-index: 9999999;
		width: 375px;
		overflow: hidden;
		height: 66vh;
		background: #0C73C2;
		box-shadow: 0px 0px 8px 0px rgba(16, 32, 45, 0.2);
		border-radius: 4px;
		border-bottom: 2px solid #0C73C2;
	}

	.userInfo {
		font-size: 24px;
		font-weight: bold;


	}

	.el-information {

		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 220px;
		color: #666666;
		margin-bottom: 15px;
	}

	.amap-demo {
		height: 300px;
	}
</style>
