<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-form @submit.prevent="handle_login">
            <v-card-text>
                <v-text-field label="Email" v-model="email" />
                <v-btn type="submit">
                  Login
                </v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue, { computed } from 'vue'
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
        this.$accessor.SET_LOADING(true);
        const { user, error } = await this.$supabase.auth.signIn(
          {
             email: this.email,
          },
          {
            redirectTo: window.location.origin
          }
        )
        if (error) throw error

        alert("Check your email for the login link!")

        this.$accessor.saved.SET_USER(user);

      } catch (error: any) {
        alert(error.error_description || error.message)
      } finally {
        this.$accessor.SET_LOADING(false);
      }
    }
  }
})
</script>
