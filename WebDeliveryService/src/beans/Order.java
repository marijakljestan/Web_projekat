package beans;

import java.io.Serializable;
import java.util.*;

public class Order implements Serializable{

   private String id;
   private Date dateAndTime;
   private int price;
   private String customer;
   private OrderStatus status;
     
   private ArrayList<Product> products;
   private Restaurant restaurant;
   

}