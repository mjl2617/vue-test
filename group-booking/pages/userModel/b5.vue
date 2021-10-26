<template>
	<div >
		<scroll-view scroll-x scroll-y :style="{height:windHeight+'px',width:windWidth+'px'}">
			<tree-node :dataList="treeList" :parents="parent"></tree-node>
		</scroll-view>
	</div>
</template>

<script>
	import {
		request
	} from "@/common/index.js"
	import treeNode from './tree-node/tree-node.vue'
	export default{
		data(){
			return{
				windHeight:0,
				windWidth:0,
				user:{},
				treeList:[],
				parent:[
					{
						name: '直邀上级',
						tel:'1111',
						class: '1星' ,
					}
				]
				}
		},
		components:{
			treeNode
		},
		created() {
			this.getData(this.$route.query.id)
		},

		methods: {
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
				this.user = data
				this.getteam(this.id = this.$route.query.id)
			},
			async getteam(id) {
				const {
					data,
					errorCode
				} = await request({
					url: "/base/User/NewGetUserTeam?userId=" + id,
					method: "get"
				});
				if(data.parent) {
					this.parent = [{
						name: '直邀上级',
						tel:data.parent.userPhone,
						class: data.parent.star + '星' ,
					}]
				}
				if(data.team) {
					this.treeList = [{
						name: '当前用户',
						tel: this.user.userPhone,
						isParent:true,
						class: this.user.level + '星' ,
						childList:this.teamRule(data.team,1)
					}]
					
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

<style>
</style>
