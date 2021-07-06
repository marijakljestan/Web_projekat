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

import beans.Manager;
import beans.Product;
import beans.Restaurant;
import beans.User;

public class ProductDAO implements IDao<Product, String> {

	private String path;

	public ProductDAO(String path) {
		super();
		this.path = path;
	}
	
	@Override
	public ArrayList<Product> getAll() throws JsonSyntaxException, IOException {
		ArrayList<Product> products = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<Product>>(){}.getType());
		
		if(products == null)
			products = new ArrayList<Product>();
			
		return products;
	}

	@Override
	public ArrayList<Product> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product getByID(String id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void create(Product entity) throws JsonSyntaxException, IOException {
		ArrayList<Product> products = getAll();
		products.add(entity);
		saveAll(products);	
		
	}

	@Override
	public void update(Product entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Product> products = getAll();
		for(Product product : products) {
			if(product.getName().equals(entity.getName()) && product.getRestaurantName().equals(entity.getRestaurantName())) {
				products.set(products.indexOf(product), entity);
				break;
			}
		}
		saveAll(products);	
	}

	@Override
	public void delete(Product entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Product entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void saveAll(ArrayList<Product> entities) throws FileNotFoundException {
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<Product>>(){}.getType());
		writer.println(allEntities);
		writer.close();	
		
	}

}
