package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Product;
import dao.ProductDAO;

public class ProductService {
	
	private ProductDAO productDAO;
	private Base64ToImage decoder = new Base64ToImage();
	
	public ProductService(ProductDAO productDAO) {
		super();
		this.productDAO = productDAO;
	}

	public ArrayList<Product> getRestaurantsProducts(String restaurantName) throws JsonSyntaxException, IOException {
		ArrayList<Product> restaurantsProducts = new ArrayList<Product>();
		for(Product p : productDAO.getAll()) {
			if(p.getRestaurantName().equals(restaurantName)) {
				restaurantsProducts.add(p);
			}
		}
		
		return restaurantsProducts;
	}
	
	public ArrayList<Product> getAll() throws JsonSyntaxException, IOException {
		return productDAO.getAll();
	}

	public void addNewProduct(Product newProduct) throws JsonSyntaxException, IOException {
		
		String convertedImage = new String();
		String path = "images/products/"  + newProduct.getName() + newProduct.getRestaurantName() + ".jpg";
		decoder.Base64DecodeAndSave(newProduct.getPicture(), path);
		path = "./" + "images/products/"  + newProduct.getName() + newProduct.getRestaurantName() + ".jpg";
		newProduct.setPicture(path);
		
		productDAO.create(newProduct);
		
	}
	
	public void updateProduct(Product editedProduct) throws JsonSyntaxException, IOException {
		productDAO.update(editedProduct);
	}

}
