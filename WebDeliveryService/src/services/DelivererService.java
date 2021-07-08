package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Deliverer;
import beans.Order;
import beans.OrderStatus;
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
	
	public void updateDeliverer(Deliverer deliverer) throws JsonSyntaxException, IOException {
		delivererDAO.update(deliverer);
	}
	
	public Deliverer getDelivererByUsername (String username) throws JsonSyntaxException, IOException {
		return delivererDAO.getByID(username);
	}

	public void changeOrderStatus(Deliverer deliverer, Order order) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		for (Order o : deliverer.getOrders()) {
			if(order.getId().equals(o.getId())) {
				o.setStatus(OrderStatus.DELIVERED);
				break;
			}
		}
		updateDeliverer(deliverer);
	}
}
