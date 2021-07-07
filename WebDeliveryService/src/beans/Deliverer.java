package beans;

import java.io.Serializable;
import java.util.*;

public class Deliverer extends User implements Serializable{
	
   public ArrayList<Order> orders;
   
	public Deliverer(ArrayList<Order> orders) {
		super();
		this.orders = orders;
	}

	public ArrayList<Order> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}  

}