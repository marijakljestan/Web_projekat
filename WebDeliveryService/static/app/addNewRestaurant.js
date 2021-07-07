Vue.component("addNewRestaurant-page", {
	data: function () {
		    return {
		      managers: null,
		      selectedManager : null,
		      addBtnDisabled : true,
		      name : '',
		      type : '',
		      logo : '',
		      latitude : null,
			  longitude : null,
			  street : '',
			  city : '',
			  postalcode : null,
			  country : '',
			  usernameRegister: '',
		      passwordRegister: '',
		      nameRegister: '',
			  surnameRegister: '',
			  genderRegister:'',
		      dateOfBirthRegister: '',
		      roleRegister : ''
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
            <li class="active"><a href="#/admin"><span class="glyphicon glyphicon-home"></span> Početna</a></li>
            <li><a href="#/adminProfile"><span class="glyphicon glyphicon-user"></span> Moj Profil</a></li>
            <li><a href="#/userProfilesView"><span class="glyphicon glyphicon-folder-open"></span> Korisnici</a></li>
            <li><a href="#/commentsAdmin"><span class="glyphicon glyphicon-comment"></span> Komentari</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li> <a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a> </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="forma-restaurant">

        <h1 style="position: absolute; margin-top: 20px; margin-left: 550px; font-weight: bolder; color: rgb(30, 31, 104);">UNOS NOVOG RESTORANA</h1>
  
        <div  class="col-lg-12"> 
        
            <div class="col-lg-6" style="margin-left: 120px; margin-top: 95px;">
                <input type="text" class="input-fields" v-model="name" placeholder="Naziv restorana"><br/><br/>
                <input type="text" class="input-fields" v-model="type" placeholder="Tip restorana"><br/><br/>
                <label style="color: rgb(30, 31, 104);">Logo:</label><br/>
                <input type="file" @change="logoAdded" style="margin-left: 230px; color:#fff;" id="img" name="img" accept="image/*"><br/>
                <label style="color: rgb(30, 31, 104);">Menadzer:</label><br/>

                <select v-model="selectedManager" class="input-selection">
				  <option v-for="manager in managers" v-bind:value="manager">
				    {{ manager.username }} : {{ manager.name }}  {{ manager.surname }}
				  </option>
				</select>
                             
            </div>
			<button v-on:click="registerNewManager" class="add-manager" :disabled="addBtnDisabled == true" style="text-align: center; align-items:center; position: absolute; top: 322px; left: 336px; width: 50px;">+</button>


            <div class="col-lg-6"  style="margin-left: 560px; margin-top: -260px;">
                <input type="text"   class="input-fields" v-model="street" placeholder="Ulica i broj"><br/><br/>
                <input type="text"   class="input-fields" v-model="city"  style="width:27%" placeholder="Grad">
                <input type="number" class="input-fields" v-model="postalcode" style="width:23%" placeholder="Poštanski broj"><br/><br/>
                <input type="text"   class="input-fields" v-model="country"   placeholder="Država"><br/><br/>
                <input type="number" class="input-fields" v-model="latitude"  placeholder="Geografska širina"><br/><br/>
                <input type="number" class="input-fields" v-model="longitude" placeholder="Geografska dužina"><br/><br/>
            </div>                
        </div>  
        
        <label style="color : red; margin-left: 40%;" id="errorLabel" name = "labels" display="hidden"> </label><br/>
        <button v-on:click="createNewRestaurant" class="accept-cancel" style="background-color: lightblue; margin-left: 0%;">POTVRDI</button>
        <button v-on:click="goBack" 			 class="accept-cancel" style="background-color: cornsilk;  margin-left: 1%;">ODUSTANI</button><br/>

    </div>
  
    <div class="add-restaurant-popup">
        <div class="modal-content-reg">
          <div class="login-title">
            <h3 style="color: rgb(161, 89, 21); font-weight: bolder;"> NOVI MENADŽER </h3>
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

      <footer class="container-fluid text-center">
        <p>Online Food Delivery Copyright</p>  
      </footer>
      </div>
`
	, 
	
	mounted () {
        axios
          .get('/managers/getAllManagersWithoutRestaurant')
          .then(response => {
				if (response.data != null) {
					this.managers = response.data;
				}
				else{
					this.addBtnDisabled = false;
				}
			});
    },
	
	methods : {
		/*addToCart : function (product) {
			axios
			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		}*/
		
		logoAdded(e) 
        {
            const file = e.target.files[0];
            this.createBase64Image(file);
            this.logo = URL.createObjectURL(file);
        },
        
         createBase64Image(file){
            const reader= new FileReader();
           
            reader.onload = (e) =>{
            	let img = e.target.result;
            	this.logo = img;
            }
            reader.readAsDataURL(file);
        },
		
		createNewRestaurant : function (event) {
		
			event.preventDefault();
			
			let valid = true;
       			     		      			
       			 if(!this.name){
			        document.getElementById('errorLabel').innerHTML = "Morate uneti naziv restorana!";
					document.getElementById('errorLabel').style.display = 'block';
					valid = false;
			    }
			     else if(!this.type){
			       document.getElementById('errorLabel').innerHTML = "Morate uneti tip restorana!";
				   document.getElementById('errorLabel').style.display = 'block';
				   valid = false;
			    }
			    
			     else if(!this.logo){
			       document.getElementById('errorLabel').innerHTML = "Morate izabrati logo restorana!";
				   document.getElementById('errorLabel').style.display = 'block';
				   valid = false;
			    }
			
			    else if(!this.selectedManager){
			    	document.getElementById('errorLabel').innerHTML = "Morate izabrati menadžera restorana!";
					document.getElementById('errorLabel').style.display = 'block';
					valid = false;
			    }
			    
			   else if(!this.latitude || !this.longitude || !this.street || !this.city || !this.postalcode || !this.country){
			       document.getElementById('errorLabel').innerHTML = "Morate popuniti sva polja koja se odnose na adresu restorana!";
				   document.getElementById('errorLabel').style.display = 'block';
				   valid = false;
			    }
			    
			  if(valid == true){
			
					newRestaurant = {
					      name : this.name,
					      type : this.type,
					      status : 'OPEN',
					      logo : this.logo,
					      location: {
					      	  latitude : this.latitude,
						      longitude : this.longitude,
						      address : {
						      	  street : this.street,
							      city : this.city,
							      postalcode : this.postalcode,
							      country : this.country
							  }
					      },
					      isDeleted : false,
					      products : []
					  }
					  
						axios 
			    			.post('/restaurants/addNewRestaurant', JSON.stringify(newRestaurant))
			    			.then(response => {
			    				if (response.data == "") {
									document.getElementById('errorLabel').innerHTML = "Već postoji restoran sa unetim nazivom!";
									document.getElementById('errorLabel').style.display = 'block';
			    				} else {
			    					axios
									.post('/managers/setRestaurantToManager/' + this.selectedManager.username, JSON.stringify(newRestaurant))
									.then(toast("Uspesno kreiran restoran!"));
									window.location.href = "#/admin";
			    				}
			    			})
			    			.catch(error => {
							    console.log(error.response)
							});
				}
			
		},	
			
		goBack : function() {
			window.location.href = "#/admin";
		},
		
		registerNewManager : function (event) {
			document.querySelector('.add-restaurant-popup').style.display = 'flex';
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
       			var d=new Date(dates).toISOString().substr(0, 10);
       			
       			let valid = true;
       			     		      			
       			 if(!this.usernameRegister){
			        document.getElementById('usernameLabel').innerHTML = "Morate uneti korisničko ime!";
					document.getElementById('usernameLabel').style.display = 'block';
					valid = false;
			    }
			     else if(!this.passwordRegister){
			       document.getElementById('passwordLabel').innerHTML = "Morate uneti lozinku!";
				   document.getElementById('passwordLabel').style.display = 'block';
				   valid = false;
			    }
			    else if(this.nameRegister[0] < 'A' || this.nameRegister[0] > 'Z' || !this.nameRegister){
			        document.getElementById('nameLabel').innerHTML = "Morate uneti ime koje počinje velikim slovom!";
					document.getElementById('nameLabel').style.display = 'block';
					valid = false;
			    }
			    else if(this.surnameRegister[0] < 'A' || this.surnameRegister[0] > 'Z' || !this.surnameRegister){
			        document.getElementById('surnameLabel').innerHTML = "Morate uneti prezime koje počinje velikim slovom!";
					document.getElementById('surnameLabel').style.display = 'block';
					valid = false;
			    }
			    else if(!genderReg){
			    	document.getElementById('genderLabel').innerHTML = "Morate izabrati pol!";
					document.getElementById('genderLabel').style.display = 'block';
					valid = false;
			    }
			    else if(!dates){
			    	document.getElementById('dateLabel').innerHTML = "Morate izabrati datum rođenja!";
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
	    				role : 'MANAGER'			
    				}
			    
			    	let newManager = {
						username : this.usernameRegister,
						password : this.passwordRegister,
	    				name : this.nameRegister,
	    				surname : this.surnameRegister,
	    				gender : genderReg,
	    				dateOfBirth : d,
	    				role : 'MANAGER',
	    				restaurant : null				
    				}
					axios 
	    			.post('/users/register', JSON.stringify(newUser))
	    			.then(response => {
	    				if (response.data == "") {
							document.getElementById('usernameLabel').innerHTML = "Već postoji uneto korisničko ime!";
							document.getElementById('usernameLabel').style.display = 'block';
	    				} else {
	    					axios
							.post('/managers/createManager', JSON.stringify(newManager))
							.then(response => {
								this.selectedManager = newManager;
								document.querySelector('.add-restaurant-popup').style.display = 'none';
							});
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
			 document.querySelector('.add-restaurant-popup').style.display = 'none';
		},
		
		logout : function (event) {
			window.location.href = "#/";
		}
		
	}

});