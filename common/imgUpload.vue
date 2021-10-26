<template>
	<div class="imgUpload">
		<el-upload :data="imgData" list-type="picture-card" action="https://lawapi.cdridge.com/law/Image/UploadByFile?path=/law/" :limit="limit" :file-list="fileList" 
		 :on-exceed="onExceed" :on-success="onSuccess" :on-remove="onRemove" ref="imgUpload">
			<i class="el-icon-plus"></i>
		</el-upload>
	</div>
</template>

<script>

	import map from "lodash/map";
	// import {
	// 	imgUpload,
	// 	imgWarehouse,
	// 	imgHost
	// } from "@/config";

	export default {
		name: "Form",
		props: ["name", "limit", "label", "files"],
		data() {
			let fileList = [];
			if (this.files) {
				
				
				const data = this.files instanceof Array? this.files:  [this.files];
				debugger
				fileList = data.map(item => {
					return {
						name: item,
						url: item
					};
				});
			}

			return {
				imgData: {
					path: "imgWarehouse"
				},
				fileList,
				imgUpload: "imgUpload"
			};
		},
		methods: {
			async getData() {},
			setForm(apiHost, FormData, onSubmit) {
				this.FormData = FormData;
				this.apiHost = apiHost;
				this.onSubmitSsuccess = onSubmit;
			},
			onSubmit() {
				this.$refs.form.validate(async valid => {
					if (valid) {
						const FromData = this.formDataToString();
						const data = await request({
							url: this.apiHost,
							data: FromData
						});
						if (this.onSubmitSsuccess) this.onSubmitSsuccess(data);
					}
				});
			},
			onSuccess(res, file, fileList) {
				this.onchange(fileList);
			},
			onchange(fileList) {
				let data = [];
				 fileList.map(item => {
					if (item.response) {
						data = [...data,"imgHost" + item.response.data] 
					} else {
						data = [...data,...item.url];
					}

				})
				
				if (this.limit === 1) {
					data = data[0];
				}
				let res = {};
				res[this.name] = data;
				this.$emit("change", res);
			},
			onRemove(file, fileList) {
				this.onchange(fileList);
			},
			onExceed() {
				this.$message.error(`${this.label}不能超过${this.limit}张图片`);
			}
		}
	};
</script>
<style lang="scss"></style>
