export default {
	actions: {
		async fetchCurrency(){
			try {
				let key = process.env.VUE_APP_FIXER
				//key = '47ee3a09947f20f07f77adcd856a037e'
				key = '26b3615e1387e87e7b0cb1a84ac7f2c6'
				const response = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
				return await response.json()
			} catch (error) {
				commit('setError', error)
				throw error
			}
			
		}
	}
}