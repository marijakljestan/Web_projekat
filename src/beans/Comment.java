package beans;

import java.io.Serializable;

public class Comment implements Serializable{

   private String content;
   private int grade;
   
   private Order order;

	public Comment() {
		super();
	}

	public Comment(String content, int grade, Order order) {
		super();
		this.content = content;
		this.grade = grade;
		this.order = order;
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

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

}