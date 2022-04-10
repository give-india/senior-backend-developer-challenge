package com.giveindia.bankapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.giveindia.bankapp.dao.CustomerRepository;
import com.giveindia.bankapp.model.Customer;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository customerRepository;

	public Customer createCustomer(Customer customer) {
		return customerRepository.save(customer);
	}

	public Customer getCustomerInfo(int customerId) {
		return customerRepository.findById(customerId).orElse(null);
	}

	public void deleteCustomer(int customerId) {
		customerRepository.deleteById(customerId);
	}

}
