"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionResolvers = void 0;
class TransactionResolvers {
    static async transactionList(_, { startMonth, endMonth }, ctx) {
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
        });
        const totalCount = await ctx.prisma.transaction.count({
            where: {
                transactionDate: {
                    gte: new Date(startMonth),
                    lte: new Date(endMonth),
                },
            },
        });
        const value = {
            nodes: transactions,
            connection: {
                totalCount,
            },
        };
        return value;
    }
    static Account(transaction, _, ctx) {
        return ctx.prisma.transaction
            .findUnique({
            where: { id: transaction.id },
        })
            .account();
    }
    static Category(transaction, _, ctx) {
        return ctx.prisma.transaction
            .findUnique({
            where: { id: transaction.id },
        })
            .category();
    }
    static async transactionDetails(_, { id }, ctx) {
        return ctx.prisma.transaction.findUnique({
            where: { id },
        });
    }
}
exports.TransactionResolvers = TransactionResolvers;
