package dto;

import java.util.ArrayList;

import beans.ShoppingCartItem;

public class OrderDTO {
	
	private double price;
	private ArrayList<ShoppingCartItem> items;
	
	public OrderDTO(double price, ArrayList<ShoppingCartItem> items) {
		super();
		this.price = price;
		this.items = items;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public ArrayList<ShoppingCartItem> getItems() {
		return items;
	}

	public void setProducts(ArrayList<ShoppingCartItem> items) {
		this.items = items;
	}
}
