import firebase from "firebase/compat/app"
import { getDatabase, ref, set } from "firebase/database";

export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
		async login({dispatch, commit}, {email, password}){
			try {
				const response = await firebase.auth().signInWithEmailAndPassword(email, password)
				const userId = await dispatch('getUid')
			} catch (error) {
				commit('setError', error.code)
				throw error
			}
		},
		async register({dispatch, commit}, {email, password, name}){
			try {
				const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
				const userId = response.user ? response.user.uid : null

				const db = getDatabase()
				set(ref(db, 'users/' + userId + '/info'), {
					name,
					bill: 10000
				});
			} catch (error) {
				commit('setError', error.code)
				throw error
			}
		},
		async logout({commit}){
			await firebase.auth().signOut() 
			commit('clearInfo')
		},
		getUid(){
			const user = firebase.auth().currentUser
			return user ? user.uid : null
		}
  }
}
