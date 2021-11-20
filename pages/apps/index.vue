<template>
  <div>
    <v-container>
      <app-list
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
      <app-new />
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
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('get_employees')
    await store.dispatch('get_branches')
    await store.dispatch('get_applications')
    await store.dispatch('get_jobs')
    await store.dispatch('get_departments')
  },
  data() {
    return {
      //Dialogs
      dialogDelete: false,
      dialogNew: false,
      dialogView: false
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
      applications: state => {
        return state.applications
      }
    })
  },
  methods: {
    onDelete() {
      this.dialogDelete = true
    },
    onView() {
      this.dialogView = true
    }
  }
}
</script>