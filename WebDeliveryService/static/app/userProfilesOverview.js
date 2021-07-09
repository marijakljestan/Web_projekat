Vue.component("user-profiles-page", {
	data: function () {
		    return {
		      users: null,
		      searchUsername : '',
		      searchName: '',
		      searchSurname: '',
		      sortMode:'',
		      sortParameter:'',
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

    <div class="registered-users">

        <h1 style="position: absolute; margin-top: 20px; margin-left: 600px; font-weight: bolder; color: rgb(30, 31, 104);">REGISTROVANI KORISNICI</h1>
		
		 <div style="position: absolute; right: 3%; top: 1%; border-radius: 25px; background-color: cornsilk;">
	        <label style="color: darkgrey;" > Filteri: </label><br/><br/>
	        <input type="checkbox"  @change="showOnlyAdmins($event)" id="admins" value="restaurant">
	        <label style="color: darkgrey;" > Administratori</label><br/>
	        <input type="checkbox"  @change="showOnlyManagers($event)"  id="managers" value="restaurant">
	        <label style="color: darkgrey;" > Menadžeri</label><br/>
	        <input type="checkbox"  @change="showOnlyDeliverers($event)" id="deliverers" value="restaurant">
	        <label style="color: darkgrey;" > Dostavljači</label><br/>
	        <input type="checkbox"  @change="showOnlyCustomers($event)" id="customers" value="restaurant">
	        <label style="color: darkgrey;" > Kupci</label><br/><br/>
	        
	        <input type="checkbox"  @change="showOnlyGoldenCustomers($event)" id="zlatni" value="restaurant">
	        <label style="color: darkgrey;" > Zlatni kupci</label><br/>
	        <input type="checkbox"  @change="showOnlySilverCustomers($event)" id="srebrni" value="restaurant">
	        <label style="color: darkgrey;" > Srebrni kupci</label><br/>
	        <input type="checkbox"  @change="showOnlyBronzedCustomers($event)" id="bronzani" value="restaurant">
	        <label style="color: darkgrey;" > Bronzani kupci</label><br/>
	        
	        <hr>
	        <label style="color: darkgrey);" > Sortiranje restorana: </label><br/><br/>
	        <input type="checkbox" @change="setDescendingSortMode($event)">
	        <label style="color: darkgrey;"> Opadajuće</label><br/>
	        <input type="checkbox" @change="setAscendingSortMode($event)">
	        <label style="color: darkgrey;" > Rastuće</label><br/><br/>
	        
	        <label style="color: darkgrey;" > Parametri sortiranja: </label><br/><br/>
	        <input type="checkbox" @change="setNameAsSortParameter($event)">
	        <label style="color: darkgrey;"> Ime</label><br/>
	        <input type="checkbox" @change="setSurnameAsSortParameter($event)">
	        <label style="color: darkgrey;"> Prezime </label><br/>
	        <input type="checkbox" @change="setUsernameAsSortParameter($event)">
	        <label style="color: darkgrey;"> Korisničko ime</label><br/>
	        <input type="checkbox" @change="setNumberOfPointsAsSortParameter($event)">
	        <label style="color: darkgrey;"> Skupljeni bodovi</label><br/>
	        
	        <button class="search-submit" v-on:click="sortUsers" style="margin-left:50px; margin-top:15px; margin-bottom:10px; color:#fff" > Sortiraj </button>
        </div>
		
        <div class="show-suspect-users">
            <input type="checkbox" @change="showSuspiciousCustomers($event)" id="suspect-users" value="user">
            <label style="color: rgb(30, 31, 104);"> Sumnjivi korisnici</label><br>   
        </div>

        <div class="new-users">
            <button v-on:click="registerManager" class="new-users-button">NOVI MENADŽER</button><br/><br/><br/><br/>
            <button v-on:click="registerDeliverer" class="new-users-button">NOVI DOSTAVLJAČ</button>
        </div>
        
      <div class="search-panel">
	        <input type="text" v-model="searchName"       class="search-input" placeholder="Ime ">
	        <input type="text" v-model="searchSurname"	  class="search-input" placeholder="Prezime ">
	        <input type="text" v-model="searchUsername"   class="search-input" placeholder="Korisničko ime">
	  
	        <input type="submit" class="search-submit" v-on:click="searchUsers" value="Pretraži">
     </div>     
    
        <div class="container-fluid text-center" style="position: absolute; left: 300px; top: 100px;">    
            <div class="row content">
                <div class="col-lg-8"> 
                    <div class="users-panel">
                        <div class="user-card" v-for="user in users">
                            <h4 style="margin-top: 10; margin-left: 90px;">{{user.username}}</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime: </label> {{user.name}}</span><br/>
                                <span><label>Prezime:</label> {{user.surname}}</span><br/>
                                <!--span v-if="(user.role == 'CUSTOMER')" style="position:relative; top:13%; left:-28%; font-size:20px"> {{ }}</span-->
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">{{user.role}}</h4>
                            </div>
                            <button v-on:click="blockUser(user)" class="block-user-button" v-if="!(user.isBlocked === true || user.role == 'ADMIN')">BLOKIRAJ</button>           
                        </div>
                       
                    </div>
                    </div>
                </div>
           </div>        
  
    <div class="registration-manager-deliverer">
        <div class="new-manager-deliverer-reg-form">
          <div class="login-title">
            <h3 style="color: rgb(199, 200, 201); font-weight: bolder;"> NOVI KORISNIK </h3>
          </div>
          <div v-on:click="addManagerDelivererClose" class="close">+</div>
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
              <label style="color: rgb(69, 131, 201);">Datum rođenja:</label>
              <input type="date" class="login-inputs" style="margin-top: 1px;" id="date_input">
                <label style="color : red;" id="dateLabel" name = "labels" display="hidden"> </label>  
              <button v-on:click="registerManagerDelivererConfirm" class="button" style="background-color: rgb(69, 131, 201); color: white;"> Potvrdi</button>
            </form>
          </div>
        </div>
      </div>
`
	, 
	

	methods : {
		/*addToCart : function (product) {
			axios
			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		}*/
		registerManager : function (event) {
			this.roleRegister = 'MANAGER';
			document.querySelector('.registration-manager-deliverer').style.display = 'flex';
		},
		
		registerDeliverer : function (event) {
			this.roleRegister = 'DELIVERER';
			document.querySelector('.registration-manager-deliverer').style.display = 'flex';			
		},
				
		registerManagerDelivererConfirm : function (event) {
				
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
	    				role : this.roleRegister			
    				}
			    	
			    	if(this.roleRegister == 'MANAGER'){
			    	
				    	var newManager = {
							username : this.usernameRegister,
							password : this.passwordRegister,
		    				name : this.nameRegister,
		    				surname : this.surnameRegister,
		    				gender : genderReg,
		    				dateOfBirth : d,
		    				role : 'MANAGER',
		    				restaurant : null				
	    				}
    				}
    				
    				if(this.roleRegister == 'DELIVERER'){
			    	
				    	var newDeliverer = {
							username : this.usernameRegister,
							password : this.passwordRegister,
		    				name : this.nameRegister,
		    				surname : this.surnameRegister,
		    				gender : genderReg,
		    				dateOfBirth : d,
		    				role : 'DELIVERER',
		    				orders : null				
	    				}
    				}
    				
					axios 
	    			.post('/users/register', JSON.stringify(newUser))
	    			.then(response => {
	    			
	    				if (response.data == "") {
							document.getElementById('usernameLabel').innerHTML = "Već postoji uneto korisničko ime!";
							document.getElementById('usernameLabel').style.display = 'block';
	    				} else {
	    					if(this.roleRegister == 'MANAGER'){
		    					axios
								.post('/managers/createManager', JSON.stringify(newManager))
								.then(response => {
									document.querySelector('.registration-manager-deliverer').style.display = 'none';
									 axios
									    .get('/user/getAllUsers')
									    .then(response => {
										   if (response.data != null) {
											   this.users = response.data;
										    }
									 });
								});
							}
							else if(this.roleRegister == 'DELIVERER'){
								axios
								.post('/deliverer/createDeliverer', JSON.stringify(newDeliverer))
								.then(response => {
									document.querySelector('.registration-manager-deliverer').style.display = 'none';
									 axios
									    .get('/user/getAllUsers')
									    .then(response => {
										   if (response.data != null) {
											   this.users = response.data;
										    }
									 });
								});
							}			
	    				}
	    			})
	    			.catch(error => {
					    console.log(error.response)
					});
				}
			
		},		
		addManagerDelivererClose: function (event) {
			 this.usernameRegister = '';
		     this.passwordRegister = '';
		     this.nameRegister = '';
			 this.surnameRegister = '';
			 for (element of document.getElementsByName('labels')){
			 	element.innerHTML = '';
			 	element.style.display = 'hidden';
			 }
			 document.querySelector('.registration-manager-deliverer').style.display = 'none';
		},
		
		showSuspiciousCustomers : function (event) {
			axios
          		.get('/customer/getSuspiciousCustomers')
          		.then(response => {
				if (response.data != null) {
					this.users = response.data;
				}
			});
		},
		
		showOnlyAdmins : function (event) {
			axios
          		.get('/user/getAllAdmins')
          		.then(response => {
				if (response.data != null) {
					this.users = response.data;
				}
			});
		},
		
		showOnlyManagers : function (event) {
			axios
          		.get('/user/getAllManagers')
          		.then(response => {
				if (response.data != null) {
					this.users = response.data;
				}
			});
		},
		
		showOnlyDeliverers : function (event) {
			axios
          		.get('/user/getAllDeliverers')
          		.then(response => {
				if (response.data != null) {
					this.users = response.data;
				}
			});
		},
		
		showOnlyCustomers : function (event) {
			axios
          		.get('/user/getAllCustomers')
          		.then(response => {
				if (response.data != null) {
					this.users = response.data;
				}
			});
		},
		
		showOnlyGoldenCustomers : function (event) {
			axios
          		.get('/customer/getAllGoldenCustomers')
          		.then(response => {
				if (response.data != null) {
					this.users = response.data;
				}
			});
		},
		
		showOnlySilverCustomers : function (event) {
			axios
          		.get('/customer/getAllSilverCustomers')
          		.then(response => {
				if (response.data != null) {
					this.users = response.data;
				}
			});
		},
		
		showOnlyBronzedCustomers : function (event) {
			axios
          		.get('/customer/getAllBronzedCustomers')
          		.then(response => {
				if (response.data != null) {
					this.users = response.data;
				}
			});
		},
		
		searchUsers : function (event) {
				let searchParameters = {
						name : this.searchName,
						surname : this.searchSurname,
	    				username : this.searchUsername			
    			}
    			
    			axios 
		    		.post('/user/searchUsers', JSON.stringify(searchParameters))
		    		.then(response => {
		    		   this.users = response.data;
		    	})
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
		
		setSurnameAsSortParameter : function (event) {
			this.sortParameter = 'surname';
		},
		
		setUsernameAsSortParameter : function (event) {
			this.sortParameter = 'username';
		},
		
		setNumberOfPointsAsSortParameter : function (event) {
			this.sortParameter = 'numberOfPoints';
		},
		
		sortUsers : function (event) {
			
				let sortParameters = {
					mode : this.sortMode,
					parameter : this.sortParameter		
    			}
    			
    			axios 
		    		.post('/user/sortUsers', JSON.stringify(sortParameters))
		    		.then(response => {
		    		   this.users = response.data;
		    	})
		},
		
		blockUser : function (user) {
			axios 
				.put("user/blockUser/" + user.username)
				.then(response => {
					if (response.data != null) {
						this.users = response.data;
					}
					
				});
		},
		
		logout : function (event) {
			window.location.href = "#/";
		}
	},
	
	computed: {
	      isDisabled : function(user) {
	        // you can  check your form is filled or not here.
	         return user.isBlocked === true || user.role == "ADMIN";
	      }
    },
    
	mounted () {
          axios
          	.get('/user/getAllUsers')
          	.then(response => {
				 if (response.data != null) {
					this.users = response.data;
			 }
		   });
    }
});