interface Account {
  accountNumber: number;
  balance: number;
  createdAt: string;
}

interface AccountDetails {
  accountNumber: number;
  balance: number;
}

interface Transactions {
  reference: string;
  senderAccount: number;
  amount: number;
  receiverAccount: number;
  transferDescription: string;
  createdAt: string;
}

interface TransactionDetails {
  senderAccount: number;
  amount: number;
  receiverAccount: number;
  transferDescription: string;
}

export { Account, Transactions, AccountDetails, TransactionDetails };
