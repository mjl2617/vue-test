<template>
  <div>
    <el-dialog title="多图上传" :visible.sync="showImg" v-if="showImg">
      <el-upload
        :action="imgUpDate"
        list-type="picture-card"
        multiple
        :on-success="PictureSuccess"
        :on-remove="PictureRemove"
        :on-exceed="PictureExceed"
        :limit="50"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showImgHide">取 消</el-button>
        <el-button type="primary" @click="showImgOk"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <editor v-model="editorData" :init="init" />
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "app",
  props: ["value", "imgUpDate", "baseUrl"],
  data() {
    const _this = this;
    return {
      showImg: false,
      preview: false,
      editorData:this.value,
      init: {
        language_url: "/assets/langs/zh_CN.js",
        language: "zh_CN",
        height: 800,
        images_upload_handler: (blobInfo, success, failure) => {
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open(
            "POST",
            "https://lawapi.cdridge.com/law/Image/UploadByFile?path=/law/"
          );

          xhr.onload = function() {
            var json;
            if (xhr.status != 200) {
              failure("HTTP Error: " + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);

            // if (!json || typeof json.img_url != 'string') {
            //   failure('Invalid JSON: ' + xhr.responseText);
            //   return;
            // }
            console.log(json);

            success(json.data);
          };

          formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());
          console.log("formData", formData);

          xhr.send(formData);
        },
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste imagetools wordcount",
        ],
        toolbar:
          "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image moreImage code ",
        // file_picker_callback(callback){
        //      _this.imgCallback = callback;
        //     setTimeout(()=>{
        //       // 调用iview图片上传
        //       document.querySelector('#imgUpload .el-upload__input').click()
        //     },200)
        // },
        file_picker_types: "file image media",
        setup: function(editor) {
          // 定义按钮，
          editor.ui.registry.addButton("moreImage", {
            // 按钮，名
            text: "多图",
            // icon:false,
            onAction() {
              _this.showMoreImage.bind(_this);
              _this.showMoreImage();
            },
          });
        },
      },
    };
  },
  components: {
    editor: Editor,
  },
  watch:{
    editorData(val){
      this.$emit("input",val);
    },
    value(val) {
      this.editorData = val;
    },
  },
  methods: {
    showMoreImage() {
      console.log(123123123, this);
      this.showImg = true;
    },
   
    showImgOk(){
      let zhutuImgList = this.zhutuImgList || [];
      let _html = "";
      zhutuImgList.map(item=>{
        _html+= `<img src="${item}"/>`
      });
      this.editorData += _html;
      this.showImgHide();
    },
    showImgHide() {
      this.zhutuImgList = [];
      this.showImg = false;
    },
    // 宝贝主图
    PictureRemove(file, fileList) {
      this.mianList(fileList);
    },
    PictureExceed() {
      this.$alert("最多添加5张主图");
    },

    PictureSuccess(res, file, fileList) {
      this.mianList(fileList);
    },
    mianList(fileList) {
      const imgList = [];
      for (let i = 0; i < fileList.length; i++) {
        imgList.push(this.baseUrl + fileList[i].response.data);
      }
      this.zhutuImgList = imgList;
    },
  },
};
</script>
<style>
#imgUpload,
.tox-notifications-container {
  display: none;
}
</style>
