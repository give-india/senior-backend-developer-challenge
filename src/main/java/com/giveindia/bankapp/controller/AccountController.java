package com.giveindia.bankapp.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.giveindia.bankapp.model.Account;
import com.giveindia.bankapp.model.TransferRequest;
import com.giveindia.bankapp.model.TransferResponse;
import com.giveindia.bankapp.service.AccountService;
import com.giveindia.bankapp.service.CustomerService;
import com.giveindia.bankapp.validator.TransactionValidator;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private TransactionValidator transactionValidator;

    @PostMapping("/add")
    public Account createAccount(@RequestBody Account account) {
        transactionValidator.validateCustomer(customerService.getCustomerInfo(account.getCustomerId()));
        transactionValidator.validateAmount(account.getBalance());
        Account acct = new Account(account.getCustomerId(), account.getBalance(), account.getAccountType());
        return accountService.createAccount(acct);
    }

    @GetMapping("/{accountId}/balance")
    public int getBalance(@PathVariable int accountId) {
        return accountService.getBalance(accountId);
    }

    @PutMapping("/{accountId}/deposit/{amount}")
    public int depositAmount(@PathVariable int accountId, @PathVariable int amount) {
        Account account = getAccountInfo(accountId);
        transactionValidator.validateAccount(account);
        transactionValidator.validateAmount(amount);
        transactionValidator.basicSavingAccountValidation(account, amount);
        accountService.depositAmount(accountId, amount);
        return accountService.getBalance(accountId);
    }

    @PutMapping("/{accountId}/withdraw/{amount}")
    public int withdrawAmount(@PathVariable int accountId, @PathVariable int amount) {
        Account account = getAccountInfo(accountId);
        transactionValidator.validateAccount(account);
        transactionValidator.validateAmount(amount);
        transactionValidator.validateBalance(account, amount);
        accountService.withdrawAmount(accountId, amount);
        return accountService.getBalance(accountId);
    }

    @PutMapping("/transfer")
    public TransferResponse transferAmount(@RequestBody TransferRequest transferRequest) {
        int amount = transferRequest.getAmount();
        transactionValidator.validateAmount(amount);
        int fromAccountId = transferRequest.getFromAccountId();
        int toAccountId = transferRequest.getToAccountId();
        Account fromAccount = accountService.getAccountInfo(fromAccountId);
        Account toAccount = accountService.getAccountInfo(toAccountId);
        transactionValidator.validateFromAndToAccount(fromAccount, toAccount, amount);
        accountService.transferAmount(fromAccountId, toAccountId, amount);
        TransferResponse response =
              new TransferResponse(fromAccount.getBalance() - amount, toAccount.getBalance() + amount,
                    LocalDateTime.now());
        return response;
    }

    @GetMapping("/{accountId}")
    public Account getAccountInfo(@PathVariable int accountId) {
        return accountService.getAccountInfo(accountId);
    }

}
