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
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    let startMonth = ref()
    let endMonth = ref()
    let after = ref(null)
    let variables = ref({
      startMonth: '2020-01',
      endMonth: '2020-08',
    })

    const result = useQuery({
      query: getTransactions,
      variables: variables.value,
    })

    function handleSubmit() {
      variables.value.startMonth = startMonth.value.replace(/-\d+$/, '')
      variables.value.endMonth = endMonth.value.replace(/-\d+$/, '')
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
    }
  },
}
</script>

<template>
  <main class="pt-16 px-10 space-y-8 pb-8">
    <h1 class="text-lg">Transanctions List</h1>
    <header class="flex items-center justify-between">
      <form @submit.prevent="handleSubmit" class="flex w-3/6 space-x-6">
        <label class="flex flex-col w-1/2">
          <span class="text-xs font-bold uppercase tracking-wide"> Start Month </span>
          <input v-model="startMonth" type="date" class="h-12 indent-2 border-slate-600 rounded-sm" />
        </label>

        <label class="flex flex-col w-1/2">
          <span class="text-xs font-bold uppercase tracking-wide"> End Month </span>
          <input v-model="endMonth" type="date" class="h-12 indent-2 border-slate-600 rounded-sm" />
        </label>

        <button
          :disabled="!startMonth || !endMonth"
          type="submit"
          class="disabled:opacity-40 px-8 self-end py-3 rounded bg-slate-700 text-slate-50"
        >
          Filter
        </button>
      </form>
      <p class="w-1/3 font-bold text-right ml-auto" v-if="data?.transactionList?.connection">
        Showing {{ data?.transactionList.connection.totalCount }} transactions
      </p>
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
  </main>
</template>
