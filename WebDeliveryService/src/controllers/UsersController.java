package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import spark.Session;

import javax.ws.rs.core.Response;
import com.google.gson.Gson;

import beans.User;
import services.UsersService;

public class UsersController {
	
	private UsersService usersService;
	private static Gson gson = new Gson();

	public UsersController(UsersService usersService) {
		this.usersService = usersService;
		
		post("/users/register", (req,res) -> {
			res.type("application/json");
			
			try {
				User newUser = gson.fromJson(req.body(), User.class);
				usersService.register(newUser);
				Session session = req.session(true);
				
				User loggedUser = session.attribute("user");
				if(loggedUser == null)
					session.attribute("user", newUser);
								
				return gson.toJson(newUser);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
	}	
}
