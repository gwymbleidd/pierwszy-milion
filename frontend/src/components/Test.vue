 <template>
    <div class="col-sm-6 col-sm-offset-3">
      <button class="btn btn-primary" v-on:click="getPost()">Losowy post</button>
      <div class="quote-area">
        <ul>
          <li v-for="quote in quotes | orderBy 'id'"><button @click="remove($index)">x</button> <strong>{{ quote.id }}</strong> {{ quote.title }}</li>
        </ul>
      </div>
    </div>
  </template>

  <script>
  import config from './../config'

  export default {
    data () {
      return {
        quotes: [
        ]
      }
    },
    methods: {
      getPost () {
        this.$http
          .get(config.apiEndpoint + '/building/list')
      },
      remove (index) {
        this.quotes.splice(index, 1)
      }
    }
  }
  </script>