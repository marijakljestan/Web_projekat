package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Restaurant;
import beans.Role;
import beans.User;
import dao.UsersDAO;
import dto.LoginDTO;
import dto.SortDTO;
import dto.UserSearchDTO;

public class UsersService {
	
	private UsersDAO usersDAO;

	public UsersService(UsersDAO usersDAO) {
		this.usersDAO = usersDAO;
	}
	
	public void register(User user) throws JsonSyntaxException, IOException {
		usersDAO.create(user);
	}
	
	public ArrayList<User> getAllUsers() throws JsonSyntaxException, IOException{
		return usersDAO.getAllNonDeleted();
	}
	
	public ArrayList<User> getAllAdmins() throws JsonSyntaxException, IOException {
		
		ArrayList<User> allAdmins = new ArrayList<User>();
		
		for (User user : usersDAO.getAllNonDeleted()) 
			if(user.getRole().equals(Role.ADMIN))
				allAdmins.add(user);		
		
		return allAdmins;
	}
	
	public ArrayList<User> getAllManagers() throws JsonSyntaxException, IOException {
		
		ArrayList<User> allManagers = new ArrayList<User>();
		
		for (User user : usersDAO.getAllNonDeleted()) 
			if(user.getRole().equals(Role.MANAGER))
				allManagers.add(user);		
		
		return allManagers;
	}
	
	public ArrayList<User> getAllDeliverers() throws JsonSyntaxException, IOException {
		
		ArrayList<User> allDeliverers = new ArrayList<User>();
		
		for (User user : usersDAO.getAllNonDeleted()) 
			if(user.getRole().equals(Role.DELIVERER))
				allDeliverers.add(user);		
		
		return allDeliverers;
	}
	
	public ArrayList<User> getAllCustomers() throws JsonSyntaxException, IOException {
		
		ArrayList<User> allCustomers = new ArrayList<User>();
		
		for (User user : usersDAO.getAllNonDeleted()) 
			if(user.getRole().equals(Role.CUSTOMER))
				allCustomers.add(user);		
		
		return allCustomers;
	}
	
	
	public User getUserByUserName(String username) throws JsonSyntaxException, IOException {
		return usersDAO.getByID(username);
	}
	
	public void updateUser(User user) throws JsonSyntaxException, IOException {
		usersDAO.update(user);
	}

	public User login(LoginDTO user) throws JsonSyntaxException, IOException {
		User loggedUser = null;
		if(user.getUsername() != null) 
		{
			loggedUser = usersDAO.getByID(user.getUsername());
		}
		
		if(loggedUser != null) {
			if(user.getPassword().equals(loggedUser.getPassword())) {
				return loggedUser;
			}
		}
		return null;
	}
	
	public ArrayList<User> getSortedUsers(SortDTO sortParameters) throws JsonSyntaxException, IOException {
		ArrayList<User> sortedUsers = getAllUsers();
		
		if(sortParameters.getParameter().equals("name"))
			if(sortParameters.getMode().equals("asc"))
				sortedUsers.sort((o1, o2)-> o1.getName().compareTo( o2.getName()));
			else
				sortedUsers.sort((o1, o2)-> o2.getName().compareTo( o1.getName()));
		
		else if(sortParameters.getParameter().equals("surname"))
			if(sortParameters.getMode().equals("asc"))
				sortedUsers.sort((o1, o2)-> o1.getSurname().compareTo( o2.getSurname()));
			else
				sortedUsers.sort((o1, o2)-> o2.getSurname().compareTo( o1.getSurname()));
		
		else if(sortParameters.getParameter().equals("username"))
			if(sortParameters.getMode().equals("asc"))
				sortedUsers.sort((o1, o2)-> o1.getUsername().compareTo( o2.getUsername()));
			else
				sortedUsers.sort((o1, o2)-> o2.getUsername().compareTo( o1.getUsername()));
		/*
		else if(sortParameters.getParameter().equals("numberOfPoints"))
			if(sortParameters.getMode().equals("asc"))
				sortedUsers.sort((o1, o2) -> Double.compare(o1.getPoints(), o2.getPoints()));
			else
				sortedUsers.sort((o1, o2) -> Double.compare(o2.getPoints(), o1.getPoints()));
		*/
		
		return sortedUsers;
	}
	
	public ArrayList<User> getSuitableUsers(UserSearchDTO searchParameters) throws JsonSyntaxException, IOException{
			
			ArrayList<User> allUsers = getAllUsers();
			ArrayList<User> suitableUsers = getAllUsers();
			
			if(!searchParameters.getName().trim().isEmpty()) {
				suitableUsers.clear();
				for (User user : allUsers) 
					if(user.getName().toLowerCase().contains(searchParameters.getName().toLowerCase().trim()))
						suitableUsers.add(user);
					
				allUsers.clear();
				allUsers.addAll(suitableUsers);
			}
			
			if(!searchParameters.getSurname().trim().isEmpty()) {
				suitableUsers.clear();
				for (User user : allUsers)
					if(user.getSurname().toString().toLowerCase().contains(searchParameters.getSurname().toLowerCase().trim()))
						suitableUsers.add(user);
					
				allUsers.clear();
				allUsers.addAll(suitableUsers);
			}
			
			if(!searchParameters.getUsername().trim().isEmpty()) {
				suitableUsers.clear();
				for (User user : allUsers) 
					if(user.getUsername().toLowerCase().contains(searchParameters.getUsername().toLowerCase().trim())) 
						suitableUsers.add(user);
					
				
				allUsers.clear();
				allUsers.addAll(suitableUsers);
			}					
			return suitableUsers;
		}
}
