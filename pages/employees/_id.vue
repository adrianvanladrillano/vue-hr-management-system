<template>
  <div>
    <v-container class="py-12 px-10">
      <v-row>
        <v-col cols="12" xl="3">
          <v-card class="px-5">
            <v-row class="py-5">
              <v-col cols="12" xl="12">
                <v-img
                  src="https://d329jirxh7znrd.cloudfront.net/dijous/wp-content/uploads/sites/91/2018/09/employee-03-500x500.jpg"
                ></v-img>
              </v-col>
            </v-row>

            <v-row dense class="text-center">
              <v-col>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      {{ firstname + ' ' + lastname }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ job_name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" xl="12">
                <v-subheader>Mobiles </v-subheader>
                <v-row dense>
                  <v-col cols="12" xl="12">
                    <v-card
                      flat
                      v-for="(mobile, index) in mobiles"
                      :key="index"
                    >
                      <v-list-item two-line>
                        <v-list-item-avatar color="white">
                          <v-icon color="indigo"> mdi-cellphone </v-icon>
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
                            v-if="edit_mode == true"
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="mobiles.splice(index, 1)"
                            ><v-icon color="grey"
                              >mdi-trash-can-outline</v-icon
                            ></v-btn
                          >

                          <v-btn
                            v-else
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="onCall(mobile.number)"
                            ><v-icon color="grey"
                              >mdi-phone-outline</v-icon
                            ></v-btn
                          >
                        </v-list-item-action>
                      </v-list-item>
                    </v-card>
                    <v-card
                      v-if="edit_mode == true"
                      flat
                      style="border: 1px dashed #e1e1e1"
                      class="text-center py-2"
                      @click="dialogMobile = true"
                    >
                      <span class="text--secondary">
                        <small>
                          <v-icon left>mdi-plus</v-icon> New Mobile
                        </small>
                      </span>
                    </v-card>
                  </v-col>
                </v-row>

                <v-subheader style="padding: 0" class="mt-5"
                  >Landlines</v-subheader
                >
                <v-row dense>
                  <v-col cols="12" xl="12">
                    <v-card
                      flat
                      v-for="(tele, index) in telephones"
                      :key="index"
                    >
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

                        <v-list-item-action>
                          <v-btn
                            v-if="edit_mode == true"
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="telephones.splice(index, 1)"
                            ><v-icon color="grey"
                              >mdi-trash-can-outline</v-icon
                            ></v-btn
                          >

                          <v-btn
                            v-else
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="onCall(tele.number)"
                            ><v-icon color="grey"
                              >mdi-phone-outline</v-icon
                            ></v-btn
                          >
                        </v-list-item-action>
                      </v-list-item>
                    </v-card>

                    <v-card
                      v-if="edit_mode == true"
                      flat
                      style="border: 1px dashed #e1e1e1"
                      class="text-center py-2"
                      @click="dialogLandline = true"
                    >
                      <span class="text--secondary">
                        <small>
                          <v-icon left>mdi-plus</v-icon> New Landline
                        </small>
                      </span>
                    </v-card>
                  </v-col>
                </v-row>

                <v-subheader style="padding: 0">Emails</v-subheader>
                <v-row dense>
                  <v-col cols="12" xl="12">
                    <v-card flat v-for="(em, index) in emails" :key="index">
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
                            v-if="edit_mode == true"
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="emails.splice(index, 1)"
                            ><v-icon color="grey"
                              >mdi-trash-can-outline</v-icon
                            ></v-btn
                          >
                          <v-btn
                            v-else
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="onMail(em.email)"
                            ><v-icon color="grey"
                              >mdi-email-send-outline</v-icon
                            ></v-btn
                          >
                        </v-list-item-action>
                      </v-list-item>
                    </v-card>

                    <v-card
                      v-if="edit_mode == true"
                      flat
                      style="border: 1px dashed #e1e1e1"
                      class="text-center py-2"
                      @click="dialogEmail = true"
                    >
                      <span class="text--secondary">
                        <small>
                          <v-icon left>mdi-plus</v-icon> New Email
                        </small>
                      </span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" xl="6">
          <v-card class="px-7">
            <v-row dense>
              <v-col>
                <v-list-item two-line style="padding: 0">
                  <v-list-item-content>
                    <v-list-item-title>
                      <h1 class="font-weight-regular black--text">
                        {{ this.firstname + ' ' + this.lastname }}
                      </h1>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <p class="mt-2">{{ id }}</p>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>

              <v-col cols="6" xl="6">
                <v-btn
                  class="float-right mt-2"
                  elevation="0"
                  text
                  :color="edit_mode == false ? 'grey' : 'indigo'"
                  :dark="edit_mode == false ? false : true"
                  @click="onEdit()"
                >
                  <v-icon left>
                    {{
                      edit_mode == false
                        ? 'mdi-square-edit-outline'
                        : 'mdi-content-save'
                    }}
                  </v-icon>
                  {{ edit_mode == false ? 'Edit Profile' : 'Save Changes' }}
                </v-btn>

                <v-btn
                  @click="edit_mode = false"
                  v-if="edit_mode == true"
                  color="error"
                  text
                  class="float-right mr-2 mt-2"
                  elevation="0"
                >
                  <v-icon left> mdi-close </v-icon>
                  Cancel</v-btn
                >
              </v-col>
            </v-row>

            <v-row dense class="pb-5">
              <v-col cols="12" xl="4">
                <v-card flat class="px-5 py-2">
                  <v-list-item two-line style="padding: 0">
                    <v-list-item-avatar>
                      <v-icon large>mdi-account-outline</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Active</v-list-item-title>
                      <v-list-item-subtitle
                        >Employee Status</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>

              <v-col cols="12" xl="4">
                <v-card flat class="px-5 py-2">
                  <v-list-item two-line style="padding: 0">
                    <v-list-item-avatar>
                      <v-icon large>mdi-account-outline</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Regular</v-list-item-title>
                      <v-list-item-subtitle>Employee Type</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>

              <v-col cols="12" xl="4">
                <v-card flat class="px-5 py-2">
                  <v-list-item two-line style="padding: 0">
                    <v-list-item-avatar>
                      <v-icon large>mdi-account-outline</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>7 </v-list-item-title>
                      <v-list-item-subtitle
                        >Years of service</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="px-7 mt-7">
            <v-row>
              <v-col>
                <v-row dense>
                  <v-col>
                    <!-- Tabs -->
                    <v-tabs color="indigo">
                      <v-tab class="font-weight-bold">Personal </v-tab>
                      <v-tab class="font-weight-bold">Employment </v-tab>
                      <v-tab class="font-weight-bold">History </v-tab>
                      <v-tab class="font-weight-bold"> Identifications </v-tab>

                      <v-tab-item>
                        <v-container fluid>
                          <v-subheader style="padding: 0" class="px-2"
                            >General Information {{ scheduleLoad }}</v-subheader
                          >
                          <v-row dense class="mt-2">
                            <v-col cols="12" xl="4">
                              <v-text-field
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                                outlined
                                dense
                                style="border-color: red !important"
                                label="First name"
                                v-model="firstname"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" xl="4">
                              <v-text-field
                                outlined
                                dense
                                label="Middle name"
                                v-model="middlename"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" xl="4">
                              <v-text-field
                                outlined
                                dense
                                label="Last name"
                                v-model="lastname"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col cols="6" xl="4">
                              <v-autocomplete
                                outlined
                                dense
                                label="Gender"
                                :items="select_gender"
                                v-model="gender"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" xl="4">
                              <v-autocomplete
                                outlined
                                dense
                                label="Nationality"
                                v-model="nationality"
                                :items="select_nationality"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col cols="6" xl="4">
                              <v-autocomplete
                                outlined
                                dense
                                label="Civil Status"
                                :items="select_cstatus"
                                v-model="civil"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>

                            <v-col cols="6" xl="4">
                              <v-autocomplete
                                outlined
                                dense
                                label="Civil Status"
                                :items="select_cstatus"
                                v-model="civil"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col cols="12" xl="4">
                              <v-text-field
                                type="date"
                                outlined
                                dense
                                label="Date of birth"
                                v-model="dob"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" xl="4">
                              <v-text-field
                                dense
                                outlined
                                label="Place of Birth"
                                v-model="pob"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-text-field>
                            </v-col>
                            <v-col></v-col>
                          </v-row>

                          <v-subheader style="padding: 0"
                            >Addresses</v-subheader
                          >

                          <v-row dense>
                            <v-col cols="12" xl="12">
                              <v-card
                                flat
                                style="padding: 0; margin: 0"
                                v-for="(add, index) in addresses"
                                :key="index"
                              >
                                <v-list-item three-line>
                                  <v-list-item-avatar color="white">
                                    <v-icon color="indigo">
                                      mdi-map-marker
                                    </v-icon>
                                  </v-list-item-avatar>
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      {{ add.street }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                      {{
                                        add.barangay.brgy_name +
                                        ' ' +
                                        add.city.city_name
                                      }}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle>
                                      {{
                                        add.province.province_name +
                                        ' ' +
                                        add.region.region_name
                                      }}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-btn
                                      v-if="edit_mode == true"
                                      fab
                                      small
                                      elevation="0"
                                      color="white"
                                      @click="addresses.splice(index, 1)"
                                      ><v-icon color="grey"
                                        >mdi-trash-can-outline</v-icon
                                      ></v-btn
                                    >
                                  </v-list-item-action>
                                </v-list-item>
                              </v-card>

                              <v-card
                                v-if="edit_mode == true"
                                flat
                                style="border: 1px dashed #e1e1e1"
                                class="text-center py-2"
                                @click="dialogAddress = true"
                              >
                                <span class="text--secondary">
                                  <small>
                                    <v-icon left>mdi-plus</v-icon> New Address
                                  </small>
                                </span>
                              </v-card>
                            </v-col>
                          </v-row>

                          <v-subheader style="padding: 0"
                            >Emergency Contact</v-subheader
                          >
                          <v-row>
                            <v-col
                              cols="12"
                              xl="12"
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
                                      v-if="edit_mode == true"
                                      fab
                                      small
                                      elevation="0"
                                      color="white"
                                      @click="emergencies.splice(index, 1)"
                                      ><v-icon color="grey"
                                        >mdi-trash-can-outline</v-icon
                                      ></v-btn
                                    >

                                    <v-btn
                                      v-else
                                      fab
                                      small
                                      elevation="0"
                                      color="white"
                                      @click="onCall(eme.emergency_number)"
                                      ><v-icon color="grey"
                                        >mdi-phone-outline</v-icon
                                      ></v-btn
                                    >
                                  </v-list-item-action>
                                </v-list-item>
                              </v-card>
                            </v-col>
                            <v-col>
                              <v-card
                                v-if="edit_mode == true"
                                flat
                                style="border: 1px dashed #e1e1e1"
                                class="text-center py-2"
                                @click="dialogEmergency = true"
                              >
                                <span class="text--secondary">
                                  <small>
                                    <v-icon left>mdi-plus</v-icon> New Emergency
                                  </small>
                                </span>
                              </v-card>
                            </v-col>
                          </v-row>

                          <v-subheader style="padding: 0"></v-subheader>
                          <v-subheader style="padding: 0"
                            >Educational Attainment</v-subheader
                          >

                          <v-row dense class="mt-2">
                            <v-col cols="12" xl="6">
                              <v-autocomplete
                                :items="select_education"
                                dense
                                v-model="education"
                                outlined
                                label="Educational Attainment"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>

                            <v-col cols="12" xl="3">
                              <!-- Menu from -->

                              <v-menu
                                ref="menu_from"
                                v-model="menu_from"
                                :close-on-content-click="false"
                                :return-value.sync="date_from"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    outlined
                                    dense
                                    v-model="date_from"
                                    label="From"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :class="
                                      edit_mode == false ? 'edit_mode' : false
                                    "
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="date_from"
                                  type="month"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="menu_from = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu_from.save(date_from)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>

                            <!-- Menu to -->

                            <v-col cols="12" xl="3">
                              <v-menu
                                ref="menu_to"
                                v-model="menu_to"
                                :close-on-content-click="false"
                                :return-value.sync="date_to"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    outlined
                                    dense
                                    v-model="date_to"
                                    label="to"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :class="
                                      edit_mode == false ? 'edit_mode' : false
                                    "
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="date_to"
                                  type="month"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="menu_to = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu_to.save(date_to)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                          <v-row dense>
                            <v-col cols="12" xl="6">
                              <v-text-field
                                dense
                                outlined
                                label="School/University"
                                v-model="education_school"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" xl="6">
                              <v-text-field
                                dense
                                outlined
                                label="Degree"
                                v-model="education_degree"
                                v-if="education != 'High School Graduate'"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
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
                              <v-subheader style="padding: 0" class="px-3">
                                Employment Information
                              </v-subheader>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              <v-autocomplete
                                outlined
                                dense
                                :items="select_type"
                                label="Employee Type"
                                v-model="emp_type"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>

                            <v-col>
                              <v-autocomplete
                                outlined
                                dense
                                :items="select_status"
                                label="Employee Status"
                                v-model="emp_status"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              <v-text-field
                                dense
                                outlined
                                label="Date Hired"
                                type="date"
                                v-model="hired"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-text-field>
                            </v-col>

                            <v-col>
                              <v-text-field
                                dense
                                outlined
                                label="Date Resigned"
                                type="date"
                                v-model="resigned"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row dense class="mt-2">
                            <v-col>
                              <v-subheader style="padding: 0" class="px-3">
                                Position Information
                              </v-subheader>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              <v-autocomplete
                                outlined
                                dense
                                :items="branches"
                                item-text="branch_name"
                                item-value="_id"
                                label="Branch Assigned"
                                v-model="branch"
                                @change="handleDepartment(branch)"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              <v-autocomplete
                                outlined
                                dense
                                :items="select_departments"
                                item-text="department_name"
                                item-value="_id"
                                v-model="department"
                                label="Department  Assigned"
                                @change="handleJob(department)"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              <v-autocomplete
                                outlined
                                dense
                                :items="select_jobs"
                                label="Position"
                                item-text="job_name"
                                item-value="id"
                                v-model="job"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              <v-autocomplete
                                outlined
                                dense
                                :items="select_jobs"
                                return-object
                                label="Contract"
                                item-text="job_name"
                                v-model="contract"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-autocomplete>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              <v-text-field
                                type="number"
                                outlined
                                dense
                                label="Rate (Per Hour)"
                                v-model="job_rate"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
                              ></v-text-field>
                            </v-col>

                            <v-col>
                              <v-text-field
                                type="number"
                                outlined
                                dense
                                label="Work Hours (Per Week)"
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
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
                                :readonly="edit_mode == false ? true : false"
                                :class="
                                  edit_mode == false ? 'edit_mode' : false
                                "
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
                        <v-container fluid class="px-2">
                          <v-subheader style="padding: 0"
                            >Identifications</v-subheader
                          >
                          <v-row dense>
                            <v-col
                              xl="6"
                              class="py-5 px-5"
                              v-for="(iden, index) in identifications"
                              :key="index"
                            >
                              <v-card
                                color="white darken-3"
                                style="
                                  border-radius: 12px;
                                  box-shadow: rgba(0, 0, 0, 0.1) 0px 30px 30px -7px;
                                  border: 1px solid #f6f6f6;
                                "
                              >
                                <v-row dense>
                                  <v-col>
                                    <v-list-item>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          class="title font-weight-regular"
                                        >
                                          {{ iden.type }}
                                        </v-list-item-title>
                                      </v-list-item-content>

                                      <v-list-item-action>
                                        <v-img
                                          contain
                                          width="100"
                                          height="48"
                                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Social_Security_System_%28SSS%29.svg/1200px-Social_Security_System_%28SSS%29.svg.png"
                                        ></v-img>
                                      </v-list-item-action>
                                    </v-list-item>

                                    <v-list-item>
                                      <v-list-item-content>
                                        <v-list-item-title class="title">
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle>
                                          {{ iden.type }} Number
                                        </v-list-item-subtitle>
                                        <v-list-item-title>
                                          {{ iden.value }}
                                        </v-list-item-title>
                                      </v-list-item-content>

                                      <v-list-item-action>
                                        <v-icon
                                          @click="
                                            identifications.splice(index, 1)
                                          "
                                          >mdi-close</v-icon
                                        >
                                      </v-list-item-action>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-col>

                            <v-col xl="6" class="py-5 px-5">
                              <v-card
                                style="
                                  border-radius: 12px;
                                  box-shadow: rgba(0, 0, 0, 0.1) 0px 30px 30px -7px;
                                  border: 1px solid #f6f6f6;
                                "
                                @click="dialogIdentification = true"
                              >
                                <v-row dense>
                                  <v-col>
                                    <v-list-item>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          class="title font-weight-regular"
                                        >
                                          Add Identification
                                        </v-list-item-title>
                                      </v-list-item-content>

                                      <v-list-item-action>
                                        <v-img
                                          contain
                                          width="100"
                                          height="48"
                                        ></v-img>
                                      </v-list-item-action>
                                    </v-list-item>

                                    <v-list-item>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          class="
                                            title
                                            font-weight-regular
                                            text-center
                                          "
                                        >
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle>
                                        </v-list-item-subtitle>
                                        <v-list-item-title> </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-col>
                          </v-row>
                          <v-subheader style="padding: 0" class="mt-7"
                            >Bank Details</v-subheader
                          >
                          <v-row dense>
                            <v-col
                              xl="6"
                              class="py-5 px-5"
                              v-for="(bank, index) in banks"
                              :key="index"
                            >
                              <v-card
                                color="indigo darken-3"
                                style="
                                  border-radius: 12px;
                                  box-shadow: rgba(0, 0, 0, 0.1) 0px 30px 30px -7px;
                                  border: 1px solid #f6f6f6;
                                "
                              >
                                <v-row dense>
                                  <v-col>
                                    <v-list-item>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          class="
                                            white--text
                                            title
                                            font-weight-regular
                                          "
                                        >
                                          {{ bank.bank }}
                                        </v-list-item-title>
                                      </v-list-item-content>

                                      <v-list-item-action>
                                        <v-img
                                          contain
                                          width="100"
                                          height="48"
                                          src="https://www.clipartkey.com/mpngs/m/38-387341_bank-clipart-bank-logo-bdo-unibank.png"
                                        ></v-img>
                                      </v-list-item-action>
                                    </v-list-item>

                                    <v-list-item>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          class="white--text title"
                                        >
                                          {{ bank.bank_number }}
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          class="white--text"
                                        >
                                          Card Holder
                                        </v-list-item-subtitle>
                                        <v-list-item-title class="white--text">
                                          {{ bank.bank_name }}
                                        </v-list-item-title>
                                      </v-list-item-content>

                                      <v-list-item-action>
                                        <v-icon
                                          @click="banks.splice(index, 1)"
                                          color="white"
                                          >mdi-close</v-icon
                                        >
                                      </v-list-item-action>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-col>

                            <v-col xl="6" class="py-5 px-5">
                              <v-card
                                style="
                                  background: #f8f9fe;
                                  border-radius: 12px;
                                  box-shadow: rgba(0, 0, 0, 0.1) 0px 30px 30px -7px;
                                  border: 1px solid #f6f6f6;
                                "
                                @click="dialogBank = true"
                              >
                                <v-row dense>
                                  <v-col>
                                    <v-list-item>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          class="title font-weight-regular"
                                        >
                                          Add Bank
                                        </v-list-item-title>
                                      </v-list-item-content>

                                      <v-list-item-action>
                                        <v-img
                                          contain
                                          width="100"
                                          height="48"
                                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Social_Security_System_%28SSS%29.svg/1200px-Social_Security_System_%28SSS%29.svg.png"
                                        ></v-img>
                                      </v-list-item-action>
                                    </v-list-item>

                                    <v-list-item>
                                      <v-list-item-content>
                                        <v-list-item-title class="title">
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle>
                                        </v-list-item-subtitle>
                                        <v-list-item-title> </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-tab-item>
                    </v-tabs>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" xl="3">
          <v-card class="px-0">
            <v-row dense>
              <v-col cols="12" xl="12">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Applications </v-list-item-title>
                    <v-list-item-subtitle> lorem ipsum </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <div v-for="app in application_filed" :key="app._id">
                  <v-list-item two-line link @click="onGrievance(app._id)">
                    <v-list-item-avatar color="primary">
                      <v-icon color="white">
                        {{
                          app.application_type == 'Resignation'
                            ? 'mdi-account-remove'
                            : app.application_type == 'Transfer'
                            ? 'mdi-account-switch'
                            : app.application_type == 'Promotion/Demotion'
                            ? 'mdi-account-star'
                            : app.application_type == 'Termination'
                            ? 'mdi-account-off'
                            : app.application_type == 'Grievances'
                            ? 'mdi-account-alert'
                            : ''
                        }}
                      </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ app.application_type }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ app.application_date }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="px-0 mt-7">
            <v-row dense>
              <v-col cols="12" xl="12">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Complaints </v-list-item-title>
                    <v-list-item-subtitle> lorem ipsum </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <div v-for="app in application_grievance" :key="app._id">
                  <v-list-item two-line link @click="onGrievance(app._id)">
                    <v-list-item-avatar color="error">
                      <v-icon color="white"> mdi-account-alert </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ app.application_data.grievance_type }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ app.application_emp }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text>{{
                        app.application_date
                      }}</v-list-item-action-text>

                      <v-icon color="grey lighten-1"> mdi-arrow-right </v-icon>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider></v-divider>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogAddress" width="500">
      <v-card>
        <v-card-title>New Address Line </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-7">
          <v-text-field outlined dense label="Street" v-model="street">
          </v-text-field>
          <v-combobox
            outlined
            dense
            label="Label"
            :items="select_label"
            v-model="address_label"
          ></v-combobox>
          <v-autocomplete
            :items="regions"
            v-model="region"
            item-text="region_name"
            return-object
            @change="handleProvince(region)"
            outlined
            dense
            label="Region"
          ></v-autocomplete>
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
          <v-autocomplete
            :items="barangays"
            v-model="barangay"
            item-text="brgy_name"
            return-object
            outlined
            dense
            label="Barangay"
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="dialogAddress = false"
            >Close</v-btn
          >
          <v-btn color="indigo" dark @click="addAddress()">Add Address</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogBank" width="500">
      <v-card>
        <v-card-title> New Bank </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-7">
          <v-autocomplete
            outlined
            dense
            label="Bank"
            :items="select_banks"
            item-text="name"
            item-value="name"
            v-model="bank"
          >
            <template v-slot:item="data">
              <v-list-item-avatar>
                <v-img :src="data.item.logo"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ data.item.prefix }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ data.item.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <v-text-field
            outlined
            dense
            label="Account name"
            v-model="bank_name"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Account number"
            v-model="bank_number"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="dialogBank = false">Close</v-btn>
          <v-btn color="indigo" dark @click="addBank()">Add Bank</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogIdentification" width="500">
      <v-card>
        <v-card-title> New Identification </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-7">
          <v-autocomplete
            :items="select_ids"
            outlined
            dense
            label="ID"
            v-model="id_type"
          ></v-autocomplete>
          <v-text-field
            outlined
            dense
            label="Identification No."
            v-model="id_value"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="dialogIdentification = false"
            >Close</v-btn
          >
          <v-btn color="indigo" dark @click="addIdentification()"
            >Add Identification</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEmergency" width="500">
      <v-card>
        <v-card-title> New Emergency Contact </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-7">
          <v-text-field
            outlined
            dense
            label="Name"
            v-model="emergency_name"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Contact No."
            v-model="emergency_number"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="dialogEmergency = false"
            >Close</v-btn
          >
          <v-btn color="indigo" dark @click="addEmergency()"
            >Add Emergency</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogMobile" width="500">
      <v-card>
        <v-card-title> New Mobile </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-7">
          <v-text-field
            outlined
            dense
            label="Mobile No."
            v-model="mobile"
          ></v-text-field>
          <v-combobox
            outlined
            dense
            label="Label"
            :items="select_label"
            v-model="mobile_label"
          ></v-combobox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="dialogMobile = false">Close</v-btn>
          <v-btn color="indigo" dark @click="addMobile()">Add Mobile</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogLandline" width="500">
      <v-card>
        <v-card-title> New Landline </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-7">
          <v-text-field
            outlined
            dense
            label="Landline No."
            v-model="telephone"
          ></v-text-field>
          <v-combobox
            outlined
            dense
            label="Label"
            :items="select_label"
            v-model="telephone_label"
          ></v-combobox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="dialogLandline = false"
            >Close</v-btn
          >
          <v-btn color="indigo" dark @click="addLandline()">Add Landline</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEmail" width="500">
      <v-card>
        <v-card-title> New Email </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-7">
          <v-text-field
            outlined
            dense
            label="Email Address"
            v-model="email"
          ></v-text-field>
          <v-combobox
            outlined
            dense
            label="Label"
            :items="select_label"
            v-model="email_label"
          ></v-combobox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="dialogEmail = false">Close</v-btn>
          <v-btn color="indigo" dark @click="addEmail()">Add Email</v-btn>
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
import axios from 'axios'
import {
  regions,
  provinces,
  cities,
  barangays
} from 'select-philippines-address'

