<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="logo py-4 d-flex justify-center">
          <NuxtLogo />
          <VuetifyLogo />
        </v-card>
        <v-card>
          <v-card-title class="headline">
            Welcome to Note-Trainer
          </v-card-title>
          <v-card-text>
            Note-Trainer is a federated and free platform for music education. It provides activities and lessons to both high-school and independent students at no cost. For educators, it provides a comprehensive system for music theory lesson plans and allows them to better manage and supervise the learning of their music students.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              to="/play"
            >
              Play
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
