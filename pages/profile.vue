<template>

</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async get_profile() {
      try {
        this.$accessor.SET_LOADING(true);

        let { data, error, status } = await this.$supabase
          .from("user_info")
          .select(`username`)
          .eq("id", this.$accessor.user?.id)
          .single()

        if (error && status !== 406) throw error

        if (data) {
          console.log(data);
        }
      } catch (error: any) {
        alert(error.message)
      } finally {
        this.$accessor.SET_LOADING(false);
      }
    }
  }
})
</script>
