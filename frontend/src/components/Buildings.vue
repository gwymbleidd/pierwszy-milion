 <template>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns">
          {{key | capitalize}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="building in buildings">
        <td v-for="key in columns">
          {{building[key]}}
        </td>
      </tr>
    </tbody>
  </table>
  </template>

  <script>
  import config from './../config'

  export default {
    data () {
      return {
        columns: [
          'id', 'name', 'width', 'height', 'price'
        ],
        buildings: [
        ]
      }
    },
    ready: function () {
      this.getBuildings()
    },
    methods: {
      getBuildings () {
        this.$http
          .get(config.apiEndpoint + '/building/list').then(function (response) {
            var data = JSON.parse(response.body)
            if (data.data) {
              this.buildings = data.data
            }
          }).catch(function (error) {
            console.log(error.body)
          })
      }
    }
  }
  </script>