import { Transaction } from '@prisma/client'
import { Context } from '../context'

export class TransactionResolvers {
  static async transactionList(
    _: any,
    { startMonth, endMonth, cursor, take }: { startMonth: string; endMonth: string; cursor: string; take: number },
    ctx: Context
  ) {
    let query: any = {
      where: {
        transactionDate: {
          gte: new Date(startMonth),
          lte: new Date(endMonth),
        },
      },
      take: take || undefined,
    }
    if (cursor) {
      query.cursor = {
        id: cursor || undefined,
      }
    }
    const transactions = await ctx.prisma.transaction.findMany(query)
    console.log(transactions)
    const value = {
      nodes: transactions,
      connection: {
        totalCount: transactions.length,
        pages: Math.abs(Math.ceil(transactions.length / take)),
        cursor: transactions.length > 0 ? transactions[transactions.length - 1].id : undefined,
      },
    }
    return value
  }

  static Account(transaction: Transaction, _: any, ctx: Context) {
    return ctx.prisma.transaction
      .findUnique({
        where: { id: transaction.id },
      })
      .account()
  }

  static Category(transaction: Transaction, _: any, ctx: Context) {
    return ctx.prisma.transaction
      .findUnique({
        where: { id: transaction.id },
      })
      .category()
  }

  static async transactionDetails(_: any, { id }: { id: string }, ctx: Context) {
    return ctx.prisma.transaction.findUnique({
      where: { id },
    })
  }
}
