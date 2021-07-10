Vue.component("admin-restaurant", {
	data: function () {
		    return {
		      products: null,
		      restaurant: null,
		      customer : null
		    }
	},
	template: ` 
  <div id="home">

    <div class="jumbotron">
      <div class="restaurant-info" style="background-color:cornsilk; border-radius: 25px; position: absolute; width: 50%; left: 25%; top:-1%; height: 250px; text-align: center; display: block;">
        <img v-bind:src= "restaurant.logo" alt="" class="restaurant-logo">
        <h1>{{ restaurant.name }}</h1> 
        <span style="position: absolute; top: 15%; right: 10%;"><label style="font-size: 14px; font-weight: lighte; color:silver">{{ restaurant.status }}</label></span>  
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.type }}</label></span>  <br/><br/>
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.location.address.street }}  {{ restaurant.location.address.number }}</label></span><br/>
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.location.address.city }}  {{ restaurant.location.address.postalcode }}</label></span><br/>
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.location.latitude }}, {{ restaurant.location.longitude }}</label></span>
        <span style="position: absolute; top: 35%; right: 11%;"><label style="font-size: 16px; font-weight: lighte; color:silver">{{ restaurant.grade.toFixed(1) }}</label></span>  <br/><br/>    
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
            <li class="active"><a href="#/admin"><span class="glyphicon glyphicon-home"></span> Početna</a></li>
            <li><a href="#/adminProfile"><span class="glyphicon glyphicon-user"></span> Moj Profil</a></li>
            <li><a href="#/userProfilesView"><span class="glyphicon glyphicon-folder-open"></span> Korisnici</a></li>
            <li><a v-on:click="viewComments"><span class="glyphicon glyphicon-comment"></span> Komentari</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li> <a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a> </li>
          </ul>
        </div>
      </div>
    </nav>
    
    
    <div class="container-fluid text-center">    
        <div class="row content">
         
          <div class="col-lg-10" style="margin-left:8%;"> 
           <div class="menu-group">
               <div v-for="product in products" class="menu-item">
                   <img class="menu-item-image" v-bind:src= "product.picture" alt="Food">
                   <div class="menu-item-text">
                       <h3 class="menu-item-heading">
                           <span class="menu-item-name"> {{ product.name }} </span>
                           <span class="menu-item-price"> $ </span>
                           <span class="menu-item-price">{{ product.price }}</span>
                       </h3>
                       <p class="menu-item-description">
                        {{ product.description }}
                    </p>
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
	          .get('/restaurant/' + this.$route.query.id)
	          .then(response => (this.restaurant = response.data))
		 axios
	          .get('/products/getRestaurantsProducts/' + this.$route.query.id)
	          .then(response => (this.products = response.data))
    },
	methods : {
	
		viewComments : function (product) {
		    window.location.href = "#/commentsAdmin?id="+ this.restaurant.name;
			
		},
		
		addProductToCart : function (product) {
			axios
			.post('/customer/addToShoppingCart', JSON.stringify(product))
			.then(response => {
				window.location.href = '#/shoppingCart';
			})
		},
		
		addItemOpenForm : function(event){
			//selectedItem = null; v-model : selectedItem.price...
			document.querySelector('.add-new-item').style.display = 'flex';
		},
		
		editItemOpenForm : function(event){
			document.querySelector('.add-new-item').style.display = 'flex';
		},
		
		addNewItem : function(event){
			//fleg za add/edit
			event.preventDefault();
		},
		
		closeForm : function(event){
			document.querySelector('.add-new-item').style.display = 'none';
		},
		
		logout : function (){
			window.location.href = "#/";
		}
	}
});