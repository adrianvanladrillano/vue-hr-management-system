<template>
  <div>
    <v-card style="background: #f8f9fe">
      <v-toolbar dark color="indigo">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="px-10 py-10">
        <v-row>
          <v-col cols="3">
            <v-card class="px-10 py-10">
              <v-row>
                <v-col justify="center" align="center">
                  <v-avatar width="250" height="250">
                    <v-img
                      src="https://66.media.tumblr.com/416e3f2f9b8332a7c05fbcee73e02cf5/51fcaac23a8352c7-47/s500x750/c83731b94eadb4968864f595b282cd87c717e517.png"
                    ></v-img>
                  </v-avatar>
                </v-col>
              </v-row>

              <v-row>
                <v-col justify="center" align="center">
                  <v-switch v-model="edit_mode"></v-switch>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title
                        style="font-size: 1.8em"
                        class="font-weight-medium"
                      >
                        {{ firstname + ' ' + lastname + '' + scheduleLoad }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ id }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>

              <v-row class="text-center">
                <v-col xl="4">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="title font-weight-bold">
                        0
                      </v-list-item-title>
                      <v-list-item-subtitle> Memos </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>

                <v-col xl="4">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="title font-weight-bold">
                        0
                      </v-list-item-title>
                      <v-list-item-subtitle>Years</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>

                <v-col xl="4">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="title font-weight-bold">
                        0
                      </v-list-item-title>
                      <v-list-item-subtitle>Incidents</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Employee Status</v-list-item-subtitle
                      >
                      <v-list-item-title class="title">
                        <v-icon left color="green lighten-2" small
                          >mdi-checkbox-blank-circle</v-icon
                        >
                        <span>Active</span>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn fab color="white" elevation="0">
                        <v-icon color="grey">mdi-camera</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle>Employee Type</v-list-item-subtitle>
                      <v-list-item-title class="title">
                        Regular
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn fab color="white" elevation="0">
                        <v-icon color="grey">mdi-camera</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Employee Position</v-list-item-subtitle
                      >
                      <v-list-item-title class="title">
                        Web Developer
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn fab color="white" elevation="0">
                        <v-icon color="grey">mdi-camera</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Employee Department</v-list-item-subtitle
                      >
                      <v-list-item-title class="title">
                        IT Department
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn fab color="white" elevation="0">
                        <v-icon color="grey">mdi-camera</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Employee Branch</v-list-item-subtitle
                      >
                      <v-list-item-title class="title">
                        Novaliches
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn fab color="white" elevation="0">
                        <v-icon color="grey">mdi-camera</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="6" class="px-5">
            <v-card class="px-5 py-2 mt-5">
              <v-row class="py-4">
                <v-col>
                  <v-list-item two-line>
                    <v-list-item-avatar width="100" height="100">
                      <v-img
                        width="100%"
                        src="https://64.media.tumblr.com/d2c723823964adf2c55937632727f14e/27b2ca972b84dc6e-80/s400x600/9834cffb505d55a7311322a96c394292f5004fba.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        <h1 class="font-weight-regular black--text">
                          {{ this.firstname + ' ' + this.lastname }}
                        </h1>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <p class="mt-2">Web Developer</p>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-tabs color="indigo">
                    <v-tab class="font-weight-bold">Personal </v-tab>
                    <v-tab class="font-weight-bold">Employment </v-tab>
                    <v-tab class="font-weight-bold">History </v-tab>
                    <v-tab class="font-weight-bold"> Identifications </v-tab>

                    <v-tab-item>
                      <v-container fluid>
                        <v-subheader style="padding: 0"
                          >GENERAL INFORMATION</v-subheader
                        >
                        <v-row dense class="mt-2">
                          <v-col xl="2" justify="center">
                            <v-subheader>Full name</v-subheader>
                          </v-col>
                          <v-col>
                            <v-text-field
                              :readonly="edit_mode == false ? true : false"
                              :class="edit_mode == false ? 'edit_mode' : false"
                              outlined
                              dense
                              style="border-color: red !important"
                              label="First name"
                              v-model="firstname"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              outlined
                              dense
                              label="Middle name"
                              v-model="middlename"
                              :readonly="edit_mode == false ? true : false"
                              :class="edit_mode == false ? 'edit_mode' : false"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              outlined
                              dense
                              label="Last name"
                              v-model="lastname"
                              :readonly="edit_mode == false ? true : false"
                              :class="edit_mode == false ? 'edit_mode' : false"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row dense>
                          <v-col xl="2">
                            <v-subheader>Status</v-subheader>
                          </v-col>
                          <v-col>
                            <v-autocomplete
                              outlined
                              dense
                              label="Gender"
                              :items="select_gender"
                              v-model="gender"
                              :readonly="edit_mode == false ? true : false"
                              :class="edit_mode == false ? 'edit_mode' : false"
                            ></v-autocomplete>
                          </v-col>
                          <v-col>
                            <v-autocomplete
                              outlined
                              dense
                              label="Nationality"
                              v-model="nationality"
                              :items="select_nationality"
                              :readonly="edit_mode == false ? true : false"
                              :class="edit_mode == false ? 'edit_mode' : false"
                            ></v-autocomplete>
                          </v-col>
                          <v-col>
                            <v-autocomplete
                              outlined
                              dense
                              label="Civil Status"
                              :items="select_cstatus"
                              v-model="civil"
                              :readonly="edit_mode == false ? true : false"
                              :class="edit_mode == false ? 'edit_mode' : false"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>

                        <v-row dense>
                          <v-col xl="2">
                            <v-subheader>Date of Birth</v-subheader>
                          </v-col>
                          <v-col>
                            <v-text-field
                              type="date"
                              outlined
                              dense
                              label="Date of birth"
                              v-model="dob"
                              :readonly="edit_mode == false ? true : false"
                              :class="edit_mode == false ? 'edit_mode' : false"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              dense
                              outlined
                              label="Place of Birth"
                              v-model="pob"
                              :readonly="edit_mode == false ? true : false"
                              :class="edit_mode == false ? 'edit_mode' : false"
                            ></v-text-field>
                          </v-col>
                          <v-col></v-col>
                        </v-row>

                        <v-subheader style="padding: 0"
                          >CONTACT INFORMATION</v-subheader
                        >
                        <v-subheader style="padding: 0">Addresses</v-subheader>

                        <v-row dense>
                          <v-col
                            xl="12"
                            v-for="(add, index) in addresses"
                            :key="index"
                          >
                            <v-card flat style="padding: 0; margin: 0">
                              <v-list-item two-line>
                                <v-list-item-avatar color="white">
                                  <v-icon color="indigo">
                                    mdi-map-marker
                                  </v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{
                                      add.street +
                                      ' ' +
                                      add.barangay +
                                      ' ' +
                                      add.city
                                    }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{ add.province + ' ' + add.region }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>
                        <v-subheader style="padding: 0">Mobiles</v-subheader>
                        <v-row>
                          <v-col
                            xl="4"
                            v-for="(mobile, index) in mobiles"
                            :key="index"
                          >
                            <v-card flat>
                              <v-list-item two-line>
                                <v-list-item-avatar color="white">
                                  <v-icon color="indigo">
                                    mdi-cellphone
                                  </v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ mobile.number }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{ mobile.label }}</v-list-item-subtitle
                                  >
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn
                                    fab
                                    small
                                    elevation="0"
                                    color="white"
                                    @click="mobiles.splice(index, 1)"
                                    ><v-icon color="grey"
                                      >mdi-phone-outline</v-icon
                                    ></v-btn
                                  >
                                </v-list-item-action>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>

                        <v-subheader style="padding: 0" class="mt-5"
                          >Landlines</v-subheader
                        >
                        <v-row>
                          <v-col
                            xl="4"
                            v-for="(tele, index) in telephones"
                            :key="index"
                          >
                            <v-card flat>
                              <v-list-item two-line>
                                <v-list-item-avatar color="">
                                  <v-icon color="indigo"> mdi-phone </v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ tele.number }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{ tele.label }}</v-list-item-subtitle
                                  >
                                </v-list-item-content>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>

                        <v-subheader style="padding: 0">Emails</v-subheader>
                        <v-row>
                          <v-col
                            xl="6"
                            v-for="(em, index) in emails"
                            :key="index"
                          >
                            <v-card flat>
                              <v-list-item two-line>
                                <v-list-item-avatar color="white">
                                  <v-icon color="indigo"> mdi-mail </v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ em.email }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{ em.label }}</v-list-item-subtitle
                                  >
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn
                                    fab
                                    small
                                    elevation="0"
                                    color="white"
                                    @click="emails.splice(index, 1)"
                                    ><v-icon color="grey"
                                      >mdi-email-send-outline</v-icon
                                    ></v-btn
                                  >
                                </v-list-item-action>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>

                        <v-subheader style="padding: 0"
                          >Emergency Contact</v-subheader
                        >
                        <v-row>
                          <v-col
                            xl="6"
                            v-for="(eme, index) in emergencies"
                            :key="index"
                          >
                            <v-card flat>
                              <v-list-item two-line>
                                <v-list-item-avatar color="white">
                                  <v-icon color="indigo">
                                    mdi-account-alert</v-icon
                                  >
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ eme.emergency_name }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{
                                      eme.emergency_number
                                    }}</v-list-item-subtitle
                                  >
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn
                                    fab
                                    small
                                    elevation="0"
                                    color="white"
                                    @click="mobiles.splice(index, 1)"
                                    ><v-icon color="grey"
                                      >mdi-phone-outline</v-icon
                                    ></v-btn
                                  >
                                </v-list-item-action>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>

                        <v-subheader style="padding: 0"></v-subheader>
                        <v-subheader style="padding: 0"
                          >Educational Attainment</v-subheader
                        >

                        <v-row dense class="mt-2">
                          <v-col xl="2">
                            <v-subheader style="padding: 0"
                              >School/University</v-subheader
                            >
                          </v-col>
                          <v-col xl="5">
                            <v-autocomplete
                              :items="select_education"
                              dense
                              v-model="education"
                              outlined
                              label="Educational Attainment"
                            ></v-autocomplete>
                          </v-col>

                          <v-col>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  outlined
                                  dense
                                  v-model="date"
                                  label="From"
                                  prepend-inner-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="date"
                                type="month"
                                no-title
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(date)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  outlined
                                  dense
                                  v-model="date"
                                  label="To"
                                  prepend-inner-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="date"
                                type="month"
                                no-title
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(date)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col xl="2"> </v-col>
                          <v-col>
                            <v-text-field
                              dense
                              outlined
                              label="School/University"
                              v-model="education_school"
                            ></v-text-field>
                          </v-col>

                          <v-col>
                            <v-text-field
                              dense
                              outlined
                              label="Degree"
                              v-model="education_degree"
                              v-if="education != 'High School Graduate'"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-tab-item>

                    <!-- Employment tabs -->
                    <v-tab-item>
                      <v-container>
                        <v-row dense class="mt-2">
                          <v-col>
                            <v-subheader style="padding: 0">
                              Employment Information
                            </v-subheader>
                          </v-col>
                        </v-row>

                        <v-row dense>
                          <v-col xl="2">
                            <v-subheader>Employee Type</v-subheader>
                          </v-col>

                          <v-col>
                            <v-autocomplete
                              outlined
                              dense
                              :items="select_type"
                              label="Employee Type"
                              v-model="emp_type"
                            ></v-autocomplete>
                          </v-col>

                          <v-col>
                            <v-autocomplete
                              outlined
                              dense
                              :items="select_status"
                              label="Employee Status"
                              v-model="emp_status"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>

                        <v-row dense>
                          <v-col xl="2">
                            <v-subheader>Employment Dates</v-subheader>
                          </v-col>

                          <v-col>
                            <v-text-field
                              dense
                              outlined
                              label="Date Hired"
                              type="date"
                              v-model="hired"
                            ></v-text-field>
                          </v-col>

                          <v-col>
                            <v-text-field
                              dense
                              outlined
                              label="Date Resigned"
                              type="date"
                              v-model="resigned"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row dense>
                          <v-col xl="2">
                            <v-subheader>Employee Assignment </v-subheader>
                          </v-col>

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
                            ></v-autocomplete>
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
                              v-model="job"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>

                        <v-row dense>
                          <v-col xl="2">
                            <v-subheader>Something</v-subheader>
                          </v-col>

                          <v-col>
                            <v-autocomplete
                              outlined
                              dense
                              return-object
                              label="Superior"
                            ></v-autocomplete>
                          </v-col>

                          <v-col>
                            <v-autocomplete
                              outlined
                              dense
                              :items="select_jobs"
                              return-object
                              label="Contract"
                              item-text="job_name"
                              v-model="contract"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>

                        <v-row dense>
                          <v-col xl="2">
                            <v-subheader>Something</v-subheader>
                          </v-col>
                          <v-col>
                            <v-text-field
                              type="number"
                              outlined
                              dense
                              label="Rate (Per Hour)"
                              v-model="job_rate"
                            ></v-text-field>
                          </v-col>

                          <v-col>
                            <v-text-field
                              type="number"
                              outlined
                              dense
                              label="Work Hours (Per Week)"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row dense>
                          <v-col xl="2">
                            <v-subheader>Job Description</v-subheader>
                          </v-col>
                          <v-col>
                            <v-textarea
                              outlined
                              dense
                              label="Job Description"
                              v-model="job_description"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-tab-item>

                    <!-- Educational tabs -->
                    <v-tab-item>
                      <v-container>
                        <v-row class="mt-2">
                          <v-col> </v-col>
                        </v-row>
                      </v-container>
                    </v-tab-item>

                    <!-- Identifications tabs -->
                    <v-tab-item>
                      <v-container fluid>
                        <v-subheader style="padding: 0"
                          >Identifications</v-subheader
                        >
                        <v-row dense>
                          <v-col
                            xl="6"
                            v-for="id in identifications"
                            :key="id.type"
                          >
                            <v-card class="px-5 py-5">
                              <v-list-item two-line>
                                <v-list-item-avatar tile>
                                  <v-img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Social_Security_System_%28SSS%29.svg/1200px-Social_Security_System_%28SSS%29.svg.png"
                                  ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ id.type }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{ id.value }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>
                        <v-subheader style="padding: 0" class="mt-7"
                          >Bank Details</v-subheader
                        >
                      </v-container>
                    </v-tab-item>
                  </v-tabs>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col class="px-5" xl="3">
            <v-card class="px-5 py-2">
              <v-list-item two-line style="padding: 0">
                <v-list-item-content>
                  <v-list-item-title style="font-size: 1.5em"
                    >Attachments</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >List of all incidents</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card class="px-5 py-2 mt-10">
              <v-list-item two-line style="padding: 0">
                <v-list-item-content>
                  <v-list-item-title style="font-size: 1.5em"
                    >Incidents</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >List of all incidents</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-row dense>
                <v-col>
                  <v-timeline dense style="margin-left: -30px">
                    <v-timeline-item
                      color="grey"
                      small
                      style="padding: 0; margin: 0"
                    >
                      <v-row dense>
                        <v-col>
                          <v-list-item two-line style="padding: 0">
                            <v-list-item-avatar tile color="blue">
                              <h3 class="white--text">1</h3>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title class="font-weight-medium">
                                <span> Incident #26532 </span>
                                <small
                                  class="
                                    float-right
                                    text--secondary
                                    font-weight-regular
                                  "
                                >
                                  14/04/2011
                                </small>
                              </v-list-item-title>
                              <v-list-item-subtitle
                                >Resolved</v-list-item-subtitle
                              >
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col>
                          <v-card flat>
                            <strong>Lorem ipsum dolor</strong> sit amet
                            consectetur adipisicing elit. Unde, enim quibusdam
                            eos delen...
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-timeline-item>
                  </v-timeline>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="px-5 py-2">
              <v-list-item two-line style="padding: 0">
                <v-list-item-content>
                  <v-list-item-title style="font-size: 1.5em"
                    >Employee QR Code</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >List of all incidents</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-row class="px-5">
                <v-col>
                  <v-img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                  ></v-img>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: ['employee_index'],
  data() {
    return {
      // ads
      edit_mode: true,

      firstname: '',
      middlename: '',
      lastname: '',
      gender: '',
      civil: '',
      nationality: '',

      // Employment
      department: '',
      branch: '',

      select_jobs: [],
      select_departments: [],

      // Selects
      select_gender: ['Male', 'Female'],
      select_cstatus: ['Single', 'Married', 'Widow/er', 'Legally Separated'],
      select_nationality: ['Filipino', 'Foreign'],
      select_type: ['Regular', 'Contractual', 'Consultant', 'Part-Time'],
      select_status: ['Active', 'Inactive', 'Resigned'],
      select_ids: [
        'UMID',
        'Driver License',
        'SSS',
        'Philhealth',
        'Postal ID',
        'TIN',
        'GSIS',
        'Pagibig',
        'National ID',
        'Passport'
      ],
      select_education: [
        'College Graduate',
        'High School Graduate',
        'Vocational Graduate/Undergraduate'
      ],
      select_nationality: ['Filipino', 'Foreign']
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
      jobs: state => {
        return state.jobs
      },
      departments: state => {
        return state.departments
      }
    }),
    scheduleLoad() {
      // General Information
      this.firstname = this.employees[this.employee_index].firstname
      this.middlename = this.employees[this.employee_index].middlename
      this.lastname = this.employees[this.employee_index].lastname
      this.gender = this.employees[this.employee_index].gender
      this.civil = this.employees[this.employee_index].civil
      this.nationality = this.employees[this.employee_index].nationality
      this.dob = this.employees[this.employee_index].dob
      this.pob = this.employees[this.employee_index].pob
      this.id = this.employees[this.employee_index]._id

      // Education
      this.education = this.employees[
        this.employee_index
      ].education[0].education_type
      this.education_school = this.employees[
        this.employee_index
      ].education[0].education_school
      this.education_degree = this.employees[
        this.employee_index
      ].education[0].education_degree

      // Employments
      this.department = this.employees[
        this.employee_index
      ].department.department_name
      this.branch = this.employees[this.employee_index].branch.branch_name
      this.department = this.employees[
        this.employee_index
      ].department.department_name
      this.job = this.employees[this.employee_index].job.job_name
      this.job_rate = this.employees[this.employee_index].job.job_rate
      this.job_description = this.employees[
        this.employee_index
      ].job.job_description

      this.mobiles = this.employees[this.employee_index].mobiles
      this.telephones = this.employees[this.employee_index].telephones
      this.emails = this.employees[this.employee_index].emails
      this.addresses = this.employees[this.employee_index].addresses
      this.identifications = this.employees[this.employee_index].identifications
      this.emergencies = this.employees[this.employee_index].emergencies

      this.job = this.employees[this.employee_index].job

      this.emp_type = this.employees[this.employee_index].emp_type
      this.emp_status = this.employees[this.employee_index].emp_status

      this.resigned = this.employees[this.employee_index].resigned
      this.hired = this.employees[this.employee_index].hired

      return ''
    }
  },
  methods: {
    handleJob(e) {
      let get_jobs = this.jobs.filter(el => el.job_department == e._id)
      this.select_jobs = get_jobs
    },
    handleDepartment(e) {
      console.log(e)
      let get_departments = this.departments.filter(
        el => el.department_branch == e._id
      )
      this.select_departments = get_departments
    }
  },
  mounted() {
    this.handleJob(this.employees[this.employee_index].department)
    this.handleDepartment(this.employees[this.employee_index].branch)
  }
}
</script>
<style >
.edit_mode.v-text-field--outlined fieldset {
  color: white !important;
}
</style>