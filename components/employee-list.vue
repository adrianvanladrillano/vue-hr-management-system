<template>
  <div>
    <v-row class="mx-2 pt-2" align="center">
      <v-col>
        <page-title />
      </v-col>
      <v-col cols="12" xl="4">
        <br />
        <v-text-field
          append-icon="mdi-magnify"
          background-color="white"
          v-model="name"
          outlined
          dense
          label="Search via name"
        ></v-text-field>
      </v-col>
      <v-col xl="1">
        <v-btn-toggle v-model="toggle_exclusive">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="py-5"
                :color="branch == null ? '' : 'indigo'"
                outlined
                small
                v-bind="attrs"
                background-color="white"
                v-on="on"
              >
                <v-icon>mdi-tune</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Filters</v-list-item-title>
                    <v-list-item-subtitle
                      >Lorem ipsum dolor sit amet.
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action> </v-list-item-action>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-subheader class="mt-5">Filter</v-subheader>
              <v-list>
                <v-list-item>
                  <v-autocomplete
                    v-model="branch"
                    background-color="white"
                    outlined
                    dense
                    :items="branches"
                    item-text="branch_name"
                    item-value="_id"
                    clearable
                    label="Branch"
                  ></v-autocomplete>
                </v-list-item>

                <v-list-item>
                  <v-autocomplete
                    v-model="department"
                    background-color="white"
                    outlined
                    dense
                    :items="departments"
                    item-text="department_name"
                    item-value="_id"
                    clearable
                    label="Department"
                  ></v-autocomplete>
                </v-list-item>

                <v-list-item>
                  <v-autocomplete
                    v-model="type"
                    background-color="white"
                    outlined
                    dense
                    :items="[
                      'Regular',
                      'Contractual',
                      'Part-Time',
                      'Consultant',
                    ]"
                    item-text="job_name"
                    item-value="id"
                    clearable
                    label="Type"
                  ></v-autocomplete>
                </v-list-item>

                <v-list-item>
                  <v-autocomplete
                    v-model="emp_status"
                    background-color="white"
                    outlined
                    dense
                    :items="['Active', 'Inactive', 'Part-Time', 'Consultant']"
                    item-text="job_name"
                    item-value="id"
                    clearable
                    label="Status"
                  ></v-autocomplete>
                </v-list-item>

                <v-list-item>
                  <v-autocomplete
                    v-model="job"
                    background-color="white"
                    outlined
                    dense
                    :items="jobs"
                    item-text="job_name"
                    item-value="id"
                    clearable
                    label="Job"
                  ></v-autocomplete>
                </v-list-item>
              </v-list>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text @click="menu = false"> Cancel </v-btn>
                <v-btn color="primary" text @click="menu = false"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-btn small class="py-5" color="white">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col xl="2">
        <v-btn color="indigo" dark block @click="$emit('showNewDialog')">
          <v-icon left> mdi-plus</v-icon> New Employee
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      class="mx-2"
      v-if="
        employees.length != 0 && jobs.length != 0 && departments.length != 0
      "
    >
      <v-col>
        <v-data-table
          :headers="headers"
          :items="filtered_employees"
          class="elevation-1"
        >
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
                  <v-list-item-title> View Employee</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="$emit('showDeleteDialog', item._id)">
                  <v-list-item-title> Delete Employee </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>

          <!--Name template -->
          <template v-slot:item.name="{ item }">
            <v-list-item two-line style="padding: 0" class="my-3">
              <v-list-item-avatar>
                <v-avatar color="indigo" class="white--text">{{
                  item.firstname.charAt(0)
                }}</v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{
                  item.firstname +
                  ' ' +
                  item.middlename.charAt(0) +
                  '. ' +
                  item.lastname
                }}</v-list-item-title>
                <v-list-item-subtitle>{{ item._id }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <!--department template -->
          <template v-slot:item.department="{ item }">
            {{ getDeparment(item.department) }}
          </template>

          <!--department template -->
          <template v-slot:item.job="{ item }">
            {{ getJob(item.job) }}
          </template>

          <!--department template -->
          <template v-slot:item.branch="{ item }">
            {{ getBranch(item.branch) }}
          </template>

          <!--Type template -->
          <template v-slot:item.type="{ item }">
            <v-chip
              label
              style="width: 120px"
              :color="
                item.emp_type == 'Regular'
                  ? 'indigo'
                  : item.emp_type == 'Contractual'
                  ? 'amber darken-2'
                  : item.emp_type == 'Consultant'
                  ? 'cyan '
                  : item.emp_type == 'Resigned'
                  ? 'red'
                  : item.emp_type == 'Part-Time'
                  ? 'green'
                  : ''
              "
              class="white--text justify-center"
            >
              {{ item.emp_type }}
              <v-icon right>mdi-account-check </v-icon>
            </v-chip>
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
      branch: null,
      search: '',
      name: '',
      type: null,
      department: null,
      emp_status: '',
      identification: '',
      job: null,
      headers: [
        {
          text: 'Employee',
          sortable: false,
          value: 'name'
        },
        { text: 'Type', value: 'type' },
        { text: 'Status', value: 'emp_status' },
        { text: 'Department', value: 'department' },
        { text: 'Job/Position', value: 'job' },
        {
          text: 'Branch',
          value: 'branch'
          // align: ' d-none'
        },
        { text: 'Actions', value: 'actions' }
      ]
    }
  },
  computed: {
    ...mapState({
      employees: state => {
        return state.employees
      },
      departments: state => {
        return state.departments
      },
      branches: state => {
        return state.branches
      },
      jobs: state => {
        return state.jobs
      }
    }),

    filtered_employees() {
      // return this.employees.filter(this.filterByName).filter(this.filterByAge)
      return this.employees.filter(employee => {
        return (
          (!this.name ||
            employee.firstname
              .toLowerCase()
              .includes(this.name.toLowerCase()) ||
            employee.lastname.toLowerCase().includes(this.name.toLowerCase()) ||
            employee.identifications.filter(element =>
              element.value.includes(this.name)
            ).length > 0 ||
            employee.telephones.filter(element =>
              element.number.includes(this.name)
            ).length > 0 ||
            employee.mobiles.filter(element =>
              element.number.includes(this.name)
            ).length > 0) &&
          // ID

          (!this.department ||
            employee.department
              .toLowerCase()
              .includes(this.department.toLowerCase())) &&
          (!this.emp_status ||
            employee.emp_status
              .toLowerCase()
              .includes(this.emp_status.toLowerCase())) &&
          (!this.branch ||
            employee.branch
              .toLowerCase()
              .includes(this.branch.toLowerCase())) &&
          (!this.job ||
            employee.job.toLowerCase().includes(this.job.toLowerCase())) &&
          (!this.type ||
            employee.emp_type.toLowerCase().includes(this.type.toLowerCase()))
        )
      })
      // if (this.branch == '' && this.name == '') {
      //   return this.employees
      // } else {
      //   let x = this.employees.filter(el => el.branch == this.branch)
      //   let y = this.employees.filter(el =>
      //     el.firstname.toLowerCase().includes(this.name.toLowerCase())
      //   )

      //   let data = [...x, ...y]
      //   return data
      // }
    }
  },
  methods: {
    getDeparment(id) {
      let x = this.departments.filter(el => el._id == id)[0].department_name
      return x
    },
    getJob(id) {
      let x = this.jobs.filter(el => el.id == id)[0].job_name
      return x
    },
    getBranch(id) {
      let x = this.branches.filter(el => el._id == id)[0].branch_name
      return x
    },
    showViewDialog(id) {
      this.$emit('showViewDialog', id)
    },
    onView(id) {
      this.$router.push('/Employees/' + id)
    }
  }
}
</script>