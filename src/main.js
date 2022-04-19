import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import Loader from './components/app/Loader.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'

// firebase
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

Vue.use(Vuelidate)
Vue.use(VueMeta)

// custom plugins
import messagePlugin from './utils/message.plugin'
Vue.use(messagePlugin)

// custom filters
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)

// custom directives
import tooltipDirective from './directives/tooltip.directive'
Vue.directive('tooltip', tooltipDirective)

// global components
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)



Vue.config.productionTip = false

// firebase initialize
firebase.initializeApp({
  apiKey: "AIzaSyDZUPzW91DokpthKmGHtB7GhUPFBsPjL40",
  authDomain: "crm-pet-project.firebaseapp.com",
  projectId: "crm-pet-project",
  storageBucket: "crm-pet-project.appspot.com",
  messagingSenderId: "995941592483",
  appId: "1:995941592483:web:eded23d7f888307518fe16"
})

let app

firebase.auth().onAuthStateChanged(() => {
	if(!app){
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
})
