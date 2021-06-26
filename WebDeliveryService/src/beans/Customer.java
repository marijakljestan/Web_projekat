package beans;

import java.io.Serializable;
import java.util.*;


public class Customer extends User implements Serializable{
	
   private int points;
   private CustomerType customerType;
   private ShoppingCart cart;
   private ArrayList<Order> orders;
   
}