"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccountBalance = exports.getAllBalance = exports.getBalanceByAccount = exports.addAccount = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Function to generate account number
// function createAccount(): number {
//   let accountNumber = "";
//   for (let index = 0; index < 10; index++) {
//     accountNumber += Math.floor(Math.random() * 10)
//   }
//   return +accountNumber;
// }
// Path to database
const dbPath = path_1.default.resolve('.', './database/account_database.json');
//Function to create a database if it doesn't exist
function databaseExist() {
    if (!fs_1.default.existsSync(dbPath)) {
        fs_1.default.writeFileSync(dbPath, JSON.stringify([]));
    }
    const dbContent = JSON.parse(fs_1.default.readFileSync(dbPath).toString());
    return dbContent;
}
//Function to add account to database
function addAccount(obj) {
    const accounts = databaseExist();
    const createdAt = new Date().toISOString();
    // const accountNumber = createAccount();
    const newAcc = {
        ...obj,
        createdAt,
    };
    accounts.push(newAcc);
    fs_1.default.writeFileSync(dbPath, JSON.stringify(accounts, null, ' '));
    return newAcc;
}
exports.addAccount = addAccount;
//Function to get an account
function getBalanceByAccount(accNum) {
    const accounts = databaseExist();
    const account = accounts.find((acc) => acc.accountNumber === accNum);
    return account;
}
exports.getBalanceByAccount = getBalanceByAccount;
//Function to get accounts
function getAllBalance() {
    console.log('model problem');
    const balance = databaseExist();
    return balance;
}
exports.getAllBalance = getAllBalance;
//Function to update account balance
function updateAccountBalance(accountType, accountNumber, amount) {
    const accounts = databaseExist();
    if (accountType === 'sender') {
        const index = accounts.findIndex((acc) => acc.accountNumber === accountNumber);
        accounts[index].balance -= amount;
    }
    if (accountType === 'receiver') {
        const index = accounts.findIndex((acc) => acc.accountNumber === accountNumber);
        accounts[index].balance += amount;
    }
    console.log(accounts);
    fs_1.default.writeFileSync(dbPath, JSON.stringify(accounts, null, ' '));
}
exports.updateAccountBalance = updateAccountBalance;
//# sourceMappingURL=model_account.js.map