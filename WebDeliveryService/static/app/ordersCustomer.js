Vue.component("customer-orders", {
	data: function () {
		    return {
		      orders: null,
		      restaurantTypes : null,
		      searchName : '',
		      searchLocation: '',
		      searchType: '',
		      searchGrade: '',
		      sortMode : '',
		      sortParameter : ''
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

                <div class="restaurant-info-orders"  v-for="order in orders">
                	<div v-on:click="removeOrder(order)" class="cancelOrderBtn">+</div>
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
		
    }, 
	methods : {
		setAscendingSortMode : function (event) {
			this.sortMode = 'asc';
		},
		
		setDescendingSortMode : function (event) {
			this.sortMode = 'desc'
		},
		
		setNameAsSortParameter : function (event) {
			this.sortParameter = 'name';
		},
		
		setLocationAsSortParameter : function (event) {
			this.sortParameter = 'location';
		},
		
		setGradeAsSortParameter : function (event) {
			this.sortParameter = 'grade';
		},
		
		sortRestaurants : function (event) {
			
					let sortParameters = {
						mode : this.sortMode,
						parameter : this.sortParameter		
    			}
    			
    			axios 
		    		.post('/restaurants/sortRestaurants', JSON.stringify(sortParameters))
		    		.then(response => {
		    		   this.restaurants = response.data;
		    	})
		},
		
		showRestaurant : function (restaurant) {
			window.location.href = "#/restaurantCustomer?id=" + restaurant.name;
		},
		
		showOnlyOpenRestaurants : function (event) {
			axios
          		.get('/restaurants/getAllOpenedRestaurants')
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
		
		searchRestaurants : function (event) {
				let searchParameters = {
						name : this.searchName,
						location : this.searchLocation,
	    				type : this.searchType,
	    				grade : this.searchGrade			
    			}
    			
    			axios 
		    		.post('/restaurants/searchRestaurants', JSON.stringify(searchParameters))
		    		.then(response => {
		    		   this.restaurants = response.data;
		    	})
		}
	}
});