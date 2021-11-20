<template>
  <div>
    <v-row class="mx-2" align="center">
      <v-col>
        <v-list-item two-line style="padding: 0">
          <v-list-item-content>
            <v-list-item-title style="font-size: 1.5em"
              >Applications</v-list-item-title
            >
            <v-list-item-subtitle>List of all Employees</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col xl="4">
        <br />

        <v-text-field
          outlined
          v-model="search"
          dense
          label="Search here.."
          append-icon="mdi-magnify"
          background-color="white"
        ></v-text-field>
      </v-col>
      <v-col xl="1">
        <v-btn small fab class="mx-1" color="indigo" elevation="0">
          <v-icon color="white">mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-btn small fab class="mx-1" color="white" elevation="0">
          <v-icon>mdi-view-grid</v-icon>
        </v-btn>
      </v-col>
      <v-col xl="2">
        <v-btn color="indigo" dark block @click="$emit('showNewDialog')">
          <v-icon left> mdi-plus</v-icon> New Application
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mx-2">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="applications"
          item-key="name"
          class="elevation-1"
          :search="search"
          :custom-filter="filterOnlyCapsText"
        >
          <template v-slot:item.application_type="{ item }">
            <v-chip class="my-7" color="primary" label>{{
              item.application_type
            }}</v-chip>
          </template>

          <template v-slot:item.application_emp="{ item }">
            <v-list-item two-line style="padding: 0">
              <v-list-item-content>
                <v-list-item-title>
                  {{
                    item.application_emp.firstname +
                    ' ' +
                    item.application_emp.lastname
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.application_emp.job.job_name }} ({{
                    item.application_emp.department.department_name
                  }})
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-slot:item.application_branch="{ item }">
            <v-list-item two-line style="padding: 0">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.application_emp.branch.branch_name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.application_emp.branch.branch_name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-slot:item.application_approved="{ item }">
            <v-list-item two-line style="padding: 0">
              <v-list-item-content>
                <v-list-item-title>
                  {{
                    item.application_approved.firstname +
                    ' ' +
                    item.application_approved.lastname
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.application_approved.job.job_name }} ({{
                    item.application_approved.department.department_name
                  }})
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-slot:item.application_proposed="{ item }">
            <v-list-item two-line style="padding: 0">
              <v-list-item-content>
                <v-list-item-title>
                  {{
                    item.application_proposed.firstname +
                    ' ' +
                    item.application_proposed.lastname
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.application_proposed.job.job_name }} ({{
                    item.application_proposed.department.department_name
                  }})
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <!-- Actions template -->
          <template v-slot:item.actions="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  small
                  elevation="0"
                  color="white"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-subheader>Actions</v-subheader>

                <v-list-item link @click="onView(item._id)">
                  <v-list-item-title> View/Edit Application</v-list-item-title>
                </v-list-item>

                <v-list-item link @click="$emit('showDeleteDialog')">
                  <v-list-item-title> Delete Employee </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: ''
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
    }),
    headers() {
      return [
        { text: 'Application Type', value: 'application_type' },
        { text: 'Employee', value: 'application_emp' },
        { text: 'Proposed by', value: 'application_proposed' },
        { text: 'Approved by', value: 'application_approved' },
        { text: 'Branch', value: 'application_branch' },
        { text: 'Date', value: 'application_date' },
        { text: 'Actions', value: 'actions' }
      ]
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    }
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search) !== -1
      )
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
    onView(id) {
      this.$router.push('/Apps/' + id)
    }
  }
}
</script>