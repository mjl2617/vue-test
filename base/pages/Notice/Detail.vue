<template>
	<div class="setpage">
		<el-button t="danger" @click="repage()">返回</el-button>
		<div>
			<div class="title">{{title}}</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
				<el-form-item label="公告标题" prop="title">
					<el-input style="width: 60%;" v-model="ruleForm.title"></el-input>
				</el-form-item>
				<el-form-item label="内容" v-if="id"  prop="contents">
					<RichText v-if="ruleForm.contents" name="contents" :contents="ruleForm.contents" @change="dataChange" />

				</el-form-item>
				<el-form-item label="内容" v-else prop="contents">
					<RichText  name="contents" :contents="ruleForm.contents" @change="dataChange" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		request
	} from "@/common/index.js"
	import RichText from "@/common/RichText.vue";
	export default {
		data() {
			return {
				title: '编辑公告',
				id: "",
				content: "",
				reload:false,
				ruleForm: {
					title: '',
					contents:""
				},
				rules: {
					title: [{
							required: true,
							message: '请输入公告标题',
							trigger: 'blur'
						},
						{
							required: true,
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					contents:[{
							required: true,
							message: '请输入公告内容',
							trigger: 'blur'
						}
					],
				}
			};
		},
		components: {
			RichText
		},
		created() {
			this.id = this.$route.query.id
			this.id ? this.title = '编辑公告' : this.title = '新增公告';
			if(this.id)this.getData(this.id)
			
		},
		methods: {
			async getData(id) {
				
				// if(this.ruleForm.contents==""){
				// 	this.$message({
				// 	    message: '请输入内容!',
				// 	    type: 'success'
				// 	  });
				// 	return
				// }
				
				
				let {
					data
				} = await request({
					url: "/base/Informatica/Base_GetDetial",
					method: "POST",
					params: {
						"Id": id,
					}
				})
				this.ruleForm = data;
				this.reload = true;
			},
			
			
			submitForm(formName) {
				
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(this.id) {
							
							
							this.submit(1)
						}else {
							this.submit(2)
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async submit(v) {
				if(this.ruleForm.contents==""){
					this.$message({
					    message: '请输入内容!',
					    type: 'success'
					  });
					return
				}
				let {
					errorMessage
				} = await request({
					url: v==1?"/base/Informatica/Base_EditInfo":"/base/Informatica/Base_AddInformation",
					method: "POST",
					data: {
						"id": v==1?this.id:'',
						"title": this.ruleForm.title,
						"contents": this.ruleForm.contents,
						"type": 1,
					}
				})
				if(errorMessage=='ok') {
					this.$message({
					    message: '提交成功!',
					    type: 'success'
					  });
					  this.$router.go(-1)
				}
	
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.ruleForm.contents = ""
			},
			dataChange(value) {
				this.ruleForm.contents = value.contents
				console.log(value)
			},
			repage() {
				
				
				
				this.$router.go(-1)
			}
		}
	}
</script>
<style scoped lang="scss">
	.setpage {
		.title {
			font-size: 24px;
			font-weight: bold;
			padding: 20px;

		}

		.items {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 10px 0;

		}

		.el-input {
			width: 120px;
			margin: 0 20px;
		}

		i {
			font-size: 24px;
		}
	}
</style>
