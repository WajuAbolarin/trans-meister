<script>
import { ref, watch, computed, watchEffect } from 'vue'
import { useQuery } from '@urql/vue'
import { getTransactions } from '../api/queries'
function formatInput(date) {
  let [d, m, y] =
    date instanceof Date ? date.toLocaleDateString().split('/') : new Date(date).toLocaleDateString().split('/')
  return [y, m, d].join('-')
}
const SIZE = 20
let initialPagination = {
  currentPage: 1,
  startOffset: 1,
  totalCount: 0,
}
export default {
  setup(props) {
    let startMonth = ref()
    let endMonth = ref()
    let after = ref(null)
    let pagination = ref(initialPagination)
    let variables = ref({
      startMonth: '2020-01',
      endMonth: '2020-08',
      take: SIZE,
      after: null,
    })

    const result = useQuery({
      query: getTransactions,
      variables: variables.value,
    })

    watch([after], ([cursor]) => {
      console.log({ cursor })
    })
    watch(result.data, (v) => {
      after.value = v.transactionList.connection.cursor
      pagination.value.currentPage = 2
    })

    function handleSubmit() {
      variables.value.startMonth = startMonth.value.replace(/-\d+$/, '')
      variables.value.endMonth = endMonth.value.replace(/-\d+$/, '')
      variables.value.after = after.value
      variables.value.take = Math.abs(SIZE)
      pagination.value = initialPagination
    }

    function toPage(pageNumber, forward = true) {
      variables.value.take = SIZE * forward ? 1 : -1

      pagination.value.currentPage = Math.max((pagination.value.currentPage += forward ? 1 : -1), 0)
      pagination.value.startOffset = 100
    }
    function transformDate(value) {
      return new Date(value).toLocaleString()
    }
    return {
      data: result.data,
      fetching: result.fetching,
      error: result.error,
      transformDate,
      startMonth,
      endMonth,
      handleSubmit,
      toPage,
    }
  },
}
</script>

<template>
  <main class="pt-16 px-10 space-y-8">
    <h1 class="text-lg">Transanctions List</h1>
    <header>
      <form @submit.prevent="handleSubmit" class="flex w-1/3 space-x-6">
        <label class="flex flex-col w-1/2">
          <span class="text-xs font-bold uppercase tracking-wide"> Start Month </span>
          <input v-model="startMonth" type="date" class="h-12 indent-2 border-slate-600 rounded-sm" />
        </label>

        <label class="flex flex-col w-1/2">
          <span class="text-xs font-bold uppercase tracking-wide"> End Month </span>
          <input v-model="endMonth" type="date" class="h-12 indent-2 border-slate-600 rounded-sm" />
        </label>

        <button type="submit" class="px-8 self-end py-3 rounded bg-slate-700 text-slate-50">Filter</button>
      </form>
    </header>
    <table
      class="table-auto order-collapse border border-slate-400 rounded-md w-full"
      :class="{ fetching: 'opacity-50 pointer-events-none' }"
    >
      <thead class="bg-slate-600 text-slate-100 rounded-md">
        <tr class="border border-slate-400 rounded-md">
          <th class="border border-slate-400 px-4 py-4 text-left">Account</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Description</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Category</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Reference</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Currency</th>
          <th class="border border-slate-400 px-4 py-4 text-center">Amount</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Status</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Transaction Date</th>
        </tr>
      </thead>
      <tbody class="text-sm font-medium text-slate-700">
        <tr
          v-if="data?.transactionList"
          class="border border-slate-300 cursor-pointer"
          @click="$router.push({ name: 'details', params: { id: transaction.id } })"
          v-for="transaction in data?.transactionList.nodes"
        >
          <td class="border border-slate-300 px-2 py-2">{{ transaction.account.name }}</td>
          <td class="border border-slate-300 px-2 py-2">{{ transaction.description }}</td>
          <td class="border border-slate-300 px-2 py-2">{{ transaction.category?.name }}</td>
          <td class="border border-slate-300 px-2 py-2">{{ transaction.reference }}</td>
          <td class="border border-slate-300 px-2 py-2">{{ transaction.currency }}</td>
          <td class="border border-slate-300 px-2 py-2 text-right pr-2">{{ transaction.amount }}</td>
          <td class="border border-slate-300 px-2 py-2">{{ transaction.status }}</td>
          <td class="border border-slate-300 px-2 py-2">{{ transformDate(transaction.transactionDate) }}</td>
        </tr>
      </tbody>
    </table>
    <footer class="flex justify-between w-full items-center">
      <p class="w-2/3" v-if="data?.transactionList?.connection">
        Showing 1-20 of {{ data?.transactionList.connection.totalCount }} transactions
        <span class="w-2 border-l-2 h-6 border-slate-800 mx-6 inline-block align-middle"> </span> Page 1 of
        {{ data?.transactionList.connection.pages }}
      </p>
      <div class="w-1/5 ml-auto space-x-4 flex justify-between">
        <button type="button" class="px-8 self-end py-3 rounded bg-slate-700 text-slate-50">Previous</button>
        <button type="button" class="px-8 self-end py-3 rounded bg-slate-700 text-slate-50">Next</button>
      </div>
    </footer>
  </main>
</template>
