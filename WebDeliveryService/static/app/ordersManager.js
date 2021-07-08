Vue.component("manager-orders", {
	data: function () {
		    return {
		      orders: null,
			  restaurant: null
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
	            <li class="active"><a href="#/manager"><span class="glyphicon glyphicon-home"></span> Početna</a></li>
	            <li><a href="#/managerProfile"><span class="glyphicon glyphicon-user"></span> Moj Profil</a></li>
	            <li><a v-on:click="showRestaurant"><span class="glyphicon glyphicon-tasks"></span> Moj restoran</a></li>
	            <li><a v-on:click="showOrders"><span class="glyphicon glyphicon-cutlery"></span> Porudžbine</a></li>
	            <li><a v-on:click="showCustomers"><span class="glyphicon glyphicon-globe"></span> Kupci</a></li>
	            <li><a v-on:click="showRestaurantComments" ><span class="glyphicon glyphicon-comment"></span> Komentari</a></li>
          	 </ul>
	          <ul class="nav navbar-nav navbar-right">
	            <li><a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a></li>
	          </ul>
            </div>
          </div>
        </nav>
    
    
    <div class="container-fluid text-center">    
        <div class="row content">

          <div class="col-sm-2 sidenav" style="margin-left: -38px; position: relative; top: 100px; align-items: flex-start">
            <input type="checkbox" style="position: relative; left: -42px;" >
            <label style="color: darkgrey; position: relative; left: -22px;"> OBRADA</label><br/>
            <input type="checkbox" style="position: relative; left: -33px;">
            <label style="color: darkgrey; position: relative; left: -14px;"> U PRIPREMI</label><br/>
            <input type="checkbox" style="position: relative; left: -1px;">
            <label style="color: darkgrey; position: relative; left: 15px;"> CEKA DOSTAVLJACA</label><br/>
            <input type="checkbox" style="position: relative; left: -18px;">
            <label style="color: darkgrey; position: relative; left: -1px;"> U TRANSPORTU</label><br/>
            <input type="checkbox" style="position: relative; left: -22px;">
            <label style="color: darkgrey; position: relative; left: -3px;"> DOSTAVLJENA</label><br/>

            <button class="change-status-button" style="position: relative;  top:70px">CEKA DOSTAVLJACA</button>
          </div>

          <div class="col-lg-9" style="position: relative; left: 0%;"> 

            <div class="orders-group">

                <div v-for="order in orders" class="restaurant-info-orders">
                    <h4 style="position: relative; left: -35%; top: 2%;">{{order.status}}</h4>
                    <img v-bind:src= "restaurant.logo" alt="" class="restaurant-logo">
                    <h1>{{order.restaurant}}</h1> 
                    <h4>{{order.dateAndTime}} </h4> 
                    <h4>{{order.customer}}</h4><br/>
                    
                   <h4>Porudžbina broj {{order.id}}</h4><br/>
                    <h3 class="menu-item-heading-orders" v-for="product in order.products">
                        <span class="order-name"  style="font-size: 16px;">{{ product.name }}</span>
                        <span class="order-price" style="font-size: 16px;"> {{ product.price }}</span>
                    </h3>          

                    <hr style="border-top: 1px solid rgb(77, 86, 129); margin-left: 12%; margin-right: 12%;">
                    <h3 class="menu-item-heading-orders">
                        <span class="order-name"  style="font-size: 16px;"> Total: </span>
                        <span class="order-price" style="font-size: 16px;"> {{order.price}}</span>
                    </h3> 
                </div>

            </div>
          </div>   
        </div>
    </div> 
    
    </div>
`
	,
	mounted () {
		axios
	      .get('/customer/getRestaurantOrders/' + this.$route.query.id)
          .then(response => (this.orders = response.data))
		axios
	      .get('/restaurant/' + this.$route.query.id)
          .then(response => (this.restaurant = response.data))
		
    },
	methods : {
		
		showRestaurant : function() {
			axios
	          .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/restaurantManager?id="+ response.data.restaurant;
		      })
		},
		
		showOrders: function() {
			axios
	          .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/ordersManager?id="+ response.data.restaurant;
		      })
		},
		
		showCustomers: function() {
			axios
	          .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/customersManger?id="+ response.data.restaurant;
		      })
		},
		
		showRestaurantComments : function (product) {
			axios
			  .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/commentsManager?id="+ response.data.restaurant;
		      })
			
		},
		
		showOrders: function() {
			axios
	          .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/ordersManager?id="+ response.data.restaurant;
		      })
		},
	}
});