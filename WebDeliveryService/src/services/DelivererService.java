package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Deliverer;
import beans.Manager;
import dao.DelivererDAO;

public class DelivererService {
	
	private DelivererDAO delivererDAO;

	public DelivererService(DelivererDAO delivererDAO) {
		super();
		this.delivererDAO = delivererDAO;
	}
	
	public ArrayList<Deliverer> getAllDeliverers() throws JsonSyntaxException, IOException{
		return delivererDAO.getAllNonDeleted();
	}
	
	public void createDeliverer(Deliverer deliverer) throws JsonSyntaxException, IOException {
		delivererDAO.create(deliverer);
	}
}
