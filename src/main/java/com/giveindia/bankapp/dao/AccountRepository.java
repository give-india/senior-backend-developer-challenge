package com.giveindia.bankapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.giveindia.bankapp.model.Account;

public interface AccountRepository extends CrudRepository<Account, Integer>, JpaRepository<Account, Integer> {
	@Query("select balance from Account where accountId = ?1")
	public int findBalanceByAcctID(int accountId);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("update Account set balance = balance+?2 where accountId=?1")
	public void saveBalanceByAcctID(int accountId, int balance);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("update Account set balance = balance-?2 where accountId=?1")
	public void withdrawAmountByAcctID(int accountId, int balance);

}
