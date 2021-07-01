package beans;

import java.io.Serializable;
import java.util.*;


public class Restaurant implements Serializable{

	private static final long serialVersionUID = 1L;
	
   private String name;
   private String type;
   private RestaurantStatus status;
   private String logo;
   private Location location;
   private Boolean isDeleted;
   
   public ArrayList<Product> products;
   
  

	public Restaurant(String name, String type, RestaurantStatus status, String logo, Location location) {
	super();
	this.name = name;
	this.type = type;
	this.status = status;
	this.logo = logo;
	this.location = location;
	this.isDeleted = false;
	this.products = new ArrayList<Product>();
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public RestaurantStatus getStatus() {
		return status;
	}
	
	public void setStatus(RestaurantStatus status) {
		this.status = status;
	}
	
	public String getLogo() {
		return logo;
	}
	
	public void setLogo(String logo) {
		this.logo = logo;
	}
	
	public Location getLocation() {
		return location;
	}
	
	public void setLocation(Location location) {
		this.location = location;
	}
	
	public ArrayList<Product> getProducts() {
		return products;
	}
	
	public void setProducts(ArrayList<Product> products) {
		this.products = products;
	}

	public Boolean isDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean deleted) {
		this.isDeleted = deleted;
	} 	
   
}