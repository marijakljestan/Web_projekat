package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Manager;
import dao.ManagersDAO;

public class ManagerService {
	
	private ManagersDAO managerDAO;

	public ManagerService(ManagersDAO managerDAO) {
		super();
		this.managerDAO = managerDAO;
	}
	
	public ArrayList<Manager> getAllManagers() throws JsonSyntaxException, IOException{
		return managerDAO.getAllNonDeleted();
	}
	
	public Manager getManagerByUserName(String username) throws JsonSyntaxException, IOException {
		return managerDAO.getByID(username);
	}
	
	public void updateManager(Manager manager) throws JsonSyntaxException, IOException {
		this.managerDAO.update(manager);
	}
	
	public ArrayList<Manager> getAllManagersWithoutRestaurant() throws JsonSyntaxException, IOException{
		ArrayList<Manager> managers = getAllManagers();
		ArrayList<Manager> managersWithoutRestaurant = new ArrayList<Manager>();
		
		for (Manager manager : managers) 
			if(manager.getRestaurant() == null) 
				managersWithoutRestaurant.add(manager);
		
		return (managersWithoutRestaurant.size() > 0) ?  managersWithoutRestaurant :  null;
	}
	
	public void createManager(Manager manager) throws JsonSyntaxException, IOException {
		managerDAO.create(manager);
	}

}
