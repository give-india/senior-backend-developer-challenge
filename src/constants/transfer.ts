export const ERROR_CODES = {
  ACCOUNT_NOT_FOUND: "ACCOUNT_NOT_FOUND",
  INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",
  BALANCE_LIMIT_EXCEEDED: "BALANCE_LIMIT_EXCEEDED",
  SAME_ACCOUNT_TRANSFER: "SAME_ACCOUNT_TRANSFER",
  SAME_USER_TRANSFER: "SAME_USER_TRANSFER",
};

export const ERROR_MESSAGES = {
  ACCOUNT_NOT_FOUND: "Account not found",
  INSUFFICIENT_BALANCE: "Source account has insufficient balance",
  BALANCE_LIMIT_EXCEEDED: "BasicSavings account balance limit exceeded",
  SAME_ACCOUNT_TRANSFER: "Transfer between the same account is not allowed",
  SAME_USER_TRANSFER:
    "Transfer between accounts belonging to the same user is not allowed",
};
