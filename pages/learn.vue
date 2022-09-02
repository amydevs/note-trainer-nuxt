<template>
  <v-container>
        <v-card>
          <v-card-title>{{ page.title }}</v-card-title>
          <v-card-text>
          <nuxt-content :document="page" />
          </v-card-text>
          <v-card-actions>
            <v-btn
              disabled
              color="primary"
              nuxt
              to="/play"
            >
              &lt;
            </v-btn>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              to="/play"
              disabled
            >
              &gt;
            </v-btn>
          </v-card-actions>
        </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue, { computed } from 'vue'
export default Vue.extend({
  async asyncData({ $content, route }) {
    let page = await $content(route.query.page).fetch();
    if (Array.isArray(page)) {
      page = page[0]
    }
    return { page }
  },
  mounted() {
  },
})
</script>
<style scoped>
img {
  max-height: 100%;
  max-width: 100%;
}
</style>
