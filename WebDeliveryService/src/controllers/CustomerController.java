package controllers;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Comment;
import beans.Customer;
import beans.Manager;
import beans.Order;
import beans.Product;
import beans.ShoppingCartItem;
import beans.User;
import dto.OrderDTO;
import dto.OrderSearchDTO;
import dto.SortDTO;
import services.CustomerService;
import spark.Request;
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
				Customer customer = findCustomer(req);
				customerService.increaseItemQuantity(customer, item);
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

		put("/customer/reduceQuantity/", (req,res) -> {
			res.type("application/json");
			try {
				ShoppingCartItem item = gson.fromJson(req.body(), ShoppingCartItem.class);
				Customer customer = findCustomer(req);
				customerService.reduceItemQuantity(customer, item);
				return gson.toJson(customer.getCart());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		delete("/customer/removeItem/:id", (req,res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				customerService.removeItemFromCart(customer, req.params("id"));
				return gson.toJson(customer.getCart());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/customer/getRestaurantOrders/:id", (req, res) -> {
			res.type("application/json");
			try {
				ArrayList<Order> orders = customerService.getRestaurantOrders(req.params("id"));
				return gson.toJson(orders);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});

		delete("/customer/removeOrder", (req,res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				Order order = gson.fromJson(req.body(), Order.class);
				customerService.removeOrder(customer, order);
				return gson.toJson(customer.getOrders());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/customer/getUndeliveredOrders", (req, res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				return gson.toJson(customerService.getAllUndeliveredOrders(customer));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getProcessingOrders", (req, res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				return gson.toJson(customerService.getAllProcessingOrders(customer));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getInPreparationOrders", (req, res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				return gson.toJson(customerService.getAllInPreparationOrders(customer));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getRestaurantCustomers/:id", (req, res) -> {
			res.type("application/json");
			try {
				ArrayList<Customer> customers = customerService.getRestaurantCustomers(req.params("id"));
				return gson.toJson(customers);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		get("/customer/getWaitingForDeliveryOrders", (req, res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				return gson.toJson(customerService.getAllWaitingForDeliveryOrders(customer));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		
		get("/customer/getInTransportOrders", (req, res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				return gson.toJson(customerService.getAllInTransportOrders(customer));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getDeliveredOrders", (req, res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				return gson.toJson(customerService.getAllDeliveredOrders(customer));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getCanceledOrders", (req, res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				return gson.toJson(customerService.getAllCanceledOrders(customer));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getOrdersByRestaurantType/:id", (req, res) -> {
			res.type("application/json");
			try {
				Customer customer = findCustomer(req);
				String restType =  req.params("id");
				return gson.toJson(customerService.getAllOrdersFilteredByRestaurantType(customer, restType));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/customer/searchOrders", (req,res) -> {
			res.type("application/json");
			
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				
				OrderSearchDTO orderParams = gson.fromJson(req.body(), OrderSearchDTO.class);
				return gson.toJson(customerService.getSuitableOrders(customer, orderParams));
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		post("/customer/getSortedOrders", (req,res) -> {
			res.type("application/json");
			
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				
				SortDTO sortParameters = gson.fromJson(req.body(), SortDTO.class);
				return gson.toJson(customerService.getSortedOrders(customer, sortParameters));
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		post("/customer/changeOrderStatusToDelivered", (req,res) -> {
			res.type("application/json");
			try {
				Order order = gson.fromJson(req.body(), Order.class);
				customerService.changeOrderStatusToDelivered(order);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/customer/changeOrderStatusToWaitingForManager", (req,res) -> {
			res.type("application/json");
			try {
				Order order = gson.fromJson(req.body(), Order.class);
				customerService.changeOrderStatusToWaitingForManager(order);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/customer/changeOrderStatusToInPreparation", (req,res) -> {
			res.type("application/json");
			try {
				Order order = gson.fromJson(req.body(), Order.class);
				customerService.changeOrderStatusToInPreparation(order);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/customer/changeOrderStatusToWaitingForDelivery", (req,res) -> {
			res.type("application/json");
			try {
				Order order = gson.fromJson(req.body(), Order.class);
				customerService.changeOrderStatusToWaitingForDelivery(order);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/customer/changeOrderStatusToInTransport", (req,res) -> {
			res.type("application/json");
			try {
				Order order = gson.fromJson(req.body(), Order.class);
				customerService.changeOrderStatusToInTransport(order);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/customer/searchOrdersForManager", (req,res) -> {
			res.type("application/json");
			
			try {				
				OrderSearchDTO orderParams = gson.fromJson(req.body(), OrderSearchDTO.class);
				return gson.toJson(customerService.getSuitableOrdersForManager(orderParams));
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		post("/customer/getSortedOrdersForManager", (req,res) -> {
			res.type("application/json");
			
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Manager manager = customerService.getManagerByUsername(loggedUser.getUsername());
				
				SortDTO sortParameters = gson.fromJson(req.body(), SortDTO.class);
				return gson.toJson(customerService.getSortedOrdersForManager(manager.getRestaurant(), sortParameters));
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}			
		});
		
		get("/customer/getForManagerOrders", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Manager manager = customerService.getManagerByUsername(loggedUser.getUsername());
				
				return gson.toJson(customerService.getAllWaitingForManagerOrders(manager.getRestaurant()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getWaitingForManagerOrders", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Manager manager = customerService.getManagerByUsername(loggedUser.getUsername());
				return gson.toJson(customerService.getAllWaitingForManagerOrders(manager.getRestaurant()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getProcessingOrdersForManager", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Manager manager = customerService.getManagerByUsername(loggedUser.getUsername());
				return gson.toJson(customerService.getAllProcessingOrdersForManager(manager.getRestaurant()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getInPreparationOrdersForManager", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Manager manager = customerService.getManagerByUsername(loggedUser.getUsername());
				return gson.toJson(customerService.getAllInPreparationOrdersForManager(manager.getRestaurant()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		

		get("/customer/getWaitingForDeliveryOrdersForManager", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Manager manager = customerService.getManagerByUsername(loggedUser.getUsername());
				return gson.toJson(customerService.getAllWaitingForDeliveryOrdersForManager(manager.getRestaurant()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		
		get("/customer/getInTransportOrdersForManager", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Manager manager = customerService.getManagerByUsername(loggedUser.getUsername());
				return gson.toJson(customerService.getAllInTransportOrdersForManager(manager.getRestaurant()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getDeliveredOrdersForManager", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Manager manager = customerService.getManagerByUsername(loggedUser.getUsername());
				return gson.toJson(customerService.getAllDeliveredOrdersForManager(manager.getRestaurant()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getCanceledOrdersForManager", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Manager manager = customerService.getManagerByUsername(loggedUser.getUsername());
				return gson.toJson(customerService.getAllCanceledOrdersForManager(manager.getRestaurant()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getSuspiciousCustomers", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(customerService.getAllSuspiciousCustomers());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getAllGoldenCustomers", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(customerService.getAllGoldenCustomers());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getAllSilverCustomers", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(customerService.getAllSilverCustomers());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customer/getAllBronzedCustomers", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(customerService.getAllBronzedCustomers());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/customers/getFilteredRestaurantCustomers/", (req, res) -> {
			res.type("application/json");
			try {
				ArrayList<Customer> customers = new ArrayList<Customer>();
				if(req.queryParams("golden").equals("true")) {
					for(Customer c : customerService.getGoldenRestaurantCustomers(req.queryParams("restaurant")))
						customers.add(c);
				}
				
				if(req.queryParams("silvern").equals("true")) {
					for(Customer c : customerService.getSilvernRestaurantCustomers(req.queryParams("restaurant")))
						customers.add(c);
				}
				
				if(req.queryParams("bronzed").equals("true")) {
					for(Customer c : customerService.getBronzedRestaurantCustomers(req.queryParams("restaurant")))
						customers.add(c);
				}
				
				return gson.toJson(customers);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}

	private Customer findCustomer(Request req) throws JsonSyntaxException, IOException {
		Session session = req.session(true);
		User loggedUser = session.attribute("user");
		Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
		return customer;
	}
}
