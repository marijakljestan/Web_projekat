package dto;

import beans.CommentStatus;

public class CommentDTO {
	
	   private String customer;
	   private String restaurant;
	   private String content;
	   private int grade;
	   private CommentStatus status;
	   
	   public String getCustomer() {
		   return customer;
	   }
	   
	   public String getRestaurant() {
		   return restaurant;
	   }
	   
	   public String getContent() {
		   return content;
	   }
	   
	   public int getGrade() {
		   return grade;
	   }
	   
	   public CommentStatus getStatus() {
		   return status;
	   }
}
