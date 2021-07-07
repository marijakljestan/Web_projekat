package dto;

import beans.Customer;
import beans.Product;

public class ShoppingCartItemDTO {
	
	private Product product;
	private Customer customer;
	
		
	public ShoppingCartItemDTO(Product product, Customer customer) {
		super();
		this.product = product;
		this.customer = customer;
	}
	
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	

}
