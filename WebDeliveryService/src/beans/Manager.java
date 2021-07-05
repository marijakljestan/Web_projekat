package beans;

import java.io.Serializable;

public class Manager extends User implements Serializable{

   private String restaurant;

	public Manager(String restaurant) {
		super();
		this.restaurant = restaurant;
	}

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}
   

}