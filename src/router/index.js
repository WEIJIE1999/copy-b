import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    component: () => import("../views/register.vue")
  },
  {
    path: "/login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/userinfo",
    component: () => import("../views/userinfo.vue"),
    meta: {
      istoken: true
    }
  },
  {
    path: "/edit",
    component: () => import("../views/Edit.vue"),
    meta: {
      istoken: true
    }
  },
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    meta: { keepalive: true }
  },
  {
    path: "/article/:id",
    component: () => import("../views/Article.vue")
  },
  {
    path: "/editcategory",
    component: () => import("../views/EditCategory.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (
    !localStorage.getItem("token") &&
    !localStorage.getItem("id") &&
    to.meta.istoken == true
  ) {
    router.push("/login");
    Vue.prototype.$msg.fail("请重新登录");
    return;
  }
  next();
});

export default router;
