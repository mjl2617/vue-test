<template>
	<el-container>
		<el-aside class="menu" :width="isCollapse ? '200px' : '60px'" v-if="!hideLayout">
			<div class="logo">
				<!-- <img :src="logo" /> -->
				管理后台
			</div>
			<el-menu background-color="#383d4a" text-color="#fff" active-text-color="#ffd04b" router
				class="el-menu-vertical-demo" :collapse="!isCollapse">
				<template v-for="(item, index) in menu">
					<el-menu-item v-if="!item.children" :index="item.path" :key="index">
						<i :class="item.icon"></i> <span>{{ item.title }}</span>
					</el-menu-item>
					<el-submenu v-else :key="index" :index="item.path">
						<template slot="title">
							<i :class="item.icon"></i>
							<span>{{ item.title }}</span>
						</template>
						<el-menu-item v-for="(data, index) in item.children" :index="data.path" :key="index">
							{{ data.title }}
						</el-menu-item>
					</el-submenu>
				</template>
			</el-menu>
		</el-aside>
		<el-container>
			<el-header class="header" v-if="!hideLayout">
				<div style="flex:1">
					<span @click="switchCollapse" class="icon-button"
						:class="{'el-icon-s-fold': isCollapse,'el-icon-s-unfold': !isCollapse,}"></span>
				</div>
				<div class="header-right">
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link">
							设置
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="changepass">修改密码</el-dropdown-item>
							<el-dropdown-item command="quit">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<el-dialog title="修改密码" :visible.sync="priceDialogVisible" width="40%" center :before-close="handleClose">
				
					<el-input placeholder="请输入原密码" v-model="oldPass" show-password></el-input>
				
				
					<el-input placeholder="请输入新密码" style="margin-top: 20px;" v-model="newPass" show-password></el-input>
					<el-input placeholder="请输入确认密码" style="margin-top: 20px;" v-model="againPass" show-password></el-input>
					<span slot="footer" class="dialog-footer">
						<el-button @click="handleClose()">取 消</el-button>
						<el-button type="primary" @click="confire">确 定</el-button>
					</span>
				</el-dialog>
			</el-header>
			<el-main>
				<router-view></router-view>
				<div id="container"></div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import store from "store";
	const loginPath = "/base/login";
	import {
		request
	} from "@/common/index.js"
	import md5 from "js-md5";
	export default {
		props: ["logo", "menu"],
		data() {
			return {
				isCollapse: true,
				hideLayout: this.$route.path == loginPath,
				priceDialogVisible: false,
				oldPass:'',
				newPass:'',
				againPass:''
			};
		},
		methods: {
			switchCollapse() {
				this.isCollapse = !this.isCollapse;
			},
			handleCommand(command) {
				if (command == "quit") {
					this.$confirm("确定退出?", "提示", {
							confirmButtonText: "确定",
							cancelButtonText: "取消",
							type: "warning",
						})
						.then(() => {
							localStorage.removeItem('token')
							this.$router.push("/base/login");
						})
						.catch(() => {});
				}else if(command == "changepass"){
					this.priceDialogVisible = true
				}
			},
			// 关闭模态框
			handleClose() {
				this.oldPass=''
				this.newPass=''
				this.againPass=''
				this.priceDialogVisible = false
			},
			// close(){
				
			// },
			confire() {
				if (this.oldPass == "") {
					this.$message({
						message: '请输入原密码',
						type: 'warning'
					});
					return
				}
				if (this.newPass == "") {
					this.$message({
						message: '请输入新密码',
						type: 'warning'
					});
					return
				}
				if (this.againPass == "") {
					this.$message({
						message: '请确认新密码',
						type: 'warning'
					});
					return
				}
				if(this.newPass !=this.againPass){
					this.$message({
						message: '两次密码输入不一致',
						type: 'warning'
					});
					return
				}
				this.editPass()
				
			},
			//修改密码
			async editPass(){
				let {
					errorCode,
					errorMessage
				} = await request({
					url: "/base/Admin/UpdatePassword",
					method: "POST",
					data: {
						"oldPassword": md5(this.oldPass),
						"newPassword": md5(this.newPass),
					}
				})
				if (errorCode == 0) {
					this.$message({
						type: 'success',
						message: '登录密码修改成功！'
					});
					this.priceDialogVisible = false
					this.oldPass=''
					this.newPass=''
					this.againPass=''
					setTimeout(()=>{
						store.remove("USERINFO");
						this.$router.push("/base/login");
					},1000)
					
				}
			}
		},
		watch: {
			"$route.path"(newVal) {
				this.hideLayout = newVal == loginPath;
			},
		},
	};
</script>
<style scoped lang="scss">
	.header {
		background: #383d4a;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0;
		color: #FFFFFF;

		.icon-button {
			color: #fff;
			padding: 20px;
			cursor: pointer;
		}
	}

	.menu {
		overflow: hidden;
		background: #383d4a;
		min-height: 100vh;

		.logo {
			padding: 0 16px;
			display: flex;
			align-items: center;
			height: 60px;
			color: #FFFFFF;

			img {
				height: 42px;
			}
		}
	}

	.header-right {
		margin-right: 120px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #FFFFFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
