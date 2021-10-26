<template>
	<div class="node-ul-parent">
		<div class="node-li" style="margin-bottom: 60px;" v-if="parents.length>0" >
			<div class="node-border"></div>
			<div class="node-Name node-Names" >
				<div style="text-align:center;width:130px;font-size:16px;color: #FFF;" >
					<div style="">{{parents[0].name}}</div>
					<div>{{parents[0].tel}}</div>
					<div>{{parents[0].class}}</div>
				</div>
			</div>
		</div>
		<div class="node-li"  v-for="(item,index) in arrayList" :key="index">
			<div class="node-border"></div>
			<div class="node-Name" @click="changeState(item)">
				<div class="icon"v-if="item.childList.length>0" >+</div>
				<div style="text-align:center;width:130px;font-size:16px;color: #FFF;" >
					<div style="">{{item.name}}</div>
					<div>{{item.tel}}</div>
					<div>{{item.class}}</div>
				</div>
			</div>
			<div class="node-ul">
				<tree-node :dataList="item.childList" @getNew="getNews"  v-if="item.childList.length > 0 && item.isShow"></tree-node>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		request
	} from "@/common/index.js"
	export default{
		name: 'treeNode',
		componentName: 'treeNode',
		props:{
			dataList:{
				type:Array,
				default:[]
			},
			parents:{
				type:Array,
				default:()=>[]
			}
		},
		watch:{
			dataList(val) {
				this.arrayList = val
			},
		},
		created() {
			this.arrayList = this.dataList
		},
		data(){
			return{
				arrayList:[]
			}
		},
		methods:{
			changeState(e){
				let isShow = !e.isShow 
				this.$set(e,'isShow',isShow)
				
				console.log(e,'eeeeeeeeee')
				if(e.id) 	this.$emit('getNew',e)
				// this.getNews(e.id)
			},
			async getNews(data) {
				if(data) {
					console.log(data,11)
					const list = await this.getteams(data.id)
					if(list.length==0) {
						this.$message({
							message:'暂无下级',
							type:"error"
						})
						
					}
					console.log(list,22,data)
					data.childList = list;
				}

			},
			async getteams(id) {
				const {
					data,
					errorCode
				} = await request({
					url: "/base/User/NewGetUserTeam?userId=" + id,
					method: "get"
				});
				if(data.team) {
				return this.teamRule(data.team,2);
				}
			},
			teamRule(data,type) {
			let datas =	data.map((item,index)=>{
					return {
						name: type==1?'直邀下级':'间邀下级',
						tel: item.userPhone,
						class: item.star + '星' ,
						id:item.userId,
						key:index,
						childList:[]
					}
				})
				console.log(datas,'datas')
				return datas
			},
		}
	}
</script>

<style lang="scss">

	.node-ul-parent {
		margin: 0;
		padding: 0 0 0 20px;
	}
	.node-ul{
		margin: 0;
		padding: 0 0 0 60px;
	}

	.node-ul .node-li ,.node-ul-parent .node-li {
		list-style: none;
		position: relative;
	}

 
	
		.node-ul:first-child >.node-li::before {
			border: none;
		}

	.node-ul .node-li:before {
		position: absolute;
		content: '';
		top: 60px;
		left: -20px;
		width: 20px;
		height: 1px;
		border-bottom: 4px solid #0055ff;
	}

	.node-ul .node-li:not(:last-child)::after{
		position: absolute;
		content: '';
		top: -18px;
		left: -20px;
		bottom: -84px;
		border-left: 4px solid #0055ff;
	}
	.node-ul .node-li:first-child .node-border{
		position: relative;
	}
	.node-ul .node-li:first-child .node-border::after {
		position: absolute;
		content: '';
		height: 80px;
		top: -18px;
		left: -20px;
		bottom: 0px;
		border-left: 4px solid #0055ff;
	}
	.node-Names::after {
		position: absolute;
		content: '';
		top: 80px;
		left:86px;
		height: 60px;
		border-left: 4px solid #0055ff;
	}
	.node-Name{
		display:flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		width: 150px;
		height: 80px;
		padding-left: 25px;
		margin: 20px 0;
		border-radius: 15px;
		background:#fb6916;
		.icon{
			padding: 0 10px 0 0;
			color:#FFF;
			font-size:24px;
		}
	}
</style>
