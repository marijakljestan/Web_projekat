package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Comment;
import beans.Order;
import dto.CommentDTO;
import services.CommentService;

public class CommentController {
	
	private CommentService commentService;
	private static Gson gson = new Gson();
	
	public CommentController(CommentService commentService) {
		super();
		this.commentService = commentService;
		
		get("/comments/getApprovedComments/:id", (req, res) -> {
			res.type("application/json");
			try {
				ArrayList<Comment> comments = commentService.getApprovedRestaurantComments(req.params("id"));
				return gson.toJson(comments);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/comments/getRestaurantComments/:id", (req, res) -> {
			res.type("application/json");
			try {
				ArrayList<Comment> comments = commentService.getRestaurantComments(req.params("id"));
				return gson.toJson(comments);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/comments/getAllComments/", (req, res) -> {
			res.type("application/json");
			try {
				ArrayList<Comment> comments = commentService.getAllComments();
				return gson.toJson(comments);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/comment/add/", (req,res) -> {
			res.type("application/json");
			
			try {
				CommentDTO commentParams = gson.fromJson(req.body(), CommentDTO.class);
				Comment newComment = commentService.createNewComment(commentParams);	
				
				return newComment;
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
	}
}
