package com.giveindia.bankapp.dao;

import org.springframework.data.repository.CrudRepository;

import com.giveindia.bankapp.model.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Integer> {

}
