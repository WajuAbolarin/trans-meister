import TransactionDetails from './pages/TransactionDetails.vue'
import TransactionList from './pages/TransactionList.vue'

const routes = [
  { path: '/', component: TransactionList },
  { path: '/:id', component: TransactionDetails, name: 'details' },
]

export default routes
