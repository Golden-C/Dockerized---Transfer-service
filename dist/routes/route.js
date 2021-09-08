"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const model_account_1 = require("../models/model_account");
const model_transaction_1 = require("../models/model_transaction");
// Created an account
router.post('/create-account', (req, res) => {
    const { accountNumber, balance } = req.body;
    if (accountNumber.toString().length < 10 ||
        accountNumber.toString().length > 10) {
        res.status(404).json({
            status: 'Fail',
            message: 'Invalid account number',
        });
    }
    else {
        const accounts = model_account_1.getAllBalance();
        if (accounts.some((acc) => acc.accountNumber === accountNumber)) {
            res.status(404).json({
                status: 'Fail',
                message: 'Account number already exists',
            });
        }
        else {
            const accountDetails = { accountNumber, balance };
            const account = model_account_1.addAccount(accountDetails);
            res.status(201).json({
                status: 'Success',
                data: account,
            });
        }
    }
});
//Get a single account
router.get('/balance/:accountNumber', (req, res) => {
    const accountNumber = +req.params.accountNumber;
    const account = model_account_1.getBalanceByAccount(accountNumber);
    if (account) {
        res.status(200).json({
            status: 'Success',
            data: account,
        });
    }
    else {
        res.status(404).json({
            status: 'Fail',
            message: 'Account not found',
        });
    }
});
// Get all account
router.get('/balance', (req, res) => {
    const accounts = model_account_1.getAllBalance();
    if (accounts.length > 0) {
        console.log('success');
        res.status(200).json({
            status: 'Success',
            data: accounts,
        });
    }
    else {
        console.log('fail');
        res.status(404).json({
            status: 'Fail',
            message: 'No accounts in database',
        });
    }
});
// Create a transaction
router.post('/transfer', (req, res) => {
    const { senderAccount, amount, receiverAccount, transferDescription } = req.body;
    const sender = model_account_1.getBalanceByAccount(senderAccount);
    const receiver = model_account_1.getBalanceByAccount(receiverAccount);
    if (sender) {
        if (sender.balance >= amount) {
            if (receiver) {
                const transactionDetails = {
                    senderAccount,
                    amount,
                    receiverAccount,
                    transferDescription,
                };
                const transaction = model_transaction_1.createTransaction(transactionDetails);
                model_account_1.updateAccountBalance('sender', senderAccount, amount);
                model_account_1.updateAccountBalance('receiver', receiverAccount, amount);
                res.status(201).json({
                    status: 'Success',
                    data: transaction,
                });
            }
            else {
                res.status(404).json({
                    status: 'Fail',
                    message: 'Receiver account not found',
                });
            }
        }
        else {
            res.status(404).json({
                status: 'Fail',
                message: 'Insufficient fund',
            });
        }
    }
    else {
        res.status(404).json({
            status: 'Fail',
            message: 'Sender account not found',
        });
    }
});
// get transaction by reference
router.get('/transactions/:reference', (req, res) => {
    const reference = req.params.reference;
    const transaction = model_transaction_1.getTransactionByReference(reference);
    if (transaction) {
        res.status(200).json({
            status: 'Success',
            data: transaction,
        });
    }
    else {
        res.status(404).json({
            status: 'Fail',
            message: 'Transaction not found',
        });
    }
});
router.get('/transactions', (req, res) => {
    const transactions = model_transaction_1.getAllTransactions();
    res.status(200).json({
        status: 'Success',
        data: transactions,
    });
});
router.use('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        msg: 'Page not found, please check your url and try and again.',
    });
});
exports.default = router;
//# sourceMappingURL=route.js.map