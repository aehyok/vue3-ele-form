import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Table from "../views/Table.vue";
import Dragger from "../views/Dragger.vue";
import FormConfig from "../views/FormConfig.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/table",
    name: "Table",
    component: Table
  },
  {
    path: "/formconfig",
    name: "FormConfig",
    component: FormConfig
  },
  {
    path: "/dragger",
    name: "Dragger",
    component: Dragger
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
