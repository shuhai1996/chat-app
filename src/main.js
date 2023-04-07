import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import i18n from "./lang";
import store from "./store";
import ElementPlus from "element-plus"; //为vue3项目特别更新的版本
import { View } from "@element-plus/icons-vue";

import "./assets/main.css";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(router, VueAxios, axios);
app.use(i18n);
app.use(store);
app.use(ElementPlus);
app.component(View.name, View); // 全局注册 Edit 图标
app.mount("#app");
