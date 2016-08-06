import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Test from './components/Test.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

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

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
