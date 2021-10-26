<template>
  <Layout :logo="logo" :menu="menu"/>
</template>

<script>
import Layout from "@/common/Layout.vue";
import {logo} from "./config/config";
import menu from "./config/menu";

export default {
  name: "App",
  data(){
    return {
      logo,
      menu
    }
  },
  components:{
    Layout
  },
};
</script>

<style>

</style>
