package beans;

import java.io.Serializable;

public class Location implements Serializable{

   private double latitude;
   private double longitude;
   private Address address;
   
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	@Override
	public String toString() {
		String ret =  address.getCity() + " "  + address.getCountry();
		return ret.trim();
	}
}