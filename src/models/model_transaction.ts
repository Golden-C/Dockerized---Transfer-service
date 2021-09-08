import path from "path"
import fs from "fs"
import { TransactionDetails, Transactions } from "../interfaces/interface"
import { v4 } from "uuid"

// Path to database
const dbPath = path.resolve(".", "./database/transaction_database.json")

//Function to create a database if it doesn't exist
function databaseExist() {
  if(!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]))
  }
  const dbContent =JSON.parse(fs.readFileSync(dbPath).toString())
  return dbContent;
}

// Function to add transaction to database
function createTransaction(obj: TransactionDetails): Transactions {
  const transactions = databaseExist();
  const reference = v4();
  const createdAt = new Date().toISOString();
  const transaction = {reference, ...obj,
    createdAt
  }
  transactions.push(transaction)
  fs.writeFileSync(dbPath, JSON.stringify(transactions, null, " "))
  return transaction
}

// Function to get account by reference
function getTransactionByReference(refId: string): Transactions {
  const transactions = databaseExist();
  const transaction = transactions.find((ref: Transactions) => ref.reference === refId);
  return transaction;
}

function getAllTransactions(): Transactions[] {
  const transactions = databaseExist();
  return transactions;
}

export { createTransaction, getTransactionByReference, getAllTransactions }
