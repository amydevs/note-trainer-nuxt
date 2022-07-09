<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="update_profile">
          <v-text-field hide-details="auto" label="Username" v-model="user_info.username" />
          <div>
            Created {{ get_date(user_info.created_at) }}
          </div>
          <v-btn type="submit">
            Save
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { UserInfo, update_info, get_info } from '~/modules/user/info'

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
      let prom = await get_info(this, this.user_info.id)
      {
        this.user_info = prom ? prom : this.user_info
      }
    },

    async update_profile() {
      let prom = await update_info(this, this.user_info)
      {
        this.user_info = prom ? prom : this.user_info
      }
    },
    get_date(date: string) {
      let d = new Date(date);
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    }
  }
})
</script>
