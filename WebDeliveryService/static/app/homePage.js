Vue.component("home-page", {
	data: function () {
		    return {
		      restaurants: null,
		      restaurantTypes : null,
		      usernameRegister: '',
		      passwordRegister: '',
		      nameRegister: '',
			  surnameRegister: '',
			  genderRegister:'',
		      dateOfBirthRegister: '',
		      roleRegister : '',
		      usernameLog: '',
		      passwordLog: '',
		      errorMessage: '',
		      searchName : '',
		      searchLocation: '',
		      searchType: '',
		      searchGrade: '',
		      sortMode : '',
		      sortParameter : ''
		    }
	},
	template: ` 
 <div id="home" style="background : #fff">

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
            <li class="active"><a href="#"><span class="glyphicon glyphicon-home"></span>  Restorani</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li v-on:click="login"><span class="glyphicon glyphicon-log-in"></span> Prijavite se </li>
            <li v-on:click="register"><span class="glyphicon glyphicon-user"></span> Registrujte se</li>
          </ul>
        </div>
      </div>
    </nav>
    
    <div class="search">
        <input type="text" v-model="searchName" 	class="search-input" placeholder="Naziv restorana">
        <input type="text" v-model="searchLocation" class="search-input" placeholder="Lokacija restorana">
             
        <select v-model="searchType" class="search-input">
        	<option disabled selected>Izaberite tip</option>
			<option v-for="type in restaurantTypes" v-bind:value="type">
				 {{ type }} 
			</option>
		</select>
		
		<select v-model="searchGrade" class="search-input">
        	<option disabled selected> Izaberite ocenu</option>
			<option v-for="index in 5" :key="index" v-bind:value="index">
				{{ index }} 
			</option>
		</select>
    
        <button class="search-submit" v-on:click="searchRestaurants"> Pretraži </button>
    </div>
    
    <div class="col-sm-2 sidenav" style="position: absolute; left: 1%; top: 50%; border-radius: 25px; background-color: cornsilk;">
    	<label style="color: darkgrey;" > Filteri: </label><br/><br/>
        <input type="checkbox" @change="showOnlyOpenRestaurants($event)" id="open-restaurants" value="restaurant">
        <label style="color: darkgrey;" > Otvoreni restorani</label><br/>
        <hr>
        <label style="color: darkgrey);" > Sortiranje restorana: </label><br/><br/>
        <input type="checkbox"  @change="setDescendingSortMode($event)">
        <label style="color: darkgrey;"> Opadajuće</label><br/>
        <input type="checkbox" @change="setAscendingSortMode($event)">
        <label style="color: darkgrey;" > Rastuće</label><br/><br/>
        
        <label style="color: darkgrey;" > Parametri sortiranja: </label><br/><br/>
        <input type="checkbox" @change="setNameAsSortParameter($event)">
        <label style="color: darkgrey;"> Naziv</label><br/>
        <input type="checkbox" @change="setLocationAsSortParameter($event)">
        <label style="color: darkgrey;"> Lokacija </label><br/>
        <input type="checkbox" @change="setGradeAsSortParameter($event)">
        <label style="color: darkgrey;"> Prosečna ocena</label><br/>
        
        <button class="search-submit" v-on:click="sortRestaurants" style="margin-left:50px; margin-top:15px; margin-bottom:10px; color:#fff" > Sortiraj </button>
        
    </div>
    
    <div class="container" style="position:relative; left:100px">    
      <div class="row">      
        <div class="col-lg-10" > 
            
		      <div v-for="restaurant in restaurants" v-on:click="showRestaurant(restaurant)" class="restaurant-info-home-page" style="background-color:cornsilk; border-radius: 25px; height: 200px; text-align: center; display: block;">
		        <img v-bind:src= "restaurant.logo" alt="" class="restaurant-logo-home-page">
		        <h1 class="restaurant-name">{{ restaurant.name }}</h1> 
		        <span class="restaurant-status"><label style="font-size: 18px; font-weight: lighte; color:silver">{{ restaurant.status}}</label></span>  
		        <span class="restaurant-type"><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.type }}</label></span>
		        <span class="restaurant-grade"><label style="font-size: 16px; font-weight: lighte; color:silver">{{ restaurant.grade }}</label></span>  <br/><br/>    
		        <span class="restaurant-address"><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.location.address.street }}</label></span>
		      </div>    
        </div>
        
      </div>
    </div><br>
     
    
    <div class="bg-modal">
      <div class="modal-content">
        <div class="login-title">
          <h3 style="color: rgb(161, 89, 21); font-weight: bolder;"> PRISTUPITE VAŠEM NALOGU </h3>
        </div>
        <div v-on:click="loginClose" class="close">+</div>
        <div class = "form-div">
            <input v-model="usernameLog" type="text" class="login-inputs" placeholder="korisničko ime"><br/>
            <input v-model="passwordLog" type="password" class="login-inputs" placeholder="lozinka"> <br/><br/>
    		<p style="color:red;text-transform:none;">{{errorMessage}}</p>
            <button v-on:click="loginUser" class="button" style="background-color: rgb(224, 142, 64); color: white;"> Prijavite se</button>
        </div>
      </div>
    </div>

    <div class="registracija">
      <div class="modal-content-reg">
        <div class="login-title">
          <h3 style="color: rgb(161, 89, 21); font-weight: bolder;"> KREIRAJTE VAŠ NALOG </h3>
        </div>
        <div v-on:click="registrationClose" class="close">+</div>
        <div class = "form-div" style="margin-top: 20px;">
          <form>
            <input v-model="usernameRegister" type="text"  class="login-inputs" style="margin-top: 0px;" placeholder="korisničko ime" id = "userNameReg">
            <label style="color : red;" id="usernameLabel" name = "labels" display="hidden"> </label>
            <input v-model="passwordRegister" type="password" class="login-inputs" style="margin-top: 0px;" placeholder="lozinka"> 
            <label style="color : red;" id="passwordLabel" name = "labels" display="hidden"> </label>
            <input v-model="nameRegister" type="text" class="login-inputs" style="margin-top: 0px;" placeholder="ime">
            <label style="color : red;" id="nameLabel" name = "labels" display="hidden"> </label>
            <input v-model="surnameRegister" type="text" class="login-inputs" style="margin-top: 0px;" placeholder="prezime">
            <label style="color : red;" id="surnameLabel" name = "labels" display="hidden"> </label>
            <select v-model="genderRegister" class="login-inputs" style="margin-top: 0px;">
                <option>MUŠKO</option>
                <option>ŽENSKO</option>
            </select>
            <label style="color : red;" id="genderLabel" name = "labels" display="hidden"> </label>
            <label>Datum rođenja:</label>
	        <input type="date" class="login-inputs" style="margin-top: 1px;" id="date_input">
          	<label style="color : red;" id="dateLabel" name = "labels" display="hidden"> </label>  
            <button v-on:click="registerUser" class="button" style="background-color: rgb(224, 142, 64); color: white;"> Potvrdi</button>
          </form>
        </div>
      </div>
    </div>
    
`
	, 
	
	mounted () {
     	    axios
          		.get('/restaurants/getAll')
          		.then(response => {
				if (response.data != null) {
					this.restaurants = response.data;
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
		/*addToCart : function (product) {
			axios
			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		}*/
				
		login : function (event) {
			document.querySelector('.bg-modal').style.display = 'flex';
		},
		
		loginClose: function (event) {
			document.querySelector('.bg-modal').style.display = 'none';
		},
		
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
			window.location.href = "#/restaurant?id=" + restaurant.name;
		},
		
		showOnlyOpenRestaurants : function (event) {
			axios
          		.get('/restaurants/getAllOpenedRestaurants')
          		.then(response => {
				if (response.data != null) {
					this.restaurants = response.data;
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
		},
		
		register : function (event) {
			document.querySelector('.registracija').style.display = 'flex';
		},
				
		registerUser : function (event) {
				
				event.preventDefault();
				
				let genderReg;
				if (this.genderRegister == 'MUŠKO') {
					genderReg = 'MALE';
				} else if(this.genderRegister == 'ŽENSKO'){
					genderReg = 'FEMALE';
				}
				var dates = document.getElementById("date_input").value;
       			var d=new Date(dates);
       			
       			var valid = true;
       			     		      			
       			 if(!this.usernameRegister){
			        document.getElementById('usernameLabel').innerHTML = "Morate uneti korisnicko ime!";
					document.getElementById('usernameLabel').style.display = 'block';
					valid = false;
			    }
			     else if(!this.passwordRegister){
			       document.getElementById('passwordLabel').innerHTML = "Morate uneti lozinku!";
				   document.getElementById('passwordLabel').style.display = 'block';
				   valid = false;
			    }
			    else if(this.nameRegister[0] < 'A' || this.nameRegister[0] > 'Z' || !this.nameRegister){
			        document.getElementById('nameLabel').innerHTML = "Morate uneti ime koje pocinje velikim slovom!";
					document.getElementById('nameLabel').style.display = 'block';
					valid = false;
			    }
			    else if(this.surnameRegister[0] < 'A' || this.surnameRegister[0] > 'Z' || !this.surnameRegister){
			        document.getElementById('surnameLabel').innerHTML = "Morate uneti prezime koje pocinje velikim slovom!";
					document.getElementById('surnameLabel').style.display = 'block';
					valid = false;
			    }
			    else if(!genderReg){
			    	document.getElementById('genderLabel').innerHTML = "Morate izabrati pol!";
					document.getElementById('genderLabel').style.display = 'block';
					valid = false;
			    }
			    else if(!dates){
			    	document.getElementById('dateLabel').innerHTML = "Morate izabrati datum rodjenja!";
					document.getElementById('dateLabel').style.display = 'block';
					valid = false;
			    }
			    
			    if(valid == true){
			    	let newUser = {
						username : this.usernameRegister,
						password : this.passwordRegister,
	    				name : this.nameRegister,
	    				surname : this.surnameRegister,
	    				gender : genderReg,
	    				dateOfBirth : d,
	    				role : 'CUSTOMER'				
    				}
    					
						axios 
		    			.post('/users/register', JSON.stringify(newUser))
		    			.then(response => {
		    				if (response.data == "") {
								document.getElementById('usernameLabel').innerHTML = "Vec postoji uneto korisnicko ime!";
								document.getElementById('usernameLabel').style.display = 'block';
		    				} else {
								window.location.href = "/";
		    				}
		    			})
		    			.catch(error => {
						    console.log(error.response)
						});
			   }
			
		},		
		registrationClose: function (event) {
			 this.usernameRegister = '';
		     this.passwordRegister = '';
		     this.nameRegister = '';
			 this.surnameRegister = '';
			 for (element of document.getElementsByName('labels')){
			 	element.innerHTML = '';
			 	element.style.display = 'hidden';
			 }
			 document.querySelector('.registracija').style.display = 'none';
		},
		loginUser: function(event) {
			if(this.usernameLog=='' || this.passwordLog=='')
			{
				this.errorMessage="Morate popuniti sva polja.";
			}
			else
			{

				let loginParameters = {
    				username : this.usernameLog,
    				password : this.passwordLog
    			}
    			
	    		axios 
	    			.post('/user/login', JSON.stringify(loginParameters))
	    			.then(response => {
	    				if (response.data == "") {
							this.errorMessage="Neispravno korisničko ime ili lozinka.";
						}
						else {
							if(response.data.role == "CUSTOMER"){
								window.location.href = "#/customer";
							} else if (response.data.role == "MANAGER"){
								window.location.href = "#/manager";
							} else if (response.data.role == "DELIVERER") {
								window.location.href = "#/deliverer";
							} else if (response.data.role == "ADMIN") {
								window.location.href = "#/admin";
							} else {
								this.errorMessage="Neispravno korisničko ime ili lozinka.";
							}
	    				}
					})
					.catch(error => {
				    console.log(error.response)
				});
			}
    }
  }
});