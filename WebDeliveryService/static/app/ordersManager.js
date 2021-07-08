Vue.component("manager-orders", {
	data: function () {
		    return {
		      orders: null,
			  restaurant: null,
		      searchMinPrice: null,
		      searchMaxPrice: null,
		      sortMode : '',
		      sortParameter : '',
		      filterType: ''
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
	            <li><a href="#/commentsManager"><span class="glyphicon glyphicon-comment"></span> Komentari</a></li>
          	 </ul>
	          <ul class="nav navbar-nav navbar-right">
	            <li><a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a></li>
	          </ul>
            </div>
          </div>
        </nav>
        
    <div class="search-orders" style="left:20%">
        <input type="number" v-model="searchMinPrice" class="search-input" placeholder="Cena - od">
        <input type="number" v-model="searchMaxPrice" class="search-input" placeholder="Cena - do">
             
 		<input type="date" class="search-input" style="margin-top: 1px;" id="date_from">
 		<input type="date" class="search-input" style="margin-top: 1px;" id="date_to">
    
        <button class="search-submit" v-on:click="searchOrders"> Pretraži </button>
    </div>
    
    
    <div class="container-fluid text-center">    
        <div class="row content">

          <div class="col-sm-2 sidenav" style="background-color: rgb(220, 235, 240); border-radius:25px; margin-left: -38px; position: relative; top: 25px; align-items: flex-start">
                     <label style="color: darkgrey; position: relative; top: 15px; left: 1px;">FILTERI</label><br/>
            <hr/>
            <label style="color: darkgrey; position: relative; left: 14px;">STATUS PORDUZBINE:</label><br/><br/>
            <input type="checkbox" @change="showWaitingForManagerOrders($event)" style="position: relative; left: 8px;">
           	<label style="color: darkgrey; position: relative; left: 15px;"> ZAHTEVI ZA DOSTAVU </label><br/><br/>
            
            <input type="checkbox" @change="showInProcessingOrders($event)" style="position: relative; left: -42px;" >
            <label style="color: darkgrey; position: relative; left: -22px;"> OBRADA</label><br/>
            <input type="checkbox" @change="showInPreparationOrders($event)" style="position: relative; left: -31px;">
            <label style="color: darkgrey; position: relative; left: -14px;"> U PRIPREMI</label><br/>
            <input type="checkbox" @change="showWaitingForTransportOrders($event)" style="position: relative; left: 0px;">
            <label style="color: darkgrey; position: relative; left: 15px;"> CEKA DOSTAVLJACA</label><br/>
            <input type="checkbox" @change="showInTransportOrders($event)" style="position: relative; left: -16px;">
            <label style="color: darkgrey; position: relative; left: -1px;"> U TRANSPORTU</label><br/>
            <input type="checkbox" @change="showDeliveredOrders($event)" style="position: relative; left: -21px;">
            <label style="color: darkgrey; position: relative; left: -3px;"> DOSTAVLJENA</label><br/><br/>
		
			<label style="color: darkgrey; position:relative; top:35px" > SORTIRANJE: </label><br/><br/>
			<hr/>
	        <input type="checkbox"  @change="setDescendingSortMode($event)">
	        <label style="color: darkgrey; position:relative; left:8px"> Opadajuće</label><br/>
	        <input style=" position:relative; left:-10px" type="checkbox" @change="setAscendingSortMode($event)">
	        <label style="color: darkgrey; position:relative; left:-2px" > Rastuće</label><br/><br/>
	        
	        <label style="color: darkgrey;" > Parametri sortiranja: </label><br/><br/>
	       
	        <input type="checkbox" @change="setPriceAsSortParameter($event)" style="position: relative; left: -16px;">
	        <label style="color: darkgrey; position:relative; left:-7px"> Cena </label><br/>
	        <input type="checkbox" @change="setDateAsSortParameter($event)" style="position: relative; left: -9px;">
	        <label style="color: darkgrey;"> Datum </label><br/>
	        
	        <button class="search-submit" @click="sortOrders" style="position : relative; left:10px; top:10px;  color:#fff;"> Sortiraj </button><br/>

          </div>

          <div class="col-lg-9" style="position: relative; left: 0%;"> 

            <div class="orders-group">

                <div v-for="order in orders" class="restaurant-info-orders">
                    <h4 style="position: relative; left: -28%; top: 2%;">{{order.status}}</h4>
                    <img v-bind:src= "restaurant.logo" alt="" class="restaurant-logo-order-manager">
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
		
		searchOrders: function() {
		
			let dateFrom = document.getElementById("date_from").value;
				let dFrom = '';
				if(dateFrom)
       				 dFrom=new Date(dateFrom).toISOString().substr(0, 10);
       			
       			let dateTo = document.getElementById("date_to").value;
       			let dTo = '';
       			if(dateTo)
       				 dTo = new Date(dateTo).toISOString().substr(0, 10);
       		
				
				let searchParameters = {
						restaurant : this.restaurant.name,
						minPrice : this.searchMinPrice,
						maxPrice : this.searchMaxPrice,
						fromDate : dFrom,
						toDate : dTo	
    			}
    			
    			axios 
		    		.post('/customer/searchOrdersForManager', JSON.stringify(searchParameters))
		    		.then(response => {
		    		   this.orders = response.data;
		    	})
		},
		
		setAscendingSortMode : function (event) {
			this.sortMode = 'asc';
		},
		
		setDescendingSortMode : function (event) {
			this.sortMode = 'desc'
		},
				
		setPriceAsSortParameter : function (event) {
			this.sortParameter = 'price';
		},
		
		setDateAsSortParameter : function (event) {
			this.sortParameter = 'date';
		},
		
		sortOrders : function (event) {
			
					let sortParameters = {
						mode : this.sortMode,
						parameter : this.sortParameter		
    			}
    			
    			axios 
		    		.post('/customer/getSortedOrdersForManager', JSON.stringify(sortParameters))
		    		.then(response => {
		    		   this.orders = response.data;
		    	})
		},
		
				
		showWaitingForManagerOrders : function (event) {
			axios
          		.get('/customer/getWaitingForManagerOrders')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showInProcessingOrders : function (event) {
			axios
          		.get('/customer/getProcessingOrdersForManager')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showInPreparationOrders: function (event) {
			axios
          		.get('/customer/getInPreparationOrdersForManager')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showInTransportOrders: function (event) {
			axios
          		.get('/customer/getInTransportOrdersForManager')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showDeliveredOrders: function (event) {
			axios
          		.get('/customer/getDeliveredOrdersForManager')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showWaitingForTransportOrders: function (event) {
			axios
          		.get('/customer/getWaitingForDeliveryOrdersForManager')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showCanceledOrders: function (event) {
			axios
          		.get('/customer/getCanceledOrdersForManager')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showCustomers: function() {
			axios
	          .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/customersManger?id="+ response.data.restaurant;
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