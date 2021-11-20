<template>
  <div>
    <v-container>
      <branch-list
        @showNewDialog="dialogNew = true"
        @showDeleteDialog="onDelete"
        @showViewDialog="onView"
      />
    </v-container>

    <v-dialog
      v-model="dialogNew"
      transition="dialog-bottom-transition"
      width="1000"
    >
      <branch-new @showSnackbar="showSnackbar" @hideNewDialog="hideNewDialog" />
    </v-dialog>

    <v-dialog
      v-model="dialogView"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    </v-dialog>

    <v-dialog v-model="dialogDelete" width="600">
      <v-card>
        <v-card-title>Are you sure you want to delete? </v-card-title>
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
          <v-btn color="red" dark>Delete Employee</v-btn>
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
import { mapState } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('get_employees')
    await store.dispatch('get_branches')
    await store.dispatch('get_jobs')
    await store.dispatch('get_departments')
  },
  data() {
    return {
      //Dialogs
      dialogDelete: false,
      dialogNew: false,
      dialogView: false,

      snackbar: false,
      snackbar_color: '',
      snackbar_title: '',
      snackbar_subtitle: ''
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
      }
    })
  },
  methods: {
    hideNewDialog() {
      this.dialogNew = false
    },
    showSnackbar(value) {
      if (value == 'success') {
        this.snackbar_title = 'Success'
        this.snackbar_subtitle = 'Branch successfully created!'
        this.snackbar_color = 'indigo'
        this.snackbar = true
      } else {
        this.snackbar_title = 'Failed'
        this.snackbar_subtitle = 'Internal server error'
        this.snackbar_color = 'error'
        this.snackbar = true
      }
    },
    onDelete() {
      this.dialogDelete = true
    },
    onView(id) {
      this.$router.push('/Branches/' + id)

      // this.branch_index = this.branches.map(el => el._id).indexOf(id)
      // this.dialogView = true
    }
  }
}
</script>