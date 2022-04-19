import { getDatabase, ref, push, update, child, get } from "firebase/database"

export default {
	actions: {
		async createRecord({dispatch, commit}, payload){
			try {
				const userId = await dispatch('getUid')
				const db = getDatabase()
				await push(ref(db, 'users/' + userId + '/records'), payload)
				return payload
			} catch (error) {
				commit('setError', error)
				throw error
			}
		},
		async fetchRecords({dispatch, commit}){
			try {
				const userId = await dispatch('getUid')
				const dbRef = ref(getDatabase())
				let records = []
				let data = await get(child(dbRef, `users/${userId}/records`)).then(snapshot => snapshot.val())
				if(data){
					records = Object.keys(data).map(key => ({id: key, ...data[key]}))
				}
				return records	
			} catch (error) {
				commit('setError', error)
				throw error
			}
		},
		async fetchRecordById({dispatch, commit}, {id}){
			try {
				const userId = await dispatch('getUid')
				const dbRef = ref(getDatabase())
				let record = await get(child(dbRef, `users/${userId}/records/${id}`)).then(snapshot => snapshot.val())
				return record	
			} catch (error) {
				commit('setError', error)
				throw error
			}
		},
		async removeRecordsByCategoryId({dispatch, commit}, id){
			try {
				const userId = await dispatch('getUid')
				const dbRef = ref(getDatabase())
				let recordsRemoveKeys = []
				let data = await get(child(dbRef, `users/${userId}/records`)).then(snapshot => snapshot.val())
				if(data){
					recordsRemoveKeys = Object.keys(data).filter(key => data[key].categoryId == id)
				}
				const updates = {}
				if(recordsRemoveKeys.length){
					recordsRemoveKeys.forEach(key => {
						updates[`users/${userId}/records/${key}`] = null
					})
				}
				return update(dbRef, updates)
			} catch (error) {
				commit('setError', error)
				throw error
			}
		}
	}
}