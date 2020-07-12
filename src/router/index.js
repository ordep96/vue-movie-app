import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import Favorites from '../views/protected/Favorites'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
    meta: {
      requiresAuth: true
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  routes
})

let userLogged = localStorage.getItem('userLogged') === 'true' ? true : false

router.beforeEach((to,from,next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(userLogged)
    console.log(store.state.user)
    if (store.loggedIn) {
      next('/login')
    } else {
      next()
    }
  } else {
    if (to.name === 'Login') {
      if ( userLogged ) {
        next('/')
      } else {
        next()
      }
    }
    next()
  }
})

export default router