export default {
  //   props: ['employee_index'],
  data() {
    return {
      // ads
      edit_mode: true,

      street: '',
      region: '',
      province: '',
      city: '',
      barangay: '',

      regions: [],
      provinces: [],
      cities: [],
      barangays: [],

      select_label: ['Primary', 'Secondary'],

      mobile: null,
      mobile_label: null,
      email: null,
      email_label: null,
      telephone: null,
      telephone_label: null,

      dialogMobile: false,
      dialogLandline: false,
      dialogEmail: false,
      dialogAddress: false,
      dialogEmergency: false,
      dialogIdentification: false,
      dialogBank: false,

      snackbar: false,
      snackbar_title: null,
      snackbar_subtitle: null,
      snackbar_color: null,

      date_from: '',
      menu_from: false,
      date_to: '',
      menu_to: false,

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

      mobiles: [],
      telephones: [],
      emails: [],
      emergencies: [],
      addresses: [],
      banks: [],
      identifications: [],

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
      select_nationality: ['Filipino', 'Foreign'],
      select_banks: [
        {
          name: 'Banco De Oro',
          prefix: 'BDO',
          logo:
            'https://media-exp1.licdn.com/dms/image/C560BAQGCcGZb5ddcVQ/company-logo_200_200/0/1519886181061?e=2159024400&v=beta&t=bHxW-IMbMBxMoQOJFhQMPRVbX38fblw3FeRSiIHd3fU'
        },
        {
          name: 'Bank of the Philippine Islands',
          prefix: 'BPI',
          logo:
            'https://pbs.twimg.com/profile_images/1217261478908030976/nrkzL4pv.jpg'
        },
        {
          name: 'Metropolitan Bank and Trust Company',
          prefix: 'Metrobank',
          logo: 'https://logodix.com/logo/1799112.png'
        },
        {
          name: 'Chinabank',
          prefix: 'CNB',
          logo:
            'https://www.nuvali.ph/wp-content/uploads/sites/8/2018/04/chinabank-logo-300x297.jpg'
        },
        {
          name: 'Landbank',
          prefix: 'LDB',
          logo:
            'https://yt3.ggpht.com/ytc/AAUvwngxeqk5lmjQQfO7D8xd7SaD3M5Ig5NsPO6-kByQ=s900-c-k-c0x00ffffff-no-rj'
        },
        {
          name: 'Rizal Commercial Banking Corporation',
          prefix: 'RCBC',
          logo:
            'https://surigaoislands.com/media/com_mtree/images/listings/m/13.png'
        },
        {
          name: 'Philippine National Bank',
          prefix: 'PNB',
          logo:
            'https://pbs.twimg.com/profile_images/1250601295364321280/zx3TdRsW_400x400.png'
        },
        {
          name: 'Philippine National Bank',
          prefix: 'PNB',
          logo:
            'https://pbs.twimg.com/profile_images/1250601295364321280/zx3TdRsW_400x400.png'
        },
        {
          name: 'Citibank Philippines',
          prefix: 'CITI',
          logo: 'https://morefun.ph/wp-content/uploads/2017/07/Citibanklogo.jpg'
        }
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
      jobs: state => {
        return state.jobs
      },
      departments: state => {
        return state.departments
      },
      applications: state => {
        return state.applications
      }
    }),
    scheduleLoad() {
      let index = this.employees
        .map(el => el._id)
        .indexOf(this.$route.params.id)

      // General Information
      this.firstname = this.employees[index].firstname
      this.middlename = this.employees[index].middlename
      this.lastname = this.employees[index].lastname
      this.gender = this.employees[index].gender
      this.civil = this.employees[index].civil
      this.nationality = this.employees[index].nationality
      this.dob = this.employees[index].dob
      this.pob = this.employees[index].pob
      this.id = this.employees[index]._id

      // Education
      this.education = this.employees[index].education[0].education_type
      this.education_school = this.employees[
        index
      ].education[0].education_school
      this.education_degree = this.employees[
        index
      ].education[0].education_degree

      // Employments
      this.department = this.employees[index].department
      this.branch = this.employees[index].branch
      this.job = this.employees[index].job
      this.rate = this.employees[index].rate

      this.job = this.employees[index].job
      this.job_name = this.employees[index].job.job_name

      this.emp_type = this.employees[index].emp_type
      this.emp_status = this.employees[index].emp_status

      this.resigned = this.employees[index].resigned
      this.hired = this.employees[index].hired

      this.application_filed = this.applications.filter(
        el => el.application_emp == this.employees[index]._id
      )

      this.application_grievance = this.applications.filter(
        el => el.application_data.grievance_accused == this.employees[index]._id
      )

      return ''
    }
  },
  methods: {
    addBank() {
      this.banks.push({
        bank: this.bank,
        bank_name: this.bank_name,
        bank_number: this.bank_number
      })
      this.dialogBank = false

      this.bank = ''
      this.bank_name = ''
      this.bank_number = ''
    },
    addIdentification() {
      this.identifications.push({ type: this.id_type, value: this.id_value })
      this.dialogIdentification = false

      this.id_type = ''
      this.id_value = ''
    },
    addAddress() {
      this.addresses.push({
        label: this.address_label,
        street: this.street,
        barangay: this.barangay,
        city: this.city,
        province: this.province,
        region: this.region
      })

      this.address_label = ''
      this.street = ''
      this.barangay = ''
      this.city = ''
      this.province = ''
      this.region = ''

      this.dialogAddress = false
    },
    addEmergency() {
      this.emergencies.push({
        emergency_name: this.emergency_name,
        emergency_number: this.emergency_number
      })
      this.emergency_name = ''
      this.emergency_number = ''

      this.dialogEmergency = false
    },
    addEmail() {
      this.emails.push({
        email: this.email,
        label: this.email_label
      })
      this.email = ''
      this.email_label = ''

      this.dialogEmail = false
    },
    addLandline() {
      this.telephones.push({
        number: this.telephone,
        label: this.telephone_label
      })
      this.telephone = ''
      this.telephone_label = ''

      this.dialogLandline = false
    },
    addMobile() {
      this.mobiles.push({
        number: this.mobile,
        label: this.mobile_label
      })
      this.mobile = ''
      this.mobile_label = ''

      this.dialogMobile = false
    },
    viewMobile() {
      this.dialogMobile = true
    },
    onCall(number) {
      window.open('tel:' + number)
    },
    onMail(email) {
      window.open('mailto:' + email)
    },
    onEdit() {
      axios
        .put('http://192.168.100.77:8080/api/employees/' + this.id, {
          firstname: this.firstname,
          middlename: this.middlename,
          lastname: this.lastname,
          gender: this.gender,
          nationality: this.nationality,
          civil: this.civil,
          dob: this.dob,
          pob: this.pob,
          emp_type: this.emp_type,
          emp_status: this.emp_status,
          hired: this.hired,
          resigned: this.resigned,
          contract: this.contract,
          rate: this.rate,
          avatar: this.avatar,
          mobiles: this.mobiles,
          telephones: this.telephones,
          emails: this.emails,
          identifications: this.identifications,
          addresses: this.addresses,
          banks: this.banks,
          education: {
            education_type: this.education,
            education_school: this.education_school,
            education_from: this.date_from,
            education_to: this.date_to,
            education_degree: this.education_degree
          },
          emergencies: this.emergencies,
          department: this.department,
          job: this.job,
          branch: this.branch
        })
        .then(response => {
          this.edit_mode = !this.edit_mode
          this.snackbar_title = 'Success'
          this.snackbar_subtitle = 'Customer successfully updated!'
          this.snackbar_color = 'indigo'
          this.snackbar = true
        })
        .catch(error => {
          alert('error')
        })
    },
    onGrievance(id) {
      this.$router.push('/Apps/' + id)
    },
    handleJob(e) {
      console.log(e._id)
      console.log(e)
      console.log(this.jobs)
      let get_jobs = this.jobs.filter(el => el.job_department == e)
      this.select_jobs = get_jobs
    },
    handleDepartment(e) {
      console.log(e)
      let get_departments = this.departments.filter(
        el => el.department_branch == e
      )
      this.select_departments = get_departments
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
    }
  },
  mounted() {
    regions().then(response => {
      this.regions = response
    })

    let index = this.employees.map(el => el._id).indexOf(this.$route.params.id)
    this.handleJob(this.employees[index].department)
    this.handleDepartment(this.employees[index].branch)
    this.mobiles.push(...this.employees[index].mobiles)
    this.telephones.push(...this.employees[index].telephones)
    this.emails.push(...this.employees[index].emails)
    this.emergencies.push(...this.employees[index].emergencies)
    this.addresses.push(...this.employees[index].addresses)
    this.banks.push(...this.employees[index].banks)
    this.identifications.push(...this.employees[index].identifications)
  }
}
</script>
<style >
.edit_mode.v-text-field--outlined fieldset {
  color: white !important;
}
</style>