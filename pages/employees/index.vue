<template>
  <div>
    <v-container>
      <employee-list
        @showNewDialog="dialogNew = true"
        @showDeleteDialog="onDelete"
        @showViewDialog="onView"
      />
    </v-container>

    <v-dialog
      v-model="dialogNew"
      transition="dialog-bottom-transition"
      width="850"
    >
      <employee-new @showSnackbar="showSnackbar" />
    </v-dialog>

    <v-dialog
      v-model="dialogView"
      transition="dialog-bottom-transition"
      fullscreen
    >
      <employee-view :employee_index="employee_index" />
    </v-dialog>

    <v-dialog v-model="dialogDelete" width="600" v-if="employees.length != 0">
      <v-card>
        <v-card-title
          >Are you sure you want to delete
          {{
            employees[employee_index].firstname +
            ' ' +
            employees[employee_index].lastname
          }}?
        </v-card-title>
        <v-card-text>
          By delete this employee all records associated will also be deleted.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            text
            class="red--text"
            @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn
            color="red"
            dark
            @click="onConfirmDelete(employees[employee_index]._id)"
            >Delete Employee</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :color="snackbar_color"
      right
      class="px-5 py-5"
    >
      <v-list-item two-line style="padding: 0">
        <v-list-item-avatar>
          <v-icon x-large>
            {{
              this.snackbar_title == 'Success' ? 'mdi-check-bold' : 'mdi-alert'
            }}
          </v-icon>
          <v-icon x-large> </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ snackbar_title }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ snackbar_subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('get_employees')
    await store.dispatch('get_branches')
    await store.dispatch('get_departments')
    await store.dispatch('get_jobs')
    await store.dispatch('get_applications')
  },
  data() {
    return {
      // Snackbars
      snackbar: false,
      snackbar_color: '',
      snackbar_title: '',
      snackbar_subtitle: '',

      //Dialogs
      dialogDelete: false,
      dialogNew: false,
      dialogView: false,

      employee_index: 0,
      delete_id: 0
    }
  },
  computed: {
    ...mapState({
      employees: state => {
        return state.employees
      },
      branches: state => {
        return state.branches
      },
      departments: state => {
        return state.departments
      },
      jobs: state => {
        return state.jobs
      },
      applications: state => {
        return state.applications
      }
    })
  },
  methods: {
    showSnackbar(value) {
      if (value == 'success') {
        this.snackbar_title = 'Success'
        this.snackbar_subtitle = 'Customer successfully created!'
        this.snackbar_color = 'indigo'
        this.snackbar = true
      } else {
        this.snackbar_title = 'Failed'
        this.snackbar_subtitle = 'Internal server error'
        this.snackbar_color = 'error'
        this.snackbar = true
      }
    },
    onConfirmDelete(id) {
      axios
        .delete('http://192.168.100.77:8080/api/employees/' + id)
        .then(response => {
          this.dialogDelete = false
          this.employee_index = 0
          this.$store.commit('REMOVE_EMPLOYEES', id)

          this.snackbar_title = 'Deleted'
          this.snackbar_subtitle = 'Customer successfully deleted!'
          this.snackbar_color = 'error'
          this.snackbar = true
        })
        .catch(function(error) {
          console.log(error)
          alert('err')
        })
    },
    onDelete(id) {
      this.dialogDelete = true
      const index = this.employees.map(el => el._id).indexOf(id)
      this.employee_index = index
    },
    onView(id) {
      const index = this.employees.map(el => el._id).indexOf(id)
      this.employee_index = index
      this.dialogView = true
    }
  }
}
</script>