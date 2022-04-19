<template>
	<form class="card auth-card" @submit.prevent="sumbmitHandler">
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
		</div>
		<div class="card-action">
			<div>
				<button
						class="btn waves-effect waves-light auth-submit"
						type="submit"
				>
					Войти
					<i class="material-icons right">send</i>
				</button>
			</div>
			<br>
			<p class="center">
				Нет аккаунта?
				<router-link to="/register">Зарегистрироваться</router-link>
			</p>
		</div>
	</form>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import messages from '../utils/messages'

export default {
	name: 'Login',
	metaInfo: {
		title: 'Авторизация'
	},
	data () {
		return {
			form: {
				email: '',
				password: ''
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
			}
		}
	},
	methods: {
		async sumbmitHandler(){
			if(this.$v.$invalid){
				this.$v.$touch()
				return
			}

			try {
				await this.$store.dispatch('login', this.form)
				this.$router.push('/');
			} catch (error) {

			}
		}
	},
	mounted(){
		if(messages[this.$route.query.message]){
			this.$message(messages[this.$route.query.message])
		}
	}
}
</script>