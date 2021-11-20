<template>
  <div>
    <v-container class="fill-height">
      <v-row class="mt-2 mx-2">
        <v-col cols="12" xl="8">
          <v-card class="px-10 py-5">
            <v-row>
              <v-col>
                <h1 class="font-weight-regular black--text">
                  Application #{{ this.$route.params.id + applicationLoad }}
                </h1>

                <p>
                  {{ this.application_date }}
                </p>
              </v-col>
            </v-row>

            <v-row class="mt-2">
              <v-col xl="12">
                <h1 class="title">{{ application_type }}</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-autocomplete
                  :items="employees"
                  item-text="firstname"
                  item-value="_id"
                  label="Employee"
                  dense
                  outlined
                  v-model="application_emp"
                >
                  <template v-slot:selection="data">
                    <v-list-item-avatar>
                      <v-avatar class="white--text" color="indigo">
                        {{
                          data.item.firstname.charAt(0) +
                          data.item.lastname.charAt(0)
                        }}
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ data.item.firstname + ' ' + data.item.lastname }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ data.item.job.job_name }} ({{
                          data.item.department.department_name
                        }})
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <v-avatar class="white--text" color="indigo">
                        {{
                          data.item.firstname.charAt(0) +
                          data.item.lastname.charAt(0)
                        }}
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
              </v-col>
            </v-row>

            <v-row
              dense
              v-if="
                application_type != 'Termination' &&
                application_type != 'Resignation' &&
                application_type != 'Grievances'
              "
            >
              <v-col>
                <v-autocomplete
                  outlined
                  dense
                  :items="branches"
                  item-text="branch_name"
                  item-value="_id"
                  label="Branch"
                  v-model="branch"
                  @change="handleDepartment(branch)"
                >
                </v-autocomplete>
              </v-col>

              <v-col cols="12" xl="4">
                <v-autocomplete
                  outlined
                  dense
                  :items="select_departments"
                  item-text="department_name"
                  item-value="_id"
                  v-model="department"
                  label="Department"
                  @change="handleJob(department)"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" xl="4">
                <v-autocomplete
                  outlined
                  dense
                  :items="select_jobs"
                  label="Job"
                  item-text="job_name"
                  item-value="id"
                  v-model="job"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <!-- Transfertype -->
            <div v-if="application_type == 'Transfer'">
              <v-row dense>
                <v-col cols="12" xl="4">
                  <v-text-field
                    type="date"
                    label="Transfer date"
                    dense
                    outlined
                    v-model="transfer_date"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>

            <!-- Promotiontype -->
            <div v-if="application_type == 'Promotion/Demotion'">
              <v-row dense>
                <v-col cols="12" xl="6">
                  <v-autocomplete
                    :items="select_promotion"
                    label="Type"
                    dense
                    outlined
                    v-model="prodem_type"
                  >
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" xl="6">
                  <v-text-field
                    type="date"
                    label="Date effective"
                    dense
                    outlined
                    v-model="prodem_date"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>

            <!-- Promotiontype -->
            <div v-if="application_type == 'Resignation'">
              <v-row dense>
                <v-col cols="12" xl="6">
                  <v-text-field type="date" label="Notice date" dense outlined>
                  </v-text-field>
                </v-col>

                <v-col cols="12" xl="6">
                  <v-text-field
                    type="date"
                    label="Resignation date"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-checkbox v-model="rendering" label="Required Rendering">
                  </v-checkbox>
                </v-col>
              </v-row>

              <v-row dense v-if="rendering == true">
                <v-col>
                  <v-text-field
                    type="date"
                    label="Rendering date start"
                    dense
                    outlined
                    v-model="rendering_start"
                  >
                  </v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                    type="date"
                    label="Rendering date end"
                    dense
                    outlined
                    v-model="rendering_end"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>

            <!-- Promotiontype -->
            <div v-if="application_type == 'Termination'">
              <v-row dense>
                <v-col cols="12" xl="6">
                  <v-text-field
                    type="date"
                    label="Notice date"
                    dense
                    outlined
                    v-model="termination_notice"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" xl="6">
                  <v-text-field
                    type="date"
                    label="Effective by"
                    dense
                    outlined
                    v-model="termination_date"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="12" xl="12">
                  <v-autocomplete
                    :items="select_termination"
                    label="Termination Type"
                    dense
                    outlined
                    v-model="termination_type"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
            </div>

            <v-row
              dense
              v-if="
                application_type == 'Termination' ||
                application_type == 'Resignation'
              "
            >
              <v-col>
                <v-checkbox v-model="separation" label="Separation/Back Pay">
                </v-checkbox>
              </v-col>
            </v-row>

            <v-row dense v-if="separation == true">
              <v-col>
                <v-text-field label="Amount" dense outlined v-model="amount">
                </v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  type="date"
                  label="Date Released"
                  dense
                  outlined
                  v-model="date_released"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <!-- Promotiontype -->
            <div v-if="application_type == 'Grievances'">
              <v-row dense>
                <v-col cols="12" xl="12">
                  <v-autocomplete
                    :items="select_grievance"
                    label="Grievance Type"
                    dense
                    outlined
                    v-model="grievance_type"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="12" xl="12">
                  <v-autocomplete
                    :items="employees"
                    item-text="firstname"
                    item-value="_id"
                    label="Accused "
                    dense
                    outlined
                    v-model="grievance_accused"
                    v-if="grievance_type == 'Bullying/Harrassment Grievance'"
                  >
                    <template v-slot:selection="data">
                      <v-list-item-avatar>
                        <v-avatar class="white--text" color="indigo">
                          {{
                            data.item.firstname.charAt(0) +
                            data.item.lastname.charAt(0)
                          }}
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ data.item.firstname + ' ' + data.item.lastname }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ data.item.job.job_name }} ({{
                            data.item.department.department_name
                          }})
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                    <template v-slot:item="data">
                      <v-list-item-avatar>
                        <v-avatar class="white--text" color="indigo">
                          {{
                            data.item.firstname.charAt(0) +
                            data.item.lastname.charAt(0)
                          }}
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
                </v-col>
              </v-row>

              <v-row
                dense
                v-if="grievance_type == 'Bullying/Harrassment Grievance'"
              >
                <v-col cols="12" xl="6">
                  <v-text-field
                    type="date"
                    label="Request/Incident date"
                    dense
                    outlined
                    v-model="grievance_date"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" xl="6">
                  <v-text-field
                    type="date"
                    label="Request/Incident time"
                    dense
                    outlined
                    v-model="grievance_time"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="12" xl="12">
                  <v-autocomplete
                    :items="branches"
                    item-text="branch_name"
                    item-value="_id"
                    label="Branch/Location"
                    dense
                    outlined
                    v-model="grievance_branch"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-textarea
                    outlined
                    label="Complaint"
                    v-model="grievance_complaint"
                  >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row
                dense
                v-if="grievance_type == 'Bullying/Harrassment Grievance'"
              >
                <v-col cols="12" xl="12">
                  <v-autocomplete
                    :items="employees"
                    item-text="firstname"
                    item-value="_id"
                    label="Witness(es)"
                    multiple
                    dense
                    outlined
                    v-model="grievance_witness"
                  >
                    <template v-slot:selection="data">
                      <v-list-item-avatar>
                        <v-avatar class="white--text" color="indigo">
                          {{
                            data.item.firstname.charAt(0) +
                            data.item.lastname.charAt(0)
                          }}
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ data.item.firstname + ' ' + data.item.lastname }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ data.item.job.job_name }} ({{
                            data.item.department.department_name
                          }})
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                    <template v-slot:item="data">
                      <v-list-item-avatar>
                        <v-avatar class="white--text" color="indigo">
                          {{
                            data.item.firstname.charAt(0) +
                            data.item.lastname.charAt(0)
                          }}
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
                </v-col>
              </v-row>

              <v-row
                dense
                v-if="grievance_type == 'Bullying/Harrassment Grievance'"
              >
                <v-col cols="12" xl="4">
                  <v-autocomplete
                    :items="select_action"
                    label="Action"
                    dense
                    outlined
                    v-model="action"
                  >
                  </v-autocomplete>
                </v-col>

                <v-col>
                  <v-text-field
                    type="date"
                    label="Action date"
                    dense
                    outlined
                    v-model="action_date"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>

            <v-subheader style="padding: 0">
              Description/Attachments
            </v-subheader>

            <v-row dense>
              <v-col>
                <v-textarea outlined label="Remarks" v-model="description">
                </v-textarea>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-file-input dense outlined label="Attachments">
                </v-file-input>
              </v-col>
            </v-row>

            <v-subheader style="padding: 0"> Proposals/Approvals </v-subheader>

            <v-row dense>
              <v-col>
                <v-autocomplete
                  :items="employees"
                  item-text="firstname"
                  item-value="_id"
                  label="Proposed by"
                  dense
                  outlined
                  v-model="application_proposed"
                >
                  <template v-slot:selection="data">
                    <v-list-item-avatar>
                      <v-avatar class="white--text" color="indigo">
                        {{
                          data.item.firstname.charAt(0) +
                          data.item.lastname.charAt(0)
                        }}
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ data.item.firstname + ' ' + data.item.lastname }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ data.item.job.job_name }} ({{
                          data.item.department.department_name
                        }})
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <v-avatar class="white--text" color="indigo">
                        {{
                          data.item.firstname.charAt(0) +
                          data.item.lastname.charAt(0)
                        }}
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
              </v-col>

              <v-col>
                <v-autocomplete
                  :items="employees"
                  item-text="firstname"
                  item-value="_id"
                  label="Approved by"
                  dense
                  outlined
                  v-model="application_approved"
                >
                  <template v-slot:selection="data">
                    <v-list-item-avatar>
                      <v-avatar class="white--text" color="indigo">
                        {{
                          data.item.firstname.charAt(0) +
                          data.item.lastname.charAt(0)
                        }}
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ data.item.firstname + ' ' + data.item.lastname }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ data.item.job.job_name }} ({{
                          data.item.department.department_name
                        }})
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <v-avatar class="white--text" color="indigo">
                        {{
                          data.item.firstname.charAt(0) +
                          data.item.lastname.charAt(0)
                        }}
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
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn class="float-right" color="primary" @click="e1 = 3">
                  Continue
                </v-btn>
                <v-btn class="float-right" text @click="e1 = e1 - 1">
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
  data() {
    return {
      application: [],

      application_type: '',

      rendering: false,
      separation: false,

      //
      select_departments: [],
      select_jobs: [],

      //
      transfer_date: '',
      transfer_description: '',
      transfer_attachments: '',

      //
      grievance_type: '',

      //   Selects
      select_grievance: [
        'Compensation Grievance',
        'Workload Grievance',
        'Work Conditions Grievance',
        'Bullying/Harrassment Grievance'
      ],
      select_action: [
        'Pending',
        'Verbal Warning',
        'Written Warning',
        'Suspension Without Pay',
        'Reduction of Pay within a Class',
        'Demotion to a Lower Classification',
        'Dismissal/Termination'
      ],
      select_promotion: ['Promotion', 'Demotion'],
      select_termination: [
        'Serious misconduct or willful disobedience',
        'Gross and habitual neglect',
        'Fraud or willful breach',
        'Commission of a crime or offense',
        'Illness/Diseased'
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
      },
      applications: state => {
        return state.applications
      }
    }),
    applicationLoad() {
      let index = this.applications
        .map(el => el._id)
        .indexOf(this.$route.params.id)

      // Static Variables
      this.application = this.applications[index]
      this.application_type = this.applications[index].application_type
      this.application_date = this.applications[index].application_date

      this.application_emp = this.applications[index].application_emp
      this.application_comp = this.applications[index].application_comp

      this.application_proposed = this.applications[index].application_proposed
      this.application_approved = this.applications[index].application_approved

      // Conditional Variables
      if (this.application_type == 'Transfer') {
        this.handleJob(this.applications[index].application_data.department)
        this.handleDepartment(this.applications[index].application_data.branch)

        this.transfer_date = this.applications[
          index
        ].application_data.transfer_date
        this.branch = this.applications[index].application_data.branch
        this.department = this.applications[index].application_data.department
        this.job = this.applications[index].application_data.job

        this.description = this.applications[index].application_data.description
        this.attachment = this.applications[index].application_data.attachment
      }

      if (this.application_type == 'Promotion/Demotion') {
        this.handleJob(this.applications[index].application_data.new_department)
        this.handleDepartment(
          this.applications[index].application_data.new_branch
        )

        this.prodem_date = this.applications[index].application_data.prodem_date
        this.prodem_type = this.applications[index].application_data.prodem_type

        this.branch = this.applications[index].application_data.new_branch
        this.department = this.applications[
          index
        ].application_data.new_department
        this.job = this.applications[index].application_data.new_job

        this.description = this.applications[index].application_data.description
        this.attachment = this.applications[index].application_data.attachment
      }

      if (this.application_type == 'Termination') {
        this.termination_notice = this.applications[
          index
        ].application_data.termination_notice
        this.termination_date = this.applications[
          index
        ].application_data.termination_date
        this.termination_type = this.applications[
          index
        ].application_data.termination_type
        this.separation = this.applications[index].application_data.separation
        this.amount = this.applications[
          index
        ].application_data.termination_amount
        this.date_released = this.applications[
          index
        ].application_data.termination_released

        this.description = this.applications[index].application_data.description
        this.attachment = this.applications[index].application_data.attachment
      }
      if (this.application_type == 'Resignation') {
        this.rendering = this.applications[
          index
        ].application_data.resignation_rendering
        this.rendering_start = this.applications[
          index
        ].application_data.resignation_start
        this.rendering_end = this.applications[
          index
        ].application_data.resignation_end

        this.separation = this.applications[index].application_data.separation
        this.amount = this.applications[
          index
        ].application_data.termination_amount
        this.date_released = this.applications[
          index
        ].application_data.termination_released

        this.description = this.applications[index].application_data.description
        this.attachment = this.applications[index].application_data.attachment
      }

      if (this.application_type == 'Grievances') {
        if (
          this.applications[index].application_data.grievance_type ==
          'Bullying/Harrassment Grievance'
        ) {
          this.grievance_type = this.applications[
            index
          ].application_data.grievance_type

          this.grievance_complaint = this.applications[
            index
          ].application_data.grievance_complaint

          this.grievance_branch = this.applications[
            index
          ].application_data.grievance_branch

          this.grievance_date = this.applications[
            index
          ].application_data.grievance_date

          this.grievance_time = this.applications[
            index
          ].application_data.grievance_time

          this.action = this.applications[
            index
          ].application_data.grievance_action
          this.action_date = this.applications[
            index
          ].application_data.grievance_actiondate

          // Accused & Witness
          this.grievance_accused = this.applications[
            index
          ].application_data.grievance_accused

          this.grievance_witness = this.applications[
            index
          ].application_data.grievance_witness
        } else {
          this.grievance_type = this.applications[
            index
          ].application_data.grievance_type
          this.grievance_branch = this.applications[
            index
          ].application_data.grievance_branch

          this.grievance_complaint = this.applications[
            index
          ].application_data.grievance_complaint
        }
        this.description = this.applications[index].application_data.description
        this.attachment = this.applications[index].application_data.attachment
      }

      // this.branch_emp = this.employees.filter(
      //   el => el.branch._id == this.branches[index]._id
      // )

      // this.branch_dept = this.departments.filter(
      //   el => el.department_branch == this.branches[index]._id
      // )

      // this.branch_jobs = this.jobs.filter(
      //   el => el.job_branch == this.branches[index]._id
      // )

      // // General Information
      // this.branch_name = this.branches[index].branch_name
      // this.branch_street = this.branches[index].branch_address[0].street

      return 'xd'
    }
  },
  methods: {
    handleJob(e) {
      let get_jobs = this.jobs.filter(el => el.job_department == e)
      this.select_jobs = get_jobs
    },
    handleDepartment(e) {
      let get_departments = this.departments.filter(
        el => el.department_branch == e
      )
      this.select_departments = get_departments
    },
    setApplication(type) {
      this.e1 = 2
      this.application_type = type
    },
    onSave() {
      // Constructors
      let application_data = {}
      if (this.application_type == 'Transfer') {
        application_data = {
          // Main Inputs
          transfer_date: this.transfer_date,

          branch: this.branch._id,
          department: this.department._id,
          job: this.job,

          description: this.transfer_description,
          attachment: this.transfer_attachments
        }
      }
      if (this.application_type == 'Promotion/Demotion') {
        application_data = {
          prodem_type: this.prodem_type,
          prodem_date: this.prodem_date,

          new_branch: this.branch._id,
          new_department: this.department._id,
          new_job: this.job,

          //   old_branch: this.branch._id,
          //   old_department: this.department._id,
          //   old_job: this.job,

          description: this.transfer_description,
          attachment: this.transfer_attachments
        }
      }
      if (this.application_type == 'Resignation') {
        application_data = {
          resignation_notice: this.resignation_notice,
          resignation_date: this.resignation_date,

          resignation_rendering: this.rendering,
          resignation_start: this.rendering_start,
          resignation_end: this.rendering_end,

          separation: this.separation,
          termination_amount: this.amount,
          termination_released: this.date_released,

          description: this.transfer_description,
          attachment: this.transfer_attachments
        }
      }
      if (this.application_type == 'Termination') {
        application_data = {
          termination_notice: this.termination_notice,
          termination_date: this.termination_date,
          termination_type: this.termination_type,

          separation: this.separation,
          termination_amount: this.amount,
          termination_released: this.date_released,

          description: this.transfer_description,
          attachment: this.transfer_attachments
        }
      }
      if (this.application_type == 'Grievances') {
        if (this.grievance_type == 'Bullying/Harrassment Grievance') {
          application_data = {
            grievance: this.grievance_type,
            grievance_branch: this.grievance_branch,
            grievance_complaint: this.grievance_complaint,

            grievance_time: this.grievance_time,
            grievance_date: this.grievance_date,

            grievance_accused: this.grievance_accused,
            grievance_witness: this.grievance_witness,

            description: this.transfer_description,
            attachment: this.transfer_attachments
          }
        } else {
          application_data = {
            grievance_type: this.grievance_type,
            grievance_branch: this.grievance_branch,
            grievance_complaint: this.grievance_complaint,

            description: this.transfer_description,
            attachment: this.transfer_attachments
          }
        }
      }

      console.log(application_data)
      axios
        .post('http://192.168.100.77:8080/api/applications', {
          // Arrs
          application_type: this.application_type,
          application_proposed: this.application_proposed,
          application_approved: this.application_approved,
          application_date: 'datenow',
          application_comp: 'Sugar',
          application_data: application_data,
          application_emp: this.application_emp
        })
        .then(response => {
          console.log(response)
          this.$store.commit('ADD_BRANCHES', response.data)

          this.departments.forEach(department => {
            axios
              .post('http://localhost:8080/api/departments', {
                department_name: department.department_name,
                department_description: department.department_description,
                department_branch: response.data.id
              })
              .then(response => {
                department.department_job.forEach(job => {
                  axios.post('http://localhost:8080/api/jobs', {
                    job_name: job.job_name,
                    job_description: job.job_name,
                    job_rate: job.job_name,
                    job_regularization: '6',
                    job_department: response.data.id
                  })
                })
              })
          })
          alert('Success')
        })
        .catch(function(error) {
          // handle error
          console.log(error)
          alert('err')
        })
    }
  },
  mounted() {
    regions().then(response => {
      this.regions = response
      console.log(this.regions)
    })
  }
}
</script>