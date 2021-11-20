<template>
  <div>
    <v-row class="mx-2">
      <v-col>
        <v-data-iterator
          :items="branches"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          :search="search"
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
        >
          <template v-slot:header>
            <v-row align="center">
              <v-col>
                <v-list-item two-line style="padding: 0">
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 1.5em"
                      >Branches</v-list-item-title
                    >
                    <v-list-item-subtitle
                      >List of all Branches</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col xl="4">
                <br />
                <v-text-field
                  outlined
                  dense
                  label="Search here.."
                  append-icon="mdi-magnify"
                  background-color="white"
                  v-model="search"
                  clearable
                  prepend-inner-icon="mdi-magnify"
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
                <v-btn
                  color="indigo"
                  dark
                  block
                  @click="$emit('showNewDialog')"
                >
                  <v-icon left> mdi-plus</v-icon> New Branch
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <template v-slot:default="props">
            <v-row class="mt-5">
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <v-card @click="$emit('showViewDialog', item._id)">
                  <v-list-item two-line>
                    <v-list-item-avatar width="72" height="72" tile>
                      <v-img
                        :src="
                          item.branch_logo == ''
                            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvwYAfmW3-gEbCKppFWFsF10REo2Bm1p3HADdjFVP6J4MNL1B4C4qQLXwFmbtqMouJyss&usqp=CAU'
                            : 'http://192.168.100.77:8080/' + item.branch_logo
                        "
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.branch_name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{
                          item.branch_address[0].street +
                          ' ' +
                          item.branch_address[0].barangay.brgy_name +
                          ' ' +
                          item.branch_address[0].city.city_name +
                          ' ' +
                          item.branch_address[0].province.province_name
                        }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Departments:
                        {{ countDepartment(item._id) }}

                        Jobs:
                        {{ countJobs(item._id) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
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
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 12,
      sortBy: 'name'
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
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    }
  },
  methods: {
    countDepartment(id) {
      // let index = this.branches.map(el => el._id).indexOf(id)
      let x = this.departments.filter(el => el.department_branch == id).length
      return x
    },
    countJobs(id) {
      // let index = this.branches.map(el => el._id).indexOf(id)
      let x = this.jobs.filter(el => el.job_branch == id).length
      return x
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    }
  }
}
</script>