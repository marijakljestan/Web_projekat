package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Customer;
import dao.CustomerDAO;

public class CustomerService {
	
	private CustomerDAO customerDAO;

	public CustomerService(CustomerDAO customerDAO) {
		super();
		this.customerDAO = customerDAO;
	}
	
	public ArrayList<Customer> getAllCustomers() throws JsonSyntaxException, IOException{
		return customerDAO.getAllNonDeleted();
	}
	
	public void createCustomer(Customer customer) throws JsonSyntaxException, IOException {
		customerDAO.create(customer);
	}

}
