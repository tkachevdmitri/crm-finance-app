import { getDatabase, ref, push, update, remove, child, get } from "firebase/database"

export default {
	state: {

	},
	getters: {

	},
	mutations: {

	},
	actions: {
		async createCategoy({dispatch, commit}, {title, limit}){
			try {
				const userId = await dispatch('getUid')
				const db = getDatabase()
				const categoryRef = await push(ref(db, 'users/' + userId + '/categories'), {
					title,
					limit
				})
				return { title, limit, id: categoryRef.key }
			} catch (error) {
				commit('setError', error)
				throw error
			}
		},
		async updateCategory({dispatch, commit}, {title, limit, id}){
			try {
				const userId = await dispatch('getUid')
				const db = getDatabase()
				await update(ref(db, 'users/' + userId + '/categories/' + id), {
					id, title, limit
				})
			} catch (error) {
				commit('setError', error)
				throw error
			}
		},
		async removeCategory({dispatch, commit}, id){
			try {
				const userId = await dispatch('getUid')
				const db = getDatabase()
				await remove(ref(db, 'users/' + userId + '/categories/' + id))
			} catch (error) {
				commit('setError', error)
				throw error
			}
		},
		async fetchCategories({dispatch, commit}){
			try {
				const userId = await dispatch('getUid')
				const dbRef = ref(getDatabase())
				let categories = []
				let data = await get(child(dbRef, `users/${userId}/categories`)).then(snapshot => snapshot.val())
				if(data){
					categories = Object.keys(data).map(key => ({id: key, ...data[key]}))
				}
				return categories	
			} catch (error) {
				commit('setError', error)
				throw error
			}
		},
		async fetchCategoryById({dispatch, commit}, {id}){
			try {
				const userId = await dispatch('getUid')
				const dbRef = ref(getDatabase())
				let category = await get(child(dbRef, `users/${userId}/categories/${id}`)).then(snapshot => snapshot.val())
				return category	
			} catch (error) {
				commit('setError', error)
				throw error
			}
		}
	}
}