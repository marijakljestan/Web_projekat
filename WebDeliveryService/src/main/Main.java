package main;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;

import controllers.CustomerController;
import controllers.DelivererController;
import controllers.ManagerController;
import controllers.ProductController;
import controllers.RestaurantController;
import controllers.UsersController;
import dao.CustomerDAO;
import dao.DelivererDAO;
import dao.ManagersDAO;
import dao.ProductDAO;
import dao.RestaurantDAO;
import dao.UsersDAO;
import services.CustomerService;
import services.DelivererService;
import services.ManagerService;
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

		ManagersDAO managersDAO = new ManagersDAO("./files/managers.json");
		ManagerService managerService = new ManagerService(managersDAO);
		ManagerController managerController = new ManagerController(managerService);
		
		DelivererDAO delivererDAO = new DelivererDAO("./files/deliverers.json");
		DelivererService delivererService = new DelivererService(delivererDAO);
		DelivererController delivererController = new DelivererController(delivererService);
		
		CustomerDAO customerDAO = new CustomerDAO("./files/customers.json");
		CustomerService customerService = new CustomerService(customerDAO);
		CustomerController customerController = new CustomerController(customerService);
	}
}
