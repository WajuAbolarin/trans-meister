import { Account } from './../models/Transaction'
import { Context } from './../context'
import 'reflect-metadata'
import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root, Int, Field } from 'type-graphql'
import { Transaction } from '../models/Transaction'

Resolver(Transaction)
export class TransactionResolver {
  // @FieldResolver()
  // account(@Root() transaction: Transaction, @Ctx() ctx: Context): Promise<Account | null> {
  //   return ctx.prisma.account.findUnique({
  //     where: {
  //       id: 1,
  //     },
  //   })
  // }

  @Query((returns) => Transaction, { nullable: true })
  async postById(@Arg('id') id: string, @Ctx() ctx: Context) {
    return ctx.prisma.transaction.findUnique({
      where: { id },
    })
  }
}
