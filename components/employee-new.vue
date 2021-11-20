<template>
  <div>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>New Employee</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-list-item two-line style="padding: 0" class="text-center py-10">
        <v-list-item-content>
          <v-list-item-title style="font-size: 1.5em"
            >Create New Employee</v-list-item-title
          >
          <v-list-item-subtitle
            >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-stepper v-model="e6" alt-labels style="box-shadow: none">
        <v-stepper-header style="box-shadow: none" class="px-15">
          <v-stepper-step step="1"> General Details </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2"> Job Details </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Additional Details </v-stepper-step>
        </v-stepper-header>

        <v-stepper-content step="1" class="px-10">
          <v-form ref="general_form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Full name</v-subheader>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" xl="6">
                <v-text-field
                  outlined
                  dense
                  label="First name"
                  v-model="firstname"
                  :rules="firstname_rules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="6">
                <v-text-field
                  outlined
                  dense
                  label="Middle name"
                  v-model="middlename"
                  :rules="middlename_rules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="6">
                <v-text-field
                  outlined
                  dense
                  label="Last name"
                  v-model="lastname"
                  :rules="lastname_rules"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Something</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" xl="6">
                <v-autocomplete
                  outlined
                  dense
                  label="Gender"
                  :items="select_gender"
                  v-model="gender"
                  :rules="gender_rules"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" xl="6">
                <v-autocomplete
                  outlined
                  dense
                  label="Nationality"
                  v-model="nationality"
                  :items="select_nationality"
                  :rules="nationality_rules"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" xl="6">
                <v-autocomplete
                  outlined
                  dense
                  label="Civil Status"
                  :items="select_cstatus"
                  v-model="civil"
                  :rules="civil_rules"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Date of birth</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" xl="6">
                <v-text-field
                  type="date"
                  outlined
                  dense
                  label="Date of birth"
                  v-model="dob"
                  :rules="dob_rules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="6">
                <v-text-field
                  outlined
                  dense
                  label="Place of Birth"
                  v-model="pob"
                  :rules="pob_rules"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Address</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" xl="3">
                <v-combobox
                  outlined
                  dense
                  label="Label"
                  v-model="address_label"
                  :items="select_combo"
                ></v-combobox>
              </v-col>

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
              <v-col cols="12" xl="3">
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
              </v-col>

              <v-col cols="12" xl="3">
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

              <v-col cols="12" xl="3">
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

              <v-col cols="12" xl="3">
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

            <v-row dense>
              <v-col>
                <v-btn
                  class="float-right px-10"
                  color="indigo"
                  :disabled="
                    barangay == '' ||
                    city == '' ||
                    province == '' ||
                    region == '' ||
                    street == '' ||
                    address_label == ''
                      ? true
                      : false
                  "
                  @click="addAddress()"
                >
                  <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row dense v-if="addresses.length != 0">
              <v-col cols="12">
                <v-row dense>
                  <v-col>
                    <v-subheader class="px-0">Addresses</v-subheader>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col
                    cols="12"
                    xl="12"
                    v-for="(add, index) in addresses"
                    :key="index"
                  >
                    <v-card outlined>
                      <v-list-item three-line>
                        <v-list-item-avatar>
                          <v-icon color="indigo"> mdi-map-marker </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{
                              add.street +
                              ' ' +
                              add.barangay.brgy_name +
                              ' ' +
                              add.city.city_name
                            }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{
                              add.province.province_name +
                              ' ' +
                              add.region.region_name
                            }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            {{ add.label }}</v-list-item-subtitle
                          >
                        </v-list-item-content>

                        <v-list-item-actions>
                          <v-btn
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="addresses.splice(index, 1)"
                            ><v-icon color="grey"
                              >mdi-trash-can-outline</v-icon
                            ></v-btn
                          >
                        </v-list-item-actions>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Educational Attainment</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" xl="6">
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
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date_from"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu_from = false">
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

              <v-col>
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
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date_to"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu_to = false">
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
                ></v-text-field>
              </v-col>

              <v-col cols="12" xl="6">
                <v-text-field
                  dense
                  outlined
                  label="Degree"
                  v-model="education_degree"
                  v-if="education != 'High School Graduate'"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Mobile No.</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6" xl="7">
                <v-text-field
                  outlined
                  dense
                  label="Mobile No."
                  v-model="mobile"
                ></v-text-field>
              </v-col>

              <v-col cols="4" xl="3">
                <v-combobox
                  outlined
                  dense
                  label="Label"
                  v-model="mobile_label"
                  :items="select_combo"
                ></v-combobox>
              </v-col>

              <v-col cols="2" xl="2">
                <v-btn
                  color="indigo"
                  block
                  @click="addMobile()"
                  :disabled="mobile == '' || mobile_label == '' ? true : false"
                >
                  <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row dense v-if="mobiles.length != 0">
              <v-col xl="12">
                <v-row dense>
                  <v-col xl="6" v-for="(mobile, index) in mobiles" :key="index">
                    <v-card outlined>
                      <v-list-item two-line>
                        <v-list-item-avatar>
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

                        <v-list-item-actions>
                          <v-btn
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="mobiles.splice(index, 1)"
                            ><v-icon color="grey"
                              >mdi-trash-can-outline</v-icon
                            ></v-btn
                          >
                        </v-list-item-actions>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Telephone No.</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6" xl="7">
                <v-text-field
                  outlined
                  dense
                  label="Telephone No."
                  v-model="telephone"
                ></v-text-field>
              </v-col>

              <v-col cols="4" xl="3">
                <v-combobox
                  outlined
                  dense
                  label="Label"
                  v-model="telephone_label"
                  :items="select_combo"
                ></v-combobox>
              </v-col>

              <v-col cols="2" xl="2">
                <v-btn
                  color="indigo"
                  block
                  @click="addTele()"
                  :disabled="
                    telephone == '' || telephone_label == '' ? true : false
                  "
                >
                  <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row dense v-if="telephones.length != 0">
              <v-col xl="12">
                <v-row dense>
                  <v-col xl="6" v-for="(tel, index) in telephones" :key="index">
                    <v-card outlined>
                      <v-list-item two-line>
                        <v-list-item-avatar>
                          <v-icon color="indigo"> mdi-phone </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ tel.number }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ tel.label }}</v-list-item-subtitle
                          >
                        </v-list-item-content>

                        <v-list-item-actions>
                          <v-btn
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="telephones.splice(index, 1)"
                            ><v-icon color="grey"
                              >mdi-trash-can-outline</v-icon
                            ></v-btn
                          >
                        </v-list-item-actions>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Email Address</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6" xl="7">
                <v-text-field
                  outlined
                  dense
                  label="Email Address"
                  v-model="email"
                ></v-text-field>
              </v-col>

              <v-col cols="4" xl="3">
                <v-combobox
                  outlined
                  dense
                  label="Label"
                  v-model="email_label"
                  :items="select_combo"
                ></v-combobox>
              </v-col>

              <v-col cols="2" xl="2">
                <v-btn
                  color="indigo"
                  block
                  @click="addEmail()"
                  :disabled="email == '' || email_label == '' ? true : false"
                >
                  <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row dense v-if="emails.length != 0">
              <v-col xl="12">
                <v-row dense>
                  <v-col xl="6" v-for="(email, index) in emails" :key="index">
                    <v-card flat>
                      <v-list-item two-line>
                        <v-list-item-avatar>
                          <v-icon color="indigo"> mdi-email </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ email.email }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ email.label }}</v-list-item-subtitle
                          >
                        </v-list-item-content>

                        <v-list-item-actions>
                          <v-btn
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="emails.splice(index, 1)"
                            ><v-icon color="grey"
                              >mdi-trash-can-outline</v-icon
                            ></v-btn
                          >
                        </v-list-item-actions>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Emergency Contact(s)</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" xl="7">
                <v-text-field
                  outlined
                  dense
                  label="Name"
                  v-model="emergency_name"
                ></v-text-field>
              </v-col>

              <v-col cols="10" xl="3">
                <v-text-field
                  outlined
                  dense
                  label="Number"
                  v-model="emergency_number"
                ></v-text-field>
              </v-col>
              <v-col cols="2" xl="2">
                <v-btn
                  color="indigo"
                  block
                  @click="addEmergency()"
                  :disabled="
                    emergency_name == '' || emergency_number == ''
                      ? true
                      : false
                  "
                >
                  <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row dense v-if="emergencies.length != 0">
              <v-col xl="12">
                <v-row dense>
                  <v-col
                    xl="6"
                    v-for="(eme, index) in emergencies"
                    :key="index"
                  >
                    <v-card flat>
                      <v-list-item two-line>
                        <v-list-item-avatar>
                          <v-icon color="indigo"> mdi-account-alert </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ eme.emergency_name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ eme.emergency_number }}</v-list-item-subtitle
                          >
                        </v-list-item-content>

                        <v-list-item-actions>
                          <v-btn
                            fab
                            small
                            elevation="0"
                            color="white"
                            @click="emergencies.splice(index, 1)"
                            ><v-icon color="grey"
                              >mdi-trash-can-outline</v-icon
                            ></v-btn
                          >
                        </v-list-item-actions>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <div class="mt-5 float-right">
              <v-btn text @click="e6 = e6 - 1"> Cancel </v-btn>
              <v-btn color="primary" @click="next_tab(e6)"> Continue </v-btn>
            </div>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2" class="px-10">
          <v-form ref="employment_form" v-model="valid2" lazy-validation>
            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Employment Information</v-subheader>
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
                  :rules="emptype_rules"
                ></v-autocomplete>
              </v-col>

              <v-col>
                <v-autocomplete
                  outlined
                  dense
                  :items="select_status"
                  label="Employee Status"
                  v-model="emp_status"
                  :rules="empstat_rules"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-text-field
                  type="date"
                  outlined
                  dense
                  label="Date Hired"
                  v-model="hired"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  type="date"
                  outlined
                  dense
                  v-if="emp_status == 'Resigned'"
                  label="Date Resigned"
                  v-model="resigned"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Assignment</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" xl="6">
                <v-autocomplete
                  outlined
                  dense
                  :items="branches"
                  item-text="branch_name"
                  return-object
                  label="Branch"
                  v-model="branch"
                  @change="handleDepartment(branch)"
                  :rules="branch_rules"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" xl="6">
                <v-autocomplete
                  outlined
                  dense
                  :items="select_departments"
                  item-text="department_name"
                  return-object
                  v-model="department"
                  label="Department"
                  @change="handleJob(department)"
                  :rules="department_rules"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" xl="6">
                <v-autocomplete
                  outlined
                  dense
                  :items="select_jobs"
                  return-object
                  label="Job"
                  item-text="job_name"
                  v-model="job"
                  :rules="job_rules"
                ></v-autocomplete>
              </v-col>

              <v-col>
                <v-text-field
                  outlined
                  dense
                  v-model="rate"
                  label="Rate"
                  :rules="rate_rules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-autocomplete
                  outlined
                  dense
                  :items="select_contracts"
                  label="Contract"
                  v-model="contract"
                  :rules="contract_rules"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <div class="mt-5 float-right">
              <v-btn text @click="e6 = e6 - 1"> Previous </v-btn>
              <v-btn color="primary" @click="next_tab(e6)"> Continue </v-btn>
            </div>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="3" class="px-10">
          <v-form ref="additional_form">
            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Identifications</v-subheader>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" xl="5">
                <v-autocomplete
                  :items="select_ids"
                  outlined
                  dense
                  label="ID"
                  v-model="id_type"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" xl="5">
                <v-text-field
                  outlined
                  dense
                  label="Number"
                  v-model="id_value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="2">
                <v-btn
                  block
                  color="indigo"
                  @click="addIdentification()"
                  :disabled="id_type == '' || id_value == '' ? true : false"
                >
                  <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col
                xl="6"
                class="py-5 px-5"
                v-for="(iden, index) in identifications"
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
                          <v-list-item-title class="white--text title">
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
                          <v-list-item-title class="white--text title">
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-subtitle class="white--text">
                            {{ iden.type }} Number
                          </v-list-item-subtitle>
                          <v-list-item-title class="white--text">
                            {{ iden.value }}
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-icon
                            @click="identifications.splice(index, 1)"
                            color="white"
                            >mdi-close</v-icon
                          >
                        </v-list-item-action>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-subheader class="px-0">Bank Details</v-subheader>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" xl="3">
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
              </v-col>
              <v-col cols="12" xl="4">
                <v-text-field
                  outlined
                  dense
                  label="Account name"
                  v-model="bank_name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="3">
                <v-text-field
                  outlined
                  dense
                  label="Account number"
                  v-model="bank_number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="2">
                <v-btn
                  block
                  dense
                  color="indigo"
                  @click="addBank()"
                  :disabled="
                    bank_name == '' || bank_number == '' || bank == ''
                      ? true
                      : false
                  "
                >
                  <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

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
                          <v-list-item-title class="white--text title">
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
                          <v-list-item-title class="white--text title">
                            {{ bank.bank_number }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-subtitle class="white--text">
                            Card Holder
                          </v-list-item-subtitle>
                          <v-list-item-title class="white--text">
                            {{ bank.bank_name }}
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-icon @click="banks.splice(index, 1)" color="white"
                            >mdi-close</v-icon
                          >
                        </v-list-item-action>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <div class="mt-5 float-right">
              <v-btn text @click="e6 = e6 - 1"> Previous </v-btn>
              <v-btn color="primary" @click="onSave()"> Save Employee </v-btn>
            </div>
          </v-form>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios'
import {
  regions,
  provinces,
  cities,
  barangays
} from 'select-philippines-address'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // Validators
      valid: '',
      valid2: '',
      firstname_rules: [v => !!v || 'First name is required'],
      middlename_rules: [v => !!v || 'Middle name is required'],
      lastname_rules: [v => !!v || 'Last name is required'],

      gender_rules: [v => !!v || 'Gender is required'],
      nationality_rules: [v => !!v || 'Nationality is required'],
      civil_rules: [v => !!v || 'Civil Status is required'],

      dob_rules: [v => !!v || 'Date of birth is required'],
      pob_rules: [v => !!v || 'Place of birth is required'],

      // Employment

      emptype_rules: [v => !!v || 'Employee Type is required'],
      empstat_rules: [v => !!v || 'Employee Status is required'],
      branch_rules: [v => !!v || 'Branch is required'],
      department_rules: [v => !!v || 'Department is required'],
      job_rules: [v => !!v || 'Job is required'],
      rate_rules: [v => !!v || 'Rate is required'],
      contract_rules: [v => !!v || 'Contract is required'],

      // Snackbars
      snackbar: true,

      // Selects
      select_cstatus: ['Single', 'Married', 'Widow/er', 'Legally Separated'],
      select_gender: ['Male', 'Female'],
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
      select_contracts: ['Contract #1', 'Contract #2'],
      select_departments: [],
      select_jobs: [],
      regions: [],
      provinces: [],
      cities: [],
      barangays: [],
      mobiles: [],
      telephones: [],
      emails: [],
      identifications: [],
      emergencies: [],

      select_combo: ['Primary', 'Secondary'],
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
      ],

      addresses: [],
      banks: [],

      // Forms
      firstname: '',
      middlename: '',
      lastname: '',
      gender: '',
      nationality: '',
      civil: '',
      dob: '',
      pob: '',
      emp_type: '',
      emp_status: '',
      department: '',
      job: '',
      hired: '',
      resigned: '',
      branch: '',
      street: '',

      // Education
      education: '',
      date_to: '',
      date_from: '',
      menu_to: false,
      menu_from: false,

      // Mobiles
      mobile: '',
      mobile_label: '',
      telephone: '',
      telephone_label: '',
      email: '',
      email_label: '',
      emergency_name: '',
      emergency_number: '',
      bank: '',
      bank_name: '',
      bank_number: '',

      id_type: '',
      id_value: '',

      region: '',
      province: '',
      city: '',
      barangay: '',
      e6: 1
    }
  },
  mounted() {
    regions().then(response => {
      this.regions = response
      console.log(this.regions)
    })
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
      axios
        .post('http://192.168.100.77:8080/api/employees', {
          // Arrs
          mobiles: this.mobiles,
          telephones: this.telephones,
          emails: this.emails,
          identifications: this.identifications,
          addresses: this.addresses,
          banks: this.banks,
          emergencies: this.emergencies,

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
          avatar: this.avatar,

          // Educational Attainment
          education: {
            education_type: this.education,
            education_school: this.education_school,
            education_from: this.date_from,
            education_to: this.date_to,
            education_degree: this.education_degree
          },

          hired: this.hired,
          resigned: this.resigned,

          branch: this.branch._id,
          department: this.department._id,
          job: this.job.id,
          rate: this.rate
        })
        .then(response => {
          console.log(response)
          this.$store.commit('ADD_EMPLOYEES', {
            _id: response.data.id,
            ...response.data
          })
          this.$emit('showSnackbar', 'success')

          this.$refs.general_form.reset()
          this.$refs.employment_form.reset()
          this.$refs.additional_form.reset()

          this.mobiles = []
          this.telephones = []
          this.emails = []
          this.identifications = []
          this.addresses = []
          this.banks = []
          this.emergencies = []

          this.e6 = 1
        })
        .catch(function(error) {
          // handle error
          console.log(error)
          alert('err')
        })
    },
    addIdentification() {
      this.identifications.push({ type: this.id_type, value: this.id_value })
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
    },
    addMobile() {
      this.mobiles.push({ number: this.mobile, label: this.mobile_label })
      this.mobile = ''
      this.mobile_label = ''
    },
    addTele() {
      this.telephones.push({
        number: this.telephone,
        label: this.telephone_label
      })

      this.telephone = ''
      this.telephone_label = ''
    },
    addEmail() {
      this.emails.push({
        email: this.email,
        label: this.email_label
      })

      this.email = ''
      this.email_label = ''
    },
    addEmergency() {
      this.emergencies.push({
        emergency_name: this.emergency_name,
        emergency_number: this.emergency_number
      })

      this.emergency_name = ''
      this.emergency_number = ''
    },
    addBank() {
      this.banks.push({
        bank: this.bank,
        bank_name: this.bank_name,
        bank_number: this.bank_number
      })

      this.bank = ''
      this.bank_name = ''
      this.bank_number = ''
    },
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
    barangaysChange(e) {
      this.barangay = e.target.selectedOptions[0].text
    },
    next_tab(e) {
      if (e == 1) {
        if (this.$refs.general_form.validate()) {
          this.e6 = 2
        }
      }
      if (e == 2) {
        if (this.$refs.employment_form.validate()) {
          this.e6 = 3
        }
      }
    }
  }
}
</script>