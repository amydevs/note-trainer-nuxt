<template>
  <v-container>
    <v-card>
      <v-toolbar dense>
        <v-toolbar-title>
          Profile Info
        </v-toolbar-title>
      </v-toolbar>
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
    <v-card class="mt-3">
      <v-toolbar dense>
        <v-toolbar-title>
          Improvement Summary Graph
        </v-toolbar-title>
      </v-toolbar>
      <v-sparkline
        :labels="scores.map(e => e.score)"
        :value="scores.map(e => e.score)"
        auto-draw
      ></v-sparkline>
    </v-card>
    <v-card class="mt-3">
      <v-toolbar dense>
        <v-toolbar-title>
          Saved Scores ({{ scores.length }})
        </v-toolbar-title>
      </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="scores_with_dates"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { UserInfo, update_info, get_info } from '~/modules/user/info'
import { Score, get_scores_from_user_id } from '~/modules/user/score'

export default Vue.extend({
  data() {
    return {
      user_info: {
        id: this.$accessor.saved.user?.id,
      } as UserInfo,
      scores: [] as Score[],
      headers: [
        {
          text: "Score",
          value: "score"
        },
        {
          text: "Date",
          value: "created_at"
        }
      ],
    }
  },
  async mounted() {
    this.$accessor.SET_LOADING(true);
    await this.get_profile();
    await this.get_scores();
    this.$accessor.SET_LOADING(false);
  },
  methods: {
    async get_scores() {
      let prom = await get_scores_from_user_id(this, this.user_info.id)
      {
        this.scores = prom ? prom : this.scores;
      }
    },
    async get_profile() {
      let prom = await get_info(this, this.user_info.id)
      {
        this.user_info = prom ? prom : this.user_info;
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
  },
  computed: {
    scores_with_dates(): Score[] {
      return this.scores.map((e) => {e.created_at = this.get_date(e.created_at); return e;});
    }
  }
})
</script>
