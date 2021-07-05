package beans;

import java.io.Serializable;

public class Manager extends User implements Serializable{

   private Restaurant restaurant;

	public Manager(Restaurant restaurant) {
		super();
		this.restaurant = restaurant;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
   

}