package beans;

import java.io.Serializable;
import java.util.*;


public class Restaurant implements Serializable{

   private String name;
   private String type;
   private RestaurantStatus status;
   private String logo;
   private Location location;
   
   public ArrayList<Product> products;
   
}