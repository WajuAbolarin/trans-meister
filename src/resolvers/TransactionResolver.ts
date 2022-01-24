import { Account, PaginatedTransactions } from '../schema/Transaction'
import { Context } from '../schema/contextntext'
import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  Field,
  ID,
  ResolverInterface,
} from 'type-graphql'
import { Transaction } from '../schema/Transaction'

Resolver(Transaction)
export class TransactionResolver implements ResolverInterface<Transaction> {
  @Query((returns) => PaginatedTransactions)
  async transactions(
    @Arg('startMonth', { nullable: true }) startMonth: string,
    @Arg('endMonth', { nullable: true }) endMonth: string,
    @Arg('cursor', (type) => ID, { nullable: true }) cursor: string,
    @Arg('take', (type) => Int, { nullable: true }) take: number,
    @Ctx() ctx: Context
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
    return {
      nodes: transactions,
      totalCount: transactions.length,
      pages: Math.abs(Math.ceil(transactions.length / take)),
      cursor: transactions.length > 0 ? transactions[transactions.length - 1].id : undefined,
    }
  }

  @FieldResolver()
  async account(@Root() transaction: Transaction, @Ctx() ctx: Context) {
    return ctx.prisma.transaction
      .findUnique({
        where: { id: '81bb91f8-051e-491d-accf-0e80df11ba13' },
      })
      .account()
  }

  @Query((returns) => Transaction, { nullable: true })
  async transactionDetails(@Arg('id') id: string, @Ctx() ctx: Context) {
    return ctx.prisma.transaction.findUnique({
      where: { id },
    })
  }
}
