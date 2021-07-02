Vue.component("user-profiles-page", {
	data: function () {
		    return {
		      restaurants: null,
		      usernameRegister: '',
		      passwordRegister: '',
		      nameRegister: '',
			  surnameRegister: '',
			  genderRegister:'',
		      dateOfBirthRegister: '',
		      roleRegister : '',
		      usernameLog: '',
		      passwordLog: ''
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
            <li class="active"><a href="#/admin">Početna</a></li>
            <li><a href="#/userProfile">Moj Profil</a></li>
            <li><a href="#/userProfilesView">Korisnici</a></li>
            <li><a href="#/commentsAdmin">Komentari</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li v-on:click="logout"><span class="glyphicon glyphicon-user"></span> Odjavite se </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="registered-users">

        <h1 style="position: absolute; margin-top: 20px; margin-left: 600px; font-weight: bolder; color: rgb(30, 31, 104);">REGISTROVANI KORISNICI</h1>

        <div class="show-suspect-users">
            <input type="checkbox" id="suspect-users" value="user">
            <label style="color: rgb(30, 31, 104);"> Sumnjivi korisnici</label><br>
        </div>

        <div class="new-users">
            <button v-on:click="registerManager" class="new-users-button">NOVI MENADŽER</button><br/><br/><br/><br/>
            <button v-on:click="registerDeliverer" class="new-users-button">NOVI DOSTAVLJAČ</button>
        </div>
  
        <div class="container-fluid text-center" style="position: absolute; left: 300px; top: 100px;">    
            <div class="row content">
                <div class="col-lg-8"> 
                    <div class="users-panel">
                        <div class="user-card">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">KUPAC</h4>
                            </div>
                            <button class="block-user-button">BLOKIRAJ</button>           
                        </div>
                        <div class="user-card">
                            <h4 style="margin-top: 0; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">KUPAC</h4>
                            </div> 
                        </div>      
                
                        <div class="user-card">
                            <h4 style="margin-top: 0; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">KUPAC</h4>
                            </div> 
                        </div> 
                        <div class="user-card">
                            <h4 style="margin-top: 0; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">KUPAC</h4>
                            </div> 
                        </div> 
                        <div class="user-card">
                            <h4 style="margin-top: 0; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">KUPAC</h4>
                            </div>  
                        </div>  
                        
                        <div class="user-card">
                            <h4 style="margin-top: 0; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">KUPAC</h4>
                            </div> 
                        </div>  

                        <div class="user-card">
                            <h4 style="margin-top: 0; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">KUPAC</h4>
                            </div> 
                        </div> 
                        
                        <div class="user-card">
                            <h4 style="margin-top: 0; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">KUPAC</h4>
                            </div> 
                        </div> 

                        <div class="user-card">
                            <h4 style="margin-top: 0; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 90px; font-weight: bolder;">KUPAC</h4>
                            </div> 
                        </div> 
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
			//this.role = MANAGER;
			document.querySelector('.registration-manager-deliverer').style.display = 'flex';
		},
		
		registerDeliverer : function (event) {
			//this.role = DELIVERER;
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
		
		logout : function (event) {
			
		}
	},
	mounted () {
     /*   axios
          .get('rest/proizvodi/getJustProducts')
          .then(response => (this.products = response.data))*/
    }
});