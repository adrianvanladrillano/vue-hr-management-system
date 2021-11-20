<template>
  <div>
    <v-container fill-height>
      <v-row class="my-5 mx-2">
        <v-col cols="12" xl="12">
          <v-card class="px-4">
            <v-row>
              <v-col cols="12" xl="3">
                <v-img
                  contain
                  :src="
                    branch_logo == ''
                      ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pWEq0Ws2LvaUdaL54gjglSViYF4IVL70GFVIk18uryQ9S1tO5NKtFKKEaYHRFKDFz9E&usqp=CAU'
                      : 'http://192.168.100.77:8080/' + branch_logo
                  "
                ></v-img>
              </v-col>
              <v-col cols="12" xl="9">
                <v-row class="py-10">
                  <v-col>
                    <h1 class="font-weight-regular black--text">
                      {{ this.branch_name + branchLoad }}
                    </h1>
                    <p class="text--secondary">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Harum, assumenda aliquid nesciunt eaque, corporis tempore
                      saepe deserunt quibusdam quod obcaecati laudantium, aut
                      cupiditate delectus rerum debitis! Veniam reprehenderit
                      corporis suscipit.
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="px-4">
              <v-col>
                <v-tabs transparent-body>
                  <v-tab>Employees</v-tab>
                  <v-tab>Information</v-tab>
                  <v-tab>Departments</v-tab>
                  <v-tab>Jobs</v-tab>

                  <v-tab-item>
                    <v-row class="mt-7">
                      <v-col cols="12" xl="4">
                        <v-text-field
                          append-icon="mdi-magnify"
                          background-color="white"
                          v-model="name"
                          outlined
                          dense
                          label="Search via name"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="5">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-width="200"
                          offset-x
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="py-4"
                              :color="branch == null ? '' : 'indigo'"
                              outlined
                              v-bind="attrs"
                              background-color="white"
                              v-on="on"
                            >
                              Filters
                              <v-icon right>mdi-tune</v-icon>
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

                            <v-list class="mt-5">
                              <v-list-item>
                                <v-autocomplete
                                  v-model="input_branch"
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
                                  v-model="input_department"
                                  background-color="white"
                                  outlined
                                  dense
                                  :items="departments"
                                  item-text="department_name"
                                  item-value="_id"
                                  clearable
                                  label="Depts"
                                ></v-autocomplete>
                              </v-list-item>

                              <v-list-item>
                                <v-autocomplete
                                  v-model="input_type"
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
                                  v-model="input_job"
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
                              <v-btn color="primary" text @click="menu = false">
                                Save
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <v-row dense>
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
                                  <v-list-item-title>
                                    View Employee</v-list-item-title
                                  >
                                </v-list-item>
                                <v-list-item link>
                                  <v-list-item-title>
                                    Edit Employee
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                  link
                                  @click="$emit('showDeleteDialog')"
                                >
                                  <v-list-item-title>
                                    Delete Employee
                                  </v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </template>

                          <!--Name template -->
                          <template v-slot:item.name="{ item }">
                            <v-list-item
                              two-line
                              style="padding: 0"
                              class="my-3"
                            >
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
                                <v-list-item-subtitle>{{
                                  item._id
                                }}</v-list-item-subtitle>
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
                  </v-tab-item>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <v-row class="mt-2">
                          <v-col cols="12" xl="3">
                            <v-img
                              contain
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvwYAfmW3-gEbCKppFWFsF10REo2Bm1p3HADdjFVP6J4MNL1B4C4qQLXwFmbtqMouJyss&usqp=CAU"
                            >
                            </v-img>
                          </v-col>

                          <v-col>
                            <v-row dense>
                              <v-col>
                                <v-text-field
                                  outlined
                                  dense
                                  label="Branch Name"
                                  v-model="branch_name"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row dense>
                              <v-col>
                                <v-text-field
                                  outlined
                                  dense
                                  label="Street"
                                  v-model="street"
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <v-row dense>
                              <v-col>
                                <v-autocomplete
                                  :items="regions"
                                  v-model="region"
                                  item-text="region_name"
                                  return-object
                                  @change="handleProvince(region)"
                                  outlined
                                  dense
                                  label="Province"
                                ></v-autocomplete>
                              </v-col>

                              <v-col>
                                <v-autocomplete
                                  :items="provinces"
                                  v-model="province"
                                  item-text="province_name"
                                  return-object
                                  @change="handleCity(province)"
                                  outlined
                                  dense
                                  label="Province"
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                            <v-row dense>
                              <v-col>
                                <v-autocomplete
                                  :items="cities"
                                  v-model="city"
                                  item-text="city_name"
                                  return-object
                                  @change="handleBarangay(city)"
                                  outlined
                                  dense
                                  label="City"
                                ></v-autocomplete>
                              </v-col>

                              <v-col>
                                <v-autocomplete
                                  :items="barangays"
                                  v-model="barangay"
                                  item-text="brgy_name"
                                  return-object
                                  outlined
                                  dense
                                  label="Barangay"
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <v-btn dark color="indigo" @click="updateBranch()"
                              >Update Branch</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-row dense class="mt-7">
                      <v-row class="mx-1">
                        <v-col cols="12" xl="6">
                          <v-row dense>
                            <v-col>
                              <v-text-field
                                outlined
                                dense
                                label="Search.."
                                background-color="white"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col>
                          <v-btn-toggle
                            v-model="toggle_exclusive"
                            class="float-right"
                          >
                            <v-btn>
                              <v-icon>mdi-format-align-left</v-icon>
                            </v-btn>

                            <v-btn>
                              <v-icon>mdi-format-align-center</v-icon>
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                    </v-row>
                    <v-row dense>
                      <v-col>
                        <v-data-iterator
                          flat
                          :headers="headers_branch"
                          :items="branch_dept"
                        >
                          <template v-slot:default="props">
                            <v-row class="mx-1">
                              <v-col
                                cols="12"
                                xl="6"
                                v-for="item in props.items"
                                :key="item.id"
                              >
                                <v-card @click="viewJob(item._id)">
                                  <v-card-title>
                                    {{ item.department_name }}
                                  </v-card-title>
                                  <v-card-text>
                                    {{ item.department_description }}
                                  </v-card-text>

                                  <v-card-text>
                                    <v-chip-group
                                      v-model="selection"
                                      active-class="deep-purple accent-4 white--text"
                                      column
                                    >
                                      <v-chip label color="indigo" dark>
                                        <v-icon left>mdi-map-marker</v-icon>
                                        IT Department
                                      </v-chip>

                                      <v-chip label color="indigo" dark>
                                        <v-icon left>mdi-calendar</v-icon>
                                        6 Months
                                      </v-chip>

                                      <v-chip label color="indigo" dark>
                                        <v-icon left>mdi-currency-usd</v-icon>
                                        698/hour
                                      </v-chip>

                                      <v-chip label color="indigo" dark>
                                        <v-icon left>mdi-alarm</v-icon>
                                        40 hours/week
                                      </v-chip>
                                    </v-chip-group>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="indigo" text @click="reserve">
                                      View Department
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-col>
                            </v-row>
                          </template>
                        </v-data-iterator>
                      </v-col>
                    </v-row>
                  </v-tab-item>

                  <v-tab-item>
                    <v-row dense class="mt-7">
                      <v-row class="mx-1">
                        <v-col cols="12" xl="6">
                          <v-row dense>
                            <v-col>
                              <v-text-field
                                outlined
                                dense
                                label="Search.."
                                background-color="white"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col>
                          <v-btn-toggle
                            v-model="toggle_exclusive"
                            class="float-right"
                          >
                            <v-btn>
                              <v-icon>mdi-format-align-left</v-icon>
                            </v-btn>

                            <v-btn>
                              <v-icon>mdi-format-align-center</v-icon>
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-data-iterator
                          flat
                          :headers="headers_job"
                          :items="branch_jobs"
                        >
                          <!-- Actions template -->
                          <template v-slot:default="props">
                            <v-row class="mx-1">
                              <v-col
                                cols="12"
                                xl="6"
                                v-for="item in props.items"
                                :key="item.id"
                              >
                                <v-card @click="viewJob(item.id)">
                                  <v-card-title>
                                    {{ item.job_name }}
                                  </v-card-title>
                                  <v-card-text>
                                    {{ item.job_description }}
                                  </v-card-text>

                                  <v-card-text>
                                    <v-chip-group
                                      v-model="selection"
                                      active-class="deep-purple accent-4 white--text"
                                      column
                                    >
                                      <v-chip label color="indigo" dark>
                                        <v-icon left>mdi-map-marker</v-icon>
                                        IT Department
                                      </v-chip>

                                      <v-chip label color="indigo" dark>
                                        <v-icon left>mdi-calendar</v-icon>
                                        6 Months
                                      </v-chip>

                                      <v-chip label color="indigo" dark>
                                        <v-icon left>mdi-currency-usd</v-icon>
                                        698/hour
                                      </v-chip>

                                      <v-chip label color="indigo" dark>
                                        <v-icon left>mdi-alarm</v-icon>
                                        40 hours/week
                                      </v-chip>
                                    </v-chip-group>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="indigo" text @click="reserve">
                                      View Job
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-col>
                            </v-row>
                          </template>
                        </v-data-iterator>
                      </v-col>
                    </v-row>
                  </v-tab-item>
                </v-tabs>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="mt-10"> </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogDepartment" width="1000">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialogDepartment = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Update Department</v-toolbar-title>
          <v-toolbar-items> </v-toolbar-items>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="px-15">
          <v-list-item two-line style="padding: 0" class="mt-2">
            <v-list-item-content>
              <v-list-item-title>
                <h1 class="font-weight-regular black--text">
                  {{ this.dept_name }}
                </h1>
              </v-list-item-title>
              <v-list-item-subtitle> Something here. </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-row dense class="mt-5">
            <v-col>
              <v-text-field
                outlined
                label="Department name"
                dense
                v-model="dept_name"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col>
              <v-textarea
                outlined
                label="Department name"
                dense
                v-model="dept_desc"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                class="float-right"
                dark
                color="indigo"
                @click="updateDepartment()"
                >Update Department</v-btn
              >
              <v-btn class="float-right mr-2" elevation="0" color="white"
                >Cancel</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogJob" width="1000">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialogJob = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Update Job</v-toolbar-title>
          <v-toolbar-items> </v-toolbar-items>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="px-15">
          <v-list-item two-line style="padding: 0" class="mt-2">
            <v-list-item-content>
              <v-list-item-title>
                <h1 class="font-weight-regular black--text">
                  {{ job_name }}
                </h1>
              </v-list-item-title>
              <v-list-item-subtitle> {{ job_id }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-row dense class="mt-5">
            <v-col>
              <v-text-field
                outlined
                label="Job Name"
                dense
                v-model="job_name"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                outlined
                label="job_rate"
                dense
                v-model="job_rate"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                outlined
                label="job_regularization"
                dense
                v-model="job_regularization"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col>
              <v-textarea
                outlined
                label="Job Description"
                dense
                v-model="job_description"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                class="float-right"
                dark
                color="indigo"
                @click="updateJob()"
                >Update Job</v-btn
              >
              <v-btn class="float-right mr-2" elevation="0" color="white"
                >Cancel</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" width="600">
      <v-card>
        <v-card-title
          >Are you sure you want to delete this {{ dialogType }}?
        </v-card-title>
        <v-card-text> {{ dialogDesc }} </v-card-text>
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
import axios from 'axios'
import {
  regions,
  provinces,
  cities,
  barangays
} from 'select-philippines-address'

export default {
  async fetch({ store }) {
    await store.dispatch('get_employees')
    await store.dispatch('get_branches')
    await store.dispatch('get_departments')
    await store.dispatch('get_jobs')
  },
  data() {
    return {
      input_branch: null,
      input_type: null,
      input_department: null,
      input_job: null,
      name: '',

      branch_emp: [],

      job_name: '',
      job_description: '',
      job_rate: '',
      job_regularization: '',
      job_department: '',
      job_id: '',

      dept_name: '',
      dept_desc: '',
      dept_id: '',

      toggle_exclusive: '',

      barangay: '',
      city: '',
      province: '',
      region: '',
      street: '',
      branch_logo: '',

      branch_name: '',

      job_index: 0,
      department_index: 0,

      barangays: [],
      cities: [],
      regions: [],
      provinces: [],
      //Dialogs
      dialogDesc: '',
      dialogType: '',

      dialogDelete: false,
      dialogNew: false,
      dialogView: false,

      dialogDepartment: false,
      dialogJob: false,

      headers: [
        {
          text: 'Employee',
          sortable: false,
          value: 'name'
        },
        { text: 'Type', value: 'type' },
        { text: 'Job/Role', value: 'job' },
        { text: 'Department', value: 'department' },
        { text: 'Actions', value: 'actions' }
      ],

      headers_branch: [
        { text: 'Name', value: 'department_name' },
        { text: 'Jobs', value: 'department_jobs' },
        { text: 'Employees', value: 'department_employees' },
        { text: 'Actions', value: 'actions' }
      ],

      headers_job: [
        { text: 'Name', value: 'job_name' },
        { text: 'Rate', value: 'job_rate' },
        { text: 'Regularization', value: 'job_regularization' },
        { text: 'Regularization', value: 'job_regularization' },
        { text: 'Actions', value: 'actions' }
      ]
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
    }),
    branchLoad() {
      let index = this.branches.map(el => el._id).indexOf(this.$route.params.id)

      this.branch = this.branches[index]
      this.street = this.branches[index].branch_address[0].street
      this.region = this.branches[index].branch_address[0].region
      this.province = this.branches[index].branch_address[0].province
      this.barangay = this.branches[index].branch_address[0].barangay
      this.city = this.branches[index].branch_address[0].city

      this.branch_emp = this.employees.filter(
        el => el.branch == this.branches[index]._id
      )

      this.branch_dept = this.departments.filter(
        el => el.department_branch == this.branches[index]._id
      )

      this.branch_jobs = this.jobs.filter(
        el => el.job_branch == this.branches[index]._id
      )

      // General Information
      this.branch_name = this.branches[index].branch_name
      this.branch_logo = this.branches[index].branch_logo

      return ''
    },
    filtered_employees() {
      // return this.employees.filter(this.filterByName).filter(this.filterByAge)
      return this.branch_emp.filter(employee => {
        return (
          (!this.name ||
            employee.firstname
              .toLowerCase()
              .includes(this.name.toLowerCase()) ||
            employee.lastname
              .toLowerCase()
              .includes(this.name.toLowerCase())) &&
          (!this.input_department ||
            employee.department
              .toLowerCase()
              .includes(this.input_department.toLowerCase())) &&
          (!this.input_branch ||
            employee.branch
              .toLowerCase()
              .includes(this.input_branch.toLowerCase())) &&
          (!this.input_job ||
            employee.job
              .toLowerCase()
              .includes(this.input_job.toLowerCase())) &&
          (!this.input_type ||
            employee.emp_type
              .toLowerCase()
              .includes(this.input_type.toLowerCase()))
        )
      })
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
    deleteDepartment() {
      this.dialogDelete = true
    },
    updateBranch() {
      let address = {
        street: this.street,
        barangay: this.barangay,
        city: this.city,
        province: this.province,
        region: this.region
      }
      axios
        .put(
          'http://192.168.100.77:8080/api/branches/' + this.$route.params.id,
          {
            branch_name: this.branch_name,
            branch_address: address
          }
        )
        .then(response => {
          console.log(response)

          let index = this.branch_jobs
            .map(el => el.id)
            .indexOf(response.data.insert_id)

          alert(index)

          const payload = {
            id: response.data.insert_id,
            ...response.data.payload
          }

          this.branch_jobs[index] = payload

          this.dialogDepartment = false
        })
        .catch(function(error) {
          // handle error
          console.log(error)
          alert('err')
        })
    },
    updateDepartment() {
      axios
        .put('http://192.168.100.77:8080/api/departments/' + this.dept_id, {
          department_name: this.dept_name,
          department_description: this.dept_desc,
          department_branch: this.$route.params.id
        })
        .then(response => {
          console.log(response)
          this.dialogDepartment = false

          let index = this.branch_dept
            .map(el => el._id)
            .indexOf(response.data.insert_id)

          const payload = {
            _id: response.data.insert_id,
            employees: this.branch_dept[index].employees,
            job_departments: this.branch_dept[index].job_departments,
            ...response.data.payload
          }

          this.branch_dept[index] = payload
          this.$store.commit('UPDATE_DEPTS', payload)
          this.$refs.general_form.reset()
          this.$refs.employment_form.reset()
        })
        .catch(function(error) {
          // handle error
          console.log(error)
          alert('err')
        })
    },
    updateJob() {
      alert(this.job_id)
      axios
        .put('http://192.168.100.77:8080/api/jobs/' + this.job_id, {
          job_name: this.job_name,
          job_description: this.job_description,
          job_rate: this.job_rate,
          job_regularization: this.job_regularization,
          job_department: this.job_department,
          job_branch: this.$route.params.id
        })
        .then(response => {
          console.log(response)
          let index = this.branch_jobs
            .map(el => el.id)
            .indexOf(response.data.insert_id)

          alert(index)

          const payload = {
            id: response.data.insert_id,
            ...response.data.payload
          }

          this.branch_jobs[index] = payload

          this.dialogJob = false
        })
        .catch(function(error) {
          // handle error
          console.log(error)
          alert('err')
          alert(error)
        })
    },

    viewDepartment(value) {
      let index = this.branch_dept.map(el => el._id).indexOf(value)
      this.dept_id = value
      this.dept_name = this.branch_dept[index].department_name
      this.dept_desc = this.branch_dept[index].department_description
      this.dialogDepartment = true
    },
    viewJob(value) {
      let index = this.branch_jobs.map(el => el.id).indexOf(value)
      this.job_id = value
      this.job_name = this.branch_jobs[index].job_name
      this.job_description = this.branch_jobs[index].job_description
      this.job_rate = this.branch_jobs[index].job_rate
      this.job_regularization = this.branch_jobs[index].job_regularization
      this.job_department = this.branch_jobs[index].job_department
      this.dialogJob = true
    },
    onDelete(type, data) {
      if ((type = 'Department')) {
        this.dialogType = type
        this.dialogDesc = `By deleting this department all jobs associated will also be deleted and employees will be unassigned.`
      }
      this.dialogDelete = true
    },
    onView(id) {
      this.$router.push('/Branches/' + id)
    },
    handleProvince(e) {
      provinces(e.region_code).then(response => {
        this.provinces = response
      })
    },
    handleCity(e) {
      cities(e.province_code).then(response => {
        this.cities = response
      })
    },
    handleBarangay(e) {
      barangays(e.city_code).then(response => {
        this.barangays = response
      })
    },
    departmentEmployee(id) {
      // let index = this.branches.map(el => el._id).indexOf(id)
      let x = this.employees.filter(el => el.department == id).length
      return x
    },
    departmentJobs(id) {
      // let index = this.branches.map(el => el._id).indexOf(id)
      let x = this.jobs.filter(el => el.job_department == id).length
      return x
    }
  },
  mounted() {
    regions().then(response => {
      this.regions = response
    })
    let index = this.branches.map(el => el._id).indexOf(this.$route.params.id)

    this.barangays.push(this.branches[index].branch_address[0].barangay)
    this.provinces.push(this.branches[index].branch_address[0].province)
    this.cities.push(this.branches[index].branch_address[0].city)
  }
}
</script>
<style>