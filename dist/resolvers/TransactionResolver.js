"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionResolver = void 0;
const Transaction_1 = require("./../models/Transaction");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const Transaction_2 = require("../models/Transaction");
(0, type_graphql_1.Resolver)(Transaction_2.Transaction);
class TransactionResolver {
    async transactions(startMonth, endMonth, cursor, take, ctx) {
        let query = {
            where: {
                transactionDate: {
                    gte: new Date(startMonth),
                    lte: new Date(endMonth),
                },
            },
            take: take || undefined,
        };
        if (cursor) {
            query.cursor = {
                id: cursor || undefined,
            };
        }
        const transactions = await ctx.prisma.transaction.findMany(query);
        return {
            nodes: transactions,
            totalCount: transactions.length,
            pages: Math.abs(Math.ceil(transactions.length / take)),
            cursor: transactions.length > 0 ? transactions[transactions.length - 1].id : undefined,
        };
    }
    async account(transaction, ctx) {
        return ctx.prisma.transaction
            .findUnique({
            where: { id: '81bb91f8-051e-491d-accf-0e80df11ba13' },
        })
            .account();
    }
    async transactionDetails(id, ctx) {
        return ctx.prisma.transaction.findUnique({
            where: { id },
        });
    }
}
__decorate([
    (0, type_graphql_1.Query)((returns) => Transaction_1.PaginatedTransactions),
    __param(0, (0, type_graphql_1.Arg)('startMonth', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('endMonth', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('cursor', (type) => type_graphql_1.ID, { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('take', (type) => type_graphql_1.Int, { nullable: true })),
    __param(4, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "transactions", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Transaction_2.Transaction, Object]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "account", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => Transaction_2.Transaction, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "transactionDetails", null);
exports.TransactionResolver = TransactionResolver;
