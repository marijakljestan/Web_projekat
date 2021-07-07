package controllers;

import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Customer;
import services.CustomerService;

public class CustomerController {
	
	private CustomerService customerService;
	private static Gson gson = new Gson();
	
	public CustomerController(CustomerService customerService) {
		super();
		this.customerService = customerService;
		
		post("/customer/createCustomer", (req,res) -> {
			res.type("application/json");
			
			try {
				Customer newCustomer = gson.fromJson(req.body(), Customer.class);
				
				for (Customer customer : customerService.getAllCustomers()) {
					if(customer.getUsername().equals(newCustomer.getUsername())) {
						//System.out.println("Vec postoji");
						return "";
					}
				}
				
				customerService.createCustomer(newCustomer);							
				return gson.toJson(newCustomer);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
	}
}
