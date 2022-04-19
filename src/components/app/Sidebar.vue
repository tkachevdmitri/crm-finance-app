<template>
	<ul class="sidenav app-sidenav" :class="{'open': toggleSidebar}">
		<router-link
			v-for="link in links"
			:key="link.path"
			tag="li"
			active-class="active"
			:to="link.path"
			:exact="link.exact"
		>
			<a class="waves-effect waves-blue pointer">{{ link.title }}</a>
		</router-link>
	</ul>
</template>

<script>
export default {
	name: 'Sidebar',
	props: ['toggleSidebar'],
	data () {
		return {
			links: [
				{ path: '/', title: 'Счет', exact: true},
				{ path: '/history', title: 'История' },
				{ path: '/planning', title: 'Планирование' },
				{ path: '/record', title: 'Новая запись' },
				{ path: '/categories', title: 'Категории' }
			]
		}
	}
}
</script>