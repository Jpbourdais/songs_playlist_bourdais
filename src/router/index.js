import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import HelloWord from '../components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWord,
    children: [
      {
        path: 'playlist',
        name: 'playlist',
        component: () => import('../components/Player/Playlist.vue')
      },
      {
        path: 'addsong',
        name: 'addsong',
        component: () => import('../components/Player/AddSong.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Portfolio.vue')
  },
  {
    path: '/prenom/:prenom',
    name: 'prenom',
    component: () => import(/* webpackChunkName: "about" */ '../views/Prenom.vue'),
    children: [
      {
        path: 'comments',
        name: 'comments',
        component: () => import('../views/Comments.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
