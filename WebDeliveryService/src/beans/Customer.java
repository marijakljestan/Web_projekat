package beans;

import java.io.Serializable;
import java.util.*;

public class Customer extends User implements Serializable{
	
   private double points;
   private CustomerType customerType;
   private ShoppingCart cart;
   private ArrayList<Order> orders;
   
   private ArrayList<Date> canceledOrders;
   private Boolean isSuspicious;
         
   
	public Customer() {
		super();
		this.points = 0;
		this.customerType = new CustomerType();
		this.cart = new ShoppingCart();
		this.orders = new ArrayList<Order>();
		this.canceledOrders = new ArrayList<Date>();
		this.isSuspicious = false;
	}
	
	
	public Customer(double points, CustomerType customerType, ShoppingCart cart, ArrayList<Order> orders,
			ArrayList<Date> canceledOrders, Boolean isSuspicious) {
		super();
		this.points = points;
		this.customerType = customerType;
		this.cart = cart;
		this.orders = orders;
		this.canceledOrders = canceledOrders;
		this.isSuspicious = isSuspicious;
	}

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

	public ArrayList<Date> getCanceledOrders() {
		return canceledOrders;
	}

	public void setCanceledOrders(ArrayList<Date> canceledOrders) {
		this.canceledOrders = canceledOrders;
	}

	public Boolean getIsSuspicious() {
		return isSuspicious;
	}

	public void setIsSuspicious(Boolean isSuspicious) {
		this.isSuspicious = isSuspicious;
	}      
   
}