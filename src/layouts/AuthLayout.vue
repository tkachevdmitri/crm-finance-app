<template>
	<div class="grey darken-1 empty-layout">
		<router-view></router-view>
	</div>
</template>

<script>
import messages from '../utils/messages'

export default {
	computed: {
		error () {
			return this.$store.getters.getError
		}
	},
	watch: {
		error(error){
			if(error !== null){
				this.$error(messages[error] || 'Что то пошло не так')
				this.$store.commit('clearError');
			}
		}
	}
}
</script>