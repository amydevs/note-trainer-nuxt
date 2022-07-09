import VuexPersistence from 'vuex-persist'
import { Plugin } from '@nuxt/types'

const vuex_plugin: Plugin = ({ store }) => {
  new VuexPersistence({
  /* your options */
  }).plugin(store);
}

export default vuex_plugin;
