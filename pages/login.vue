<template>
  <v-form @submit.prevent="handle_login">
    <v-text-field label="Email" v-model="email" />
    <v-btn type="submit">
      Login
    </v-btn>
  </v-form>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      email: '',
    }
  },

  methods: {
    async handle_login() {
      console.log("Logging in...");
      try {
        const { user, error } = await this.$supabase.auth.signIn({ email: this.email })
        if (error) throw error

        alert("Check your email for the login link!")

        this.$accessor.SET_USER(user);

      } catch (error: any) {
        alert(error.error_description || error.message)
      } finally {
      }
    }
  }
})
</script>
