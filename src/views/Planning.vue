<template>
	<div>
		<div class="page-title">
			<h3>Планирование</h3>
			<h4>{{ info.bill | currency }}</h4>
		</div>

		<Loader v-if="loading" />

		<p class="center" v-else-if="!categories.length">У вас нет категорий. Вы можете <router-link to="/categories">добавить новую категорию</router-link></p>

		<section v-else>
			<PlanningItem
				v-for="category in categories"
				:key="category.id"
				:category="category"
			/>
		</section>
	</div>
</template>


<script>
import PlanningItem from '../components/PlanningItem.vue'
import currencyFilter from '../filters/currency.filter'

export default {
	name: 'Planning',
	metaInfo: {
		title: 'Планирование'
	},
	data () {
		return {
			loading: true,
			categories: []
		}
	},
	computed: {
		info(){
			return this.$store.getters.info
		}
	},
	async mounted(){
		try {
			const categories = await this.$store.dispatch('fetchCategories')
			const records = await this.$store.dispatch('fetchRecords')

			this.categories = categories.map(category => {
				let spend = records
											.filter(item => item.categoryId === category.id && item.type === 'outcome')
											.reduce((total, item) => {
												return total += +item.amount
											}, 0)

				let percent = (spend / category.limit) * 100
				let progressPercent = percent > 100 ? 100 : percent
				let progressClass = progressPercent < 60 ? 'green' : progressPercent < 100 ? 'yellow' : 'red'

				// tooltip
				let tooltipValue = currencyFilter(Math.abs(spend - category.limit))
				let tooltip = spend > category.limit ? `Превышен на ${tooltipValue}` : `Остаток ${tooltipValue}` 

				return {
					...category,
					spend,
					progressPercent,
					progressClass,
					tooltip
				}
			})

			this.loading = false
		} catch (error) {}
	},
	components: {
		PlanningItem
	}
}
</script>