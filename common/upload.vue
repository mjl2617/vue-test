<template>
  <div>
    <el-upload
      :limit="limit"
      :file-list="imgeData"
      :action="actionUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="handlePassportSuccess"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import store from "store";
export default {
  model: {
    prop: "value",
  },
  props: ["limit", "value", "action"],
  data() {
    return {
      imgeData: [],
      actionUrl: "",
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  created: function() {
	  if(this.value)     this.loadImg( this.value);
    this.actionUrl = `${store.get("apiHost")}/${this.action}`;
  },
  watch: {
    //有些页面初始初始src没有赋值
    value(newValue, oldValue) {
      this.loadImg(newValue);
	  console.log('xxxxxxxxx',newValue)
    },
  },
  methods: {
    handlePassportSuccess(file, fileList) {
		console.log(file,fileList)
      this.imgeData.push({
        imgeId: file.data,
        url: file.data,
      });

      const data = this.imgeData.map((item) => {
        return item.url;
      });
      this.$emit("input", data.join(","));
    },
    handleRemove(file, fileList) {
      this.imgeData = fileList.map((item) => {
        return {
          imgeId: item.response.data,
          url: item.response.data,
        };
      });

      const data = this.imgeData.map((item) => {
        return item.url;
      });
      this.$emit("input", data.join(","));
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    loadImg(value) {
		if(value) {
			//获取图片列表
			var arr = value.split(",");
			var data = [];
			for (let i = 0; i < arr.length; i++) {
			  if (arr[i])
			    data.push({
			      imgeId: arr[i],
			      url: arr[i],
			    });
			}
			console.log("imgeData", data);
			this.imgeData = data;
		}

    },
  },
};
</script>
