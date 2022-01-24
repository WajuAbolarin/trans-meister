import 'reflect-metadata'
import { ObjectType, Field, ID, Float, Int } from 'type-graphql'

@ObjectType()
export class Transaction {
  @Field((type) => ID)
  id: string

  @Field((type) => Account, { nullable: false })
  account?: Account | null

  @Field((type) => String, { nullable: true })
  description: string | null

  @Field((type) => Category, { nullable: true })
  category?: Category | null

  @Field((type) => String, { nullable: true })
  reference: string

  @Field((type) => String, { nullable: true })
  currency: string

  @Field((type) => Float)
  amount: number

  @Field((type) => String, { nullable: true })
  status: string

  @Field((type) => Date)
  transactionDate: Date

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date
}

@ObjectType()
export class PaginatedTransactions {
  @Field((type) => [Transaction])
  nodes: Transaction[]

  @Field((type) => Int)
  totalCount: number

  @Field((type) => String, { nullable: true })
  cursor?: string

  @Field((type) => Int, { nullable: false })
  pages: number
}

@ObjectType()
export class Account {
  @Field((type) => ID)
  id: number

  @Field((type) => String)
  name: string
}

@ObjectType()
export class Category {
  @Field((type) => ID)
  id: number

  @Field((type) => String)
  name: string
}
