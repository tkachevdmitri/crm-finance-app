<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Редактировать</h4>
			</div>
			<form @submit.prevent="submitHandler">
				<div class="input-field" >
					<select ref="select" v-model="form.id">
						<option
							v-for="category in categories"
							:key="category.id"
							:value="category.id"
						>{{ category.title }}
						</option>
					</select>
					<label>Выберите категорию</label>
				</div>

				<div class="input-field">
					<input
							id="title"
							type="text"
							v-model="form.title"
							:class="{'invalid' : $v.form.title.$error }"
					>
					<label for="title">Название</label>
					<small 
						class="helper-text invalid"
						v-if="$v.form.title.$dirty && !$v.form.title.required"
					>
						Введите название
					</small>
				</div>

				<div class="input-field">
					<input
							id="limit"
							type="number"
							v-model="form.limit"
							:class="{'invalid' : $v.form.limit.$error }"
					>
					<label for="limit">Лимит</label>
					<small 
						class="helper-text invalid"
						v-if="$v.form.limit.$dirty && !$v.form.limit.required"
					>
						Введите лимит
					</small>
					<small 
						class="helper-text invalid"
						v-if="$v.form.limit.$dirty && !$v.form.limit.minValue"
					>
						Минимальная величина {{ $v.form.limit.$params.minValue.min }}
					</small>
				</div>

				<button class="btn waves-effect waves-light" type="submit">
					Обновить
					<i class="material-icons right">send</i>
				</button>
				&nbsp;&nbsp;
				<button class="btn waves-effect waves-light red" @click.prevent="removeHandler">
					Удалить
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
	name: 'CategoryEdit',
	props: {
		categories: {
			required: true,
			type: Array
		}
	},
	data () {
		return {
			form: {
				title: '',
				limit: 100,
				id: null
			}
		}
	},
	validations: {
		form: {
			title: {
				required
			},
			limit: {
				required, 
				minValue: minValue(100)
			}
		}
	},
	watch: {
		'form.id': function (value){
      const currentCategory = this.categories.find(item => item.id === value)
			this.form.id = currentCategory.id
			this.form.title = currentCategory.title
			this.form.limit = currentCategory.limit
    }
	},
	methods: {
		async submitHandler(){
			if(this.$v.$invalid){
				this.$v.$touch()
				return
			}

			try {
				await this.$store.dispatch('updateCategory', this.form)
				this.$message('Категория успешно обновлена')
				this.$emit('updated', this.form)

				this.updateSelect()
			} catch (error) {}
		},
		async removeHandler(){
			try {
				await this.$store.dispatch('removeCategory', this.form.id)
				// update bill
				const removeRecords = (await this.$store.dispatch('fetchRecords')).filter(record => record.categoryId === this.form.id)
				const removeRecordsIncome = removeRecords.reduce((total, record) => {
																			return record.type === 'income' ? total + record.amount : total
																		}, 0)
				const removeRecordsOutcome = removeRecords.reduce((total, record) => {
																			return record.type === 'outcome' ? total + record.amount : total
																		}, 0)
				const newBill = this.$store.getters.info.bill - removeRecordsIncome + removeRecordsOutcome

				await this.$store.dispatch('removeRecordsByCategoryId', this.form.id)
				await this.$store.dispatch('updateInfo', { bill: newBill  })
				

				this.$emit('removed', this.form.id)
				this.$message('Категория успешно удалена')

				this.$nextTick(() => {
					this.form.id = this.categories[0].id
					this.updateSelect()
				})
			} catch (error) {}
		},
		updateSelect(){
			// вспомогательный метод для обновления селекта (издержки Materialize)
      setTimeout(() => {
        window.M.FormSelect.init(document.querySelectorAll('select'))
      }, 0)
		}
	},
	created(){
		const currentCategory = this.categories[0]
		this.form.id = currentCategory.id
		this.form.title = currentCategory.title
		this.form.limit = currentCategory.limit
	},
	mounted(){
		M.FormSelect.init(this.$refs.select, {})
		M.updateTextFields()
	}
}
</script>