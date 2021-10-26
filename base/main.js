import Vue from "vue";
import VueRouter from "vue-router";
import Element from "element-ui";
import "element-ui/packages/theme-chalk/src/index.scss";


Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(VueRouter);

import store from "store";
import routes from "./routers";
import App from "./App.vue";
import "@/css/main.scss"

let instance = null;
let router = null;
const render = (props = {})=>{
  const { container } = props;
  router = new VueRouter({
    routes,
  });
  instance = new Vue({
    router,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}


//微服务入口
(global => {
  global['purehtml'] = {
    bootstrap: () => {
      console.log('purehtml bootstrap');
      return Promise.resolve();
    },
    mount: (props) => {
      store.set("apiHost",props.apiHost);
      console.log('[vue] props from main framework', props);
      render(props);
    },
    unmount: () => {
      instance.$destroy();
      instance.$el.innerHTML = '';
      instance = null;
      router = null;
      return Promise.resolve();
    },
  };
})(window);