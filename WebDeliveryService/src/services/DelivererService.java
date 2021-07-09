package services;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.Deliverer;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import dao.CustomerDAO;
import dao.DelivererDAO;
import dao.RestaurantDAO;
import dto.OrderSearchDTO;
import dto.SortDTO;

public class DelivererService {
	
	private DelivererDAO delivererDAO;
	private CustomerDAO customerDAO;
	private RestaurantDAO restaurantDAO;

	public DelivererService(DelivererDAO delivererDAO) {
		super();
		this.delivererDAO = delivererDAO;
		this.customerDAO = new CustomerDAO("./files/customers.json");
		this.restaurantDAO = new RestaurantDAO("./files/restaurants.json");
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

	public void changeOrderStatusToDelivered(Deliverer deliverer, Order order) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		for (Order o : deliverer.getOrders()) {
			if(order.getId().equals(o.getId())) {
				o.setStatus(OrderStatus.DELIVERED);
				break;
			}
		}
		updateDeliverer(deliverer);
	}
	
	public ArrayList<Order> getAllWaitingForDeliveryOrders(Deliverer deliverer) throws JsonSyntaxException, IOException{
		ArrayList<Order> waitingForDeliveryOrders = new ArrayList<Order>();
		
		for(Customer customer : customerDAO.getAllNonDeleted()) {
			for(Order order : customer.getOrders()) {
				if(order.getStatus().equals(OrderStatus.WAITING_FOR_DELIVERY) || order.getStatus().equals(OrderStatus.WAITING_FOR_MANAGER)) {
					waitingForDeliveryOrders.add(order);
				}
			}
		}
		
		return waitingForDeliveryOrders;
	}
	
	public ArrayList<Order> getAllInTransportOrders(Deliverer deliverer){
		ArrayList<Order> inTransportOrders = new ArrayList<Order>();
		
		for (Order order : deliverer.getOrders()) 
			if(order.getStatus().equals(OrderStatus.IN_TRANSPORT))
				inTransportOrders.add(order);
		
		return inTransportOrders;
	}
	
	public ArrayList<Order> getAllDeliveredOrders(Deliverer deliverer){
		ArrayList<Order> deliveredOrders = new ArrayList<Order>();
		
		for (Order order : deliverer.getOrders()) 
			if(order.getStatus().equals(OrderStatus.DELIVERED))
				deliveredOrders.add(order);
		
		return deliveredOrders;
	}
	
	public ArrayList<Order> getAllOrdersFilteredByRestaurantType(Deliverer deliverer, String restType) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Order> allOrders = deliverer.getOrders();
		ArrayList<Order> filteredOrders = new ArrayList<Order>();
		
		for (Order order : allOrders) {
			Restaurant orderRestaurant = restaurantDAO.getByID(order.getRestaurant());
			if(orderRestaurant.getType().equals(restType))
				filteredOrders.add(order);
		}
		
		return filteredOrders;
	}
	
	public ArrayList<Order> getSuitableOrders (Deliverer deliverer, OrderSearchDTO searchParameters) throws JsonSyntaxException, IOException, ParseException {
		// TODO Auto-generated method stub
		ArrayList<Order> allOrders = deliverer.getOrders();
		ArrayList<Order> suitableOrders = new ArrayList<Order>();
		
		if(!searchParameters.getRestaurant().trim().isEmpty()) {
			suitableOrders.clear();
			for (Order order : allOrders) 
				if(order.getRestaurant().toLowerCase().contains(searchParameters.getRestaurant().toLowerCase().trim()))
					suitableOrders.add(order);
				
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		if(Double.compare(searchParameters.getMinPrice(), 0d) != 0) {
	
			double minPrice = searchParameters.getMinPrice();
			
			suitableOrders.clear();
			for (Order order : allOrders) 
				if(order.getPrice() > minPrice) 
					suitableOrders.add(order);
			
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		if(Double.compare(searchParameters.getMaxPrice(), 0d) != 0) {

			double maxPrice = searchParameters.getMaxPrice();
			
			suitableOrders.clear();
			for (Order order : allOrders) 
				if(order.getPrice() < maxPrice) 
					suitableOrders.add(order);
			
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		if(!searchParameters.getToDate().trim().isEmpty()) {
			
			Date dateTo=new SimpleDateFormat("yyyy-mm-dd").parse(searchParameters.getToDate()); 
			Date dateOrder;
			
			suitableOrders.clear();
			for (Order order : allOrders) {
				dateOrder = new SimpleDateFormat("yyyy-mm-dd").parse(order.getDateAndTime());
				if(dateOrder.before(dateTo)) {
					suitableOrders.add(order);
				}
			}
			
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		if(!searchParameters.getFromDate().trim().isEmpty()) {
			
			Date dateFrom=new SimpleDateFormat("yyyy-mm-dd").parse(searchParameters.getFromDate()); 
			Date dateOrder;
			
			suitableOrders.clear();
			for (Order order : allOrders) {
				dateOrder = new SimpleDateFormat("yyyy-mm-dd").parse(order.getDateAndTime());
				if(dateOrder.after(dateFrom)) {
					suitableOrders.add(order);
				}
			}
			
			allOrders.clear();
			allOrders.addAll(suitableOrders);
		}
		
		return suitableOrders;
	}
	
	public ArrayList<Order> getSortedOrders(Deliverer deliverer, SortDTO sortParameters) throws JsonSyntaxException, IOException {
		ArrayList<Order> sortedOrders = deliverer.getOrders();
		
		if(sortParameters.getParameter().equals("restaurant"))
			if(sortParameters.getMode().equals("asc"))
				sortedOrders.sort((o1, o2)-> o1.getRestaurant().compareTo( o2.getRestaurant()));
			else
				sortedOrders.sort((o1, o2)-> o2.getRestaurant().compareTo( o1.getRestaurant()));
		
		else if(sortParameters.getParameter().equals("price"))
			if(sortParameters.getMode().equals("asc"))
				sortedOrders.sort((o1, o2) -> Double.compare(o1.getPrice(), o2.getPrice()));
			else
				sortedOrders.sort((o1, o2) -> Double.compare(o2.getPrice(), o1.getPrice()));
		
		else if(sortParameters.getParameter().equals("date"))
			if(sortParameters.getMode().equals("asc"))
				sortedOrders.sort((o1, o2)-> o1.getDateAndTime().compareTo( o2.getDateAndTime()));
			else
				sortedOrders.sort((o1, o2)-> o2.getDateAndTime().compareTo( o1.getDateAndTime()));

		return sortedOrders;
	}

	public void changeOrderStatusToWaitingForManager(Deliverer deliverer, Order order) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		for (Order o : deliverer.getOrders()) {
			if(order.getId().equals(o.getId())) {
				o.setStatus(OrderStatus.WAITING_FOR_MANAGER);
				break;
			}
		}
		updateDeliverer(deliverer);
	}


	public void changeOrderStatusToWaitingForDelivery(Deliverer deliverer, Order order) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		for (Order o : deliverer.getOrders()) {
			if(order.getId().equals(o.getId())) {
				o.setStatus(OrderStatus.WAITING_FOR_DELIVERY);
				break;
			}
		}
		updateDeliverer(deliverer);
	}

	public void changeOrderStatusToInTransport(Deliverer deliverer, Order order) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		for (Order o : deliverer.getOrders()) {
			if(order.getId().equals(o.getId())) {
				o.setStatus(OrderStatus.IN_TRANSPORT);
				break;
			}
		}
		updateDeliverer(deliverer);
	}
}
