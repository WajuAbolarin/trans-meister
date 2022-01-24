import { PrismaClient, Prisma } from '@prisma/client'
import { join } from 'path'
const prisma = new PrismaClient()
const Fs = require('fs')
const CsvReadableStream = require('csv-reader')

let inputStream = Fs.createReadStream(join(__dirname, 'Transactions.csv'), 'utf8')

let success = 0
inputStream
  .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
  .on('data', async function (row: any) {
    const [
      id,
      account,
      description,
      category,
      reference,
      currency,
      amount,
      status,
      transactionDate,
      createdAt,
      updatedAt,
    ] = row
    if (id === 'id') return

    let data: any = {
      id,
      description: String(description),

      reference,
      currency,
      amount: parseFloat(amount),
      status,
      transactionDate: new Date(transactionDate),
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
    }
    if (account) {
      data.account = {
        connectOrCreate: {
          where: {
            name: account,
          },
          create: {
            name: account,
          },
        },
      }
    }
    if (category) {
      data.category = {
        connectOrCreate: {
          where: {
            name: category,
          },
          create: {
            name: category,
          },
        },
      }
    }
    try {
      await prisma.transaction.create({ data })
      console.log(`Created record for id ${id}`)
      success++
    } catch (error: any) {
      console.log(error.message)
    }
  })
  .on('end', function () {
    console.log(`Created ${success} records`)
    prisma.$disconnect()
  })
