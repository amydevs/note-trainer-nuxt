<template>

</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    async getProfile() {
      try {
        loading.value = true
        store.user = supabase.auth.user()

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", store.user.id)
          .single()

        if (error && status !== 406) throw error

        if (data) {
          username.value = data.username
          website.value = data.website
          avatar_url.value = data.avatar_url
        }
      } catch (error) {
        alert(error.message)
      } finally {
        loading.value = false
      }
    }
  }
})
</script>
