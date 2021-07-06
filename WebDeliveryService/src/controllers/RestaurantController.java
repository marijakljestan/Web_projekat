package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Restaurant;
import dto.RestaurantSearchDTO;
import dto.SortDTO;
import services.RestaurantService;

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
		

		get("/restaurants/getAllOpenedRestaurants", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(restaurantService.getAllOpenedRestaurant());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("restaurant/:id", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(restaurantService.getRestaurant(req.params("id")));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/restaurants/addNewRestaurant", (req,res) -> {
			res.type("application/json");
			
			try {
				Restaurant newRestaurant = gson.fromJson(req.body(), Restaurant.class);
				
				for (Restaurant restaurant : restaurantService.getAll()) {
					if(restaurant.getName().equals(newRestaurant.getName())) {
						return "";
					}
				}
				
				restaurantService.createRestaurant(newRestaurant);		
				return gson.toJson(newRestaurant);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/restaurants/getAllTypes", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(restaurantService.getAllRestaurantTypes());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/restaurants/searchRestaurants", (req,res) -> {
			res.type("application/json");
			
			try {
				RestaurantSearchDTO searchParameters = gson.fromJson(req.body(), RestaurantSearchDTO.class);
				ArrayList<Restaurant> restaurants =	restaurantService.getSuitableRestaurants(searchParameters);		
				return gson.toJson(restaurants);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/restaurants/sortRestaurants", (req,res) -> {
			res.type("application/json");
			
			try {
				SortDTO sortParameters = gson.fromJson(req.body(), SortDTO.class);
				ArrayList<Restaurant> restaurants =	restaurantService.getSortedRestaurants(sortParameters);		
				return gson.toJson(restaurants);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
	}

}
