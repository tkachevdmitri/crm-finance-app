import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/compat/app"
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'


Vue.use(VueRouter)

const routes = [
	// main layouts routes
  {
    path: '/',
    component: MainLayout,
		children: [
			{
				path: '',
				name: 'home',
				meta: {auth: true},
				component: () => import('../views/Home.vue'),
			},
			{
				path: 'categories',
				name: 'categories',
				meta: {auth: true},
				component: () => import('../views/Categories.vue')
			},
			{
				path: 'record',
				name: 'record',
				meta: {auth: true},
				component: () => import('../views/Record.vue')
			},
			{
				path: 'detail/:id',
				name: 'detail',
				meta: {auth: true},
				component: () => import('../views/Detail.vue')
			},
			{
				path: 'history',
				name: 'history',
				meta: {auth: true},
				component: () => import('../views/History.vue')
			},
			{
				path: 'planning',
				name: 'planning',
				meta: {auth: true},
				component: () => import('../views/Planning.vue')
			},
			{
				path: 'profile',
				name: 'profile',
				meta: {auth: true},
				component: () => import('../views/Profile.vue')
			}
		]
  },
	// auth layouts routes
	{
    path: '/',
    component: AuthLayout,
		children: [
			{
				path: 'login',
				name: 'login',
				component: () => import('../views/Login.vue')
				
			},
			{
				path: 'register',
				name: 'register',
				component: () => import('../views/Register.vue')
			}
		]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser
	const requireAuth = to.meta.auth

	if(requireAuth && !currentUser){
		next('/login?message=auth')
	} else if (!requireAuth && currentUser) {
		next('/')
	} else {
		next()
	}
})


export default router
