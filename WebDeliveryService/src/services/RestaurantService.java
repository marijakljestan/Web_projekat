package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Restaurant;
import dao.RestaurantDAO;
import dto.RestaurantSearchDTO;

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

	public Restaurant getRestaurant(String id) throws JsonSyntaxException, IOException {
		return restaurantDAO.getByID(id);
	}
	
	public ArrayList<String> getAllRestaurantTypes() throws JsonSyntaxException, IOException{
		ArrayList<String> allRestaurantTypes = new ArrayList<String>();
		
		for (Restaurant restaurant : getAll()) 
			if(!allRestaurantTypes.contains(restaurant.getType()))
				allRestaurantTypes.add(restaurant.getType());
				
		return allRestaurantTypes;
	}
	
	public ArrayList<Restaurant> getSuitableRestaurants(RestaurantSearchDTO searchParameters) throws JsonSyntaxException, IOException{
		
		ArrayList<Restaurant> allRestaurants = getAll();
		ArrayList<Restaurant> suitableRestaurants = getAll();
		
		if(!searchParameters.getName().trim().isEmpty()) {
			suitableRestaurants.clear();
			for (Restaurant restaurant : allRestaurants) 
				if(restaurant.getName().toLowerCase().contains(searchParameters.getName().toLowerCase()))
					suitableRestaurants.add(restaurant);
				
			allRestaurants.clear();
			allRestaurants.addAll(suitableRestaurants);
		}
		
		if(!searchParameters.getLocation().trim().isEmpty()) {
			suitableRestaurants.clear();
			for (Restaurant restaurant : allRestaurants)
				if(restaurant.getLocation().toString().toLowerCase().contains(searchParameters.getLocation().toLowerCase().trim()))
					suitableRestaurants.add(restaurant);
				
			allRestaurants.clear();
			allRestaurants.addAll(suitableRestaurants);
		}
		
		if(!searchParameters.getLocation().trim().isEmpty()) {
			suitableRestaurants.clear();
			for (Restaurant restaurant : allRestaurants)
				if(restaurant.getType().toString().toLowerCase().contains(searchParameters.getType().toLowerCase().trim()))
					suitableRestaurants.add(restaurant);
			
		    allRestaurants.clear();
			allRestaurants.addAll(suitableRestaurants);
		}
		
		if(!searchParameters.getGrade().trim().isEmpty()) {
			int gradeFilter = Integer.parseInt(searchParameters.getGrade());
			double minGrade = (gradeFilter == 1) ? 1. : gradeFilter - 0.5;
			double maxGrade = (gradeFilter == 5) ? 5. : gradeFilter + 0.5;
			
			suitableRestaurants.clear();
			for (Restaurant restaurant : allRestaurants) 
				if(restaurant.getGrade() > minGrade && restaurant.getGrade() < maxGrade) 
					suitableRestaurants.add(restaurant);
			
			allRestaurants.clear();
			allRestaurants.addAll(suitableRestaurants);
		}
					
		return suitableRestaurants;
	}

}
