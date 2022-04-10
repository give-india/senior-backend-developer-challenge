package com.giveindia.bankapp.validator;

import org.springframework.stereotype.Component;

import com.giveindia.bankapp.model.Account;
import com.giveindia.bankapp.model.AccountType;
import com.giveindia.bankapp.model.Customer;

@Component
public class TransactionValidator {
    public static int BASIC_SAVING_AMOUNT = 50000;

    public void validateCustomer(Customer customer){
        if(customer == null) {
            throw new RuntimeException("invalid customer id");
        }
    }

    public void validateAccount(Account account){
        if(account == null) {
            throw new RuntimeException("invalid account id");
        }
    }

    public void validateAmount(int amount) {
        if(amount <= 0) {
            throw new RuntimeException("Invalid amount");
        }
    }

    public void validateCustomer(Account fromAccount, Account toAccount) {
        if (fromAccount.getCustomerId() == toAccount.getCustomerId()) {
            throw new RuntimeException("Amount cannot be transferred between same customer");
        }
    }

    public void validateBalance(Account account, int debitAmount) {
        if (!(account.getBalance() - debitAmount >= 0)) {
            throw new RuntimeException("There is not enough Amount");
        }
    }

    public void basicSavingAccountValidation(Account account, int creditAmount) {
        if (account.getAccountType().equals(AccountType.BASIC_SAVINGS) &&
              (account.getBalance() + creditAmount > BASIC_SAVING_AMOUNT)) {
            throw new RuntimeException("Cannot exceed the maximum limit amount");
        }
    }

    public void validateFromAndToAccount(Account fromAccount, Account toAccount, int amount) {
        validateAccount(fromAccount);
        validateAccount(toAccount);
        validateCustomer(fromAccount, toAccount);
        validateBalance(fromAccount, amount);
        basicSavingAccountValidation(toAccount, amount);
    }
}
