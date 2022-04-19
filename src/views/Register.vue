<template>
	<form class="card auth-card" @submit.prevent="submitHandler">
		<div class="card-content">
			<span class="card-title">Учет расходов и доходов</span>
			<div class="input-field">
				<input
						id="email"
						type="text"
						v-model.trim="form.email"
						:class="{'invalid' : $v.form.email.$error }"
				>
				<label for="email">Email</label>
				<small 
					class="helper-text invalid"
					v-if="$v.form.email.$dirty && !$v.form.email.required"
				>
					Введите email
				</small>
				<small 
					class="helper-text invalid"
					v-if="$v.form.email.$dirty && !$v.form.email.email"
				>
					Введите корректный email
				</small>
			</div>
			<div class="input-field">
				<input
						id="password"
						type="password"
						v-model.trim="form.password"
						:class="{'invalid' : $v.form.password.$error }"
				>
				<label for="password">Пароль</label>
				<small 
					class="helper-text invalid"
					v-if="$v.form.password.$dirty && !$v.form.password.required"
				>
					Введите пароль
				</small>
				<small 
					class="helper-text invalid"
					v-if="$v.form.password.$dirty && !$v.form.password.minLength"
				>
					Минимальная длина пароля {{ $v.form.password.$params.minLength.min }} символов. Вы ввели {{ form.password.length }}
				</small>
			</div>
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
			<p class="input-agree">
				<label>
					<input type="checkbox" v-model="form.agree" />
					<span :class="{'invalid' : $v.form.agree.$error }">С правилами согласен</span>
				</label>
			</p>
		</div>
		<div class="card-action">
			<div>
				<button
						class="btn waves-effect waves-light auth-submit"
						type="submit"
				>
					Зарегистрироваться
					<i class="material-icons right">send</i>
				</button>
			</div>
			<br>
			<p class="center">
				Уже есть аккаунт?
				<router-link to="/login">Войти!</router-link>
			</p>
		</div>
	</form>
</template>

<style scoped>
.input-agree .invalid{
	color: red;
}
</style>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
	name: "Register",
	metaInfo: {
		title: 'Регистрация'
	},
	data (){
		return {
			form: {
				email: '',
				password: '',
				name: '',
				agree: false
			}
		}
	},
	validations: {
		form: {
			email: {
				required, email
			},
			password: {
				required, 
				minLength: minLength(6)
			},
			name: {
				required
			},
			agree: {
				checked: value => value
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
				await this.$store.dispatch('register', this.form)
				this.$router.push('/')
			} catch (error) {
				
			}
		}
	}
}
</script>