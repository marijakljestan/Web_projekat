package beans;

import java.io.Serializable;
import java.util.*;

public class ShoppingCart implements Serializable{

   private int total;
   private ArrayList<ShoppingCartItem> items;
   private Customer customer;

}