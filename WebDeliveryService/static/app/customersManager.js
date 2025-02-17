Vue.component("customers-page", {
	data: function () {
		    return {
		      customers: null,
		      restaurant:''
		    }
	},
	template: ` 
   <div id="home" style="background : #fff">

    <div class="jumbotron">
      <div class="container text-center">
        <h1 style="color:#191970">donesi.com</h1>      
        <p  style="color:#191970">Najbolja dostava u gradu</p>
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
	            <li><a v-on:click="showRestaurantComments"><span class="glyphicon glyphicon-comment"></span> Komentari</a></li>
          </ul>
	      <ul class="nav navbar-nav navbar-right">
	           <li><a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a></li>
	      </ul>
        </div>
      </div>
    </nav>

    <div class="registered-users">

        <h1 style="position: absolute; margin-top: 20px; margin-left: 700px; font-weight: bolder; color: rgb(30, 31, 104);">KUPCI</h1>
  
        <div class="container-fluid text-center" style="position: absolute; left: 300px; top: 100px;">    
            <div class="row content">
                <div class="col-lg-8"> 
                    <div class="users-panel">
                        <div v-for="customer in customers" class="user-card" style="height:180px;">
                            <h4 style="margin-top: 10; margin-left: 90px;">{{ customer.username }}</h4><br/>
                            <div style="margin-top: 40px; margin-left: -100px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label>{{ customer.name }}</span><br/>
                                <span><label>Prezime:</label>{{ customer.surname }}</span><br/>
                                <span style="margin-left: 17px;"><label>Broj bodova:</label> {{ customer.points.toFixed(2) }} </span><br/><br/>
                                <h4 v-if="customer.customerType.name == 'GOLDEN'"style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI</h4>
                                <h4 v-if="customer.customerType.name == 'SILVERN'"style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">SREBRNI</h4>
                                <h4 v-if="customer.customerType.name == 'BRONZED'"style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">BRONZANI</h4>
                            </div>         
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
	      .get('/customer/getRestaurantCustomers/' + this.$route.query.id)
          .then(response => (this.customers = response.data))
        axios
	          .get('/manager/')
	          .then(response => {
		    		this.restaurant = response.data.restaurant;
		      })
    }, 
	methods : {
		
		showRestaurant : function() {
		    window.location.href = "#/restaurantManager?id="+ this.restaurant;
		},
		
		showOrders: function() {
			window.location.href = "#/ordersManager?id="+ this.restaurant;
		},
		
		showCustomers: function() {
		    window.location.href = "#/customersManger?id="+ this.restaurant;
		},
		
		showRestaurantComments : function (product) {
			axios
			  .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/commentsManager?id="+ response.data.restaurant;
		      })
			
		},
		
		logout : function (event) {
			window.location.href = "#/";
		}
	}
});