package beans;

import java.io.Serializable;

public class Product implements Serializable{

   private String name;
   private int price;
   private ProductType type;
   private int quantity;
   private String description;
   private String picture;
   private String restaurantName;
   
   
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public int getPrice() {
	return price;
}
public void setPrice(int price) {
	this.price = price;
}
public ProductType getType() {
	return type;
}
public void setType(ProductType type) {
	this.type = type;
}
public int getQuantity() {
	return quantity;
}
public void setQuantity(int quantity) {
	this.quantity = quantity;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public String getPicture() {
	return picture;
}
public void setPicture(String picture) {
	this.picture = picture;
}
   
  
}