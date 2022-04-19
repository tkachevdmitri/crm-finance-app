<template>
  <div>
		<div class="page-title">
			<h3>Счет</h3>

			<button class="btn waves-effect waves-light btn-small" @click="refresh">
				<i class="material-icons">refresh</i>
			</button>
		</div>

		<Loader v-if="loading" /> 
		<div v-else class="row">
			<Bill v-if="currency.rates" :rates="currency.rates" />
			<Currency v-if="currency.rates" :rates="currency.rates" :date="currency.date" />
		</div>
	</div>
</template>

<script>
import Bill from '../components/Bill.vue'
import Currency from '../components/Currency.vue'

export default {
  name: 'Home',
	metaInfo: {
		title: 'Система учета расходов и доходов'
	},
	data(){
		return {
			loading: true,
			currency: null
		}
	},
	methods: {
		async refresh(){
			this.loading = true
			this.currency = await this.$store.dispatch('fetchCurrency')
			this.loading = false
		}
	},
	async mounted(){
		this.currency = await this.$store.dispatch('fetchCurrency')
		this.loading = false
	},
	components: {
		Bill, Currency
	}
}
</script>
