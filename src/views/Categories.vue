<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<Loader v-if="loading" />
		<section v-else>
			<div class="row">
				<CategoryCreate @created="addNewCategory"/>
				<CategoryEdit v-if="categories.length" :categories="categories" @updated="updateCategory" @removed="removeCategory" />
				<p v-else>Вы еще не создали категории</p>
			</div>
		</section>
	</div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate.vue'
import CategoryEdit from '../components/CategoryEdit.vue'

export default {
	name: 'Categories',
	metaInfo: {
		title: 'Категории'
	},
	data(){
		return {
			loading: true,
			categories: []
		}
	},
	methods: {
		addNewCategory(category){
			this.categories.push(category)
		},
		updateCategory(category){
			const index = this.categories.findIndex(item => item.id === category.id)
			this.categories[index].title = category.title
			this.categories[index].limit = category.limit
		},
		removeCategory(id){
			this.categories = this.categories.filter(category => category.id !== id)
		}
	},
	async mounted(){
		this.categories = await this.$store.dispatch('fetchCategories')
		this.loading = false
	},
	components: {
		CategoryCreate, CategoryEdit
	}
}
</script>