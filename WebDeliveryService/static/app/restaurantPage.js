Vue.component("restaurant-page", {
	data: function () {
		    return {
		      products: null,
		      restaurant: null
		    }
	},
	template: ` 
 <div id="home">

    <div class="jumbotron">
      <div class="restaurant-info" style="background-color:cornsilk; border-radius: 25px; position: absolute; width: 50%; left: 25%; top:5%; height: 200px; text-align: center; display: block;">
        <img v-bind:src= "restaurant.logo" alt="" class="restaurant-logo">
        <h1>{{ restaurant.name }}</h1> 
        <span style="position: absolute; top: 15%; right: 10%;"><label style="font-size: 14px; font-weight: lighte; color:silver">{{ restaurant.status }}</label></span>  
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.type }}</label></span>
        <span style="position: absolute; top: 35%; right: 11%;"><label style="font-size: 16px; font-weight: lighte; color:silver">4.6</label></span>  <br/><br/>    
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.location.address.street }}  {{ restaurant.location.address.number }}</label></span>
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
            <li><a href="#">Pocetna</a></li>
            <li class="active"><a href="#">Meni</a></li>
            <li><a href="#">Moje porudzbine</a></li>
            <li><a href="#">Komentari</a></li>     
          </ul>
        </div>
      </div>
    </nav>
    
    
    <div class="container-fluid text-center">    
        <div class="row content">
          <div class="col-sm-2 sidenav">
            <p><a href="#">Link</a></p>
            <p><a href="#">Link</a></p>
            <p><a href="#">Link</a></p>
          </div>
          <div class="col-lg-8"> 
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
                <div class="menu-item">
                    <img class="menu-item-image" src="https://metmunch.com/wp-content/uploads/2021/02/pexels-photo-376464-1.jpeg" alt="Food">
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading">
                            <span class="menu-item-name"> American pancakes</span>
                            <span class="menu-item-price"> $5.99</span>
                        </h3>
                        <p class="menu-item-description">
                         Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                     </p>
                    </div> 
                </div>  
                <div class="menu-item">
                    <img class="menu-item-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS29YsvHevLUvSigi9yb71M7VyYaQ5-eLiN-BmduywGJPkW22aRXRmsU0UL9uKalzY5Vig&usqp=CAU" alt="Food">
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading">
                            <span class="menu-item-name"> Pasta</span>
                            <span class="menu-item-price"> $25.99</span>
                        </h3>
                        <p class="menu-item-description">
                         Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                     </p>
                    </div> 
                </div> 
                <div class="menu-item">
                    <img class="menu-item-image" src="https://static.onecms.io/wp-content/uploads/sites/35/2021/01/11/med-diet-plan-fb-GettyImages-1175355677-2000.jpg" alt="Food">
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading">
                            <span class="menu-item-name"> Salad</span>
                            <span class="menu-item-price"> $19.99</span>
                        </h3>
                        <p class="menu-item-description">
                         Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                     </p>
                    </div> 
                </div>  
                <div class="menu-item">
                    <img class="menu-item-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg?quality=90&resize=385%2C350">
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading">
                            <span class="menu-item-name"> Hot dog</span>
                            <span class="menu-item-price"> $6.99</span>
                        </h3>
                        <p class="menu-item-description">
                         Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                     </p>
                    </div> 
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
          .get('/restaurant/' + this.$route.query.id)
          .then(response => (this.restaurant = response.data))
		axios
          .get('/products/getRestaurantsProducts/' + this.$route.query.id)
          .then(response => (this.products = response.data))
    },
	methods : {
		/*addToCart : function (product) {
			axios
			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		}*/
	}
});