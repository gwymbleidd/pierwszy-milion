<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-euro"></i>
        </a>
        <ul class="nav navbar-nav">
          <li><a v-link="'/home'">Home</a></li>
          <li><a v-link="'/test'">Test</a></li>
          <li><a v-link="'/login'">Login</a></li>
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
</script>