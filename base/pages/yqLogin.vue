<template>
	<div class="box">
		<img class="loginBg" :src="'/assets/loginBg.png'" />
		<div class="login">
			<img :src="'/assets/login.png'" />
			<div class="right">
				<div class="title">艺趣管理后台</div>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
					<el-form-item prop="userName">
						<el-input v-model="ruleForm.username" maxlength="11" placeholder="账号"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="ruleForm.userpwd" placeholder="密码" show-password></el-input>
					</el-form-item>
					<el-button type="primary" class="button" @click="submit">登录</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import store from "store";
	import md5 from "js-md5";
	import {
		yqAdminLogin
	} from "../api/login.js"
	import ipFile from "@/common/ip.js"
	export default {
		name: "App",
		data() {
			return {
				localhost: '',
				ruleForm: {
					"username": "",
					"userpwd": ""
				},
				rules: {
					userName: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					userpwd: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]

				}
			}
		},
		mounted() {
			var cip = returnCitySN["cip"];
			console.log("cip", cip); //cip就是本机ip地址
			this.localhost = cip

		},
		methods: {
			async submit() {
				let {
					data
				} = await yqAdminLogin({
					userName: this.ruleForm.userName,
					userpwd: md5(this.ruleForm.userpwd)
				})
				console.log("登录1111",data);
				if (data) {
          localStorage.setItem('token',data)
					this.$router.push("/");
				}

			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submit()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.loginBg {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
		width: 1920px;
		height: 1080px;
	}

	.box {
		display: flex;
		min-height: 100vh;
		min-width: 1200px;
		align-items: center;
		justify-content: center;

		.login {
			background-color: #fff;
			padding: 50px;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
			border-radius: 10px;
			overflow: hidden;
			height: 300px;
			display: flex;
			justify-items: center;
			justify-content: space-between;

			img {
				margin-top: 30px;
				margin-right: 120px;
				width: 240px;
				height: 381px;
			}

			.right {
				width: 320px;
			}

			.title {
				text-align: center;
				font-size: 30px;
				font-weight: 500;
				color: #333333;
				margin-bottom: 40px;
			}

			.button {
				margin-top: 20px;
				font-size: 16px;
				font-weight: 400;
				width: 100%;
				height: 56px;
			}
		}
	}
</style>
