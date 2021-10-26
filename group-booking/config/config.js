//接口网关地址
// export const apiHost = "https://api.pkl.life";
export const apiHost = "http://pkl-api.cdridge.com";
// export const apiHost = "http://pkl.cdridge.com/";
// export const apiHost = "https://mall.zmhhx.com";

//logo
export const logo = "/assets/logo.png";


//微服务注册
const _microAppsConfig ={
  apiHost,
};
export const microApps = [
  {
    name: "base",
    // entry: "//124.70.161.137:9011", 
    entry: "http://pkl-admin-base.cdridge.com",
    // entry: "//9101.zmhhx.com",
    // entry: "//localhost:4000",
    container: "#container",
    activeRule: "#/base",
    props:_microAppsConfig
  }
];

