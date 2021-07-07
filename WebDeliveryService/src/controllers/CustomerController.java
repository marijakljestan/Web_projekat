package controllers;

import com.google.gson.Gson;

import services.CustomerService;

public class CustomerController {
	
	private CustomerService customerService;
	private static Gson gson = new Gson();
	
	public CustomerController(CustomerService customerService) {
		super();
		this.customerService = customerService;
		
		
	}
}
