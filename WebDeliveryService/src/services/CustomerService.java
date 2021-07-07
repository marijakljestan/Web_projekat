package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.ShoppingCartItem;
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
}
