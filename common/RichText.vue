<template>
	<div>
		<editor v-model="Edata" :init="init" />
	</div>
</template>

<script>
	import Editor from '@tinymce/tinymce-vue'
	export default {
		name: 'app',
		props: ["name", "contents"],
		data() {
			const _this = this;
			console.log('---', this.contents)
			return {
				showImg: false,
				Edata: this.contents,
				init: {
					language_url: "/assets/langs/zh_CN.js",
					language: 'zh_CN',
					height: 800,
					images_upload_handler: (blobInfo, success, failure) => {

						var xhr, formData;
						xhr = new XMLHttpRequest();
						xhr.withCredentials = false;
						xhr.open('POST', 'https://lawapi.cdridge.com/law/Image/UploadByFile?path=/law/');

						xhr.onload = function() {
							var json;
							if (xhr.status != 200) {
								failure('HTTP Error: ' + xhr.status);
								return;
							}
							json = JSON.parse(xhr.responseText);

							// if (!json || typeof json.img_url != 'string') {
							//   failure('Invalid JSON: ' + xhr.responseText);
							//   return;
							// }
							console.log(json)

							success(json.data);
						};

						formData = new FormData();
						formData.append('file', blobInfo.blob(), blobInfo.filename());
						console.log('formData', formData)

						xhr.send(formData);
					},
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste imagetools wordcount'
					],
					toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code',
					// file_picker_callback(callback){
					//      _this.imgCallback = callback;
					//     setTimeout(()=>{
					//       // 调用iview图片上传
					//       document.querySelector('#imgUpload .el-upload__input').click()
					//     },200)
					// },
					file_picker_types: 'file image media',
				}
			}
		},
		components: {
			'editor': Editor
		},

		watch: {
			contents(newValue) {
				this.Edata = newValue;
			},
			Edata(newValue) {
				let res = {};
				res[this.name] = newValue;
				this.$emit("change", res);
			}
		}
	}
</script>
<style>
	#imgUpload,
	.tox-notifications-container {
		display: none;
	}
</style>
