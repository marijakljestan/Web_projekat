package controllers;

import static spark.Spark.get;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Comment;
import services.CommentService;
import spark.Session;

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
	}
}
