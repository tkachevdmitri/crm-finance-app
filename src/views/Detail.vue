<template>
	<div>
		<Loader v-if="loading" />

		<template v-else-if="record">
			<div class="breadcrumb-wrap">
				<router-link to="/history" class="breadcrumb">История</router-link>
				<a class="breadcrumb">
					{{ record.typeText }}
				</a>
			</div>
			<div class="row">
				<div class="col s12 m6">
					<div class="card" :class="[record.typeClass]">
						<div class="card-content white-text">
							<p>Описание: {{ record.description }}</p>
							<p>Сумма: {{ record.amount | currency }}</p>
							<p>Категория: {{ record.categoryTitle }}</p>

							<small>{{ record.date | date }}</small>
						</div>
					</div>
				</div>
			</div>
		</template>

		<p v-else class="center">Ошибка. Запись с таким id не найдена.</p>
	</div>
</template>

<script>
export default {
	name: 'Detail',
	metaInfo: {
		title: 'Информация о записи'
	},
	data () {
		return {
			loading: true,
			record: null,
			category: null
		}
	},
	async mounted() {
		const record = await this.$store.dispatch('fetchRecordById', { id: this.$route.params.id })
		const category = await this.$store.dispatch('fetchCategoryById', {id: record.categoryId})

		record.typeText = record.type === 'income' ? 'Доход' : 'Расход'
		record.typeClass = record.type === 'income' ? 'green' : 'red'
		record.categoryTitle = category.title

		this.record = record
		this.loading = false
	}
}
</script>