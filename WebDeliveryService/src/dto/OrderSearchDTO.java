package dto;

import java.util.Date;

public class OrderSearchDTO {
	
	private String restaurant;
	private double minPrice;
	private double maxPrice;
	private String fromDate;
	private String toDate;
	
	
	public OrderSearchDTO(String restaurant, double minPrice, double maxPrice, String fromDate, String toDate) {
		super();
		this.restaurant = restaurant;
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.fromDate = fromDate;
		this.toDate = toDate;
	}

	public String getRestaurant() {
		return restaurant;
	}


	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}


	public double getMinPrice() {
		return minPrice;
	}


	public void setMinPrice(double minPrice) {
		this.minPrice = minPrice;
	}


	public double getMaxPrice() {
		return maxPrice;
	}


	public void setMaxPrice(double maxPrice) {
		this.maxPrice = maxPrice;
	}


	public String getFromDate() {
		return fromDate;
	}


	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}


	public String getToDate() {
		return toDate;
	}


	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	
}
