package controllers;

import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Deliverer;
import services.DelivererService;

public class DelivererController {
	
	private DelivererService delivererService;
	private static Gson gson = new Gson();
	
	public DelivererController(DelivererService delivererService) {
		super();
		this.delivererService = delivererService;
		
		post("/deliverer/createDeliverer", (req,res) -> {
			res.type("application/json");
			
			try {
				Deliverer newDeliverer = gson.fromJson(req.body(), Deliverer.class);
				System.out.println(newDeliverer.getUsername());
				
				for (Deliverer deliverer : delivererService.getAllDeliverers()) {
					if(deliverer.getUsername().equals(newDeliverer.getUsername())) {
						//System.out.println("Vec postoji");
						System.out.println(deliverer.getUsername());
						return "";
					}
				}
				
				System.out.println("****");
				delivererService.createDeliverer(newDeliverer);							
				return gson.toJson(newDeliverer);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
	}
}
