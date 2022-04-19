<template>
	<table>
		<thead>
		<tr>
			<th>#</th>
			<th>Сумма</th>
			<th>Дата</th>
			<th>Категория</th>
			<th>Тип</th>
			<th>Открыть</th>
		</tr>
		</thead>

		<tbody>
			<HistoryItem
				v-for="record in records"
				:key="record.id"
				:record="record"
				/>
		</tbody>
	</table>
</template>

<script>
import HistoryItem from '../components/HistoryItem.vue'

export default {
	name: 'HistoryTable',
	props: {
		records: {
			required: true,
			type: Array
		}
	},
	components: {
		HistoryItem
	}
}
</script>