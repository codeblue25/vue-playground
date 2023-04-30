import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import DashboardPage from '../components/DashboardPage.vue'

const router =  new VueRouter({
  mode:'history', //해쉬값 제거 방식
  routes: [
    {
      path: '/', 
      component: DashboardPage,
    },
    {
      path: '/fruit',
      component: () => import('../components/FruitChoicePage.vue')
    }, 
    {
      path: '/grain',
      component: () => import('../components/GrainChoicePage.vue')
    }
    ]
});

export default router;