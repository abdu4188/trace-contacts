import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/Login')
  },
  {
    path: '/contactslist/:id',
    name: 'ContactsList',
    component: () => import('@/views/ContactsList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup/:superu/:email',
    name: 'Signup',
    component: () => import('@/views/Auth/Signup')
  },
  {
    path: '/adduser',
    name: 'AddUser',
    component: () => import('@/views/AddUser.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some( rec => rec.meta.requiresAuth)){
    let user = firebase.auth().currentUser
    if(user){
      next()
    }
    else{
      next({name: 'Login'})
    }
  }
  else{
    next()
  }
})


export default router
