Vue.component("shopping-cart", {
	data: function () {
		    return {
		      shoppingCart: null
		    }
	},
	template: ` 
   <div id="home">

    <div class="jumbotron">
      <div class="container text-center">
        <h1>donesi.com</h1>      
        <p>Najbolja dostava u gradu</p>
      </div>
    </div>
    
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>                        
          </button>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
              	<li class="active"><a href="#/customer"><span class="glyphicon glyphicon-home"></span> Početna</a></li>
                <li><a href="#/customerProfile"><span class="glyphicon glyphicon-user"></span> Moj Profil</a></li>
                <li><a href="#/ordersCustomer"><span class="glyphicon glyphicon-cutlery"></span> Moje porudžbine</a></li>     
          </ul>
          <ul class="nav navbar-nav navbar-right">
 			<li><a href="#/shoppingCart"><span class="glyphicon glyphicon-shopping-cart"></span> Korpa</a></li>
            <li><a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a></li>
          </ul>
        </div>
      </div>
    </nav>
    
    
    <div class="container-fluid text-center">    
        <div class="row content">

          <div class="col-sm-2 sidenav" style="margin-left: -10px;">
              <label style="font-family: sans-serif; font-size: 18px;">Ukupno: </label><br/>
              <span>
              	<span style="font-size: 16px;"> $ </span>
              	<span style="font-size: 16px;">{{ shoppingCart.total.toFixed(2) }}</span>
              </span>
              <br/>
              <button v-on:click="orderItemsInCart" class="order-button">Poruči</button>
          </div>

          <div class="col-lg-8"> 
           <div class="menu-group-cart">

               <div v-for="item in shoppingCart.items" class="menu-item">
                   <img class="menu-item-image" v-bind:src= "item.product.picture" alt="Food">
                   <div v-on:click="removeItem(item)" class="removeFromCart">+</div>
                   <div class="menu-item-text">
                       <h3 class="menu-item-heading-cart">
                           <span class="menu-item-name"> {{ item.product.name }}</span>
                           <span class="menu-item-price"> $ </span>
                           <span class="menu-item-price"> {{ item.product.price }}</span>
                       </h3>
                       <br/>
                       <span class="shopping-cart-label">Količina: <span style="margin-left: 10px;"> {{ item.quantity }} </span></span><br/>
                       <hr/>
                   </div>
                   <button v-on:click="increaseQuantity(item)" class="plus-cart-button">+</button>       
                   <button v-on:click="reduceQuantity(item)" v-bind:disabled="item.quantity == 1" v-bind:class="{minus_button_disabled : item.quantity == 1}" class="minus-cart-button">-</button>  <br/> 
               </div>
            </div>
           </div>
          </div>
        </div> 
    
    <footer class="container-fluid text-center">
      <p>Online Food Delivery Copyright</p>  
    </footer>
    </div>
`
	,
	mounted () {
       axios
	       .get('/customer/getShoppingCart/')
	       .then(response => (this.shoppingCart = response.data))
    },
	methods : {
		
		orderItemsInCart : function (item) {
		
			let newOrder = {
				price : this.shoppingCart.total,
				items : this.shoppingCart.items
			}
			
			axios
			.post('/customer/createOrder', JSON.stringify(newOrder))
			.then(response => {
				this.shoppingCart = response.data;
				window.location.href = '#/ordersCustomer';
			})
		},
		
		increaseQuantity: function (item) {
			axios
		       .put('/customer/increaseQuantity/', JSON.stringify(item))
		       .then(response => {
		       		this.shoppingCart = response.data;
		       		location.reload();
			    })
		},
		
		reduceQuantity: function (item) {
			axios
		       .put('/customer/reduceQuantity/', JSON.stringify(item))
		       .then(response => {
		       		this.shoppingCart = response.data;
		       		location.reload();
			    })
		},
		
		logout : function (){
			window.location.href = "#/";
		},
		
		removeItem: function(item) {
			axios
				.delete('/customer/removeItem/' + item.product.name + item.product.restaurantName)
				.then(response => {
					this.shoppingCart = response.data;
				})
		}
	}
});