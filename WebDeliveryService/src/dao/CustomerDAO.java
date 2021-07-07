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

import beans.Customer;
import beans.Order;

public class CustomerDAO implements IDao<Customer, String>{
	
	private String path;

	public CustomerDAO(String path) {
		super();
		this.path = path;
	}

	@Override
	public ArrayList<Customer> getAll() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Customer> customers = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<Customer>>(){}.getType());
		
		if(customers == null)
			customers = new ArrayList<Customer>();
			
		return customers;
	}

	@Override
	public ArrayList<Customer> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Customer> allCustomers = getAll();
		ArrayList<Customer> nonDeleted = new ArrayList<Customer>();
		
		for (Customer customer : allCustomers) 
			if(!customer.isDeleted())
				nonDeleted.add(customer);
		
		return nonDeleted;
	}

	@Override
	public Customer getByID(String id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		Customer wantedCustomer = null;
		ArrayList<Customer> customers = (ArrayList<Customer>) getAll();
		if(customers.size()!=0)
		{
			for(Customer customer : customers) {
				if(customer.getUsername().equals(id)) {
					wantedCustomer = customer;
					break;
				}
			}
		}
		return wantedCustomer;
	}

	@Override
	public void create(Customer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Customer> customers = getAll();
		customers.add(entity);
		saveAll(customers);
	}

	@Override
	public void update(Customer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Customer> customers = getAll();
		for(Customer customer : customers) {
			if(customer.getUsername().equals(entity.getUsername())) {
				customers.set(customers.indexOf(customer), entity);
				break;
			}
		}
		saveAll(customers);	
	}

	@Override
	public void delete(Customer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Customer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Customer> customers = getAll();
		customers.add(entity);
		saveAll(customers);
	}

	@Override
	public void saveAll(ArrayList<Customer> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<Customer>>(){}.getType());
		writer.println(allEntities);
		writer.close();
	}
	
	public ArrayList<Integer> getAllOrdersIDs() throws JsonSyntaxException, IOException{
		
		ArrayList<Integer> allIDs = new ArrayList<Integer>();
		ArrayList<Customer> allCustomers = getAll();
        for (Customer customer : allCustomers) 
        	for(Order order : customer.getOrders()) 
        		allIDs.add(Integer.parseInt(order.getId()));
        
        return allIDs;
    }

}
