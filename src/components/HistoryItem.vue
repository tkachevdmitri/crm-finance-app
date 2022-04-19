<template>
	<tr>
		<td>{{ record.index }}</td>
		<td>{{ record.amount | currency }}</td>
		<td>{{ record.date | date('date') }}</td>
		<td>{{ record.categoryTitle }}</td>
		<td>
			<span class="white-text badge red" v-if="record.type==='outcome'">Расход</span>
			<span class="white-text badge green" v-else>Доход</span>
		</td>
		<td>
			<router-link 
				:to="{ name: 'detail', params: { id: record.id }}" 
				tag="button" 
				class="btn-small btn"
				v-tooltip="'Посмотреть запись'"
			>
				<i class="material-icons">open_in_new</i>
			</router-link>
		</td>
	</tr>
</template>

<script>
export default {
	name: 'HistoryItem',
	props: {
		record: {
			required: true,
			type: Object
		}
	}
}
</script>