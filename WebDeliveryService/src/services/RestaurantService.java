package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Restaurant;
import dao.RestaurantDAO;

public class RestaurantService {
	
	private RestaurantDAO restaurantDAO;

	public RestaurantService(RestaurantDAO restaurantDAO) {
		super();
		this.restaurantDAO = restaurantDAO;
	}
	
	public ArrayList<Restaurant> getAll() throws JsonSyntaxException, IOException{
		return restaurantDAO.getAll();
	}

}
