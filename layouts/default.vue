<template>
  <v-app dark>
    <v-navigation-drawer
      app
      width="300"
      v-model="drawer"
      v-if="$route.name != 'index'"
    >
      <v-list-item class="px-7 py-2">
        <v-list-item-avatar
          width="100"
          height="100"
          style="padding: 0; margin: 0"
        >
          <v-img src="/hr_logo.jpg" contain></v-img>
        </v-list-item-avatar>
        <v-list-item-content style="padding: 0; margin: 0">
          <v-list-item-title style="font-size: 2.2em" class="font-weight-bold"
            >HRS</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list nav dense class="px-7">
        <v-list-item
          link
          router
          exact
          to="a"
          color="indigo"
          dark
          style="background: #3f51b5"
          class="my-3"
        >
          <v-list-item-title
            class="font-weight-medium"
            style="font-size: 1em; opacity: 1"
            >Scan</v-list-item-title
          >
          <v-list-item-icon>
            <v-icon color="white">mdi-qrcode</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-subheader style="font-size: 1em" class="text--secondary">
          Tools
        </v-subheader>
        <v-list-item
          link
          router
          exact
          :to="nav.route"
          v-for="nav in navigations"
          :key="nav.route"
          class="my-3"
        >
          <v-list-item-icon>
            <v-icon color="indigo">{{ nav.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title
            class="font-weight-medium"
            style="font-size: 1em; opacity: 0.6"
            >{{ nav.title }}</v-list-item-title
          >
        </v-list-item>
        <v-subheader style="font-size: 1em" class="text--secondary"
          >Account</v-subheader
        >
        <v-list-item link router exact to="a" color="indigo" class="my-3">
          <v-list-item-icon>
            <v-icon color="indigo">mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title
            class="font-weight-medium"
            style="font-size: 1em; opacity: 0.6"
            >Settings
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="background: #f8f9fe">
      <v-app-bar color="white" v-if="$route.name != 'index'">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-avatar color="primary" size="56">
          <v-img
            src="https://i.pinimg.com/originals/bf/57/02/bf57026ee75af2f414000cec322f7404.gif"
          ></v-img>
        </v-avatar>
      </v-app-bar>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      navigations: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          route: '/Dashboard'
        },
        {
          icon: 'mdi-account',
          title: 'Employees',
          route: '/Employees'
        },
        {
          icon: 'mdi-office-building',
          title: 'Company',
          route: '/Branches'
        },
        {
          icon: 'mdi-folder',
          title: 'Applications',
          route: '/Apps'
        }
        // {
        //   icon: 'mdi-folder',
        //   title: 'Files',
        //   route: '/Files'
        // },
        // {
        //   icon: 'mdi-file',
        //   title: 'Reports',
        //   route: '/Reports'
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted() {
    console.log(this.$route.name)
  }
}
</script>
