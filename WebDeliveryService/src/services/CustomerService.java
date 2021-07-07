package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.CustomerType;
import beans.Order;
import beans.Product;
import beans.ShoppingCartItem;
import dao.CustomerDAO;
import dto.OrderDTO;

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
		return new Order(generateOrderID(), orderPrice, customer.getUsername(), products, restaurant);
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

	public void removeOrder(Customer customer, Order order) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Order> newOrders = customer.getOrders();
		
		for (Order o : newOrders) {
			if(o.getId().equals(order.getId())) {
				newOrders.remove(o);
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
}
