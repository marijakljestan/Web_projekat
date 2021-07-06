package beans;

import java.io.Serializable;
import java.util.*;


public class Customer extends User implements Serializable{
	
   private double points;
   private CustomerType customerType;
   private ShoppingCart cart;
   private ArrayList<Order> orders;
   
   
	public double getPoints() {
		return points;
	}
	public void setPoints(double points) {
		this.points = points;
	}
	public CustomerType getCustomerType() {
		return customerType;
	}
	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}
	public ShoppingCart getCart() {
		return cart;
	}
	public void setCart(ShoppingCart cart) {
		this.cart = cart;
	}
	public ArrayList<Order> getOrders() {
		return orders;
	}
	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}
   
   
   
}