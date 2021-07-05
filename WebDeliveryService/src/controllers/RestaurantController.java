package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import dto.LoginDTO;
import services.RestaurantService;
import spark.Session;

public class RestaurantController {
	
	private RestaurantService restaurantService;
	private static Gson gson = new Gson();
	
	public RestaurantController(RestaurantService restaurantService) {
		super();
		this.restaurantService = restaurantService;
		
		get("/restaurants/getAll", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(restaurantService.getAll());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
	
	

}
