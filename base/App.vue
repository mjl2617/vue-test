<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: "App",
  created(){
      console.log(this)
  }
};
</script>
