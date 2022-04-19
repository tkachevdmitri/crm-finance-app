import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import currency from './currency'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		error: null
  },
  getters: {
		getError(state){
			return state.error
		}
  },
  mutations: {
		setError(state, error){
			console.log('setError', error)
			state.error = error
		},
		clearError(state){
			state.error = null
		}
  },
  actions: {
  },
  modules: {
		auth, info, currency, category, record
  }
})
