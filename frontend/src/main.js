import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
// import Vuex from 'vuex'
import Test from './components/Test.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import authHelper from './helpers/auth'
import config from './config'
// import { sync } from 'vuex-router-sync'

Vue.use(VueResource)
Vue.use(VueRouter)
const router = new VueRouter()

router.map({
  '/home': {
    component: Home
  },
  '/test': {
    component: Test
  },
  '/login': {
    component: Login
  }
})

Vue.http.interceptors.push((request, next) => {
  if (request.method === 'get' && authHelper.checkAuth() && authHelper.getToken()) {
    request.url += '?access_token=' + authHelper.getToken()
  }
  next((response) => {
    if (response.status === 401) {
      authHelper.logout()
      router.go('/login')
    }
  })
})

router.beforeEach(function (transition) {
  var isLogged = authHelper.checkAuth()
  if (!isLogged && config.unsecuredPaths.indexOf(transition.to.path) === -1) {
    router.go('/login')
  }
  transition.next()
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
