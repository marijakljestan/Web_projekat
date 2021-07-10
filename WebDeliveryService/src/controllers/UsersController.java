package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
import spark.Session;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.User;
import dto.LoginDTO;
import dto.SortDTO;
import dto.UserSearchDTO;
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
				
				for (User user : usersService.getAllUsers()) {
					if(user.getUsername().equals(newUser.getUsername())) {
						//System.out.println("Vec postoji");
						return "";
					}
				}
				
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
		
		post("/user/login", (req, res) -> {
			res.type("application/json");
			try {
				User loggedUser = usersService.login(gson.fromJson(req.body(), LoginDTO.class));
				if (loggedUser != null) {
					Session session = req.session(true);
					session.attribute("user", loggedUser);
					return gson.toJson(loggedUser);
				} else {
					return "";
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/user/", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				return gson.toJson(loggedUser);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/users/edit", (req,res) -> {
			res.type("application/json");
			
			try {
				User newUser = gson.fromJson(req.body(), User.class);
				
				usersService.editUser(newUser);
				Session session = req.session(true);			
				session.attribute("user", newUser);
				return gson.toJson(newUser);
				
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});

		get("/user/getAllUsers", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(usersService.getAllUsers());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/user/getAllAdmins", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(usersService.getAllAdmins());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/user/getAllManagers", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(usersService.getAllManagers());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/user/getAllDeliverers", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(usersService.getAllDeliverers());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/user/getAllCustomers", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(usersService.getAllCustomers());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/user/searchUsers", (req,res) -> {
			res.type("application/json");
			
			try {
				UserSearchDTO searchParameters = gson.fromJson(req.body(), UserSearchDTO.class);
				ArrayList<User> users =	usersService.getSuitableUsers(searchParameters);		
				return gson.toJson(users);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		get("/users/logout", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			User loggedUser = session.attribute("user");
			
			if (loggedUser != null) {
				session.invalidate();
			}
			return true;
		});
		
		post("/user/sortUsers", (req,res) -> {
			res.type("application/json");
			
			try {
				SortDTO sortParameters = gson.fromJson(req.body(), SortDTO.class);
				ArrayList<User> users =	usersService.getSortedUsers(sortParameters);		
				return gson.toJson(users);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		put("user/blockUser/:id", (req, res) -> {
			res.type("application/json");
			try {
				User user = usersService.getUserByUserName(req.params("id"));
				user.setBlocked(true);
				usersService.updateUser(user);
				return gson.toJson(usersService.getAllUsers());
				
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
	}	
}
