package services;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.CustomerType;
import beans.Order;
import beans.OrderStatus;
import beans.Product;
import beans.Restaurant;
import beans.ShoppingCartItem;
import beans.User;
import dao.CustomerDAO;
import dao.RestaurantDAO;
import dto.OrderDTO;
import dto.OrderSearchDTO;
import dto.SortDTO;

public class CustomerService {
	
	private CustomerDAO customerDAO;
	private RestaurantDAO restaurantDAO;

	public CustomerService(CustomerDAO customerDAO) {
		super();
		this.customerDAO = customerDAO;
		this.restaurantDAO = new RestaurantDAO("./files/restaurants.json");
	}
	
	public ArrayList<Customer> getAllCustomers() throws JsonSyntaxException, IOException{
		return customerDAO.getAllNonDeleted();
	}
	
	public void createCustomer(Customer customer) throws JsonSyntaxException, IOException {
		customerDAO.create(customer);
	}
	public Customer getCustomerByUsername(String username) throws JsonSyntaxException, IOException {
		return customerDAO.getByID(username);
	}

	public void updateCustomer(Customer customer) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		customerDAO.update(customer);
	}

	public void increaseItemQuantity(Customer customer, ShoppingCartItem item) throws JsonSyntaxException, IOException {
		double total = customer.getCart().getTotal();
		ArrayList<ShoppingCartItem> items = customer.getCart().getItems();
		ShoppingCartItem foundedItem = new ShoppingCartItem();
		int index = 0;
		for(int i = 0; i < items.size(); i++) {
			if(isEqual(items.get(i),item)) {
				foundedItem = items.get(i);
				index = i;
				customer.getCart().getItems().remove(i);
				break;
			}
		}
		int quantity = foundedItem.getQuantity();
		foundedItem.setQuantity(++quantity);
		customer.getCart().setTotal(total + foundedItem.getProduct().getPrice());
		customer.getCart().getItems().add(index, foundedItem);
		updateCustomer(customer);
	}
	
	private boolean isEqual(ShoppingCartItem i, ShoppingCartItem item) {
		return i.getProduct().getName().equals(item.getProduct().getName()) && i.getProduct().getRestaurantName().equals(item.getProduct().getRestaurantName());
	}
	
	private ArrayList<Integer> getAllOrdersIDs() throws JsonSyntaxException, IOException{
		return customerDAO.getAllOrdersIDs();
	}
	
	 private String generateOrderID() throws JsonSyntaxException, IOException {
         ArrayList<Integer> allOrdersIDs = getAllOrdersIDs();
         int id = 1;
         while (true)
         {
             if (!allOrdersIDs.contains(id))
                 break;

             id += 1;
         }
         return String.valueOf(id);
     }

	public Order createNewOrder(OrderDTO orderParams, Customer customer) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Product> products = new ArrayList<Product>();
		for (ShoppingCartItem item : orderParams.getItems()) {
			products.add(item.getProduct());
		}
		
		double orderPrice = orderParams.getPrice();
		if(customer.getCustomerType().equals("GOLDEN"))
			orderPrice *= 0.95;
		else if(customer.getCustomerType().equals("SILVER"))
			orderPrice *= 0.97; 
		
		String restaurant = products.get(0).getRestaurantName();
		return new Order(generateOrderID(), new SimpleDateFormat("yyyy-MM-dd").format(new Date()), orderPrice, customer.getUsername(), OrderStatus.PROCESSING, products, restaurant);
	}
	
	public Customer editCustomerOrders (Customer customer, Order newOrder) throws JsonSyntaxException, IOException {
		customer.getCart().getItems().clear();
		customer.getCart().setTotal(0);
		double points = customer.getPoints();
		double newPoints = newOrder.getPrice()/1000 * 133;
		customer.setPoints(newPoints + points);
		
		if(customer.getPoints() >= 3000) {
			CustomerType silverType = new CustomerType("SILVER", 3, 3000);
			customer.setCustomerType(silverType);
		}
		else if (customer.getPoints() >= 4000) {
			CustomerType goldenType = new CustomerType("GOLDEN", 5, 4000);
			customer.setCustomerType(goldenType);
		}
		
		customer.getOrders().add(newOrder);
		updateCustomer(customer);
		return customer;
	}

	public void reduceItemQuantity(Customer customer, ShoppingCartItem item) throws JsonSyntaxException, IOException {
		double total = customer.getCart().getTotal();
		ArrayList<ShoppingCartItem> items = customer.getCart().getItems();
		ShoppingCartItem foundedItem = new ShoppingCartItem();
		int index = 0;
		for(int i = 0; i < items.size(); i++) {
			if(isEqual(items.get(i),item)) {
				foundedItem = items.get(i);
				index = i;
				customer.getCart().getItems().remove(i);
				break;
			}
		}
		int quantity = foundedItem.getQuantity();
		foundedItem.setQuantity(--quantity);
		customer.getCart().setTotal(total - foundedItem.getProduct().getPrice());
		customer.getCart().getItems().add(index, foundedItem);
		updateCustomer(customer);
		
	}

	public void removeItemFromCart(Customer customer, String nameAndRestaurant) throws JsonSyntaxException, IOException {
		double total = customer.getCart().getTotal();
		ArrayList<ShoppingCartItem> items = customer.getCart().getItems();
		ShoppingCartItem foundedItem = new ShoppingCartItem();
		int index = 0;
		for(ShoppingCartItem item : items) {
			String id = item.getProduct().getName() + item.getProduct().getRestaurantName();
			if(id.equals(nameAndRestaurant)) {
				foundedItem = item;
				customer.getCart().getItems().remove(item);
				break;
			}
		}
		customer.getCart().setTotal(total - foundedItem.getProduct().getPrice() * foundedItem.getQuantity());
		updateCustomer(customer);
	}

	public ArrayList<Order> getRestaurantOrders(String restaurant) throws JsonSyntaxException, IOException {
		ArrayList<Order> restaurantOrders = new ArrayList<Order>();
		for(Customer customer : customerDAO.getAll()) {
			for(Order order : customer.getOrders()) {
				if(order.getRestaurant().equals(restaurant)) {
					restaurantOrders.add(order);
				}
			}
		}
		return restaurantOrders;
	}

	public ArrayList<Customer> getRestaurantCustomers(String restaurant) throws JsonSyntaxException, IOException {
		ArrayList<Customer> restaurantCustomers = new ArrayList<Customer>();
		for(Customer customer : customerDAO.getAll()) {
			for(Order order : customer.getOrders()) {
				if(order.getRestaurant().equals(restaurant)) {
					restaurantCustomers.add(customer);
					break;
				}
			}
		}
		return restaurantCustomers;

	public void removeOrder(Customer customer, Order order) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Order> newOrders = customer.getOrders();
		
		for (Order o : newOrders) {
			if(o.getId().equals(order.getId())) {
				o.setStatus(OrderStatus.CANCELED);
				break;
			}
		}
		
		double points = customer.getPoints();
		double newPoints = points - order.getPrice()/1000 * 133 * 4;
		customer.setPoints(newPoints);
		
		if(customer.getPoints() < 4000 && customer.getPoints() >= 3000) {
			CustomerType silverType = new CustomerType("SILVER", 3, 3000);
			customer.setCustomerType(silverType);
		}
		else if (customer.getPoints() < 3000) {
			CustomerType bronzedType = new CustomerType("BRONZED", 0, 0);
			customer.setCustomerType(bronzedType);
		}
		
		customer.setOrders(newOrders);
		updateCustomer(customer);
	}
	
	public ArrayList<Order> getAllUndeliveredOrders(Customer customer){
		ArrayList<Order> undeliveredOrders = new ArrayList<Order>();
		
		for (Order order : customer.getOrders()) 
			if(!order.getStatus().equals(OrderStatus.DELIVERED))
				undeliveredOrders.add(order);
		
		return undeliveredOrders;
	}
	
	public ArrayList<Order> getAllProcessingOrders(Customer customer){
		ArrayList<Order> processingOrders = new ArrayList<Order>();
		
		for (Order order : customer.getOrders()) 
			if(order.getStatus().equals(OrderStatus.PROCESSING))
				processingOrders.add(order);
		
		return processingOrders;
	}
	
	public ArrayList<Order> getAllInPreparationOrders(Customer customer){
		ArrayList<Order> inPreparationOrders = new ArrayList<Order>();
		
		for (Order order : customer.getOrders()) 
			if(order.getStatus().equals(OrderStatus.IN_PREPARATION))
				inPreparationOrders.add(order);
		
		return inPreparationOrders;
	}
	
	public ArrayList<Order> getAllWaitingForDeliveryOrders(Customer customer){
		ArrayList<Order> waitingForDeliveryOrders = new ArrayList<Order>();
		
		for (Order order : customer.getOrders()) 
			if(order.getStatus().equals(OrderStatus.WAITING_FOR_DELIVERY))
				waitingForDeliveryOrders.add(order);
		
		return waitingForDeliveryOrders;
	}
	
	public ArrayList<Order> getAllInTransportOrders(Customer customer){
		ArrayList<Order> inTransportOrders = new ArrayList<Order>();
		
		for (Order order : customer.getOrders()) 
			if(order.getStatus().equals(OrderStatus.IN_TRANSPORT))
				inTransportOrders.add(order);
		
		return inTransportOrders;
	}
	
	public ArrayList<Order> getAllDeliveredOrders(Customer customer){
		ArrayList<Order> deliveredOrders = new ArrayList<Order>();
		
		for (Order order : customer.getOrders()) 
			if(order.getStatus().equals(OrderStatus.DELIVERED))
				deliveredOrders.add(order);
		
		return deliveredOrders;
	}
	
	public ArrayList<Order> getAllCanceledOrders(Customer customer){
		ArrayList<Order> canceledOrders = new ArrayList<Order>();
		
		for (Order order : customer.getOrders()) 
			if(order.getStatus().equals(OrderStatus.CANCELED))
				canceledOrders.add(order);
		
		return canceledOrders;
	}

	public ArrayList<Order> getAllOrdersFilteredByRestaurantType(Customer customer, String restType) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Order> allOrders = customer.getOrders();
		ArrayList<Order> filteredOrders = new ArrayList<Order>();
		
		for (Order order : allOrders) {
			Restaurant orderRestaurant = restaurantDAO.getByID(order.getRestaurant());
			if(orderRestaurant.getType().equals(restType))
				filteredOrders.add(order);
		}
		
		return filteredOrders;
	}
	
	public ArrayList<Order> getSuitableOrders (Customer customer, OrderSearchDTO searchParameters) throws JsonSyntaxException, IOException, ParseException {
		// TODO Auto-generated method stub
		ArrayList<Order> allOrders = customer.getOrders();
		ArrayList<Order> suitableOrders = new ArrayList<Order>();
		
		if(!searchParameters.getRestaurant().trim().isEmpty()) {
			suitableOrders.clear();
			for (Order order : allOrders) 
				if(order.getRestaurant().toLowerCase().contains(searchParameters.getRestaurant().toLowerCase().trim()))
					suitableOrders.add(order);
				
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		if(Double.compare(searchParameters.getMinPrice(), 0d) != 0) {
	
			double minPrice = searchParameters.getMinPrice();
			
			suitableOrders.clear();
			for (Order order : allOrders) 
				if(order.getPrice() > minPrice) 
					suitableOrders.add(order);
			
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		if(Double.compare(searchParameters.getMaxPrice(), 0d) != 0) {

			double maxPrice = searchParameters.getMaxPrice();
			
			suitableOrders.clear();
			for (Order order : allOrders) 
				if(order.getPrice() < maxPrice) 
					suitableOrders.add(order);
			
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		if(!searchParameters.getToDate().trim().isEmpty()) {
			
			Date dateTo=new SimpleDateFormat("yyyy-mm-dd").parse(searchParameters.getToDate()); 
			Date dateOrder;
			
			suitableOrders.clear();
			for (Order order : allOrders) {
				dateOrder = new SimpleDateFormat("yyyy-mm-dd").parse(order.getDateAndTime());
				if(dateOrder.before(dateTo)) {
					suitableOrders.add(order);
				}
			}
			
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		if(!searchParameters.getFromDate().trim().isEmpty()) {
			
			Date dateFrom=new SimpleDateFormat("yyyy-mm-dd").parse(searchParameters.getFromDate()); 
			Date dateOrder;
			
			suitableOrders.clear();
			for (Order order : allOrders) {
				dateOrder = new SimpleDateFormat("yyyy-mm-dd").parse(order.getDateAndTime());
				if(dateOrder.after(dateFrom)) {
					suitableOrders.add(order);
				}
			}
			
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		return suitableOrders;
	}
	
	public ArrayList<Order> getSortedOrders(Customer customer, SortDTO sortParameters) throws JsonSyntaxException, IOException {
		ArrayList<Order> sortedOrders = customer.getOrders();
		
		if(sortParameters.getParameter().equals("restaurant"))
			if(sortParameters.getMode().equals("asc"))
				sortedOrders.sort((o1, o2)-> o1.getRestaurant().compareTo( o2.getRestaurant()));
			else
				sortedOrders.sort((o1, o2)-> o2.getRestaurant().compareTo( o1.getRestaurant()));
		
		else if(sortParameters.getParameter().equals("price"))
			if(sortParameters.getMode().equals("asc"))
				sortedOrders.sort((o1, o2) -> Double.compare(o1.getPrice(), o2.getPrice()));
			else
				sortedOrders.sort((o1, o2) -> Double.compare(o2.getPrice(), o1.getPrice()));
		
		else if(sortParameters.getParameter().equals("date"))
			if(sortParameters.getMode().equals("asc"))
				sortedOrders.sort((o1, o2)-> o1.getDateAndTime().compareTo( o2.getDateAndTime()));
			else
				sortedOrders.sort((o1, o2)-> o2.getDateAndTime().compareTo( o1.getDateAndTime()));

		return sortedOrders;
	}
}
