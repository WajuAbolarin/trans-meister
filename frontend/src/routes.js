import TransactionDetails from './pages/TransactionDetails.vue'
import TransactionList from './pages/TransactionList.vue'

const routes = [
  { path: '/', component: TransactionList, props: (route) => ({ query: route.query }) },
  { path: '/:id', component: TransactionDetails, name: 'details', props: true },
]

export default routes
