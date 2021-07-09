package dto;

public class OrderSearchManagerDTO {
	
	private double minPrice;
	private double maxPrice;
	private String fromDate;
	private String toDate;
	
	public OrderSearchManagerDTO(double minPrice, double maxPrice, String fromDate, String toDate) {
		super();
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.fromDate = fromDate;
		this.toDate = toDate;
	}

	public double getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(double minPrice) {
		this.minPrice = minPrice;
	}

	public double getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(double maxPrice) {
		this.maxPrice = maxPrice;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	
}
