package com.giveindia.bankapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.giveindia.bankapp.dao.AccountRepository;
import com.giveindia.bankapp.model.Account;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;

	public Account createAccount(Account acct) {
		return accountRepository.save(acct);
	}

	public Account getAccountInfo(int accountId) {
		return accountRepository.findById(accountId).orElse(null);
	}

	public void deleteAccount(int accountId) {
		accountRepository.deleteById(accountId);
	}

	public int getBalance(int accountId) {
		return accountRepository.findBalanceByAcctID(accountId);
	}

	public void depositAmount(int accountId, int amount) {
		accountRepository.saveBalanceByAcctID(accountId, amount);
	}

	public void withdrawAmount(int accountId, int amount) {
		accountRepository.withdrawAmountByAcctID(accountId, amount);
	}

	public void transferAmount(int accountId, int destinationAcctId, int amount) {
		accountRepository.withdrawAmountByAcctID(accountId, amount);
		accountRepository.saveBalanceByAcctID(destinationAcctId, amount);
	}

}
