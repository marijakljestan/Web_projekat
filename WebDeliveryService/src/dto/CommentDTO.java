package dto;

import beans.CommentStatus;

public class CommentDTO {

	private String customer;
	private String restaurant;
	private String content;
	private int grade;
	private CommentStatus status;

	public CommentDTO(String customer, String restaurant, String content, int grade, CommentStatus status) {
		super();
		this.customer = customer;
		this.restaurant = restaurant;
		this.content = content;
		this.grade = grade;
		this.status = status;
	}

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
