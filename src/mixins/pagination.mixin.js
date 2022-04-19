import _ from 'lodash'

export default {
	data () {
		return {
			paginationPage: +this.$route.query.page || 1,
			paginationPageSize: 5,
			paginationPageCount: 0,
			paginationAllItems: [],
			paginationItems: []
		}
	},
	watch: {
		// для ситуации когда переходим со страниц с get параметром на стартовую страницу, без запуска paginationChangeHandler
		'$route'(to){
			if (!to.query.page){
				this.paginationPage = 1
				this.paginationItems = this.paginationAllItems[this.paginationPage - 1] || this.paginationAllItems[0]
			}
		}
	},
	methods: {
		paginationSetup(items){
			this.paginationAllItems = _.chunk(items, this.paginationPageSize)
			this.paginationPageCount = _.size(this.paginationAllItems)
			this.paginationItems = this.paginationAllItems[this.paginationPage - 1] || this.paginationAllItems[0]
		},
		paginationChangeHandler(page){
			if(page == 1)
				this.$router.replace(`${this.$route.path}`)
			else 
				this.$router.push({ query: { page } })
			
			this.paginationItems = this.paginationAllItems[page - 1] || this.paginationAllItems[0]
		}
	}
}