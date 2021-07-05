package main;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;

import controllers.ProductController;
import controllers.RestaurantController;
import controllers.UsersController;
import dao.ProductDAO;
import dao.RestaurantDAO;
import dao.UsersDAO;
import services.ProductService;
import services.RestaurantService;
import services.UsersService;

public class Main {

	private static Gson g = new Gson();

	public static void main(String[] args) throws Exception {
		port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath()); 
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
		UsersDAO usersDAO = new UsersDAO("./files/users.json");
		UsersService usersService = new UsersService(usersDAO);
		UsersController usersController = new UsersController(usersService);
		
		RestaurantDAO restaurantDAO = new RestaurantDAO("./files/restaurants.json");
		RestaurantService restaurantService = new RestaurantService(restaurantDAO);
		RestaurantController restaurantController = new RestaurantController(restaurantService);
		
		ProductDAO productDAO = new ProductDAO("./files/products.json");
		ProductService productService = new ProductService(productDAO);
		ProductController productController = new ProductController(productService);
	}
}
