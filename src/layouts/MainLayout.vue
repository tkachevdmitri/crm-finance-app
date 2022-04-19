<template>
	<Loader v-if="loading" />
	<div v-else class="app-main-layout">
    <Navbar v-on:toggleSidebar="isOpen = !isOpen"/>

    <Sidebar :toggleSidebar="isOpen" />

    <main class="app-content" :class="{'full' : !isOpen}">
      <div class="app-page">
				<router-view></router-view>
			</div>
		</main>

		<div class="fixed-action-btn">
			<router-link class="btn-floating btn-large blue" to="/record" v-tooltip:left="'Добавить новую запись'">
				<i class="large material-icons">add</i>
			</router-link>
		</div>
	</div>
</template>

<script>
import messages from '../utils/messages'
import Navbar from '../components/app/Navbar.vue'
import Sidebar from '../components/app/Sidebar.vue'

export default {
	name: 'MainLayout',
	data (){
		return {
			isOpen: true,
			loading: true
		}
	},
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
	},
	async mounted(){
		if(!Object.keys(this.$store.getters.info).length){
			await this.$store.dispatch('fetchInfo')
		}

		this.loading = false
	},
	components: { Navbar, Sidebar }
}
</script>