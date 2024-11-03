import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-plus/dist/index.css";

createApp(App).use(store).use(router).mount("#app");

// 物料拖拽决定key+拖拽位置 = 蓝图，
// 蓝图通过key从物料拿到实际组件，根据蓝图中指定的位置渲染
