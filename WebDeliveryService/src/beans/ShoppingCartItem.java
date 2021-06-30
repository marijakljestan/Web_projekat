package beans;

import java.io.Serializable;

public class ShoppingCartItem implements Serializable{

   private int quantity;
   private Product product;
       
	public ShoppingCartItem(int quantity, Product product) {
	super();
	this.quantity = quantity;
	this.product = product;
	}
	
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
   
}