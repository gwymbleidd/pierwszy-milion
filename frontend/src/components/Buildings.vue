 <template>
  <div class="buildings">
    <v-server-table url="/building/list" :columns="columns" :options="options"></v-server-table>
  </div>
  </template>
  <script>
  export default {
    data () {
      return {
        columns: [
          'id', 'name', 'width', 'height', 'price', 'edit', 'delete'
        ],
        options: {
          headings: {
            id: 'Id',
            name: 'Nazwa',
            width: 'Szerokość',
            height: 'Wysokość',
            price: 'Cena',
            edit: 'Edytuj',
            delete: 'Usuń'
          },
          templates: {
            edit: function (row) {
              return `<a href='javascript:void(0);' @click='$parent.edit(${row.id})'><i class='glyphicon glyphicon-edit'></i></a>`
            },
            delete: function (row) {
              return `<a href='javascript:void(0);' @click='$parent.remove(${row.id})'><i class='glyphicon glyphicon-erase'></i></a>`
            }
          }
        }
      }
    },
    methods: {
      remove (id) {
      },
      edit (data) {
        console.log(data)
      }
    }
  }
  </script>