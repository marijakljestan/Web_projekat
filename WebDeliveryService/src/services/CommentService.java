package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Comment;
import beans.CommentStatus;
import dao.CommentDAO;

public class CommentService {
	
	private CommentDAO commentDAO;

	public CommentService(CommentDAO commentDAO) {
		super();
		this.commentDAO = commentDAO;
	}

	public ArrayList<Comment> getApprovedRestaurantComments(String restaurant) throws JsonSyntaxException, IOException {
		ArrayList<Comment> approvedComments = new ArrayList<Comment>();
		for(Comment comment : commentDAO.getAll()) {
			if(comment.getRestaurant().equals(restaurant) && comment.getStatus().equals(CommentStatus.APPROVED))
				approvedComments.add(comment);
		}
		
		return approvedComments;
	}
}
