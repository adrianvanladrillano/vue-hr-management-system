import axios from 'axios'
export const state = () => ({
    employees: [],
    branches: [],
    departments: [],
    jobs: [],
    applications: [],
})

export const getters = {

}

export const mutations = {
    // Employees
    SET_EMPLOYEES(state, employees) {
        state.employees = employees
    },
    ADD_EMPLOYEES(state, payload) {
        state.employees.push(payload)
    },
    REMOVE_EMPLOYEES(state, id) {
        const index = state.employees.map(el => el._id).indexOf(id)
        state.employees.splice(index, 1)
    },
    // Branches
    SET_BRANCHES(state, branches) {
        state.branches = branches
    },
    ADD_BRANCHES(state, payload) {
        state.branches.push(payload)
        console.log(state.branches)
    },
    // Jobs
    SET_JOBS(state, jobs) {
        state.jobs = jobs
    },
    ADD_JOBS(state, payload) {
        state.jobs.push(payload)
        console.log(state.jobs)
    },
    // Departments
    SET_DEPTS(state, departments) {
        state.departments = departments
    },
    ADD_DEPTS(state, payload) {
        state.departments.push(payload)
        console.log(state.departments)
    },
    UPDATE_DEPTS(state, payload) {
        let index = state.departments.map(el => el._id).indexOf(payload._id)
        state.departments[index] = payload
        console.log(state.departments)
    },
    // Departments
    SET_APPS(state, applications) {
        state.applications = applications
    },
    ADD_APPS(state, payload) {
        state.applications.push(payload)
        console.log(state.applications)
    },
}

export const actions = {
    async get_employees({ commit }) {
        axios
            .get('http://192.168.100.77:8080/api/employees')
            .then(function (response) {
                commit('SET_EMPLOYEES', response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                // always executed
            })
    },
    async get_branches({ commit }) {
        axios
            .get('http://192.168.100.77:8080/api/branches')
            .then(function (response) {
                commit('SET_BRANCHES', response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                // always executed
            })
    },
    async get_jobs({ commit }) {
        axios
            .get('http://192.168.100.77:8080/api/jobs')
            .then(function (response) {
                commit('SET_JOBS', response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                // always executed
            })
    },
    async get_departments({ commit }) {
        axios
            .get('http://192.168.100.77:8080/api/departments')
            .then(function (response) {
                commit('SET_DEPTS', response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                // always executed
            })
    },
    async get_applications({ commit }) {
        axios
            .get('http://192.168.100.77:8080/api/applications')
            .then(function (response) {
                commit('SET_APPS', response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                // always executed
            })
    }
}