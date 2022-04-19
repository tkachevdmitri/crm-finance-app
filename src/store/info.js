import { getDatabase, ref, child, get, update } from "firebase/database"

export default {
	state: {
		info: {}
	},
	getters: {
		info(state){
			return state.info
		}
	},
	mutations: {
		setInfo(state, payload){
			state.info = payload
		},
		clearInfo(state){
			state.info = {}
		}
	},
	actions: {
		async fetchInfo({dispatch, commit}){
			try {
				const userId = await dispatch('getUid')
				const dbRef = ref(getDatabase())
				await get(child(dbRef, `users/${userId}/info`))
					.then((snapshot) => {
						if (snapshot.exists()) {
							commit('setInfo', snapshot.val())
						}
					})
					.catch((error) => {
						commit('setError', error)
						throw error
					})
			} catch (error) {
				commit('setError', error)
				throw error
			}
		},
		async updateInfo({dispatch, commit, getters}, payload){
			try {
				const userId = await dispatch('getUid')
				const db = getDatabase()
				const updateData = { ...getters.info, ...payload }
				await update(ref(db, 'users/' + userId + '/info/'), updateData)
				commit('setInfo', updateData)
			} catch (error) {
				commit('setError', error)
				throw error
			}
		}
	}
}