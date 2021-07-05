Vue.component("restaurant-page-manager", {
	data: function () {
		    return {
		      restaurant: null,
		      products: null,
		      itemName: '',
		      itemPrice: '',
		      itemType: '',
		      itemDescription: '',
		      itemPicture: '',
		      itemQuantity: '0',
		      errorMessage: ''
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
        <span style="position: absolute; top: 35%; right: 14%;"><label style="font-size: 16px; font-weight: lighte; color:silver">4.6</label></span>  <br/><br/>    
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.location.address.street }}  {{restaurant.location.address.number }}</label></span>
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

	   <div class="add-new-item">
            <div class="add-new-item-form">
              <div class="login-title">
                <h3 style="color: rgb(58, 43, 194); font-weight: bolder;"> ARTIKAL </h3>
              </div>
              <div v-on:click="closeForm" class="close">+</div>
              <div class = "form-div" style="margin-top: 20px;">
                <form>
                  <input v-model="itemName" type="text"  class="login-inputs" style="margin-top: 0px;" placeholder="Naziv artikla*" id = "itemName">
                  <label style="color : red;" id="itemNameLabel" name = "labels" display="hidden"> </label>
                  <input v-model="itemPrice" type="text" class="login-inputs" style="margin-top: 0px;" placeholder="Cena*"> 
                  <label style="color : red;" id="itemPriceLabel" name = "labels" display="hidden"> </label>

                  <label class="food-item-label">Tip*:</label>
                  <select v-model="itemType" class="login-inputs" style="margin-top: 0px;">
                    <option>HRANA</option>
                    <option>PIĆE</option>
                 </select>
                 <label style="color : red;" id="itemTypeLabel" name = "labels" display="hidden"> </label>

                 <label class="food-item-label">Slika*:</label>
                 <input type="file" @change="pictureAdded" style="margin-left: 100px;" id="img" name="img" accept="image/*"><br/>
                  <label style="color : red;" id="itemImageLabel" name = "labels" display="hidden"> </label>

                  <label class="food-item-label">Opis:</label>
                  <textarea v-model="itemDescription" type="text" class="login-inputs" style="margin-top: 0px;" placeholder="Opis">
                  </textarea>
				
				  <label class="food-item-label" style="margin-left: -150px;" >Kolicina u gramima:</label>
                  <input type="text" v-model="itemQuantity" class="login-inputs" style="margin-top: 1px;">
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
	mounted () {
		axios
	      .get('/restaurant/' + this.$route.query.id)
          .then(response => (this.restaurant = response.data))
        
        axios
          .get('/products/getRestaurantsProducts/' + this.$route.query.id)
          .then(response => (this.products = response.data))
    },
	methods : {
		
		addItemOpenForm : function(event){
			//selectedItem = null; v-model : selectedItem.price...
			document.querySelector('.add-new-item').style.display = 'flex';
		},
		
		editItemOpenForm : function(event){
			document.querySelector('.add-new-item').style.display = 'flex';
		},
		
		pictureAdded(e) 
        {
            const file = e.target.files[0];
            this.createBase64Image(file);
            this.logo = URL.createObjectURL(file);
        },
        
         createBase64Image(file){
            const reader= new FileReader();
           
            reader.onload = (e) =>{
            	let img = e.target.result;
            	this.itemPicture = img;
            }
            reader.readAsDataURL(file);
        },
		
		addNewItem : function(event){
			//fleg za add/edit
			event.preventDefault();
      		document.getElementById('itemPriceLabel').innerHTML = "";
      		document.getElementById('itemNameLabel').innerHTML = "";
			if(!this.itemName || !this.itemPrice || !this.itemType) {
				this.errorMessage="Morate popuniti sva obavezna polja.";
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
				if(!this.itemPicture){
			       document.getElementById('itemImageLabel').innerHTML = "Morate izabrati sliku artikla!";
				   document.getElementById('itemImageLabel').style.display = 'block';
				   valid = false;
			    }
				if(valid == true){
			    	let newItem = {
						name : this.itemName,
						price : this.itemPrice,
	    				type : this.itemType == 'HRANA'?'FOOD':'DRINK',
	    				description : this.itemDescription,
	    				picture: this.itemPicture,
	    				quantity : this.itemQuantity,
	    				restaurantName: ''		
    				}
					axios 
	    			.post('/product/addNew', JSON.stringify(newItem))
	    			.then(response => {
	    				if (response.data == "") {
							document.getElementById('itemNameLabel').innerHTML = "Vec postoji artikal sa tim imenom!";
							document.getElementById('itemNameLabel').style.display = 'block';
							this.errorMessage="Artikal vec postoji";
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
	}
});