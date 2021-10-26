import Vue from "vue";
import VueRouter from "vue-router";
import Element from "element-ui";
import "element-ui/packages/theme-chalk/src/index.scss";
import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
  // 高德key
  key: '4b7076e2193d05e6d72aa3f37d2909fe',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});



Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(VueRouter);



import store from "store";
import routes from "./routers";
import App from "./App.vue";
import {microApps,apiHost} from "./config/config"
import "@/css/main.scss"

store.set("apiHost",apiHost);

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

//前端微服务配置逻辑
import { registerMicroApps, start } from "qiankun";
registerMicroApps(microApps);
start();
