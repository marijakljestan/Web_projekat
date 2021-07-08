package beans;

import java.io.Serializable;

public class Comment implements Serializable{

   private Integer id;
   private String customer;
   private String restaurant;
   private String content;
   private int grade;
   private CommentStatus status;
   
	public Comment() {
		super();
	}

	public Comment(Integer id, String customer, String restaurant, String content, int grade, CommentStatus status) {
		super();
		this.id = id;
		this.customer = customer;
		this.restaurant = restaurant;
		this.content = content;
		this.grade = grade;
		this.status = status;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public CommentStatus getStatus() {
		return status;
	}

	public void setStatus(CommentStatus status) {
		this.status = status;
	}

}