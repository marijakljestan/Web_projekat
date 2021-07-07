package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import com.google.gson.Gson;

import beans.Customer;
import beans.CustomerType;
import beans.Order;
import beans.Product;
import beans.ShoppingCartItem;
import beans.User;
import dto.OrderDTO;
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
		
		put("/customer/increaseQuantity/", (req,res) -> {
			res.type("application/json");
			try {
				ShoppingCartItem item = gson.fromJson(req.body(), ShoppingCartItem.class);
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				customerService.editCustomerItem(customer, item);
				return gson.toJson(customer.getCart());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/customer/createOrder", (req,res) -> {
			res.type("application/json");
			
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				
				OrderDTO orderParams = gson.fromJson(req.body(), OrderDTO.class);
				Order newOrder = customerService.createNewOrder(orderParams, customer);	
				customerService.editCustomerOrders(customer, newOrder);
				
				return gson.toJson(customer.getCart());
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		get("/customer/getAllOrders", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				return gson.toJson(customerService.getCustomerByUsername(loggedUser.getUsername()).getOrders());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
}
