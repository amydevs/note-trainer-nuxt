import { User } from 'nuxt-supabase'
import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  loading: false,

  user: null as null | User
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  SET_LOADING: (state, user: typeof state.loading) => (state.loading = user),
  SET_USER: (state, user: typeof state.user) => (state.user = user),
})

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  mutations,
})
