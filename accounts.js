//indexed on account number
const ACCOUNTS = {
    '10101010101': {
        pin: '1111',
        accountNumber: '10101010101',
        accountType: 'current',
        userId: 1,
        balance: 40000,
        transactions: []
    },
    '20202020202': {
        pin: '2222',
        balance: 20000,
        userId: 2,
        accountNumber: '20202020202',
        accountType: 'current',
        transactions: []
    },
    '30303030303': {
        pin: '3333',
        balance: 20000,
        userId: 1,
        accountNumber: '30303030303',
        accountType: 'saving',
        transactions: []
    },
    '40404040404': {
        pin: '4444',
        balance: 40000,
        userId: 2,
        accountNumber: '40404040404',
        accountType: 'saving',
        transactions: []
    },
    '50505050505': {
        pin: '5555',
        balance: 40000,
        userId: 1,
        accountNumber: '50505050505',
        accountType: 'basic_saving',
        transactions: []
    },
    '60606060606': {
        pin: '6666',
        balance: 40000,
        userId: 2,
        accountNumber: '60606060606',
        accountType: 'basic_saving',
        transactions: []
    }
}
class Accounts {
    getUserAccounts (userId) {
        return Object.values(ACCOUNTS).filter(account => account.userId === userId);
    }

    getAccount (id) {
        if (ACCOUNTS[id]) {
            return { ...ACCOUNTS[id] }
        }
        return null;
    }
    
    debitFromAccount (accountId, amount) {
        const account = ACCOUNTS[accountId];
        if (account.balance < amount) {
            throw {code: 'InsufficientBalance', message: 'Insufficient balance'};
        }

        account.balance = account.balance - amount;
        account.transactions.push({
            type: 'debit',
            amount
        });
        return { ...account };
    }

    creditIntoAccount (accountId, amount) {
        const account = ACCOUNTS[accountId];
        const balanceAfterCredit = account.balance + amount;
        if (account.accountType === 'basic_saving'
            && (balanceAfterCredit > 50000)) {
            throw {code : 'BasicSavingLimitExceeded', message: `Basic saving account limit(maximum RS 50000) exceeded. Current balance in target account is ${account.balance}`};
        }
        account.balance = balanceAfterCredit;
        account.transactions.push({
            type: 'credit',
            amount
        });
        return { ...account };
    }
}

export default new Accounts();