import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routers";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiCart3,
  HiSolidUserCircle,
  BiPlusCircle,
  LaWindowClose,
  LaSpinnerSolid,
} from "oh-vue-icons/icons";

addIcons(
  BiCart3,
  HiSolidUserCircle,
  BiPlusCircle,
  LaWindowClose,
  LaSpinnerSolid
);
const app = createApp(App);
app.use(router);
app.use(VueSweetalert2);
app.component("v-icon", OhVueIcon);

app.mount("#app");
