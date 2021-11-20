<template>
  <v-autocomplete
    :items="employees"
    item-text="firstname"
    return-object
    label="Employee to transfer"
    dense
    outlined
  >
    <template v-slot:item="data">
      <v-list-item-avatar>
        <v-avatar class="white--text" color="indigo">
          {{ data.item.firstname.charAt(0) + data.item.lastname.charAt(0) }}
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ data.item.firstname + ' ' + data.item.lastname }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ data.item.job.job_name }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{ data.item.department.department_name }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import {
  regions,
  provinces,
  cities,
  barangays
} from 'select-philippines-address'

export default {
  data() {
    return {}
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
  }
}
</script>