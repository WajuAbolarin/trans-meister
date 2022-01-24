const gql = String.raw

export const getTransactions = gql`
  query transactions($startMonth: String, $endMonth: String, $take: Int!, $after: ID) {
    transactionList(startMonth: $startMonth, endMonth: $endMonth, take: $take, after: $after) {
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
        cursor
        pages
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
