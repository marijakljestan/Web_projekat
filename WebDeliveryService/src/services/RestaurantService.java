package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.JsonSyntaxException;

import beans.Restaurant;
import beans.RestaurantStatus;
import dao.RestaurantDAO;
import dto.RestaurantSearchDTO;
import dto.SortDTO;

public class RestaurantService {
	
	private RestaurantDAO restaurantDAO;
	private Base64ToImage decoder = new Base64ToImage();

	public RestaurantService(RestaurantDAO restaurantDAO) {
		super();
		this.restaurantDAO = restaurantDAO;
	}
	
	public ArrayList<Restaurant> getAll() throws JsonSyntaxException, IOException{
		ArrayList<Restaurant> allRestaurants = new ArrayList<Restaurant>();
		allRestaurants.addAll(getAllOpenedRestaurant());
		allRestaurants.addAll(getAllClosedRestaurant());
		return allRestaurants;
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
	
	public ArrayList<Restaurant> getAllOpenedRestaurant() throws JsonSyntaxException, IOException {
		ArrayList<Restaurant> allOpenedRestaurants = new ArrayList<Restaurant>();
		for (Restaurant restaurant : restaurantDAO.getAllNonDeleted()) 
			if(restaurant.getStatus().equals(RestaurantStatus.OPEN))
				allOpenedRestaurants.add(restaurant);
		
		return allOpenedRestaurants;
	}
	
	public ArrayList<Restaurant> getAllClosedRestaurant() throws JsonSyntaxException, IOException {
		ArrayList<Restaurant> allClosedRestaurants = new ArrayList<Restaurant>();
		for (Restaurant restaurant : restaurantDAO.getAllNonDeleted()) 
			if(restaurant.getStatus().equals(RestaurantStatus.CLOSED))
				allClosedRestaurants.add(restaurant);
		
		return allClosedRestaurants;
	}
	
	public ArrayList<String> getAllRestaurantTypes() throws JsonSyntaxException, IOException{
		ArrayList<String> allRestaurantTypes = new ArrayList<String>();
		
		for (Restaurant restaurant : getAll()) 
			if(!allRestaurantTypes.contains(restaurant.getType()))
				allRestaurantTypes.add(restaurant.getType());
				
		return allRestaurantTypes;
	}
	
	public ArrayList<Restaurant> getSortedRestaurants(SortDTO sortParameters) throws JsonSyntaxException, IOException {
		ArrayList<Restaurant> sortedRestaurants = getAll();
		
		if(sortParameters.getParameter().equals("name"))
			if(sortParameters.getMode().equals("asc"))
				sortedRestaurants.sort((o1, o2)-> o1.getName().compareTo( o2.getName()));
			else
				sortedRestaurants.sort((o1, o2)-> o2.getName().compareTo( o1.getName()));
		
		else if(sortParameters.getParameter().equals("location"))
			if(sortParameters.getMode().equals("asc"))
				sortedRestaurants.sort((o1, o2)-> o1.getLocation().toString().compareTo( o2.getLocation().toString()));
			else
				sortedRestaurants.sort((o1, o2)-> o2.getLocation().toString().compareTo( o1.getLocation().toString()));
		
		else if(sortParameters.getParameter().equals("grade"))
			if(sortParameters.getMode().equals("asc"))
				sortedRestaurants.sort((o1, o2) -> Double.compare(o1.getGrade(), o2.getGrade()));
			else
				sortedRestaurants.sort((o1, o2) -> Double.compare(o2.getGrade(), o1.getGrade()));
		
		return sortedRestaurants;
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
		
		if(!searchParameters.getType().trim().isEmpty()) {
			suitableRestaurants.clear();
			for (Restaurant restaurant : allRestaurants) {
				String typeRest = restaurant.getType().toString();
				if(typeRest.toLowerCase().contains(searchParameters.getType().toLowerCase().trim())) {
					suitableRestaurants.add(restaurant);
				}
			}
			
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
