package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Restaurant;
import beans.User;
import dao.UsersDAO;
import dto.LoginDTO;
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
