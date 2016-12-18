import Vue from 'vue'
import VueTables from 'vue-tables'
import App from './App.vue'
import Home from './components/Home.vue'
import Test from './components/Test.vue'
import Buildings from './components/Buildings.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import authHelper from './helpers/auth'
import config from './config'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueTables.server, {})
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
  },
  '/buildings': {
    component: Buildings
  }
})

Vue.http.interceptors.push((request, next) => {
  if (request.method === 'get' && authHelper.checkAuth() && authHelper.getToken()) {
    request.url = config.apiEndpoint + request.url + '?access_token=' + authHelper.getToken()
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
