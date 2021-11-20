<template>
  <div>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>New Branch</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="$emit('hideNewDialog')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row dense class="mt-5 text-center">
          <v-col xl="12">
            <v-list-item two-line style="padding: 0">
              <v-list-item-content>
                <v-list-item-title style="font-size: 1.5em"
                  >Create New Branch</v-list-item-title
                >
                <v-list-item-subtitle
                  >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-stepper alt-labels flat v-model="e1">
              <v-stepper-header style="box-shadow: none" class="px-15">
                <v-stepper-step :complete="e1 > 1" step="1">
                  General Information
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                  Departments
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> Jobs </v-stepper-step>
              </v-stepper-header>

              <v-stepper-content step="1" class="px-10">
                <v-form ref="general_form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" xl="4">
                      <v-row dense>
                        <v-col>
                          <v-img
                            width="100%"
                            :src="
                              url == null
                                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvwYAfmW3-gEbCKppFWFsF10REo2Bm1p3HADdjFVP6J4MNL1B4C4qQLXwFmbtqMouJyss&usqp=CAU'
                                : url
                            "
                          >
                          </v-img>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col>
                          <input type="file" @change="onFileSelected" />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row dense>
                        <v-col cols="12" xl="12">
                          <v-text-field
                            outlined
                            dense
                            label="Branch Name"
                            v-model="branch_name"
                            :rules="branch_rules"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" xl="12">
                          <v-text-field
                            outlined
                            dense
                            label="Street"
                            v-model="street"
                            :rules="street_rules"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col cols="12" xl="6">
                          <v-autocomplete
                            :items="regions"
                            v-model="region"
                            item-text="region_name"
                            return-object
                            @change="handleProvince(region)"
                            outlined
                            dense
                            label="Region"
                            :rules="region_rules"
                          ></v-autocomplete>
                        </v-col>

                        <v-col cols="12" xl="6">
                          <v-autocomplete
                            :items="provinces"
                            v-model="province"
                            item-text="province_name"
                            return-object
                            @change="handleCity(province)"
                            outlined
                            dense
                            label="Province"
                            :rules="province_rules"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" xl="6">
                          <v-autocomplete
                            :items="cities"
                            v-model="city"
                            item-text="city_name"
                            return-object
                            @change="handleBarangay(city)"
                            outlined
                            dense
                            label="City"
                            :rules="city_rules"
                          ></v-autocomplete>
                        </v-col>

                        <v-col cols="12" xl="6">
                          <v-autocomplete
                            :items="barangays"
                            v-model="barangay"
                            item-text="brgy_name"
                            return-object
                            outlined
                            dense
                            label="Barangay"
                            :rules="barangay_rules"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
                <v-row>
                  <v-col>
                    <v-btn
                      class="float-right"
                      color="primary"
                      @click="next_tab(e1)"
                    >
                      Continue
                    </v-btn>
                    <v-btn
                      class="float-right"
                      text
                      @click="$emit('hideNewDialog')"
                    >
                      Cancel
                    </v-btn>
                  </v-col>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="2" class="px-5">
                <v-form ref="department_form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-row dense class="mt-2">
                      <v-col cols="12" xl="2">
                        <v-combobox
                          outlined
                          dense
                          label="New or Existing"
                          v-model="dep_type"
                          @change="reset_type"
                          item-text="department_name"
                          :items="['New', 'Existing']"
                        ></v-combobox>
                      </v-col>

                      <v-col cols="12" xl="10">
                        <v-text-field
                          outlined
                          dense
                          label="Department name"
                          v-model="dep_name"
                          v-if="dep_type == 'New' || dep_type == ''"
                        ></v-text-field>
                        <v-combobox
                          v-else
                          outlined
                          dense
                          label="Department name"
                          v-model="dep_name"
                          return-object
                          item-text="department_name"
                          :items="departments"
                          @change="change_dep(dep_name)"
                        ></v-combobox>
                      </v-col>

                      <v-col>
                        <v-textarea
                          outlined
                          dense
                          label="Department Description"
                          v-model="dep_desc"
                          v-if="dep_type == 'New' || dep_type == ''"
                        ></v-textarea>

                        <v-textarea
                          outlined
                          dense
                          label="Department Description"
                          v-model="dep_desc"
                          v-else
                        ></v-textarea>
                      </v-col>
                    </v-row>

                    <v-row dense>
                      <v-spacer></v-spacer>

                      <v-col xl="2">
                        <v-btn
                          block
                          color="indigo"
                          @click="addDepartment()"
                          :disabled="
                            dep_name == '' || dep_desc == '' ? true : false
                          "
                        >
                          <v-icon color="white"> mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>

                    <!-- Department List -->

                    <v-row dense>
                      <v-col>
                        <v-subheader class="px-0">Departments</v-subheader>
                      </v-col>
                    </v-row>

                    <v-row
                      dense
                      v-for="(dep, index) in input_departments"
                      :key="index"
                    >
                      <v-col>
                        <v-card class="px-2 py-2">
                          <v-card-title>
                            {{ dep.department_name }}
                          </v-card-title>

                          <v-card-text>
                            {{ dep.department_desc }}
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="error"
                              @click="input_departments.splice(index, 1)"
                              >Remove</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          class="float-right"
                          color="primary"
                          @click="e1 = 3"
                          :disabled="
                            input_departments.length == 0 ? true : false
                          "
                        >
                          Continue
                        </v-btn>
                        <v-btn class="float-right" text @click="e1 = e1 - 1">
                          Cancel
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-form ref="job_form" v-model="valid" lazy-validation>
                  <v-row class="mt-2" dense>
                    <v-col cols="12" xl="2">
                      <v-combobox
                        outlined
                        dense
                        label="New or Existing"
                        v-model="job_type"
                        item-text="department_name"
                        :items="['New', 'Existing']"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" xl="5">
                      <v-autocomplete
                        outlined
                        dense
                        label="Department"
                        item-text="department_name"
                        :items="input_departments"
                        v-model="job_department"
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" xl="5">
                      <v-text-field
                        outlined
                        dense
                        label="Job Name"
                        v-model="job_name"
                        v-if="job_type == 'New' || job_type == ''"
                      ></v-text-field>

                      <v-combobox
                        v-else
                        outlined
                        dense
                        label="Job name"
                        v-model="job_name"
                        return-object
                        item-text="job_name"
                        :items="jobs"
                        @change="change_job(job_name)"
                      ></v-combobox>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col xl="4">
                      <v-text-field
                        outlined
                        dense
                        label="Job Rate (Per Hour)"
                        v-model="job_rate"
                      ></v-text-field>
                    </v-col>

                    <v-col xl="4">
                      <v-text-field
                        outlined
                        dense
                        label="Work Hours  (Per Week)"
                        v-model="job_duration"
                      ></v-text-field>
                    </v-col>

                    <v-col xl="4">
                      <v-text-field
                        outlined
                        dense
                        label="Regularization Duration (Months)"
                        v-model="job_regularization"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <v-textarea
                        outlined
                        dense
                        label="Job Description"
                        v-model="job_description"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-spacer></v-spacer>
                    <v-col xl="2">
                      <v-btn block color="indigo" @click="addJob()"
                        ><v-icon color="white"> mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row
                    dense
                    v-for="(dep, index) in input_departments"
                    :key="index"
                  >
                    <v-col>
                      <v-subheader>
                        {{ dep.department_name }}
                      </v-subheader>

                      <v-col
                        v-for="(job, index2) in dep.input_jobs"
                        :key="job.job_name"
                      >
                        <v-card class="px-2 py-2">
                          <v-card-title>
                            {{ job.job_name }}
                          </v-card-title>
                          <v-card-text>
                            {{ job.job_description }}
                            <br />

                            <span class="mr-5">Rate: {{ job.job_rate }}</span>
                            <span class="mr-5"
                              >Duration: {{ job.job_duration }}</span
                            >
                            <span class="mr-5"
                              >Regularization:
                              {{ job.job_regularization }}</span
                            >
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="error"
                              @click="
                                input_departments[index].input_jobs.splice(
                                  index2,
                                  1
                                )
                              "
                              >Remove</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn
                        class="float-right"
                        color="primary"
                        @click="onSave()"
                      >
                        Save Branch
                      </v-btn>
                      <v-btn class="float-right" text @click="e1 = e1 - 1">
                        Cancel
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>
            </v-stepper>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
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
      dep_type: 'New',
      dep_desc: '',

      job_type: 'New',
      selectedFile: null,

      // Validators
      valid: '',
      valid2: '',
      branch_rules: [v => !!v || 'Branch name is required'],
      street_rules: [v => !!v || 'Street is required'],
      region_rules: [v => !!v || 'Region is required'],
      province_rules: [v => !!v || 'Province is required'],
      city_rules: [v => !!v || 'City is required'],
      barangay_rules: [v => !!v || 'Barangay is required'],

      branch_name: '',
      street: '',
      barangay: [],
      city: [],
      province: [],
      region: [],

      url: null,
      image: null,

      job_name: '',
      job_rate: '',
      job_regularization: '',
      job_description: '',
      job_department: '',
      job_duration: '',

      dep_name: '',
      dep_desc: '',

      regions: [],
      provinces: [],
      cities: [],
      barangays: [],

      // Builders
      input_departments: [],
      input_jobs: []
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
    onSave() {
      let image_link = ''

      if (this.selectedFile != null) {
        const fd = new FormData()
        fd.append('file', this.selectedFile)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post('http://192.168.100.77:8080/upload', fd).then(response => {
          image_link = response_img.data.filename
        })
      }

      axios
        .post('http://192.168.100.77:8080/api/branches', {
          // Individual Data
          branch_name: this.branch_name,
          // Arrs
          branch_address: [
            {
              street: this.street,
              barangay: this.barangay,
              city: this.city,
              province: this.province,
              region: this.region
            }
          ],
          branch_logo: image_link
        })
        .then(response => {
          this.$store.commit('ADD_BRANCHES', {
            _id: response.data.id,
            ...response.data
          })
          console.log(response)
          this.input_departments.forEach(department => {
            axios
              .post('http://192.168.100.77:8080/api/departments', {
                department_name: department.department_name,
                department_description: department.department_description,
                department_branch: response.data.id
              })
              .then(response2 => {
                this.$store.commit('ADD_DEPTS', {
                  _id: response2.data.id,
                  ...response2.data
                })
                department.input_jobs.forEach(job => {
                  axios
                    .post('http://192.168.100.77:8080/api/jobs', {
                      job_name: job.job_name,
                      job_description: job.job_description,
                      job_rate: job.job_rate,
                      job_duration: job.job_duration,
                      job_regularization: job.job_regularization,
                      job_department: response2.data.id,
                      job_branch: response.data.id
                    })
                    .then(response3 => {
                      this.$store.commit('ADD_JOBS', {
                        _id: response3.data.id,
                        ...response3.data
                      })
                    })
                })
              })
          })
          this.$emit('showSnackbar', 'success')
          this.$refs.general_form.reset()
          this.$refs.department_form.reset()
          this.$refs.job_form.reset()
          this.e1 = 1
          this.input_departments = []
        })
        .catch(error => {
          console.log(error)
          this.$emit('showSnackbar')
        })
    },
    addJob() {
      if (this.job_type == 'New') {
        this.input_departments.forEach(dep => {
          if (dep.department_name == this.job_department) {
            dep.input_jobs.push({
              job_name: this.job_name,
              job_description: this.job_description,
              job_department: this.job_department,
              job_regular: this.job_regular,
              job_rate: this.job_rate,
              job_duration: this.job_duration,
              job_regularization: this.job_regularization
            })
          }
        })
      } else {
        this.input_departments.forEach(dep => {
          if (dep.department_name == this.job_department) {
            dep.input_jobs.push({
              job_name: this.job_name.job_name,
              job_description: this.job_description,
              job_department: this.job_department,
              job_regularization: this.job_regularization,
              job_duration: this.job_duration,
              job_rate: this.job_rate
            })
          }
        })
      }
    },
    addDepartment() {
      if (this.dep_type == 'New') {
        this.input_departments.push({
          department_name: this.dep_name,
          department_desc: this.dep_desc,
          input_jobs: []
        })
      } else {
        this.input_departments.push({
          department_name: this.dep_name.department_name,
          department_desc: this.dep_desc,
          input_jobs: []
        })
      }
      this.dep_name = ''
      this.dep_desc = ''
    },
    handleProvince(e) {
      provinces(e.region_code).then(response => {
        console.log(response)
        this.provinces = response
      })
    },
    handleCity(e) {
      cities(e.province_code).then(response => {
        console.log(response)
        this.cities = response
      })
    },
    handleBarangay(e) {
      barangays(e.city_code).then(response => {
        console.log(response)
        this.barangays = response
      })
    },
    barangaysChange(e) {
      console.log(response)
      this.barangay = e.target.selectedOptions[0].text
    },
    onPreview(event) {
      // this.file = this.$refs.file
      let asd = event.target.files[0]
      // axios
      //   .post('http://192.168.100.77:8080/uploads', {
      //     file: URL.createObjectURL(this.image)
      //   })
      //   .then(response => {})
      // this.url = URL.createObjectURL(this.image)
    },
    next_tab(e) {
      if (e == 1) {
        if (this.$refs.general_form.validate()) {
          this.e1 = 2
        }
      }
      if (e == 2) {
        if (this.$refs.employment_form.validate()) {
          this.e1 = 3
        }
      }
    },
    change_dep(e) {
      this.dep_desc = e.department_description
    },
    change_job(e) {
      this.job_description = e.job_description
      this.job_rate = e.job_rate
      this.job_duration = e.job_duration
      this.job_regularization = e.job_regularization
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.url = URL.createObjectURL(this.selectedFile)
    },
    onUpload() {
      const fd = new FormData()
      fd.append('file', this.selectedFile)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('http://192.168.100.77:8080/upload', fd).then(response => {
        console.log(response)
      })
      // this.url = URL.createObjectURL(this.image)
    },
    reset_type() {
      this.dep_name = ''
      this.dep_desc = ''
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