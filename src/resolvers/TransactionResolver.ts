import { Transaction } from '@prisma/client'
import { Context } from '../context'

export class TransactionResolvers {
  static async transactionList(
    _: any,
    { startMonth, endMonth }: { startMonth: string; endMonth: string },
    ctx: Context
  ) {
    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        transactionDate: {
          gte: new Date(startMonth),
          lte: new Date(endMonth),
        },
      },
      orderBy: {
        transactionDate: 'asc',
      },
    })

    const totalCount = await ctx.prisma.transaction.count({
      where: {
        transactionDate: {
          gte: new Date(startMonth),
          lte: new Date(endMonth),
        },
      },
    })
    const value = {
      nodes: transactions,
      connection: {
        totalCount,
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
