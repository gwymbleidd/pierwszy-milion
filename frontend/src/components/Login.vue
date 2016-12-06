 <template>
  <div v-if="!islogged" class="col-sm-6 col-sm-offset-3">
    <input type="text" v-model="username">
    <input type="password" v-model="password">
    <button class="btn btn-primary" v-on:click="getToken()">Zaloguj</button>
  </div>
  <div v-if="islogged" class="col-sm-6 col-sm-offset-3">
    <button class="btn btn-primary" v-on:click="logout()">Wyloguj</button>
  </div>

</template>

  <script>
  import config from './../config'
  import authHelper from './../helpers/auth'

  export default {
    props: ['islogged'],
    inherit: true,
    data () {
      return {
        response: '',
        username: '',
        password: '',
        isLogged: this.islogged
      }
    },
    ready: function () {
      this.$dispatch('loggedOut')
    },
    methods: {
      getToken () {
        var credentials =
          {
            'client_id': config.client_id,
            'client_secret': config.client_secret,
            'grant_type': 'password',
            'username': this.username,
            'password': this.password
          }
        var options =
          {
            'emulateJSON': true
          }
        this.$http
          .post(config.apiEndpoint + '/oauth/v2/token', credentials, options).then(function (response) {
            var data = JSON.parse(response.body)
            if (data.access_token) {
              authHelper.login(data.access_token)
              this.$dispatch('loggedIn')
              this.$router.go('/home')
            }
          }).catch(function (error) {
            this.response = JSON.parse(error.body).error_description
          })
      },
      logout () {
        authHelper.logout()
        this.$dispatch('loggedOut')
      }
    }
  }
  </script>