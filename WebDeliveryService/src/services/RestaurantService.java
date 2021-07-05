package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonSyntaxException;

import beans.Restaurant;
import dao.RestaurantDAO;

public class RestaurantService {
	
	private RestaurantDAO restaurantDAO;
	private Base64ToImage decoder = new Base64ToImage();

	public RestaurantService(RestaurantDAO restaurantDAO) {
		super();
		this.restaurantDAO = restaurantDAO;
	}
	
	public ArrayList<Restaurant> getAll() throws JsonSyntaxException, IOException{
		return restaurantDAO.getAll();
	}
	
	public void createRestaurant(Restaurant restaurant) throws JsonSyntaxException, IOException {
		
		String convertedImage = new String();
		String path = "images/restaurants/" + restaurant.getName()  + ".jpg";
		decoder.Base64DecodeAndSave(restaurant.getLogo(), path);
		path = "./" + "images/restaurants/" + restaurant.getName()  + ".jpg"; 
		restaurant.setLogo(path);
		
		restaurantDAO.create(restaurant);
	}

}
