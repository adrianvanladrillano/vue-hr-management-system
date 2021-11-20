<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>New Employee</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="onSave()"> Save </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text class="px-5">
      <v-row dense class="mt-5 text-center">
        <v-col xl="12">
          <v-list-item two-line style="padding: 0">
            <v-list-item-content>
              <v-list-item-title style="font-size: 1.5em"
                >Create New Application</v-list-item-title
              >
              <v-list-item-subtitle>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius
                numquam laudantium error minus distinctio.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-stepper alt-labels flat v-model="e1">
            <v-stepper-header style="box-shadow: none">
              <v-stepper-step :complete="e1 > 1" step="1">
                Application Type
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">
                Information
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3"> Preview </v-stepper-step>
            </v-stepper-header>

            <v-stepper-content step="1">
              <v-container class="mb-12 mt-2">
                <v-row dense>
                  <v-col>
                    <v-card
                      class="px-4 py-4"
                      @click="setApplication('Transfer')"
                    >
                      <v-row>
                        <v-col cols="3" xl="2" align="center">
                          <v-icon size="75"> mdi-transit-transfer </v-icon>
                        </v-col>

                        <v-col>
                          <h3 class="title">Transfer</h3>
                          <p class="text--secondary">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col>
                    <v-card
                      class="px-4 py-4"
                      @click="setApplication('Promotion/Demotion')"
                    >
                      <v-row>
                        <v-col cols="3" xl="2" align="center">
                          <v-icon size="75"> mdi-transit-transfer </v-icon>
                        </v-col>

                        <v-col>
                          <h3 class="title">Promotion/Demotion</h3>
                          <p class="text--secondary">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col>
                    <v-card
                      class="px-4 py-4"
                      @click="setApplication('Termination')"
                    >
                      <v-row>
                        <v-col cols="3" xl="2" align="center">
                          <v-icon size="75"> mdi-transit-transfer </v-icon>
                        </v-col>

                        <v-col>
                          <h3 class="title">Termination</h3>
                          <p class="text--secondary">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col>
                    <v-card
                      class="px-4 py-4"
                      @click="setApplication('Resignation')"
                    >
                      <v-row>
                        <v-col cols="3" xl="2" align="center">
                          <v-icon size="75"> mdi-transit-transfer </v-icon>
                        </v-col>

                        <v-col>
                          <h3 class="title">Resignation</h3>
                          <p class="text--secondary">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col>
                    <v-card
                      class="px-4 py-4"
                      @click="setApplication('Grievances')"
                    >
                      <v-row>
                        <v-col cols="3" xl="2" align="center">
                          <v-icon size="75"> mdi-transit-transfer </v-icon>
                        </v-col>

                        <v-col>
                          <h3 class="title">Grievances</h3>
                          <p class="text--secondary">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
              <v-row>
                <v-col>
                  <v-btn class="float-right" color="primary" @click="e1 = 2">
                    Continue
                  </v-btn>
                  <v-btn class="float-right" text> Cancel </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-row class="mt-2">
                <v-col xl="12">
                  <h1 class="title">{{ application_type }}</h1>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
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
                    return-object
                    label="Branch"
                    v-model="branch"
                    @change="handleDepartment(branch)"
                  >
                  </v-autocomplete>
                </v-col>

                <v-col>
                  <v-autocomplete
                    outlined
                    dense
                    :items="select_departments"
                    item-text="department_name"
                    return-object
                    v-model="department"
                    label="Department"
                    @change="handleJob(department)"
                  ></v-autocomplete>
                </v-col>

                <v-col>
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
                    <v-text-field
                      type="date"
                      label="Notice date"
                      dense
                      outlined
                    >
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
                  <v-col>
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

              <v-subheader style="padding: 0">
                Proposals/Approvals
              </v-subheader>

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
            </v-stepper-content>

            <v-stepper-content step="3">
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
            </v-stepper-content>
          </v-stepper>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
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
    return {
      e1: 1,
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
    })
  },
  methods: {
    handleJob(e) {
      console.log(e._id)
      console.log(e)
      console.log(this.jobs)
      let get_jobs = this.jobs.filter(el => el.job_department == e._id)
      this.select_jobs = get_jobs
    },
    handleDepartment(e) {
      console.log(e)
      let get_departments = this.departments.filter(
        el => el.department_branch == e._id
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

          description: this.description,
          attachment: this.attachment
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

          description: this.description,
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

          description: this.description,
          attachment: this.attachment
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

          description: this.description,
          attachment: this.attachment
        }
      }
      if (this.application_type == 'Grievances') {
        if (this.grievance_type == 'Bullying/Harrassment Grievance') {
          application_data = {
            grievance_type: this.grievance_type,
            grievance_branch: this.grievance_branch,
            grievance_complaint: this.grievance_complaint,

            grievance_time: this.grievance_time,
            grievance_date: this.grievance_date,

            grievance_accused: this.grievance_accused,
            grievance_witness: this.grievance_witness,

            grievance_action: this.action,
            grievance_actiondate: this.action_date,

            description: this.description,
            attachment: this.attachment
          }
        } else {
          application_data = {
            grievance_type: this.grievance_type,
            grievance_branch: this.grievance_branch,
            grievance_complaint: this.grievance_complaint,

            description: this.description,
            attachment: this.attachment
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