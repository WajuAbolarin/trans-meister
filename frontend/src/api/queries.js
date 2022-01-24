const gql = String.raw

export const getTransactions = gql`
  query transactions($startMonth: String, $endMonth: String) {
    transactionList(startMonth: $startMonth, endMonth: $endMonth) {
      nodes {
        id
        account {
          name
        }
        description
        category {
          name
        }
        reference
        currency
        amount
        status
        transactionDate
      }
      connection {
        totalCount
      }
    }
  }
`
export const transactionDetails = gql`
  query transactionsDetails($id: ID!) {
    transactionDetails(id: $id) {
      id
      account {
        name
      }
      description
      category {
        name
      }
      reference
      currency
      amount
      status
      transactionDate
    }
  }
`
