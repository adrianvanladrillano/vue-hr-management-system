<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" xl="4" style="background-color: white">
        <v-card
          class="d-flex justify-center align-center"
          color="white"
          flat
          tile
          style="height: 100vh"
        >
          <v-container class="px-15">
            <v-row>
              <v-col cols="12" xl="4">
                <v-img src="/hr_logo.jpg" contain style="width: 100%"></v-img>
              </v-col>
              <v-col cols="12" xl="8" class="text-center">
                <span style="font-size: 2.2em" class="font-weight-black"
                  >HR MANAGEMENT SYSTEM</span
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field outlined dense label="Username"></v-text-field>
                <v-text-field outlined dense label="Password"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn color="indigo" block dark>LOGIN</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" xl="8">
        <v-card
          class="d-flex justify-center align-center"
          color="indigo"
          flat
          tile
          style="height: 100vh"
        >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>
