package beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

public class Order implements Serializable{

   private String id;
   private Date dateAndTime;
   private double price;
   private String customer;
   private OrderStatus status;
     
   private ArrayList<Product> products;
   private String restaurant;
   
   public Order() {
		super();
		this.id = "";
		this.dateAndTime = new Date();
		this.price = 0;
		this.customer = "";
		this.status = OrderStatus.PROCESSING;
		this.products = new ArrayList<Product>();
		this.restaurant = "";
	}
   
	public Order(String id, double price, String customer, ArrayList<Product> products,
				String restaurant) {
		super();
		this.id = id;
		this.dateAndTime = new Date();
		this.price = price;
		this.customer = customer;
		this.status = OrderStatus.PROCESSING;
		this.products = products;
		this.restaurant = restaurant;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getDateAndTime() {
		return dateAndTime;
	}
	public void setDateAndTime(Date dateAndTime) {
		this.dateAndTime = dateAndTime;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public OrderStatus getStatus() {
		return status;
	}
	public void setStatus(OrderStatus status) {
		this.status = status;
	}
	public ArrayList<Product> getProducts() {
		return products;
	}
	public void setProducts(ArrayList<Product> products) {
		this.products = products;
	}
	public String getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}
     
}