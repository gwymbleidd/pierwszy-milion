<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-euro"></i>
        </a>
        <ul class="nav navbar-nav">
          <li><a v-link="'/home'">Home</a></li>
          <li><a v-link="'/buildings'">Buildings</a></li>
          <li v-if="!isLogged"><a v-link="'/login'">Login</a></li>
          <li v-if="isLogged"><a v-on:click="logout()">Wyloguj</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-3">
      </div>
      <div class="col-sm-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import authHelper from './helpers/auth'
export default {
  data () {
    return {
      isLogged: authHelper.checkAuth()
    }
  },
  methods: {
    logout: function () {
      this.isLogged = false
      authHelper.logout()
    },
    setIsLoggedOut: function () {
      this.isLogged = false
    },
    setIsLoggedIn: function () {
      this.isLogged = true
    }
  },
  events: {
    'loggedIn': 'setIsLoggedIn',
    'loggedOut': 'setIsLoggedOut'
  }
}
</script>