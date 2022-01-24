<script setup>
import { ref } from 'vue'

const transaction = ref({
  id: 'e206619a-6dd2-4cc1-8603-429631d46476',
  amount: '-50',
  account: 'Sydney Beard',
  category: 'Another one',
  currency: 'GBP',
  description: 'sadsad',
  reference: 'Ref 9869',
  status: 'BOOKED',
  transactionDate: '2021-06-22 12:55:26',
  createdAt: '2021-06-22 12:55:26',
  updatedAt: '2021-06-22 12:55:26',
})
const transactions = ref(
  Array.from({ length: 20 }).map((_, i) => ({
    ...transaction.value,
    id: `${transaction.value.id}_${i}`,
    amount: Math.ceil(Math.random() * transaction.value.amount * 1000 * (Math.random() > 0.5 ? -1 : 1)),
  }))
)
</script>

<template>
  <main class="pt-16 px-10 space-y-8">
    <h1 class="text-lg">Transanctions List</h1>
    <header>
      <form method="POST" class="flex w-1/3 space-x-6">
        <label class="flex flex-col w-1/2">
          <span class="text-xs font-bold uppercase tracking-wide"> Start Month </span>
          <select class="h-12 indent-2 border-slate-600 rounded-sm">
            <option label="January" value="1"></option>
            <option label="February" value="2"></option>
          </select>
        </label>

        <label class="flex flex-col w-1/2">
          <span class="text-xs font-bold uppercase tracking-wide"> End Month </span>
          <select class="h-12 indent-2 border-slate-600 rounded-sm">
            <option label="January" value="1"></option>
            <option label="February" value="2"></option>
          </select>
        </label>

        <button type="submit" class="px-8 self-end py-3 rounded bg-slate-700 text-slate-50">Filter</button>
      </form>
    </header>
    <table class="table-auto order-collapse border border-slate-400 rounded-md">
      <thead class="bg-slate-600 text-slate-100 rounded-md">
        <tr class="border border-slate-400 rounded-md">
          <th class="border border-slate-400 px-4 py-4 text-left">Account</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Description</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Category</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Reference</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Currency</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Amount</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Status</th>
          <th class="border border-slate-400 px-4 py-4 text-left">Transaction Date</th>
        </tr>
      </thead>
      <tbody class="text-sm font-medium text-slate-700">
        <tr
          class="border border-slate-300 cursor-pointer"
          @click="$router.push({ name: 'details', params: { id: transaction.id } })"
          v-for="transaction in transactions"
        >
          <td class="border border-slate-300">{{ transaction.account }}</td>
          <td class="border border-slate-300">{{ transaction.description }}</td>
          <td class="border border-slate-300">{{ transaction.category }}</td>
          <td class="border border-slate-300">{{ transaction.reference }}</td>
          <td class="border border-slate-300">{{ transaction.currency }}</td>
          <td class="border border-slate-300">{{ transaction.amount }}</td>
          <td class="border border-slate-300">{{ transaction.status }}</td>
          <td class="border border-slate-300">{{ transaction.transactionDate }}</td>
        </tr>
      </tbody>
    </table>
    <footer>
      <p class="w-full">
        Showing 1-20 of {{ transactions.length }} transactions
        <span class="w-2 border-l-2 h-6 border-slate-800 mx-6 inline-block align-middle"> </span> Page 1 of 1
      </p>
    </footer>
  </main>
</template>
