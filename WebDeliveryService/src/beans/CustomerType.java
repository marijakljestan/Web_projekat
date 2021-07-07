package beans;

import java.io.Serializable;
import java.util.*;

public class CustomerType implements Serializable {
	
   private String name;
   private int discount;
   private int requiredNumberOfPoints;
   
   
 
	public CustomerType() {
		super();
		this.name = "BRONZED";
		this.discount = 0;
		this.requiredNumberOfPoints = 0;
	}

	public CustomerType(String name, int discount, int requiredNumberOfPoints) {
		super();
		this.name = name;
		this.discount = discount;
		this.requiredNumberOfPoints = requiredNumberOfPoints;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public int getRequiredNumberOfPoints() {
		return requiredNumberOfPoints;
	}
	public void setRequiredNumberOfPoints(int requiredNumberOfPoints) {
		this.requiredNumberOfPoints = requiredNumberOfPoints;
	}    
}