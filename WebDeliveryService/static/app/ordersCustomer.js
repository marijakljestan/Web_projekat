Vue.component("customer-orders", {
	data: function () {
		    return {
		      orders: null,
		      restaurantTypes : null,
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
                <li class="active"><a href="#/customer"><span class="glyphicon glyphicon-home"></span> Početna</a></li>
                <li><a href="#/customerProfile"><span class="glyphicon glyphicon-user"></span> Moj Profil</a></li>
                <li><a href="#/ordersCustomer"><span class="glyphicon glyphicon-cutlery"></span> Moje porudžbine</a></li>
                <li><a href="#/customerComments"><span class="glyphicon glyphicon-comment"></span> Komentari</a></li>   
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li><a href="#/shoppingCart"><span class="glyphicon glyphicon-shopping-cart"></span> Korpa</a></li>
            	<li><a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a></li>
              </ul>
        </div>
      </div>
    </nav>
    
    <div class="search-orders">
        <input type="text" 	 v-model="searchRestaurant" 	class="search-input" placeholder="Restoran">
        <input type="number" v-model="searchMinPrice" class="search-input" placeholder="Cena - od">
        <input type="number" v-model="searchMaxPrice" class="search-input" placeholder="Cena - do">
             
 		<input type="date" class="search-input" style="margin-top: 1px;" id="date_from">
 		<input type="date" class="search-input" style="margin-top: 1px;" id="date_to">
    
        <button class="search-submit" v-on:click="searchOrders"> Pretraži </button>
    </div>
    
    
    <div class="container-fluid text-center">    
        <div class="row content">

          <div class="col-sm-2 sidenav" style="background-color: rgb(220, 235, 240); border-radius:25px; margin-left: -38px; position: relative; top: 100px; align-items: flex-start">
            <label style="color: darkgrey; position: relative; top: 15px; left: 1px;">FILTERI</label><br/>
            <hr/>
            <label style="color: darkgrey; position: relative; left: 14px;">STATUS PORDUZBINE:</label><br/><br/>
            <input type="checkbox" @change="showUndeliveredOrders($event)" style="position: relative; left: -10px;">
           	<label style="color: darkgrey; position: relative; left: 9px;"> NEDOSTAVLJENE </label><br/><br/>
            
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
            
             <label style="color: darkgrey; position: relative; top:20px; left: 17px;">TIP RESTORANA:</label><br/><br/>
            <select v-model="filterType" @change="filterByRestaurantType($event)" class="search-input" style="position : relative; width:195px; left:15px">
	        	<option disabled selected>Izaberite tip restorana</option>
				<option v-for="type in restaurantTypes" v-bind:value="type">
					 {{ type }} 
				</option>
			</select>
			<br/><br/>
			
			
			<label style="color: darkgrey; position:relative; top:35px" > SORTIRANJE: </label><br/><br/>
			<hr/>
	        <input type="checkbox"  @change="setDescendingSortMode($event)">
	        <label style="color: darkgrey; position:relative; left:8px"> Opadajuće</label><br/>
	        <input style=" position:relative; left:-10px" type="checkbox" @change="setAscendingSortMode($event)">
	        <label style="color: darkgrey; position:relative; left:-2px" > Rastuće</label><br/><br/>
	        
	        <label style="color: darkgrey;" > Parametri sortiranja: </label><br/><br/>
	        <input type="checkbox" @change="setRestaurantAsSortParameter($event)">
	        <label style="color: darkgrey; position:relative; left:8px"> Restoran</label><br/>
	        <input type="checkbox" @change="setPriceAsSortParameter($event)" style="position: relative; left: -16px;">
	        <label style="color: darkgrey; position:relative; left:-7px"> Cena </label><br/>
	        <input type="checkbox" @change="setDateAsSortParameter($event)" style="position: relative; left: -9px;">
	        <label style="color: darkgrey;"> Datum </label><br/>
	        
	        <button class="search-submit" @click="sortOrders" style="position : relative; left:10px; top:10px;  color:#fff;"> Sortiraj </button><br/>

            <button class="change-status-button" style="position: relative;  top:70px">CEKA DOSTAVLJACA</button>
          </div>

          <div class="col-lg-9" style="position: relative; left: 0%;"> 

            <div class="orders-group">

                <div class="restaurant-info-orders"  v-for="order in orders">
                	<span v-if="!(order.status != 'PROCESSING')" v-on:click="removeOrder(order)" style="position:relative; top:5%; transform: rotate(45deg);" class="cancelOrderBtn">x</span>
                    <h4 style="position: relative; left: -35%; top: 2%;">{{order.status}}</h4>
                    <img src="https://promenadanovisad.rs/wp-content/uploads/2018/10/TortillaCasa-logo.jpg" alt="" class="restaurant-logo-order">
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
	     	.get('/customer/getAllOrders')
	        .then(response => {
			if (response.data != null) {
				this.orders = response.data;
			}
		});
		
		axios
          	.get('/restaurants/getAllTypes')
          	.then(response => {
			if (response.data != null) {
				this.restaurantTypes= response.data;
			}
		});
		
    }, 
	methods : {
		setAscendingSortMode : function (event) {
			this.sortMode = 'asc';
		},
		
		setDescendingSortMode : function (event) {
			this.sortMode = 'desc'
		},
		
		setRestaurantAsSortParameter : function (event) {
			this.sortParameter = 'restaurant';
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
		    		.post('/customer/getSortedOrders', JSON.stringify(sortParameters))
		    		.then(response => {
		    		   this.orders = response.data;
		    	})
		},
		
		showRestaurant : function (restaurant) {
			window.location.href = "#/restaurantCustomer?id=" + restaurant.name;
		},
		
		filterByRestaurantType(event) {
            axios
	          .get('/customer/getOrdersByRestaurantType/' + this.filterType)
	          .then(response => (this.orders = response.data))
        },
		
		showUndeliveredOrders : function (event) {
			axios
          		.get('/customer/getUndeliveredOrders')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showInProcessingOrders : function (event) {
			axios
          		.get('/customer/getProcessingOrders')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showInPreparationOrders: function (event) {
			axios
          		.get('/customer/getInPreparationOrders')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showInTransportOrders: function (event) {
			axios
          		.get('/customer/getInTransportOrders')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showDeliveredOrders: function (event) {
			axios
          		.get('/customer/getDeliveredOrders')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showWaitingForTransportOrders: function (event) {
			axios
          		.get('/customer/getWaitingForDeliveryOrders')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		showCanceledOrders: function (event) {
			axios
          		.get('/customer/getCanceledOrders')
          		.then(response => {
					if (response.data != null) {
						this.orders = response.data;
					}
				});
		},
		
		removeOrder : function (order) {
			axios
			.delete('/customer/removeOrder', { data: order })
			.then(response => {
				if (response.data != null) {
					this.orders = response.data;
				}
			});
		},
		
		searchOrders : function (event) {
				
				let dateFrom = document.getElementById("date_from").value;
				let dFrom = '';
				if(dateFrom)
       				 dFrom=new Date(dateFrom).toISOString().substr(0, 10);
       			
       			let dateTo = document.getElementById("date_to").value;
       			let dTo = '';
       			if(dateTo)
       				 dTo = new Date(dateTo).toISOString().substr(0, 10);
       		
				
				let searchParameters = {
						minPrice : this.searchMinPrice,
						maxPrice : this.searchMaxPrice,
						fromDate : dFrom,
						toDate : dTo	
    			}
    			
    			axios 
		    		.post('/customer/searchOrders', JSON.stringify(searchParameters))
		    		.then(response => {
		    		   this.orders = response.data;
		    	})
		    	
		}
	}
});