package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.User;
import dao.UsersDAO;
import dto.LoginDTO;

public class UsersService {
	
	private UsersDAO usersDAO;

	public UsersService(UsersDAO usersDAO) {
		this.usersDAO = usersDAO;
	}
	
	public void register(User user) throws JsonSyntaxException, IOException {
		usersDAO.create(user);
	}
	
	public ArrayList<User> getAllUsers() throws JsonSyntaxException, IOException{
		return usersDAO.getAll();
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

	public void editUser(User newUser) throws JsonSyntaxException, IOException {
		usersDAO.update(newUser);
	}

}
