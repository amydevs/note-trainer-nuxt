<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn v-if="!$accessor.user" to="login" icon>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <div v-else>
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-overlay :value="$accessor.loading">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      title: 'Vuetify.js'
    }
  },
  async mounted() {
    this.$accessor.SET_USER(await this.$supabase.auth.user());
    this.$supabase.auth.onAuthStateChange((_, session) => {
      this.$accessor.SET_USER(session.user)
    })
  },
  methods: {
    async logout() {
      await this.$supabase.auth.signOut();
      this.$accessor.SET_USER(null);
    }
  }
}
</script>
