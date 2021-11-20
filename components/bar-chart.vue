<script>
import { Bar } from 'vue-chartjs'
import { mapState, mapGetters } from 'vuex'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: [],
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
    let labels = this.branches.map(el => el._id)
    let get_data = []
    let get_labels = []

    labels.forEach(element => {
      let length = this.employees.filter(el => el.branch == element).length
      let branch_index = this.branches.map(el => el._id).indexOf(element)
      this.chartdata.datasets.push({
        label: this.branches[branch_index].branch_name,
        data: [length],
        backgroundColor: ['#3949AB'],
        borderWidth: 1
      })
    })

    this.chartdata.labels = get_labels

    this.renderChart(this.chartdata, this.options)
  }
}
</script>