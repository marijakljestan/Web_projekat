package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Customer;
import beans.Product;
import beans.ShoppingCartItem;
import beans.User;
import services.CustomerService;
import spark.Session;

public class CustomerController {
	
	private CustomerService customerService;
	private static Gson gson = new Gson();
	
	public CustomerController(CustomerService customerService) {
		super();
		this.customerService = customerService;
		
		get("/customer/", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				return gson.toJson(customerService.getCustomerByUsername(loggedUser.getUsername()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
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
		
		post("/customer/addToShoppingCart", (req,res) -> {
			res.type("application/json");
			
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				
				Product product = gson.fromJson(req.body(), Product.class);
				customer.getCart().getItems().add(new ShoppingCartItem(product));
				double total = customer.getCart().getTotal();
				customer.getCart().setTotal(total + product.getPrice());
				customerService.updateCustomer(customer);
				
				return gson.toJson(customer);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		get("/customer/getShoppingCart/", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				return gson.toJson(customer.getCart());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
}
