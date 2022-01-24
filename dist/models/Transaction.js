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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.Account = exports.PaginatedTransactions = exports.Transaction = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let Transaction = class Transaction {
    id;
    account;
    description;
    category;
    reference;
    currency;
    amount;
    status;
    transactionDate;
    createdAt;
    updatedAt;
};
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.ID),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Account, { nullable: false }),
    __metadata("design:type", Object)
], Transaction.prototype, "account", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String, { nullable: true }),
    __metadata("design:type", Object)
], Transaction.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Category, { nullable: true }),
    __metadata("design:type", Object)
], Transaction.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String, { nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "reference", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String, { nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "currency", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.Float),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String, { nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Date),
    __metadata("design:type", Date)
], Transaction.prototype, "transactionDate", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Date),
    __metadata("design:type", Date)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Date),
    __metadata("design:type", Date)
], Transaction.prototype, "updatedAt", void 0);
Transaction = __decorate([
    (0, type_graphql_1.ObjectType)()
], Transaction);
exports.Transaction = Transaction;
let PaginatedTransactions = class PaginatedTransactions {
    nodes;
    totalCount;
    cursor;
    pages;
};
__decorate([
    (0, type_graphql_1.Field)((type) => [Transaction]),
    __metadata("design:type", Array)
], PaginatedTransactions.prototype, "nodes", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.Int),
    __metadata("design:type", Number)
], PaginatedTransactions.prototype, "totalCount", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String, { nullable: true }),
    __metadata("design:type", String)
], PaginatedTransactions.prototype, "cursor", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], PaginatedTransactions.prototype, "pages", void 0);
PaginatedTransactions = __decorate([
    (0, type_graphql_1.ObjectType)()
], PaginatedTransactions);
exports.PaginatedTransactions = PaginatedTransactions;
let Account = class Account {
    id;
    name;
};
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.ID),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
Account = __decorate([
    (0, type_graphql_1.ObjectType)()
], Account);
exports.Account = Account;
let Category = class Category {
    id;
    name;
};
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.ID),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
Category = __decorate([
    (0, type_graphql_1.ObjectType)()
], Category);
exports.Category = Category;
