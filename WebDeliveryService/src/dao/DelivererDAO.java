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

import beans.Deliverer;

public class DelivererDAO implements IDao<Deliverer, String>{
	
	private String path;

	public DelivererDAO(String path) {
		super();
		this.path = path;
	}

	@Override
	public ArrayList<Deliverer> getAll() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Deliverer> deliverers = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<Deliverer>>(){}.getType());
		
		if(deliverers == null)
			deliverers = new ArrayList<Deliverer>();
			
		return deliverers;
	}

	@Override
	public ArrayList<Deliverer> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Deliverer> allDeliverers = getAll();
		ArrayList<Deliverer> nonDeleted = new ArrayList<Deliverer>();
		
		for (Deliverer deliverer : allDeliverers) 
			if(!deliverer.isDeleted())
				nonDeleted.add(deliverer);
		
		return nonDeleted;
	}

	@Override
	public Deliverer getByID(String id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		Deliverer wantedDeliverer = null;
		ArrayList<Deliverer> deliverers = (ArrayList<Deliverer>) getAll();
		if(deliverers.size()!=0)
		{
			for(Deliverer deliverer : deliverers) {
				if(deliverer.getUsername().equals(id)) {
					wantedDeliverer = deliverer;
					break;
				}
			}
		}
		return wantedDeliverer;
	}

	@Override
	public void create(Deliverer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Deliverer> deliverers = getAll();
		deliverers.add(entity);
		saveAll(deliverers);
	}

	@Override
	public void update(Deliverer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Deliverer> deliverers = getAll();
		for(Deliverer deliverer : deliverers) {
			if(deliverer.getUsername().equals(entity.getUsername())) {
				deliverers.set(deliverers.indexOf(deliverer), entity);
				break;
			}
		}
		saveAll(deliverers);	
	}

	@Override
	public void delete(Deliverer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Deliverer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Deliverer> deliverers = getAll();
		deliverers.add(entity);
		saveAll(deliverers);
	}

	@Override
	public void saveAll(ArrayList<Deliverer> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<Deliverer>>(){}.getType());
		writer.println(allEntities);
		writer.close();
	}

}
