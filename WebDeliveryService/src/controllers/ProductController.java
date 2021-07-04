package controllers;

import static spark.Spark.get;

import com.google.gson.Gson;

import services.ProductService;

public class ProductController {
	private ProductService productService;
	private static Gson gson = new Gson();
	
	public ProductController(ProductService productService) {
		super();
		this.productService = productService;
		
		get("restaurant/getJustProducts/:id", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(productService.getRestaurantsProducts(req.params("id")));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
}
