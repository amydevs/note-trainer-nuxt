<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-form @submit.prevent="handle_login">
            <v-card-text>
                <v-text-field label="Email" v-model="auth.email" />
                <v-text-field label="Password" type="password" v-if="show_passwd" v-model="auth.password" />
                <v-btn color="primary" type="submit">
                  Login
                </v-btn>
                <v-btn @click="auth.password = show_passwd ? undefined : ''">
                  Login With Password
                </v-btn>
                <v-btn @click="handle_reset_pw">
                  Reset Password
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
      auth: {
        email: '',
        password: undefined as string | undefined
      }
    }
  },

  methods: {
    async handle_login() {
      console.log("Logging in...");
      try {
        this.$accessor.SET_LOADING(true);
        const { user, error } = await this.$supabase.auth.signIn(
          this.auth,
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
    },
    async handle_reset_pw() {
      try {
        this.$accessor.SET_LOADING(true);
        const { data, error } = await this.$supabase.auth.api.resetPasswordForEmail(
          this.auth.email,
          {
            redirectTo: window.location.origin
          }
        )
        if (error) throw error

        alert("Check your email for the password reset link!")
      } catch (error: any) {
        alert(error.error_description || error.message)
      } finally {
        this.$accessor.SET_LOADING(false);
      }
    }
  },
  computed: {
    show_passwd(): boolean {
      return Boolean(this.auth.password || this.auth.password === '')
    }
  }
})
</script>
