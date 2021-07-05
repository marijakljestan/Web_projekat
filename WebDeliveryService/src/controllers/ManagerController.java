package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Manager;
import beans.Restaurant;
import beans.User;
import services.Base64ToImage;
import services.ManagerService;
import spark.Session;


public class ManagerController {
	
	private ManagerService managerService;
	private static Gson gson = new Gson();
	private Base64ToImage decoder = new Base64ToImage();
	
	public ManagerController(ManagerService managerService) {
		super();
		this.managerService = managerService;
		
		get("/managers/getAllManagersWithoutRestaurant", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(managerService.getAllManagersWithoutRestaurant());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/managers/createManager", (req,res) -> {
			res.type("application/json");
			
			try {
				Manager newManager = gson.fromJson(req.body(), Manager.class);
				
				for (Manager manager : managerService.getAllManagers()) {
					if(manager.getUsername().equals(newManager.getUsername())) {
						//System.out.println("Vec postoji");
						return "";
					}
				}
				
				managerService.createManager(newManager);							
				return gson.toJson(newManager);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		post("/managers/setRestaurantToManager/:id", (req,res) -> {
			res.type("application/json");
			
			try {
				Manager manager = managerService.getManagerByUserName(req.params("id"));
				Restaurant restaurant = gson.fromJson(req.body(), Restaurant.class);
				
				
				String convertedImage = new String();
				String path = "images/restaurants/" + restaurant.getName()  + ".jpg";
				decoder.Base64DecodeAndSave(restaurant.getLogo(), path);
				path = "./" + "images/restaurants/" + restaurant.getName()  + ".jpg"; 
				restaurant.setLogo(path);
				manager.setRestaurant(restaurant.getName());
				
				managerService.updateManager(manager);							
				return gson.toJson(manager);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		get("/managers/getAllManagersWithoutRestaurant", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(managerService.getAllManagersWithoutRestaurant());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/manager/", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				return gson.toJson(managerService.getManagerByUserName(loggedUser.getUsername()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
	
	
}
