<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<Loader v-if="loading" />

		<p class="center" v-else-if="!records.length">У вас нет записей. Вы можете <router-link to="/record">добавить новую запись</router-link></p>

		<template v-else>
			<div class="history-chart">
				<p class="center">Расходы по категориям</p><br>
				<canvas ref="canvas"></canvas>
			</div>
			<br>

			<section>
				<HistoryTable 
					:records="paginationItems"
				/>

				<div class="center">
					<br>
					<Paginate
						v-model="paginationPage"
						:page-count="paginationPageCount"
						:click-handler="paginationChangeHandler"
						:prev-text="'Назад'"
						:next-text="'Вперед'"
						:container-class="'pagination'"
						:page-class="'waves-effect'">
					</Paginate>
				</div>
			</section>
		</template>
	</div>
</template>

<script>
import paginationMixins from '../mixins/pagination.mixin'
import HistoryTable from '../components/HistoryTable.vue'

import { Pie } from 'vue-chartjs'

export default {
	name: 'History',
	metaInfo: {
		title: 'История записей'
	},
	extends: Pie,
	mixins: [paginationMixins],
	data(){
		return {
			loading: true,
			records: [],
		}
	},
	async mounted(){
		const categories = await this.$store.dispatch('fetchCategories')
		const records = await this.$store.dispatch('fetchRecords')
		records.reverse()

		this.records = records.map((record, index) => {
			const categoryTitle = categories.find(item => item.id === record.categoryId).title
			return {
				...record,
				categoryTitle,
				index: index + 1
			}
		})
		
		this.paginationSetup(this.records)

		this.loading = false

		// chart 
		if(!this.records.length) return
		
		this.$nextTick(() => {
			this.renderChart({
        labels: categories.map(category => category.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(category => {
            return this.records.reduce((total, record) => {
              if (record.categoryId === category.id && record.type === 'outcome') {
                total += +record.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
		})

		
	},
	components: {
		HistoryTable,
		//PieChart
	}
}
</script>