<script>
import { Pie } from 'vue-chartjs'
import { mapState, mapGetters } from 'vuex'

export default {
  extends: Pie,
  data: () => ({
    chartdata: {
      labels: ['Regular', 'Contractual', 'Consultant', 'Part-Time'],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom'
      }
    }
  }),
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
  mounted() {
    let data_regular = this.employees.filter(el => el.emp_type == 'Regular')
      .length
    let data_contractual = this.employees.filter(
      el => el.emp_type == 'Contractual'
    ).length
    let data_consultant = this.employees.filter(
      el => el.emp_type == 'Consultant'
    ).length
    let data_part = this.employees.filter(el => el.emp_type == 'Part-Time')
      .length

    this.chartdata.datasets.push({
      backgroundColor: ['#FFA000', '#3949AB', '#00BCD4', '#A7FFEB'],
      data: [data_regular, data_contractual, data_consultant, data_part]
    })
    this.renderChart(this.chartdata, this.options)
  }
}
</script>