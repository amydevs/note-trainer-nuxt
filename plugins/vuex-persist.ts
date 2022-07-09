import VuexPersistence from 'vuex-persist'
import { Plugin } from '@nuxt/types'
import { User } from 'nuxt-supabase'

const vuex_plugin: Plugin = ({ store }) => {
  new VuexPersistence({
    filter: (mutation) => {
      return mutation.type === 'SET_USER';
    }
  }).plugin(store);
}

export default vuex_plugin;
