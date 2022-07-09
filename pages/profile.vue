<template>
  <v-form @submit.prevent="update_profile">
    <v-text-field label="Username" v-model="user_info.username" />
    <v-btn type="submit">
      Save
    </v-btn>
  </v-form>
</template>
<script lang="ts">
import Vue from 'vue'
import { UserInfo } from '~/modules/user/info'

export default Vue.extend({
  data() {
    return {
      user_info: {
        id: this.$accessor.saved.user?.id,
      } as UserInfo
    }
  },
  async mounted() {
    this.$accessor.SET_LOADING(true);
    await this.get_profile();
    this.$accessor.SET_LOADING(false);
  },
  methods: {
    async get_profile() {
      try {
        this.$accessor.SET_LOADING(true);

        let { data, error, status } = await this.$supabase
          .from("user_info")
          .select(`*`)
          .eq("id", this.$accessor.saved.user?.id)
          .single()

        if (error && status !== 406) throw error
        else {
          await this.update_profile();
        }

        if (data) {
          this.user_info = data;
        }
      } catch (error: any) {
        alert(error.message)
      } finally {
        this.$accessor.SET_LOADING(false);
      }
    },

    async update_profile() {
      try {
        this.$accessor.SET_LOADING(true);

        let { data, error } = await this.$supabase.from("user_info").upsert(this.user_info);

        let found_data = (data as UserInfo[] | null)?.at(0);
        if (found_data) {
          this.user_info = found_data;
        }

        if (error) throw error
      } catch (error: any) {
        alert(error.message)
      } finally {
        this.$accessor.SET_LOADING(false);
      }
    }
  }
})
</script>
