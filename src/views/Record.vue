<template>
	<div>
		<div class="page-title">
			<h3>Новая запись</h3>
		</div>
		
		<Loader v-if="loading" />

		<p class="center" v-else-if="!categories.length">У вас нет категорий. Вы можете <router-link to="/categories">добавить новую категорию</router-link></p>
		
		<form class="form" v-else @submit.prevent="submitHandler">
			<div class="input-field" >
				<select ref="select" v-model="form.categoryId">
					<option
						v-for="category in categories"
						:key="category.id"
						:value="category.id"
					>{{ category.title }}</option>
				</select>
				<label>Выберите категорию</label>
			</div>

			<p>
				<label>
					<input
							class="with-gap"
							name="type"
							type="radio"
							value="income"
							v-model="form.type"
					/>
					<span>Доход</span>
				</label>
			</p>

			<p>
				<label>
					<input
							class="with-gap"
							name="type"
							type="radio"
							value="outcome"
							v-model="form.type"
					/>
					<span>Расход</span>
				</label>
			</p>

			<div class="input-field">
				<input
						id="amount"
						type="number"
						v-model.number="form.amount"
						:class="{'invalid' : $v.form.amount.$error }"
				>
				<label for="amount">Сумма</label>
				<small 
					class="helper-text invalid"
					v-if="$v.form.amount.$dirty && !$v.form.amount.required"
				>
					Введите сумму
				</small>
				<small 
					class="helper-text invalid"
					v-if="$v.form.amount.$dirty && !$v.form.amount.minValue"
				>
					Минимальная величина {{ $v.form.amount.$params.minValue.min }}
				</small>
			</div>

			<div class="input-field">
				<input
						id="description"
						type="text"
						v-model="form.description"
						:class="{'invalid' : $v.form.description.$error }"
				>
				<label for="description">Описание</label>
				<small 
					class="helper-text invalid"
					v-if="$v.form.description.$dirty && !$v.form.description.required"
				>
					Введите описание
				</small>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Создать
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
	name: 'Record',
	metaInfo: {
		title: 'Новая запись'
	},
	data(){
		return {
			loading: true,
			categories: [],
			form: {
				categoryId: null,
				type: 'outcome',
				amount: 1,
				description: ''
			}
		}
	},
	validations: {
		form: {
			description: {
				required
			},
			amount: {
				required, 
				minValue: minValue(1)
			}
		}
	},
	computed: {
		info(){
			return this.$store.getters.info
		},
		canCreateRecord(){
			if(this.form.type === 'income') return true
			const bill = this.info.bill
			return bill >= this.form.amount
		}
	},
	methods: {
		async submitHandler(){
			if(this.$v.$invalid){
				this.$v.$touch()
				return
			}

			// can create order check
			if(this.canCreateRecord){
				try {
					await this.$store.dispatch('createRecord', {
						...this.form,
						date: new Date().toJSON()
					})

					// update bill
					const bill = this.form.type === 'outcome' ? this.info.bill - this.form.amount : this.info.bill + this.form.amount
					await this.$store.dispatch('updateInfo', {bill})

					// reset form
					this.$v.$reset()
					this.form.description = ''
					this.form.amount = 1
					

					this.$message(`Запись успешно создана`)
				} catch (error) {}
			} else {
				this.$message(`Не хватает средств на счете (${this.form.amount - this.info.bill})`)
			}
		}
	},
	async mounted(){
		this.categories = await this.$store.dispatch('fetchCategories')
		this.loading = false

		if(this.categories.length){
			this.form.categoryId = this.categories[0].id
		}

		this.$nextTick(() => {
      this.select = M.FormSelect.init(document.querySelectorAll('select'))
      M.updateTextFields()
    })
	}
}
</script>