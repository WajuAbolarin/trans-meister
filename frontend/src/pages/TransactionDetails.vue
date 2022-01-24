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
</script>

<template>
  <main class="pt-16 px-10 space-y-8">
    <h1 class="text-lg">Transanctions Detials</h1>

    <section class="bg-white rounded-md w-8/12 mx-auto px-12 pt-6 pb-16 space-y-10">
      <button
        @click="$router.back()"
        aria-label="go back"
        class="text-2xl font-bold border w-12 h-12 block border-slate-400 rounded-full"
      >
        &larr;
      </button>

      <div class="flex">
        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Transaction ID</span>
          <span class="text-slate-900">{{ transaction.id }}</span>
        </div>

        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Account</span>
          <span class="text-slate-900">{{ transaction.account }}</span>
        </div>
      </div>

      <div class="flex">
        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Category</span>
          <span class="text-slate-900">{{ transaction.category }}</span>
        </div>

        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Description</span>
          <span class="text-slate-900">{{ transaction.description }}</span>
        </div>
      </div>

      <div class="flex">
        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Amount</span>
          <span class="text-slate-900 font-bold text-lg">
            {{ transaction.amount }}
            <span class="align-super text-xs">
              {{ transaction.currency }}
            </span>
          </span>
        </div>

        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Date</span>
          <span class="text-slate-900">{{ transaction.transactionDate }}</span>
        </div>
      </div>

      <div class="flex">
        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Staus</span>
          <span class="text-slate-900 font-bold">{{ transaction.status }}</span>
        </div>

        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Reference</span>
          <span class="text-slate-900 font-bold">{{ transaction.description }}</span>
        </div>
      </div>
    </section>
  </main>
</template>
