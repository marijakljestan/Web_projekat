package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Product;
import services.ProductService;

public class ProductController {
	private ProductService productService;
	private static Gson gson = new Gson();
	
	public ProductController(ProductService productService) {
		super();
		this.productService = productService;
		
		get("/products/getRestaurantsProducts/:id", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(productService.getRestaurantsProducts(req.params("id")));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/product/addNew", (req,res) -> {
			res.type("application/json");
			
			try {
				Product newProduct = gson.fromJson(req.body(), Product.class);
				
				for (Product product : productService.getAll()) {
					if(product.getName().equals(newProduct.getName())) {
						//System.out.println("Vec postoji");
						return "";
					}
				}
				
				productService.addNewProduct(newProduct);
							
				return gson.toJson(newProduct);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		post("/product/editProduct", (req,res) -> {
			res.type("application/json");
			
			try {
				Product editedProduct = gson.fromJson(req.body(), Product.class);
				
			/*	for (Product product : productService.getAll()) {
					if(product.getName().equals(editedProduct.getName()) && product.getRestaurantName().equals(editedProduct.getRestaurantName())) {
						//System.out.println("Vec postoji");
						return "";
					}
				}*/
				
				productService.updateProduct(editedProduct);	
				return gson.toJson(editedProduct);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
	}
}
