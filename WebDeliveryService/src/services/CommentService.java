package services;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.JsonSyntaxException;

import beans.Comment;
import beans.CommentStatus;
import beans.Order;
import beans.OrderStatus;
import beans.Product;
import beans.ShoppingCartItem;
import dao.CommentDAO;
import dto.CommentDTO;

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

	public ArrayList<Comment> getRestaurantComments(String restaurant) throws JsonSyntaxException, IOException {
		ArrayList<Comment> restaurantComments = new ArrayList<Comment>();
		for(Comment comment : commentDAO.getAll()) {
			if(comment.getRestaurant().equals(restaurant))
				restaurantComments.add(comment);
		}
		
		return restaurantComments;
	}

	public ArrayList<Comment> getAllComments() throws JsonSyntaxException, IOException {
		return commentDAO.getAll();
	}

	public Comment createNewComment(CommentDTO commentParams) throws JsonSyntaxException, IOException {
		
		Comment newComment = new Comment(generateCommentID(), commentParams.getCustomer(), commentParams.getRestaurant(), commentParams.getContent(), commentParams.getGrade(), commentParams.getStatus());
		commentDAO.save(newComment);
		return newComment;
	}

	private Integer generateCommentID() throws JsonSyntaxException, IOException {
		ArrayList<Integer> allIDs = commentDAO.getAllOrdersIDs();
        int id = 1;
        while (true)
        {
            if (!allIDs.contains(id))
                break;

            id += 1;
        }
        return id;
	}
}
