<template>
  <div>
    <v-container class="px-8 py-15">
      <v-row class="px-16 mx-16">
        <v-col>
          <v-card>
            <v-row dense class="py-15 text-center">
              <v-col xl="12">
                <v-list-item two-line style="padding: 0">
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 1.5em"
                      >Create New Employee</v-list-item-title
                    >
                    <v-list-item-subtitle
                      >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Eius numquam laudantium error minus distinctio.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-stepper
              alt-labels
              v-model="e6"
              style="box-shadow: none"
              class="px-15"
            >
              <v-stepper-header style="box-shadow: none">
                <v-stepper-step step="1"> General Details </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2"> Job Details </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> Additional Details </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> Review </v-stepper-step>
              </v-stepper-header>

              <v-stepper-content step="1">
                <v-subheader class="font-weight-medium"
                  >General Information</v-subheader
                >
                <v-row dense class="mt-2">
                  <v-col xl="2">
                    <v-subheader>Full name</v-subheader>
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
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
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      label="Last name"
                      v-model="lastname"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col xl="2">
                    <v-subheader>Addtl</v-subheader>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      outlined
                      dense
                      label="Gender"
                      :items="select_gender"
                      v-model="gender"
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      outlined
                      dense
                      label="Nationality"
                      v-model="nationality"
                      :items="select_nationality"
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      outlined
                      dense
                      label="Civil Status"
                      :items="select_cstatus"
                      v-model="civil"
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
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      label="Place of Birth"
                      v-model="pob"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col xl="2">
                    <v-subheader>Address</v-subheader>
                  </v-col>

                  <v-col xl="2">
                    <v-combobox
                      outlined
                      dense
                      label="Label"
                      v-model="address_label"
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
                  <v-col xl="2"> </v-col>

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

                <v-row dense>
                  <v-col>
                    <v-btn
                      class="float-right px-10"
                      color="indigo"
                      @click="addAddress()"
                      dark
                      >Add
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row dense v-if="addresses.length != 0">
                  <v-col xl="2">
                    <v-subheader>Addresses</v-subheader>
                  </v-col>
                  <v-col xl="10">
                    <v-row dense>
                      <v-col
                        xl="12"
                        v-for="(add, index) in addresses"
                        :key="index"
                      >
                        <v-card flat>
                          <v-list-item two-line>
                            <v-list-item-avatar>
                              <v-icon color="indigo"> mdi-map-marker </v-icon>
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

                <v-subheader class="font-weight-medium mt-10"
                  >Educational Attainment</v-subheader
                >

                <v-row dense class="mt-2">
                  <v-col xl="2">
                    <v-subheader>School/University</v-subheader>
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
                        v-model="date"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
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
                          label="To"
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

                <v-subheader class="font-weight-medium mt-10"
                  >Contact Information</v-subheader
                >

                <v-row dense>
                  <v-col xl="2">
                    <v-subheader>Mobile</v-subheader>
                  </v-col>

                  <v-col>
                    <v-text-field
                      type="number"
                      outlined
                      dense
                      label="Mobile No."
                      v-model="mobile"
                    ></v-text-field>
                  </v-col>

                  <v-col xl="2">
                    <v-combobox
                      outlined
                      dense
                      label="Label"
                      v-model="mobile_label"
                    ></v-combobox>
                  </v-col>

                  <v-col xl="2">
                    <v-btn color="indigo" block @click="addMobile()" dark
                      >Add
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row dense v-if="mobiles.length != 0">
                  <v-col xl="2">
                    <v-subheader>Mobile #</v-subheader>
                  </v-col>
                  <v-col xl="10">
                    <v-row dense>
                      <v-col
                        xl="6"
                        v-for="(mobile, index) in mobiles"
                        :key="index"
                      >
                        <v-card flat>
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

                <v-row dense class="mt-7">
                  <v-col xl="2">
                    <v-subheader>Telephone</v-subheader>
                  </v-col>

                  <v-col>
                    <v-text-field
                      type="number"
                      outlined
                      dense
                      label="Telephone No."
                      v-model="telephone"
                    ></v-text-field>
                  </v-col>

                  <v-col xl="2">
                    <v-combobox
                      outlined
                      dense
                      label="Label"
                      v-model="telephone_label"
                    ></v-combobox>
                  </v-col>

                  <v-col xl="2">
                    <v-btn color="indigo" block @click="addTele()" dark
                      >Add</v-btn
                    >
                  </v-col>
                </v-row>

                <v-row dense v-if="telephones.length != 0">
                  <v-col xl="2">
                    <v-subheader>Telephone #</v-subheader>
                  </v-col>
                  <v-col xl="10">
                    <v-row dense>
                      <v-col
                        xl="6"
                        v-for="(tel, index) in telephones"
                        :key="index"
                      >
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

                <v-row dense class="mt-7">
                  <v-col xl="2">
                    <v-subheader>Email</v-subheader>
                  </v-col>

                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      label="Email Address"
                      v-model="email"
                    ></v-text-field>
                  </v-col>

                  <v-col xl="2">
                    <v-combobox
                      outlined
                      dense
                      label="Label"
                      v-model="label"
                    ></v-combobox>
                  </v-col>

                  <v-col xl="2">
                    <v-btn color="indigo" block @click="addEmail()" dark
                      >Add
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row dense v-if="emails.length != 0">
                  <v-col xl="2">
                    <v-subheader>Emails</v-subheader>
                  </v-col>
                  <v-col xl="10">
                    <v-row dense>
                      <v-col
                        xl="6"
                        v-for="(email, index) in emails"
                        :key="index"
                      >
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

                <v-subheader class="font-weight-medium"
                  >Emergency Contact</v-subheader
                >

                <v-row dense class="mt-7">
                  <v-col xl="2">
                    <v-subheader>Emergency Contacts</v-subheader>
                  </v-col>

                  <v-col xl="5">
                    <v-text-field
                      outlined
                      dense
                      label="Name"
                      v-model="emergency_name"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      label="Number"
                      v-model="emergency_number"
                    ></v-text-field>
                  </v-col>

                  <v-col xl="2">
                    <v-btn color="indigo" block @click="addEmergency()" dark
                      >Add
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row dense v-if="emergencies.length != 0">
                  <v-col xl="2">
                    <v-subheader>Emergency Contacts</v-subheader>
                  </v-col>
                  <v-col xl="10">
                    <v-row dense>
                      <v-col
                        xl="6"
                        v-for="(eme, index) in emergencies"
                        :key="index"
                      >
                        <v-card flat>
                          <v-list-item two-line>
                            <v-list-item-avatar>
                              <v-icon color="indigo">
                                mdi-account-alert
                              </v-icon>
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
                <div class="mt-8">
                  <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
                  <v-btn text> Cancel </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-subheader class="font-weight-medium"
                  >Employment Details</v-subheader
                >

                <v-row dense class="mt-5">
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
                    <v-subheader>Hired</v-subheader>
                  </v-col>
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
                      label="Date Resigned"
                      v-model="resigned"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col xl="2">
                    <v-subheader>Employee Assignment</v-subheader>
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
                      return-object
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
                      :items="select_contracts"
                      label="Contract"
                      v-model="contract"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
                <v-btn text @click="e6 = e6 - 1"> Cancel </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-subheader class="font-weight-medium"
                  >Identifications</v-subheader
                >
                <v-row dense>
                  <v-col xl="2">
                    <v-subheader>Numbers</v-subheader>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      :items="select_ids"
                      outlined
                      dense
                      label="ID"
                      v-model="id_type"
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      label="Number"
                      v-model="id_value"
                    ></v-text-field>
                  </v-col>
                  <v-col xl="2">
                    <v-btn color="indigo" dark @click="addIdentification()"
                      >Add Number</v-btn
                    >
                  </v-col>
                </v-row>

                <v-row>
                  <v-col xl="2">
                    <v-subheader></v-subheader>
                  </v-col>
                  <v-row>
                    <v-col>
                      <v-col
                        xl="6"
                        v-for="(iden, index) in identifications"
                        :key="index"
                      >
                        <v-card>
                          <v-list-item two-line>
                            <v-list-item-avatar>
                              <v-img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Social_Security_System_%28SSS%29.svg/1200px-Social_Security_System_%28SSS%29.svg.png"
                              ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ iden.value }}
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ iden.type }}</v-list-item-subtitle
                              >
                            </v-list-item-content>

                            <v-list-item-actions>
                              <v-btn
                                fab
                                small
                                elevation="0"
                                color="white"
                                @click="identifications.splice(index, 1)"
                                ><v-icon color="grey"
                                  >mdi-trash-can</v-icon
                                ></v-btn
                              >
                            </v-list-item-actions>
                          </v-list-item>
                        </v-card>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-row>

                <v-subheader class="font-weight-medium mt-10"
                  >Bank Details</v-subheader
                >
                <v-row dense>
                  <v-col xl="2">
                    <v-subheader>Bank</v-subheader>
                  </v-col>

                  <v-col xl="2">
                    <v-combobox
                      :items="select_banks"
                      outlined
                      dense
                      label="Bank"
                      v-model="bank"
                    ></v-combobox>
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      label="Account name"
                      v-model="bank_name"
                    ></v-text-field>
                  </v-col>
                  <v-col xl="3">
                    <v-text-field
                      outlined
                      dense
                      label="Account number"
                      v-model="bank_number"
                    ></v-text-field>
                  </v-col>
                  <v-col xl="2">
                    <v-btn block dense color="indigo" dark @click="addBank()"
                      >ADD</v-btn
                    >
                  </v-col>
                </v-row>

                <v-row>
                  <v-col xl="2">
                    <v-subheader></v-subheader>
                  </v-col>
                  <v-row>
                    <v-col>
                      <v-col xl="6" v-for="(bank, index) in banks" :key="index">
                        <v-card>
                          <v-list-item three-line>
                            <v-list-item-avatar>
                              <v-img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/BDO_Unibank_%28logo%29.svg/1200px-BDO_Unibank_%28logo%29.svg.png"
                              ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ bank.bank }}
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ bank.bank_name }}</v-list-item-subtitle
                              >
                              <v-list-item-subtitle>
                                {{ bank.bank_number }}</v-list-item-subtitle
                              >
                            </v-list-item-content>

                            <v-list-item-actions>
                              <v-btn
                                fab
                                small
                                elevation="0"
                                color="white"
                                @click="banks.splice(index, 1)"
                                ><v-icon color="grey"
                                  >mdi-trash-can</v-icon
                                ></v-btn
                              >
                            </v-list-item-actions>
                          </v-list-item>
                        </v-card>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-row>
                <div class="mt-5 float-right">
                  <v-btn text @click="e6 = e6 - 1"> Cancel </v-btn>
                  <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-row dense class="mt-2">
                  <v-col>
                    <v-text-field
                      dense
                      outlined
                      label="Position Title"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field dense outlined label="Company"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      dense
                      outlined
                      label="Monthly Salary"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field dense outlined label="From"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field dense outlined label="To"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      dense
                      outlined
                      label="Status of Employment"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn color="primary" @click="e6 = 5"> Continue </v-btn>
                <v-btn text @click="e6 = e6 - 1"> Cancel </v-btn>
              </v-stepper-content>

              <v-stepper-content step="5">
                <v-row dense class="mt-2">
                  <v-col>
                    <v-btn
                      color="primary"
                      @click="$emit('showSnackbar', 'success')"
                    >
                      Save
                    </v-btn>
                    <v-btn text> Cancel </v-btn>
                  </v-col>
                </v-row>
              </v-stepper-content>
            </v-stepper>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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

      // Builders
      telephone: '',
      email: '',
      id_type: '',
      id_value: '',

      region: null,
      province: null,
      city: null,
      barangay: null,
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
        .post('http://localhost:8080/api/employees', {
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

          // Arrs
          mobiles: this.mobiles,
          telephones: this.telephones,
          emails: this.emails,
          identifications: this.identifications,
          addresses: this.addresses,
          banks: this.banks,
          emergencies: this.emergencies
        })
        .then(response => {
          console.log(response)

          alert('asdad')
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
        barangay: this.barangay.brgy_name,
        city: this.city.city_name,
        province: this.province.province_name,
        region: this.region.region_name
      })
    },
    addMobile() {
      this.mobiles.push({ number: this.mobile, label: this.mobile_label })
    },
    addTele() {
      this.telephones.push({
        number: this.telephone,
        label: this.telephone_label
      })
    },
    addEmail() {
      this.emails.push({
        email: this.email,
        label: this.label
      })
    },
    addEmergency() {
      this.emergencies.push({
        emergency_name: this.emergency_name,
        emergency_number: this.emergency_number
      })
    },
    addBank() {
      this.banks.push({
        bank: this.bank,
        bank_name: this.bank_name,
        bank_number: this.bank_number
      })
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
    }
  }
}
</script>