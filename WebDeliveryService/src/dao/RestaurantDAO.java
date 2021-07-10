package dao;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Restaurant;

public class RestaurantDAO implements IDao<Restaurant, String>{
	
	private String path;

	public RestaurantDAO(String path) {
		super();
		this.path = path;
	}
	
	@Override
	public ArrayList<Restaurant> getAll() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Restaurant> restaurants = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<Restaurant>>(){}.getType());
		
		if(restaurants == null)
			restaurants = new ArrayList<Restaurant>();
			
		return restaurants;
	}

	@Override
	public ArrayList<Restaurant> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Restaurant> allRestaurants = getAll();
		ArrayList<Restaurant> nonDeleted = new ArrayList<Restaurant>();
		
		for (Restaurant restaurant : allRestaurants) 
			if(!restaurant.isDeleted())
				nonDeleted.add(restaurant);
		
		return nonDeleted;
	}

	@Override
	public Restaurant getByID(String id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Restaurant> restaurants = getAll();
		for(Restaurant restaurant : restaurants) 
			if(restaurant.getName().equals(id)) 
				return restaurant;
		
		return null;
	}

	@Override
	public void create(Restaurant entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Restaurant> restaurants = getAll();
		restaurants.add(entity);
		saveAll(restaurants);	
	}

	@Override
	public void update(Restaurant entity) throws JsonSyntaxException, IOException {
		ArrayList<Restaurant> restaurants = getAll();
		for(Restaurant r : restaurants) {
			if(r.getName().equals(entity.getName())) {
				restaurants.set(restaurants.indexOf(r), entity);
				break;
			}
		}
		saveAll(restaurants);	

	}

	@Override
	public void delete(Restaurant entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Restaurant entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Restaurant> restaurants = getAll();
		restaurants.add(entity);
		saveAll(restaurants);
	}

	@Override
	public void saveAll(ArrayList<Restaurant> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<Restaurant>>(){}.getType());
		writer.println(allEntities);
		writer.close();	
	}

}
