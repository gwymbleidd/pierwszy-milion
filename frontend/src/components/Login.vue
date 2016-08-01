 <template>
    <div class="col-sm-6 col-sm-offset-3">
      <input type="text" v-model="username">
      <input type="password" v-model="password">
      <button class="btn btn-primary" v-on:click="getToken()">Zaloguj</button>
      <div class="quote-area">
        {{ response | json }}
      </div>
    </div>
  </template>

  <script>
  import config from './../config'

  export default {
    data () {
      return {
        response: '',
        username: '',
        password: ''
      }
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
        this.$http
          .post(config.apiEndpoint + '/oauth/v2/token', credentials).then(function (response) {
            this.response = response.body
          }).catch(function (error) {
            console.log(error)
          })
      }
    }
  }
  </script>