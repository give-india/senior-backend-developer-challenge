import { Types } from 'mongoose';

export interface TransactionEntity {
    from: Types.ObjectId;
    to: Types.ObjectId;
    amount: Number;
    status: String;
}

export const transactionErrors = {
    NOT_ENOUGH_BALANCE: "Not enoungh balance for this transaction",
    SAME_USER_ACCOUNT: "Transaction between same user accounts. not allowed",
    SAVINGS_BALANCE_LIMIT_REACHED: "Unable to transfer to this account, Savings balance limit reached",
    MAX_LIMIT_REACHED: "Transaction ammount overflow",
    UNKNOWN: "unknow error happned"
}