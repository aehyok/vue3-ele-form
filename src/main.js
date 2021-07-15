import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn"; //中文
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// 测试在线提交
const app = createApp(App);
app.use(ElementPlus, { locale });
app.use(store);
app.use(router);
app.mount("#app");
// createApp(App).use(store).use(router).mount('#app')
