<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>
			
			<form @submit.prevent="submitHandler">
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
					Создать
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
	name: 'CategoryCreate',
	data (){
		return {
			form: {
				title: '',
				limit: 100
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
	methods: {
		async submitHandler(){
			if(this.$v.$invalid){
				this.$v.$touch()
				return
			}

			try {
				const category = await this.$store.dispatch('createCategoy', this.form)

				// reset form
				this.form.title = ''
				this.form.limit = 100
				this.$v.$reset()

				this.$message('Категория успешно создана')
				this.$emit('created', category)
				
				this.updateSelect()
			} catch (error) {}
		},
		updateSelect(){
			// вспомогательный метод для обновления селекта (издержки Materialize)
      setTimeout(() => {
        window.M.FormSelect.init(document.querySelectorAll('select'))
      }, 0)
		}
	},
	mounted(){
		M.updateTextFields()
	}
}
</script>