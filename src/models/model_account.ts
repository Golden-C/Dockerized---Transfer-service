import path from 'path';
import fs from 'fs';
import { Account, AccountDetails } from '../interfaces/interface';


// Path to database
const dbPath = path.resolve('.', './database/account_database.json');

//Function to create a database if it doesn't exist
function databaseExist() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
  const dbContent = JSON.parse(fs.readFileSync(dbPath).toString());
  return dbContent;
}

//Function to add account to database
function addAccount(obj: AccountDetails): Account {
  const accounts = databaseExist();
  const createdAt = new Date().toISOString();
  const newAcc = {
    ...obj,
    createdAt,
  };
  accounts.push(newAcc);
  fs.writeFileSync(dbPath, JSON.stringify(accounts, null, ' '));
  return newAcc;
}

//Function to get an account
function getBalanceByAccount(accNum: number): Account {
  const accounts = databaseExist();
  const account = accounts.find((acc: Account) => acc.accountNumber === accNum);
  return account;
}

//Function to get accounts
function getAllBalance(): Account[] {
  console.log('model problem');
  const balance = databaseExist();
  return balance;
}

//Function to update account balance
function updateAccountBalance(
  accountType: string,
  accountNumber: number,
  amount: number,
): void {
  const accounts: Account[] = databaseExist();
  if (accountType === 'sender') {
    const index = accounts.findIndex(
      (acc) => acc.accountNumber === accountNumber,
    );
    accounts[index].balance -= amount;
  }
  if (accountType === 'receiver') {
    const index = accounts.findIndex(
      (acc) => acc.accountNumber === accountNumber,
    );
    accounts[index].balance += amount;
  }
  console.log(accounts);
  fs.writeFileSync(dbPath, JSON.stringify(accounts, null, ' '));
}

export { addAccount, getBalanceByAccount, getAllBalance, updateAccountBalance };
