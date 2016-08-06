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
          .get('https://jsonplaceholder.typicode.com/posts/' + Math.floor((Math.random() * 50) + 1)).then(function (response) {
            this.quotes.push(JSON.parse(response.body))
          }).catch(function (error) {
            console.log(error)
          })
      },
      remove (index) {
        this.quotes.splice(index, 1)
      }
    }
  }
  </script>