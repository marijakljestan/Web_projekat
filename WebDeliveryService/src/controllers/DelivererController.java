package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import com.google.gson.Gson;

import beans.Deliverer;
import beans.Order;
import beans.User;
import services.DelivererService;
import spark.Session;

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
				
				for (Deliverer deliverer : delivererService.getAllDeliverers()) {
					if(deliverer.getUsername().equals(newDeliverer.getUsername())) {
						//System.out.println("Vec postoji");
						return "";
					}
				}
				
				delivererService.createDeliverer(newDeliverer);							
				return gson.toJson(newDeliverer);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		put("/deliverer/edit", (req,res) -> {
			res.type("application/json");
			
			try {
				Deliverer deliverer = gson.fromJson(req.body(), Deliverer.class);
				delivererService.updateDeliverer(deliverer);
				
				return true;
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}			
		});
		
		get("/deliverer/getAllOrders", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				return gson.toJson(delivererService.getDelivererByUsername(loggedUser.getUsername()).getOrders());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		put("/deliverer/changeOrderStatusToDelivered", (req,res) -> {
			res.type("application/json");
			try {
				Order order = gson.fromJson(req.body(), Order.class);
				System.out.println("***" + order.getId() + " " + order.getStatus());
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Deliverer deliverer = delivererService.getDelivererByUsername(loggedUser.getUsername());
				delivererService.changeOrderStatus(deliverer, order);
				return gson.toJson(deliverer.getOrders());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
	}
}
