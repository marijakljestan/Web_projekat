package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.User;
import dao.UsersDAO;

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

}
