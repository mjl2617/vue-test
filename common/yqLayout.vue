<template>
	<el-container>
		<el-aside class="menu" :width="isCollapse ? '200px' : '60px'" v-if="!hideLayout">
			<div class="logo">
				<!-- <img :src="logo" /> -->
				艺趣管理后台
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
			<!-- 		<el-header class="header" v-if="!hideLayout">
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
							<el-dropdown-item command="quit">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-header> -->
			<el-main>
				<router-view></router-view>
				<div id="container"></div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import store from "store";
	const loginPath = "/base/yqLogin";
	export default {
		props: ["logo", "menu"],
		data() {
			return {
				isCollapse: true,
				hideLayout: this.$route.path == loginPath,
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
							this.$router.push("/base/yqLogin");
						})
						.catch(() => {});
				}
			},
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
