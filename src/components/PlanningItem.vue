<template>
	<div>
		<p>
			<strong>{{ category.title }}:</strong>
			{{ category.spend | currency }} из {{ category.limit | currency }}
		</p>
		<div class="progress" v-tooltip="category.tooltip">
			<div
					class="determinate"
					:class="category.progressClass"
					:style="{'width': category.progressPercent + '%'}"
			></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PlanningItem',
	props: ['category']
}
</script>