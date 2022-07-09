import { User } from 'nuxt-supabase'
import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'

import * as saved from './saved';

export const state = () => ({
  loading: false,
})

export const mutations = mutationTree(state, {
  SET_LOADING: (state, user: typeof state.loading) => (state.loading = user),
})

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  mutations,
  modules: {
    saved
  }
})
