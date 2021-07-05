package beans;

public class Address {

   private String street;
   private String city;
   private int postalcode;
   private String country;
   
	public Address() {
		super();
	}

	public Address(String street, String city, int postalcode, String country) {
		super();
		this.street = street;
		this.city = city;
		this.postalcode = postalcode;
		this.country = country;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}
		

	public int getPostalcode() {
		return postalcode;
	}

	public void setPostalcode(int postalcode) {
		this.postalcode = postalcode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
   
}