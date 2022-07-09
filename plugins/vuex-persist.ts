import VuexPersistence from 'vuex-persist'
import { Plugin } from '@nuxt/types'
import { User } from 'nuxt-supabase'

const vuex_plugin: Plugin = ({ store }) => {
  new VuexPersistence({
    modules: ['saved']
  }).plugin(store);
}

export default vuex_plugin;
