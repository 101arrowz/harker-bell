/* eslint-disable no-undef */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import {openDB} from "idb";
//import "roboto-fontface/css/roboto/roboto-fontface.css";
//import "material-design-icons-iconfont/dist/material-design-icons.css";
//import "typeface-roboto";
//import "typeface-pt-sans";
import "./fonts.css";
import "./material-icons.css";
import "autotrack/lib/plugins/event-tracker";
import "autotrack/lib/plugins/outbound-link-tracker";
import "autotrack/lib/plugins/page-visibility-tracker";
import "autotrack/lib/plugins/url-change-tracker";

Vue.config.productionTip = false;

let timestamp = new Date();
openDB("harker-bell-db", 1, {
  upgrade(db) {
    db.createObjectStore("schedules", {keyPath: "date"});
  },
}).then(db => {
  console.log("==> DB: ", new Date()-timestamp);
  window.db = db;
  initVue();
  console.log("==> VUE: ", new Date()-timestamp);
}).catch(err => {
  console.error(err);
  window.db = null;
  initVue();
});
function initVue() {
  var app = new Vue({
    router,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
  window.app = app;
}

ga("require", "eventTracker");
ga("require", "outboundLinkTracker", {events: ["click", "contextmenu", "auxclick"]});
ga("require", "pageVisibilityTracker", {visibleThreshold: 1000, visibleMetricIndex: 1});
ga("require", "urlChangeTracker");