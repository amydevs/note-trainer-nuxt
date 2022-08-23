import { User } from 'nuxt-supabase'
import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  user: null as null | User,
  dark: false
})

export const mutations = mutationTree(state, {
  SET_USER: (state, user: typeof state.user) => (state.user = user),
  SET_DARK: (state, bool: boolean) => (state.dark = bool)
})
