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
          v-for="(item, i) in nav_routes"
          :key="i"
          :to="item.path"
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
      <v-btn v-if="!$accessor.saved.user" to="login" icon>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <div v-else>
        <v-btn icon to="profile">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-overlay :value="$accessor.loading"
        absolute>
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>

      <Nuxt />
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
import { routes } from '~/modules/routes';

export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      title: 'Vuetify.js'
    }
  },
  async mounted() {
    this.$router.beforeEach((_to, _from, next) => {
      this.$accessor.SET_LOADING(false);
      next();
    });

    this.$accessor.saved.SET_USER(await this.$supabase.auth.user());
    this.$supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT") {
        this.$accessor.saved.SET_USER(null);
        console.log("Logged out...");
      }
      else {
        this.$accessor.saved.SET_USER(session.user);
      }
    })
  },
  methods: {
    logout() {
      this.$supabase.auth.signOut();

      if (
        routes.findIndex((e) => {
          return (this.$router.match(e.path).hash == this.$route.hash) && e.logged_in_only
        }) !== -1
      ) {
        this.$router.push('/');
      }
    }
  },
  computed: {
    nav_routes() {
      return routes.filter(route => {
        if (!route.unlogged_in_only && !route.logged_in_only) {
          return true;
        }

        if (this.$accessor.saved.user) {
          return route.logged_in_only && route.show_in_nav;
        }
        else {
          return route.unlogged_in_only && route.show_in_nav;
        }
      });
    }
  }
}
</script>
