<template>
  <div>
    <v-row class="pt-1">
      <v-col cols="12" xl="4">
        <v-card class="px-5 py-5" outlined>
          <v-row dense>
            <v-col>
              <v-btn color="indigo" dark class="float-right">New File</v-btn>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title style="font-size: 1.5em"
                    >Files</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >List of all Branches</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card
                class="px-5 py-4 mb-4"
                @click="loadFile(index)"
                v-for="(item, index) in items"
                :key="index"
              >
                <v-list-item two-line>
                  <v-list-item-avatar>
                    <v-icon>mdi-folder</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Contract #1</v-list-item-title>
                    <v-list-item-subtitle
                      >Contract for XXX</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" xl="8" class="px-10 py-10">
        <v-card>
          <client-only>
            <vue-pdf
              :src="pdfSrc"
              :page="1"
              @num-pages="pdfPageCount = $event"
            ></vue-pdf>
          </client-only>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Contract #1',
          src: 'http://192.168.100.77:3000/sample.pdf'
        },
        {
          title: 'Contract #2',
          src: 'http://192.168.100.77:3000/sample.pdf'
        },
        {
          title: 'Contract #3',
          src: 'http://192.168.100.77:3000/222.pdf'
        },
        {
          title: 'Contract #4',
          src: 'http://192.168.100.77:3000/rrr.pdf'
        },
        {
          title: 'Contract #5',
          src: 'http://192.16xx8.100.77:3000/qwe.pdf'
        }
      ],
      pdfSrc: 'http://192.168.100.77:3000/222.pdf',
      pdfPageCount: 0
    }
  },
  methods: {
    loadFile(index) {
      this.pdfSrc = this.items[index].src
    }
  }
}
</script>
