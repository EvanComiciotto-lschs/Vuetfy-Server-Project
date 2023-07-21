import { createWebHistory, createRouter } from "vue-router";

  const routes =  [
    {
    path: "/",
    component: () => import('../components/Login.vue'),
  },
  {
    path: "/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJldXdpcmx3amVoZ2Z5a2FiayxjIiwicGFzc3dvcmQiOiJwYm9pZHRuamhlZ3ZkaGprZ2ZkIiwiaWF0IjoxNTE2MjM5MDIyfQ.zWXb9VM9Bxe-amtInmae7lJ7_1dx7pbfW3VONolyqsc",
    component: () => import('../components/open.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})



export default router;