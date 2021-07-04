Vue.component("shopping-cart", {
	data: function () {
		    return {
		      items: null
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

          <div class="col-sm-2 sidenav" style="margin-left: -10px;">
              <label style="font-family: sans-serif; font-size: 18px;">Ukupno: </label><br/>
              <span style="font-size: 16px;">$19.98</span><br/>
              <button class="order-button">Poruči</button>
          </div>

          <div class="col-lg-8"> 
           <div class="menu-group-cart">

               <div class="menu-item">
                   <img class="menu-item-image" src="https://media-cdn.tripadvisor.com/media/photo-s/18/6d/ac/19/variety-pack-original.jpg" alt="Food">
                   <div v-on:click="moveToTrash" class="removeFromCart">+</div>
                   <div class="menu-item-text">
                       <h3 class="menu-item-heading-cart">
                           <span class="menu-item-name"> Burger</span>
                           <span class="menu-item-price"> $9.99</span>
                       </h3>
                       <br/>
                       <span class="shopping-cart-label">Količina: <span style="margin-left: 10px;">2 </span></span><br/>
                       <hr/>
                   </div>
                   <button class="plus-cart-button">+</button>       
                   <button class="minus-cart-button">-</button>  <br/> 
               </div>

               <div class="menu-item">
                    <img class="menu-item-image" src="https://post.healthline.com/wp-content/uploads/2020/07/pizza-beer-1200x628-facebook-1200x628.jpg" alt="Food">
                    <div v-on:click="moveToTrash" class="removeFromCart">+</div>
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading-cart">
                            <span class="menu-item-name"> Pizza</span>
                            <span class="menu-item-price"> $19.99</span>
                        </h3>
                        <br/>
                        <span class="shopping-cart-label">Količina: <span style="margin-left: 10px;">2 </span></span><br/>
                        <hr/>
                    </div>
                    <button class="plus-cart-button">+</button>       
                    <button class="minus-cart-button">-</button>  <br/> 
                </div>

                <div class="menu-item">
                    <img class="menu-item-image" src="https://metmunch.com/wp-content/uploads/2021/02/pexels-photo-376464-1.jpeg" alt="Food">
                    <div v-on:click="moveToTrash" class="removeFromCart">+</div>
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading-cart">
                            <span class="menu-item-name"> American pancakes</span>
                            <span class="menu-item-price"> $5.99</span>
                          </h3>
                          <br/>
                          <span class="shopping-cart-label">Količina: <span style="margin-left: 10px;">2 </span></span><br/>
                          <hr/>
                      </div>
                      <button class="plus-cart-button">+</button>       
                      <button class="minus-cart-button">-</button>  <br/> 
                </div>

                <div class="menu-item">
                    <img class="menu-item-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS29YsvHevLUvSigi9yb71M7VyYaQ5-eLiN-BmduywGJPkW22aRXRmsU0UL9uKalzY5Vig&usqp=CAU" alt="Food">
                    <div v-on:click="moveToTrash" class="removeFromCart">+</div>
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading-cart">
                            <span class="menu-item-name"> Pasta</span>
                            <span class="menu-item-price"> $25.99</span>
                        </h3>
                        <br/>
                        <span class="shopping-cart-label">Količina: <span style="margin-left: 10px;">2 </span></span><br/>
                        <hr/>
                    </div>
                    <button class="plus-cart-button">+</button>       
                    <button class="minus-cart-button">-</button>  <br/> 
                </div> 
                
                
                <div class="menu-item">
                    <img class="menu-item-image" src="https://static.onecms.io/wp-content/uploads/sites/35/2021/01/11/med-diet-plan-fb-GettyImages-1175355677-2000.jpg" alt="Food">
                    <div v-on:click="moveToTrash" class="removeFromCart">+</div>
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading-cart">
                            <span class="menu-item-name"> Salad</span>
                            <span class="menu-item-price"> $19.99</span>
                        </h3>
                        <br/>
                        <span class="shopping-cart-label">Količina: <span style="margin-left: 10px;">2 </span></span><br/>
                        <hr/>
                    </div>
                    <button class="plus-cart-button">+</button>       
                    <button class="minus-cart-button">-</button>  <br/> 
                </div>
                
                <div class="menu-item">
                    <img class="menu-item-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg?quality=90&resize=385%2C350" alt="Food">
                    <div v-on:click="moveToTrash" class="removeFromCart">+</div>
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading-cart">
                            <span class="menu-item-name"> Hot dog</span>
                            <span class="menu-item-price"> $6.99</span>
                        </h3>
                        <br/>
                        <span class="shopping-cart-label">Količina: <span style="margin-left: 10px;">2 </span></span><br/>
                        <hr/>
                    </div>
                    <button class="plus-cart-button">+</button>       
                    <button class="minus-cart-button">-</button>  <br/> 
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
	methods : {
		/*addToCart : function (product) {
			axios
			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		}*/
		
		
		logout : function (){
			window.location.href = "#/";
		}
	},
	mounted () {
     /*   axios
          .get('rest/proizvodi/getJustProducts')
          .then(response => (this.products = response.data))*/
    }
});