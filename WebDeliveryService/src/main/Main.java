package main;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;
import controllers.ProductController;
import dao.ProductDAO;
import services.ProductService;
import controllers.ManagerController;
import controllers.RestaurantController;
import controllers.UsersController;
import dao.ManagersDAO;
import dao.RestaurantDAO;
import dao.UsersDAO;
import services.ManagerService;
import services.RestaurantService;
import services.UsersService;

public class Main {

	private static Gson g = new Gson();

	public static void main(String[] args) throws Exception {
		port(8088);
		
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

		ManagersDAO managersDAO = new ManagersDAO("./files/managers.json");
		ManagerService managerService = new ManagerService(managersDAO);
		ManagerController managerController = new ManagerController(managerService);
	}
}
