package controllers;

import static spark.Spark.get;

import com.google.gson.Gson;

import services.ManagerService;


public class ManagerController {
	
	private ManagerService managerService;
	private static Gson gson = new Gson();
	
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
	}
	
	

}
