<template>
	<div>
		<div class="page-title">
			<h3>Профиль</h3>
		</div>

		<form class="form" @submit.prevent="submitHandler">
			<div class="input-field">
				<input
						id="name"
						type="text"
						v-model="form.name"
						:class="{'invalid' : $v.form.name.$error }"
				>
				<label for="name">Имя</label>
				<small 
					class="helper-text invalid"
					v-if="$v.form.name.$dirty && !$v.form.name.required"
				>
					Введите имя
				</small>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Обновить
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
	name: 'Profile',
	metaInfo: {
		title: 'Профиль'
	},
	data () {
		return {
			form: {
				name: ''
			}
		}
	},
	validations: {
		form: {
			name: {
				required
			}
		}
	},
	computed: {
		info(){
			return this.$store.getters.info
		}
	},
	methods: {
		async submitHandler(){
			if(this.$v.$invalid){
				this.$v.$touch()
				return
			}

			await this.$store.dispatch('updateInfo', this.form)
			this.$message(`Профиль успешно обновлен`)
		}
	},
	mounted(){
		this.form.name = this.info.name

		this.$nextTick(() => {
      M.updateTextFields()
    })
	}
}
</script>