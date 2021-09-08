"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransactions = exports.getTransactionByReference = exports.createTransaction = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
// Path to database
const dbPath = path_1.default.resolve(".", "./database/transaction_database.json");
//Function to create a database if it doesn't exist
function databaseExist() {
    if (!fs_1.default.existsSync(dbPath)) {
        fs_1.default.writeFileSync(dbPath, JSON.stringify([]));
    }
    const dbContent = JSON.parse(fs_1.default.readFileSync(dbPath).toString());
    return dbContent;
}
// Function to add transaction to database
function createTransaction(obj) {
    const transactions = databaseExist();
    const reference = uuid_1.v4();
    const createdAt = new Date().toISOString();
    const transaction = { reference, ...obj,
        createdAt
    };
    transactions.push(transaction);
    fs_1.default.writeFileSync(dbPath, JSON.stringify(transactions, null, " "));
    return transaction;
}
exports.createTransaction = createTransaction;
// Function to get account by reference
function getTransactionByReference(refId) {
    const transactions = databaseExist();
    const transaction = transactions.find((ref) => ref.reference === refId);
    return transaction;
}
exports.getTransactionByReference = getTransactionByReference;
function getAllTransactions() {
    const transactions = databaseExist();
    return transactions;
}
exports.getAllTransactions = getAllTransactions;
//# sourceMappingURL=model_transaction.js.map