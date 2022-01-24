<script>
import { useQuery } from '@urql/vue'
import { computed, ref, watch } from 'vue'
import { transactionDetails } from '../api/queries'

export default {
  props: { id: String },
  setup(props) {
    const result = useQuery({
      query: transactionDetails,
      variables: {
        id: props.id,
      },
    })
    const transaction = computed(() => result.data?.value?.transactionDetails)

    watch(transaction, (v) => {
      console.log(v)
    })
    function transformDate(value) {
      return new Date(value).toLocaleString()
    }

    return {
      data: result.data,
      fetching: result.fetching,
      error: result.error,
      transaction,
      transformDate,
    }
  },
}
</script>

<template>
  <main class="pt-16 px-10 space-y-8">
    <h1 class="text-lg">Transactions Details</h1>

    <section class="bg-white rounded-md w-8/12 mx-auto px-12 pt-6 pb-16 space-y-10" v-if="transaction">
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
          <span class="text-slate-900">{{ transaction.account.name || 'N/A' }}</span>
        </div>
      </div>

      <div class="flex">
        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Category</span>
          <span class="text-slate-900">{{ transaction.category || 'N/A' }}</span>
        </div>

        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Description</span>
          <span class="text-slate-900">{{ transaction.description || 'N/A' }}</span>
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
          <span class="text-slate-900">{{ transformDate(transaction.transactionDate) }}</span>
        </div>
      </div>

      <div class="flex">
        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Staus</span>
          <span class="text-slate-900 font-bold">{{ transaction.status }}</span>
        </div>

        <div class="flex flex-col space-y-3 w-1/2">
          <span class="font-bold text-slate-500">Reference</span>
          <span class="text-slate-900 font-bold">{{ transaction.reference || 'N/A' }}</span>
        </div>
      </div>
    </section>
  </main>
</template>
