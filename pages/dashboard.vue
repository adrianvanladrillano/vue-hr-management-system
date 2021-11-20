<template>
  <div>
    <v-container fill-height class="px-10 py-10">
      <v-row>
        <v-col cols="12" xl="4">
          <h1>Hello, Adrian Van</h1>
          <p class="text--secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="px-3 py-3">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <h1>{{ employees.length }}</h1>
                </v-list-item-title>
                <v-list-item-subtitle>Total Employees</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-icon x-large color="indigo">mdi-account</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="px-3 py-3">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <h1>{{ branches.length }}</h1>
                </v-list-item-title>
                <v-list-item-subtitle>Total Branches</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-icon x-large color="indigo">mdi-account</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="px-3 py-3">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <h1>{{ departments.length }}</h1>
                </v-list-item-title>
                <v-list-item-subtitle>Total Departments</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar>
                <v-icon x-large color="indigo">mdi-account</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="px-3 py-3">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <h1>{{ jobs.length }}</h1>
                </v-list-item-title>
                <v-list-item-subtitle>Total Jobs</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar>
                <v-icon x-large color="indigo">mdi-account</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="px-3 py-3">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <h1>{{ applications.length }}</h1>
                </v-list-item-title>
                <v-list-item-subtitle>Total Applications</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar>
                <v-icon x-large color="indigo">mdi-account</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xl="8">
          <v-card class="px-2 py-2">
            <v-card-title>Something here..</v-card-title>
            <v-card-text>
              <bar-chart></bar-chart>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" xl="4">
          <v-card class="px-2 py-2">
            <v-card-title>Something here..</v-card-title>
            <v-card-text>
              <pie-chart />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xl="6">
          <v-card class="px-2 py-2">
            <v-card-title>Something here..</v-card-title>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" xl="6">
          <v-card class="px-2 py-2">
            <v-card-title>Something here..</v-card-title>
            <v-card-text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
              iste impedit perspiciatis numquam beatae nesciunt, voluptatibus
              earum magnam? Aperiam quisquam incidunt recusandae laudantium
              fugit suscipit nisi perspiciatis nobis id autem.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  async fetch({ store }) {
    await store.dispatch('get_employees')
    await store.dispatch('get_branches')
    await store.dispatch('get_departments')
    await store.dispatch('get_jobs')
    await store.dispatch('get_applications')
  },
  components: {},
  data() {
    return {}
  },

  computed: {
    ...mapGetters(['mergedList']),
    filterProducts: function() {
      return this.filterProductsByRange(
        this.filterProductsByName(
          this.filterProductsByName2(
            this.filterProductsByCategory(this.products)
          )
        )
      )
    },
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
  methods: {}
}
</script>
