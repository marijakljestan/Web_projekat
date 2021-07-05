Vue.component("restaurant-page-manager", {
	data: function () {
		    return {
		      items: null,
		      itemName: '',
		      itemPrice: '',
		      itemType: '',
		      itemDescription: '',
		      itemQuantity: '',
		      errorMessage: ''
		    }
	},
	template: ` 
 <div id="home">

    <div class="jumbotron">
      <div class="restaurant-info" style="background-color:cornsilk; border-radius: 25px; position: absolute; width: 50%; left: 25%; top:5%; height: 200px; text-align: center; display: block;">
        <img src="https://promenadanovisad.rs/wp-content/uploads/2018/10/TortillaCasa-logo.jpg" alt="" class="restaurant-logo">
        <h1>Tortilla cassa</h1> 
        <span style="position: absolute; top: 15%; right: 10%;"><label style="font-size: 14px; font-weight: lighte; color:silver">OTVORENO</label></span>  
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">Meksicki restoran</label></span>
        <span style="position: absolute; top: 35%; right: 14%;"><label style="font-size: 16px; font-weight: lighte; color:silver">4.6</label></span>  <br/><br/>    
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">Bulevar oslobodjenja 55</label></span>
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
            <li><a href="#/restaurantManager"><span class="glyphicon glyphicon-tasks"></span> Moj restoran</a></li>
            <li><a href="#/ordersManager"><span class="glyphicon glyphicon-cutlery"></span> Porudžbine</a></li>
            <li><a href="#/customersManger"><span class="glyphicon glyphicon-globe"></span> Kupci</a></li>
            <li><a href="#/commentsManager"><span class="glyphicon glyphicon-comment"></span> Komentari</a></li>
      
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a></li>
          </ul>
        </div>
      </div>
    </nav>
    
    
    <div class="container-fluid text-center" style="background:white; position:relative; margin:0px"> 
   
        <div class="row content">

          <div class="col-sm-2 sidenav" style="position:relative; margin-left: -20px; gap: 1.5em; padding: 1.5em 0;">
            <button v-on:click="addItemOpenForm" class="side-button" style="margin-top:20px;">Novi artikal</button><br/>
            <button v-on:click="editItemOpenForm" class="side-button">Izmeni artikal</button>
          </div>

          <div class="col-lg-8"> 
           <div class="menu-group" style="position: relative; margin-left: -35px">
               <div class="menu-item">
                   <img class="menu-item-image" src="https://media-cdn.tripadvisor.com/media/photo-s/18/6d/ac/19/variety-pack-original.jpg" alt="Food">
                   <div class="menu-item-text">
                       <h3 class="menu-item-heading">
                           <span class="menu-item-name"> Burger</span>
                           <span class="menu-item-price"> $9.99</span>
                       </h3>
                       <p class="menu-item-description" style="width:250px;">
                        Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                    </p>
                   </div>               
               </div>
               <div class="menu-item">
                    <img class="menu-item-image" src="https://post.healthline.com/wp-content/uploads/2020/07/pizza-beer-1200x628-facebook-1200x628.jpg" alt="Food">
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading">
                            <span class="menu-item-name"> Pizza</span>
                            <span class="menu-item-price"> $19.99</span>
                        </h3>
                        <p class="menu-item-description" style="width:250px;">
                        Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
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
                        <p class="menu-item-description" style="width:250px;">
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
                        <p class="menu-item-description" style="width:250px;">
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
                        <p class="menu-item-description" style="width:250px;">
                         Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                     </p>
                    </div> 
                </div>  
                <div class="menu-item">
                    <img class="menu-item-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg?quality=90&resize=385%2C350" alt="Food">
                    <div class="menu-item-text">
                        <h3 class="menu-item-heading">
                            <span class="menu-item-name"> Hot dog</span>
                            <span class="menu-item-price"> $6.99</span>
                        </h3>
                        <p class="menu-item-description" style="width:250px;">
                         Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                     </p>
                    </div> 
                </div>              
            </div>
           </div>
          </div>
        </div> 

	   <div class="add-new-item">
            <div class="add-new-item-form">
              <div class="login-title">
                <h3 style="color: rgb(58, 43, 194); font-weight: bolder;"> ARTIKAL </h3>
              </div>
              <div v-on:click="closeForm" class="close">+</div>
              <div class = "form-div" style="margin-top: 20px;">
                <form>
                  <input v-model="itemName" type="text"  class="login-inputs" style="margin-top: 0px;" placeholder="Naziv artikla" id = "itemName">
                  <label style="color : red;" id="itemNameLabel" name = "labels" display="hidden"> </label>
                  <input v-model="itemPrice" type="text" class="login-inputs" style="margin-top: 0px;" placeholder="Cena"> 
                  <label style="color : red;" id="itemPriceLabel" name = "labels" display="hidden"> </label>

                  <label class="food-item-label">Tip:</label>
                  <select v-model="itemType" class="login-inputs" style="margin-top: 0px;">
                    <option>HRANA</option>
                    <option>PIĆE</option>
                 </select>
                 <label style="color : red;" id="itemTypeLabel" name = "labels" display="hidden"> </label>

                 <label class="food-item-label">Slika:</label>
                 <input type="file" style="margin-left: 100px;" id="img" name="img" accept="image/*"><br/>
                  <label style="color : red;" id="itemImageLabel" name = "labels" display="hidden"> </label>

                  <label class="food-item-label">Opis:</label>
                  <textarea v-model="itemDescription" type="text" class="login-inputs" style="margin-top: 0px;" placeholder="Opis">
                  </textarea>

                  <input type="text" v-model="itemQuantity" class="login-inputs" style="margin-top: 1px;"  placeholder="Količina">
				  <p style="color:red;text-transform:none;">{{errorMessage}}</p>
                  <button v-on:click="addNewItem" class="button" style="background-color: rgb(64, 88, 224); color: white;"> Potvrdi</button>
                </form>
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
      		document.getElementById('itemPriceLabel').innerHTML = "";
      		document.getElementById('itemNameLabel').innerHTML = "";
			if(!this.itemName || !this.itemPrice || !this.itemType || !this.itemDescription || !this.itemQuantity) {
				this.errorMessage="Morate popuniti sva polja.";
			} else {
				this.errorMessage="";
				let valid = true;
				if(isNaN(this.itemPrice)) {
					document.getElementById('itemPriceLabel').innerHTML = "Morate uneti brojcanu vrednost!";
					document.getElementById('itemPriceLabel').style.display = 'block';
					valid = false;
				}
				if(isNaN(this.itemQuantity)) {
					this.errorMessage="Morate uneti brojcanu vrednost!";
					valid = false;
				}
				if(valid == true){
			    	let newItem = {
						name : this.itemName,
						price : this.itemPrice,
	    				itemType : this.nameRegister == 'HRANA'?'FOOD':'DRINK',
	    				description : this.itemDescription,
	    				quantity : this.itemQuantity			
    				}
					axios 
	    			.post('/product/addNew', JSON.stringify(newUser))
	    			.then(response => {
	    				if (response.data == "") {
							document.getElementById('itemNameLabel').innerHTML = "Vec postoji artikal sa tim imenom!";
							document.getElementById('itemNameLabel').style.display = 'block';
	    				} else {
							document.querySelector('.add-new-item').style.display = 'none';
	    				}
	    			})
	    			.catch(error => {
					    console.log(error.response)
					});
				}
			}
		},
		
		closeForm : function(event){
			document.querySelector('.add-new-item').style.display = 'none';
		},
		
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