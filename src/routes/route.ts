import express, { Request, Response } from 'express';
import { AccountDetails } from '../interfaces/interface';
const router = express.Router();
import {
  addAccount,
  getBalanceByAccount,
  getAllBalance,
  updateAccountBalance } from '../models/model_account';
import { createTransaction, getAllTransactions, getTransactionByReference } from '../models/model_transaction';

// Created an account
router.post('/create-account', (req: Request, res: Response) => {
  const { accountNumber, balance } = req.body;
  if (
    accountNumber.toString().length < 10 ||
    accountNumber.toString().length > 10
  ) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid account number',
    });
  } else {
    const accounts = getAllBalance();
    if (accounts.some((acc) => acc.accountNumber === accountNumber)) {
      res.status(404).json({
        status: 'Fail',
        message: 'Account number already exists',
      });
    } else {
      const accountDetails: AccountDetails = { accountNumber, balance };
      const account = addAccount(accountDetails);
      res.status(201).json({
        status: 'Success',
        data: account,
      });
    }
  }
});

//Get a single account
router.get('/balance/:accountNumber', (req: Request, res: Response) => {
  const accountNumber = +req.params.accountNumber;
  const account = getBalanceByAccount(accountNumber);
  if (account) {
    res.status(200).json({
      status: 'Success',
      data: account,
    });
  } else {
    res.status(404).json({
      status: 'Fail',
      message: 'Account not found',
    });
  }
});

// Get all account
router.get('/balance', (req: Request, res: Response) => {
  const accounts = getAllBalance();
  if (accounts.length > 0) {
    console.log('success');
    res.status(200).json({
      status: 'Success',
      data: accounts,
    });
  } else {
    console.log('fail');
    res.status(404).json({
      status: 'Fail',
      message: 'No accounts in database',
    });
  }
});

// Create a transaction
router.post('/transfer', (req: Request, res: Response) => {
  const { senderAccount, amount, receiverAccount, transferDescription } =
    req.body;
  const sender = getBalanceByAccount(senderAccount);
  const receiver = getBalanceByAccount(receiverAccount);
  if (sender) {
    if (sender.balance >= amount) {
      if (receiver) {
        const transactionDetails = {
          senderAccount,
          amount,
          receiverAccount,
          transferDescription,
        };
        const transaction = createTransaction(transactionDetails);
        updateAccountBalance('sender', senderAccount, amount);
        updateAccountBalance('receiver', receiverAccount, amount);
        res.status(201).json({
          status: 'Success',
          data: transaction,
        });
      } else {
        res.status(404).json({
          status: 'Fail',
          message: 'Receiver account not found',
        });
      }
    } else {
      res.status(404).json({
        status: 'Fail',
        message: 'Insufficient fund',
      });
    }
  } else {
    res.status(404).json({
      status: 'Fail',
      message: 'Sender account not found',
    });
  }
});

// get transaction by reference
router.get('/transactions/:reference', (req: Request, res: Response) => {
  const reference = req.params.reference;
  const transaction = getTransactionByReference(reference);
  if (transaction) {
    res.status(200).json({
      status: 'Success',
      data: transaction,
    });
  } else {
    res.status(404).json({
      status: 'Fail',
      message: 'Transaction not found',
    });
  }
});

//get all transactions
router.get('/transactions', (req: Request, res: Response) => {
  const transactions = getAllTransactions();
    res.status(200).json({
      status: 'Success',
      data: transactions,
    });
});

router.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    msg: 'Page not found, please check your url and try and again.',
  });
});

export default router;
