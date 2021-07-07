package dto;

import java.util.ArrayList;

import beans.Product;

public class OrderDTO {
	
	private double price;
	private ArrayList<Product> products;
	
	public OrderDTO(double price, ArrayList<Product> products) {
		super();
		this.price = price;
		this.products = products;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public ArrayList<Product> getProducts() {
		return products;
	}

	public void setProducts(ArrayList<Product> products) {
		this.products = products;
	}
}
