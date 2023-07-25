import { createWebHistory, createRouter } from "vue-router";

  const routes =  [
    {
    path: "/",
    component: () => import('../LoginView.vue'),
  },
  {
    path: "/home",
    component: () => import('../open.vue'),
  },
  {
    path: "/partymode=true",
    component: () => import('../party'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})



export default router;